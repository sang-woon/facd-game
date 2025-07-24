import OpenAI from 'openai'

// OpenAI 초기화를 조건부로 처리
let openai: OpenAI | null = null

try {
  if (process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
    openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true // Note: In production, call this from server-side
    })
  }
} catch (error) {
  console.warn('OpenAI API key not configured')
}

interface AnalysisResult {
  summary: string
  keywords: string[]
  sentiment: 'positive' | 'negative' | 'neutral'
  suggestedDepartment?: string
  urgency: 'low' | 'medium' | 'high' | 'urgent'
}

export async function analyzeComplaintWithAI(
  content: string,
  departments: any[]
): Promise<AnalysisResult> {
  // OpenAI가 설정되지 않은 경우 기본값 반환
  if (!openai) {
    return {
      summary: content.substring(0, 100) + '...',
      keywords: [],
      sentiment: 'neutral',
      urgency: 'medium'
    }
  }

  try {
    const departmentList = departments.map(d => `${d.name}: ${d.keywords?.join(', ') || ''}`).join('\n')
    
    const prompt = `다음 민원 내용을 분석해주세요:

민원 내용: "${content}"

사용 가능한 부서 목록:
${departmentList}

다음 형식으로 응답해주세요:
{
  "summary": "민원 내용을 한 문장으로 요약",
  "keywords": ["주요", "키워드", "3-5개"],
  "sentiment": "positive/negative/neutral 중 하나",
  "suggestedDepartment": "가장 적합한 부서명",
  "urgency": "low/medium/high/urgent 중 하나"
}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: '당신은 경기도청의 민원 분석 전문가입니다. 민원 내용을 분석하여 적절한 부서를 매칭하고 우선순위를 판단합니다.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    })

    const result = JSON.parse(response.choices[0].message.content || '{}')
    return result as AnalysisResult
  } catch (error) {
    console.error('OpenAI API 호출 실패:', error)
    // Fallback response
    return {
      summary: content.substring(0, 100) + '...',
      keywords: [],
      sentiment: 'neutral',
      urgency: 'medium'
    }
  }
}