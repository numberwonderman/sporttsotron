import { GoogleGenAI } from 'https://esm.run/@google/genai';

const analyzeBtn = document.getElementById('analyze-btn');
const outputArea = document.getElementById('output-area');
const apiKeyInput = document.getElementById('api-key-input');
const matchupInput = document.getElementById('matchup-input');

async function getSportsNarrative() {
    const apiKey = apiKeyInput.value.trim();
    const matchup = matchupInput.value.trim();

    if (!apiKey || !matchup) {
        alert("Please provide both an API key and a matchup.");
        return;
    }

    outputArea.innerHTML = "Analyzing historical records...";

    try {
        // This is the EXACT same setup as your working project
        const ai = new GoogleGenAI({ apiKey: apiKey });
        
        const prompt = `Act as a sports historian. Provide a concise, statistics-focused narrative for: ${matchup}. Focus only on pure history, record-breaking moments, and statistics. Strip away all betting info and commentary fluff.`;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt
        });

        outputArea.innerHTML = `<h3>Matchup Analysis</h3><p>${response.text}</p>`;
    } catch (error) {
        outputArea.innerHTML = `<strong>API Error:</strong> ${error.message}`;
        console.error("Full Error Details:", error);
    }
}

analyzeBtn.addEventListener('click', getSportsNarrative);
