# RAG from Scratch

**Demystify Retrieval-Augmented Generation (RAG) by building it yourself — step by step.**  
No black boxes. No cloud APIs. Just clear explanations, simple examples, and local code you fully understand.

This project follows the same philosophy as [AI Agents from Scratch](https://github.com/pguso/ai-agents-from-scratch):  
make advanced AI concepts approachable for developers through minimal, well-explained, real code.

---

## 🚀 What You'll Learn

- **What RAG really is** — and why it’s so powerful for knowledge retrieval.  
- **How embeddings work** — turn text into numbers your model can understand.  
- **How to build a local vector database** — store and query documents efficiently.  
- **How to connect everything** — retrieve context and feed it into an LLM for grounded answers.  
- **Step-by-step code walkthroughs** — every function explained, nothing hidden.

---

## 🧠 Concept Overview

Retrieval-Augmented Generation (RAG) enhances language models by giving them access to **external knowledge**.  
Instead of asking the model to “remember” everything, you let it **retrieve relevant context** before generating a response.

**Pipeline:**
1. **Knowledge Requirements** question and answer sets to test availabilty of data sources and capabilities of the whole pipeline
2. **Embed** your documents (turn text into vectors).  
3. **Store** them in a vector database.  
4. **Retrieve** relevant context for a query.  
5. **Augment** your prompt with that context.  
6. **Generate** the final answer using a local LLM.

---

## 📂 Project Structure

```
rag-from-scratch/
├── 00_how_rag_works/
│   └── example.js
│       // A minimal simulation of RAG using plain JS objects:
│       // - small document array
│       // - naive keyword search
│       // - simple answer concatenation
│       // Purpose: show the *idea* of retrieval + generation in one file.
├── 01_knowledge_requirements/
│ └── example.js
│       // Explain how enterprise or local data becomes the knowledge base.
│       // Add a small dataset (like 5 FAQ entries) for hands-on experiments.
├── 02_intro_to_embeddings/
│   ├── 01_text_similarity_basics.js
│   │   // Compute similarity using cosine similarity on short numeric vectors.
│   │   // No real model — helps visualize the math intuition.
│   └── 02_generate_embeddings.js
│       // Show how to convert text → embeddings (e.g., via API or mock vectors).
├── 03_building_vector_store/
│   ├── 01_in_memory_store.js
│   │   // Build a mini vector store with JS arrays and cosine search.
│   ├── 02_nearest_neighbor_search.js
│   │   // Visualize how nearest-neighbor search works in code.
│   └── example.js
│       // Wrap both to simulate a minimal vector DB.
├── 04_retrieval_pipeline/
│   ├── 01_query_rewriting.js
│   │   // Show how rewriting affects retrieval results (e.g., synonyms).
│   ├── 02_rank_results.js
│   │   // Implement simple scoring and ordering.
│   ├── 03_no_results_check.js
│   │   // Add fallback logic for empty or poor matches.
│   └── example.js
│       // Chain all parts to simulate the full retrieval flow.
├── 05_rag_in_action/
│   └── example.js
│       // Combine retrieval with a simple LLM stub (e.g., template-based generator).
│       // Example: “Based on {context}, the answer is...”
│
├── 06_evaluating_rag_quality/
│ └── example.js
│     // Measure retrieval precision, recall, and LLM accuracy.
├── 07_observability_and_caching/
│ └── example.js
│     // Show caching repeated queries and logging performance.
└── README.md
```

### How it works
| Goal                                | What You Add                                          | Why It Helps                                                                |
| ----------------------------------- | ----------------------------------------------------- | --------------------------------------------------------------------------- |
| **Concept clarity**                 | `00_how_rag_works`                                    | Lets users see retrieval + generation in <20 lines before touching vectors. |
| **Mathematical intuition**          | `02_intro_to_embeddings/01_text_similarity_basics.js` | Teaches cosine similarity without black-box APIs.                           |
| **Hands-on understanding**          | `03_building_vector_store/01_in_memory_store.js`      | Users see how vector databases actually store & compare embeddings.         |
| **Pipeline thinking**               | `04_retrieval_pipeline`                         | Each stage becomes a visible, testable function.                            |

Each folder contains:
- A **minimal example** (`example.js`)
- A **detailed explanation** of every step  
- Comments in the code to teach the concept clearly

---

## 🧰 Requirements

- Node.js 18+  
- Local LLM (node-llama-cpp)  
- npm packages for embeddings and vector math  

Install dependencies:

```bash
npm install
```

Run examples:

```
node 01_intro_to_embeddings/example.js
```

## Philosophy

This repository is not about fancy frameworks or huge models.
It’s about understanding — line by line — how RAG works under the hood.

If you can explain it, you can build it.
If you can build it, you can improve it.

## Contribute

Contributions are welcome!
If you have a clear, educational RAG example, open a PR.

See Also

[AI Agents from Scratch](https://github.com/pguso/ai-agents-from-scratch)
[LangChain RAG Concepts](https://docs.langchain.com/oss/python/langchain/rag)
[Best AI tools for RAG](https://codingscape.com/blog/best-ai-tools-for-retrieval-augmented-generation-rag)

