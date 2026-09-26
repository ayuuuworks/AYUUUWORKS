import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { generateDeterministicStrategicHypothesis } from './src/services/deterministicFallbackService.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent header as required by guidelines
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback strategic intelligence generator when Gemini is not configured or offline
function generateDeterministicHypothesis(data: {
  industry: string;
  primaryProblem: string;
  businessName?: string;
  goals?: string[];
  exploredProjects?: string[];
  interactions?: any[];
}) {
  return generateDeterministicStrategicHypothesis(data);
}

// Server API: AWE Strategic Reasoning Endpoint
app.post('/api/awe/diagnose', async (req, res) => {
  try {
    const { industry, primaryProblem, businessName, goals, exploredProjects, interactions } = req.body;

    if (!industry || !primaryProblem) {
      return res.status(400).json({ error: 'Industry and primary problem are required' });
    }

    if (!ai) {
      // Return high-quality deterministic strategic hypothesis when Gemini API key is not active
      const fallback = generateDeterministicHypothesis({ industry, primaryProblem, businessName, goals, exploredProjects });
      return res.json(fallback);
    }

    // Call Gemini 3.8 Flash with structured schema
    const prompt = `
You are the strategic intelligence behind AWE (AyuuWorks Experience Engine) for AyuuWorks, a luxury creative and digital agency.
The visitor provided the following context:
- Industry: ${industry}
- Business Name: ${businessName || 'Business'}
- Stated Bottleneck/Problem: ${primaryProblem}
- Goals: ${JSON.stringify(goals || [])}
- Projects Explored so far: ${JSON.stringify(exploredProjects || [])}
- Transparent Interaction Signals: ${JSON.stringify(interactions || [])}

Provide a rigorous, candid strategic hypothesis.
Distinguish between FACTS provided by the visitor and INFERENCES.
Use language such as: "Based on what you told us...", "One possible bottleneck is...", "This suggests...", "Worth investigating...".
Never fabricate metrics or claim certainty.
Output structured data conforming to the schema.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are AWE, the strategic business diagnosis engine for AyuuWorks. You speak with high-level agency maturity, luxury restraint, Hindi/Hinglish warmth where natural, and strategic precision. You challenge conventional assumptions (e.g., posting more on social media when positioning is broken).',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: 'Concise, high-impact assessment of the current business position.'
            },
            possible_bottlenecks: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 genuine strategic or digital bottlenecks.'
            },
            recommended_corrections: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 actionable strategic corrections.'
            },
            recommended_tests: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '1 to 2 experiments to validate the hypothesis.'
            },
            reasoning: {
              type: Type.STRING,
              description: 'Strategic explanation of why this bottleneck exists and why visibility alone is not enough.'
            },
            confidence: {
              type: Type.STRING,
              description: 'low, medium, or high'
            },
            relevant_services: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2 to 3 specific AyuuWorks capabilities.'
            },
            recommended_project: {
              type: Type.STRING,
              description: 'saanjh, the-grand-haveli, rooh-gastronomy, or veda-living'
            },
            next_action: {
              type: Type.STRING,
              description: 'Clear, high-value immediate next step.'
            }
          },
          required: [
            'summary',
            'possible_bottlenecks',
            'recommended_corrections',
            'recommended_tests',
            'reasoning',
            'confidence',
            'relevant_services',
            'recommended_project',
            'next_action'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json(parsed);
  } catch (error) {
    console.error('AWE diagnosis error, falling back to deterministic hypothesis:', error);
    const fallback = generateDeterministicHypothesis(req.body);
    return res.json(fallback);
  }
});

// Production or Vite development server mounting
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`[AyuuWorks Business Engine] Server running on port ${PORT}`);
  });
}

startServer();
