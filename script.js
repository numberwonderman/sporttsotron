// script.js

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

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `Act as a sports historian. Provide a concise, statistics-focused narrative for the following matchup: ${matchup}. 
    Focus only on pure history, record-breaking moments, and relevant statistics. Strip away all betting info, advertisements, and commentary fluff.`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error ? errorData.error.message : "Unknown API error");
        }

        const data = await response.json();
        const result = data.candidates[0].content.parts[0].text;
        
        outputArea.innerHTML = `<h3>Matchup Analysis</h3><p>${result}</p>`;
    } catch (error) {
        outputArea.innerHTML = `<strong>API Error:</strong> ${error.message}`;
        console.error("Full Error Details:", error);
    }
}

analyzeBtn.addEventListener('click', getSportsNarrative);
    } catch (error) {
        outputArea.innerHTML = "Error: Failed to fetch narrative. Please check your API key.";
        console.error(error);
    }
}

analyzeBtn.addEventListener('click', getSportsNarrative);
