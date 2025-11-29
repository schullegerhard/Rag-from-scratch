import {getLlama, LlamaChatSession} from "node-llama-cpp";
import path from "path";
import {fileURLToPath} from "url";
import chalk from "chalk";
import {VectorDB} from "embedded-vector-db";
import {CharacterTextSplitter, PDFLoader} from "../../../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MODEL_PATH = path.join(__dirname, '..', '..', '..', 'models', 'bge-small-en-v1.5.Q8_0.gguf');
const DIM = 384;
const MAX_ELEMENTS = 10000;
const NS = "einstein";
const LLM_MODEL_PATH = path.join(__dirname, '..', '..', '..', "models", "hf_Qwen_Qwen3-1.7B.Q8_0.gguf");

async function initializeEmbeddingModel() {
    const llama = await getLlama({
        logLevel: 'error'
    });
    const model = await llama.loadModel({
        modelPath: MODEL_PATH
    });
    return await model.createEmbeddingContext();
}

async function generateEmbeddings(context, documents, onProgress = null) {
    const embeddings = [];
    let processed = 0;

    for (const document of documents) {
        const embedding = await context.getEmbeddingFor(document.pageContent);

        embeddings.push({
            id: document.metadata.id || `doc_${processed}`,
            content: document.pageContent,
            metadata: document.metadata,
            embedding: Array.from(embedding.vector), // Convert to plain array
            timestamp: Date.now()
        });

        processed++;
        if (onProgress) {
            onProgress(processed, documents.length);
        }
    }

    return embeddings;
}

const documentCache = new Map();
async function addDocumentsToStore(vectorStore, embeddingContext, documents) {
    for (const doc of documents) {
        // 3. Embedding - for each chunk we generate a embedding and store it in the vector db
        const embedding = await embeddingContext.getEmbeddingFor(doc.pageContent);
        const metadata = {
            content: doc.pageContent,
            ...doc.metadata,
        };
        await vectorStore.insert(
            NS,
            doc.metadata.id,
            Array.from(embedding.vector),
            metadata
        );
        documentCache.set(doc.metadata.id, { id: doc.metadata.id, metadata });
    }
}

async function searchVectorStore(vectorStore, embeddingContext, query, k = 3) {
    const queryEmbedding = await embeddingContext.getEmbeddingFor(query);
    return await vectorStore.search(NS, Array.from(queryEmbedding.vector), k);
}

async function initializeLLM() {
    const llama = await getLlama({ logLevel: "error" });
    const model = await llama.loadModel({ modelPath: LLM_MODEL_PATH });
    const context = await model.createContext();
    return new LlamaChatSession({ contextSequence: context.getSequence() });
}

async function generateAnswer(chatSession, query, context) {
    if (!context || context === '') {
        const prompt = `Question: ${query}\n\nYou don't have any relevant information to answer this question. Please say so politely.`;
        const response = await chatSession.prompt(prompt);
        return response.trim();
    }

    const prompt = `You are a helpful assistant. Use the following context to answer the question. If the context doesn't contain relevant information, say so.

Context:
${context}

Question: ${query}

Answer:`;

    const response = await chatSession.prompt(prompt);
    return response.trim();
}

async function main() {
    // 1. Data Loading
    const pdfLoader = new PDFLoader("./docs/einstein.pdf", {splitPages: true})
    const documents = await pdfLoader.load()

    // 2. Text splitting and chunking
    const splitter = new CharacterTextSplitter({
        separator: ' ',
        chunkSize: 500,
        chunkOverlap: 40
    })
    const allChunks = [];
    let chunkId = 0;
    for (const doc of documents) {
        const chunks = splitter.splitText(doc.pageContent);

        for (const chunk of chunks) {
            allChunks.push({
                pageContent: chunk,
                metadata: {
                    ...doc.metadata,
                    id: `${doc.metadata.id || 'page'}_${chunkId}`
                }
            });
            chunkId++;
        }
    }

    console.log('number of chunks', allChunks.length);

    // 3. Embedding Documents (just for understanding)
    const embeddingContext = await initializeEmbeddingModel()
    const embeddings = await generateEmbeddings(
        embeddingContext,
        allChunks,
        (current, total) => {
            const percent = ((current / total) * 100).toFixed(1);
            process.stdout.write(`\r${chalk.cyan('Progress:')} ${current}/${total} ${percent}%\n`);
        }
    );

    console.log('total embeddings', embeddings.length)

    // 4. Vector Store - store generated chunks in DB
    const vectorStore = new VectorDB({
        dim: DIM,
        maxElements: MAX_ELEMENTS,
    });
    await addDocumentsToStore(vectorStore, embeddingContext, allChunks)

    console.log(`Added ${allChunks.length} documents to vector store\n`)

    // 5.1. Basic Retrieval - Retrieve User question from a chat interface, for example
    const question = "What was Einstein’s school performance like? What grades did he get in his Matura?"

    console.log('question', question)

    // 5.1. Basic Retrieval - Search vector db for 3 closest matches
    const results = await searchVectorStore(vectorStore, embeddingContext, question, 3);
    results.forEach((result, i) => {
        console.log(`${chalk.bold(`${i + 1}.`)} [Score: ${chalk.green(result.similarity.toFixed(4))}]`);
        console.log(`   ${chalk.dim("ID:")} ${result.id}`);
        console.log(`   ${chalk.dim("Content:")} ${result.metadata.content}...`);
        console.log(`   ${chalk.dim("Category:")} ${result.metadata.category}`);
    })

    // 5.1. Basic Retrieval - Augment the LLM with the right context and generate the answer
    const chatSession = await initializeLLM()
    const context = results[0].metadata.content

    const answer = await generateAnswer(chatSession, question, context)

    console.log(`\n${chalk.bold("Answer with context:")}`);
    console.log(chalk.yellow(answer));

    chatSession.resetChatHistory()
    const response = await chatSession.prompt(question);

    console.log(`\n${chalk.bold("Answer without context:")}`);
    console.log(chalk.yellow(response));

    process.exit(0);
}

main()