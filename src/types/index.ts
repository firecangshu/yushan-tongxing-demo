// 与善同行 - TypeScript 类型定义

/** 题目类型 */
export interface Question {
  id: number
  /** 题干 */
  stem: string
  /** 题型：单选/多选 */
  type: 'single' | 'multiple'
  /** 选项 */
  options: { key: string; text: string }[]
  /** 正确答案 key 数组 */
  answer: string[]
  /** 考点分类 */
  category: string
  /** 难度：1-5 */
  difficulty: number
  /** AI 智能解析 */
  aiAnalysis: {
    /** 答案解读 */
    answerExplanation: string
    /** 知识点讲解 */
    knowledgePoint: string
    /** 真实场景举例 */
    realCaseExample: string
    /** 易错点提示 */
    commonMistake: string
    /** 相关考点延伸 */
    relatedPoints: string[]
  }
}

/** 答题记录 */
export interface QuizRecord {
  questionId: number
  userAnswer: string[]
  isCorrect: boolean
  /** 用时（秒） */
  timeSpent: number
  /** 答题时间 */
  answeredAt: number
}
