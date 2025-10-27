import OpenAI from 'openai';
import 'dotenv/config'

const apiKey = process.env['OPENAI_API_KEY']
const questions = [
    "What is Underwhelming Spatula?",
    "Who wrote 'Dubious Parenting Tips'?",
    "How long is Almost-Perfect Investment Guide?",
]

const answers = [
    "Underwhelming Spatula is a kitchen tool that redefines expectations by fusing whimsy with functionality.",
    "Lisa Melton wrote Dubious Parenting Tips.",
    "The Almost-Perfect Investment Guide is 210 pages long.",
]

const sendToOpenAI = async (input) => {
    const client = new OpenAI({
        apiKey, // This is the default and can be omitted
    });
    const response = await client.responses.create({
        model: 'gpt-4o',
        input,
    });

    return response.output_text
}

const evaluateGeneratedAnswer = async (expectedAnswer, generatedAnswer) => {
    const prompt = `Please evaluate the generated answer. If the generated answer provides the same information 
    as the expected answer, then return PASS. Otherwise, return FAIL. Expected answer: ${expectedAnswer} 
    Generated answer: ${generatedAnswer}`

    return sendToOpenAI(prompt)
}

let generatedAnswers = []
for (const [index, question] of questions.entries()) {
    const answer = await sendToOpenAI(question)
    const result = await evaluateGeneratedAnswer(answers[index], answer)

    generatedAnswers.push({ question, answer, evaluationPassed: result === 'PASS' })
}

console.log(generatedAnswers)