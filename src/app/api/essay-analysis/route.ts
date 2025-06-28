import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { essay } = await req.json();
    if (!essay) {
      return NextResponse.json({ error: 'Missing essay text.' }, { status: 400 });
    }

    const TOGETHER_API_KEY = process.env.TOGETHER_API_KEY;
    const MODEL = 'Qwen/Qwen3-235B-A22B-fp8-tput';
    if (!TOGETHER_API_KEY) {
      return NextResponse.json({ error: 'API key not configured.' }, { status: 500 });
    }

    const analysisPrompt = `You are an expert college admissions essay analyzer. Analyze the following essay and provide scores (0-100) for these categories:

1. Curiosity: How intellectually curious and exploratory is the essay?
2. Drive: How much determination and motivation does the writer show?
3. Voice: How strong and authentic is the writer's unique voice?
4. Alignment: How well does the essay align with typical college essay expectations?

IMPORTANT: Your response must be a valid JSON object ONLY, with no additional text, markdown, or explanation. The format must be exactly:

{
  "Curiosity": number (0-100),
  "Drive": number (0-100),
  "Voice": number (0-100),
  "Alignment": number (0-100),
  "impressions": ["phrase 1", "phrase 2", "phrase 3"]
}

Impressions should be 3-5 short phrases describing the essay's key strengths. Do not include any other text or explanation in your response.

Essay to analyze:
"""
${essay}
"""`;

    const response = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOGETHER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'user', content: analysisPrompt },
        ],
        temperature: 0.3,
        max_tokens: 1024,
      }),
    });

    const data = await response.json();
    if (response.status !== 200) {
      return NextResponse.json({ error: data }, { status: response.status });
    }

    // Extract and parse the JSON response
    const content = data.choices?.[0]?.message?.content || '{}';
    let result;
    try {
      // First, try to find a JSON object in the response
      let jsonMatch;
      
      // Look for JSON object with the exact structure we expect
      const jsonRegex = /\{\s*"Curiosity"\s*:\s*\d+\s*,\s*"Drive"\s*:\s*\d+\s*,\s*"Voice"\s*:\s*\d+\s*,\s*"Alignment"\s*:\s*\d+\s*,\s*"impressions"\s*:\s*\[[^\]]*\]\s*\}/;
      jsonMatch = content.match(jsonRegex);
      
      // If no match, try a more relaxed JSON object match
      if (!jsonMatch) {
        jsonMatch = content.match(/\{[\s\S]*\}/);
      }
      
      const jsonString = jsonMatch ? jsonMatch[0] : content;
      
      // Clean up the JSON string
      let cleanJsonString = jsonString
        .replace(/```(?:json)?\n?|```/g, '') // Remove markdown code block markers
        .replace(/^[^{[]*/, '') // Remove anything before the first { or [
        .replace(/[^}\]]*$/, '') // Remove anything after the last } or ]
        .trim();
      
      // Ensure we have valid JSON
      if (!cleanJsonString.startsWith('{')) {
        cleanJsonString = `{${cleanJsonString}`;
      }
      if (!cleanJsonString.endsWith('}')) {
        cleanJsonString = `${cleanJsonString}}`;
      }
      
      result = JSON.parse(cleanJsonString);
      
      // Validate the structure and provide defaults if needed
      result = {
        Curiosity: Math.min(100, Math.max(0, Number(result.Curiosity) || 50)),
        Drive: Math.min(100, Math.max(0, Number(result.Drive) || 50)),
        Voice: Math.min(100, Math.max(0, Number(result.Voice) || 50)),
        Alignment: Math.min(100, Math.max(0, Number(result.Alignment) || 50)),
        impressions: Array.isArray(result.impressions) 
          ? result.impressions.filter(Boolean).slice(0, 5)
          : ['Analyzing your essay...']
      };
      
    } catch (e) {
      console.error('Failed to parse AI response:', e);
      console.error('Original content:', content);
      
      // Return default values if parsing fails
      return NextResponse.json({
        success: false,
        error: 'Failed to parse AI response',
        defaultScores: {
          Curiosity: 50,
          Drive: 50,
          Voice: 50,
          Alignment: 50,
          impressions: ['Analyzing your essay...']
        }
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error analyzing essay:', error);
    return NextResponse.json(
      { error: 'An error occurred while analyzing the essay.' },
      { status: 500 }
    );
  }
}
