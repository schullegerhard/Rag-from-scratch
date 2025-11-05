import { LlamaPrompter } from "../../helpers/llama-prompter.js";
import assert from 'assert'

const prompter = new LlamaPrompter();
const questions = [
    "What is the function of the Melancholy Toaster?",
    "Who designed the Overconfident Measuring Cup?",
    "How long does the Serenity Blender take to complete a full cycle?",
    "What material is used in the Disappointed Whisk handle?",
    "When was the Mediocre Pressure Cooker first released?"
]
const answers = [
    "The Melancholy Toaster gently warms bread while softly playing reflective jazz tunes.",
    "The Overconfident Measuring Cup was designed by culinary visionary Martin Doolan.",
    "The Serenity Blender completes a full cycle in precisely 47 seconds.",
    "The Disappointed Whisk handle is made from sustainably sourced eucalyptus wood.",
    "The Mediocre Pressure Cooker was first released in March 2017 as part of the 'Almost-Premium' series."
]

const evaluateGeneratedAnswer = async (expectedAnswer, generatedAnswer) => {
    const prompt = `Please evaluate the generated answer. If the generated answer provides the same information 
    as the expected answer, then return PASS. Otherwise, return FAIL. Expected answer: ${expectedAnswer} 
    Generated answer: ${generatedAnswer}`

    return prompter.prompt(prompt)
}

let testResults = []
let generatedAnswers = []
for (const [index, question] of questions.entries()) {
    const answer = await prompter.prompt(question)
    const result = await evaluateGeneratedAnswer(answers[index], answer)

    generatedAnswers.push({ question, evaluationPassed: result === 'PASS' })
    testResults.push(result === 'PASS' ? 'PASS' : 'FAIL')
}

await prompter.dispose();

// to test uncomment
//assert(testResults.includes('PASS'))