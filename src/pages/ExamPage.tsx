// 与善同行 - 模拟试卷页（限时模考体验）
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  PlayCircle,
  Award,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { questions } from '@/data/questions'
import { cn } from '@/lib/utils'

type Mode = 'intro' | 'examining' | 'result'

interface ExamConfig {
  name: string
  duration: number // 分钟
  questionCount: number
  passScore: number
  description: string
}

const examConfigs: ExamConfig[] = [
  {
    name: '助理社会工作师模拟卷（一）',
    duration: 30,
    questionCount: 10,
    passScore: 60,
    description: '覆盖综合能力+实务基础，随机抽取 10 题',
  },
  {
    name: '社会工作师模拟卷（一）',
    duration: 45,
    questionCount: 15,
    passScore: 60,
    description: '覆盖三大模块，随机抽取 15 题',
  },
  {
    name: '高频考点冲刺卷',
    duration: 20,
    questionCount: 8,
    passScore: 75,
    description: '高频考点精练，冲刺提分',
  },
]

export default function ExamPage() {
  const [mode, setMode] = useState<Mode>('intro')
  const [currentConfig, setCurrentConfig] = useState<ExamConfig | null>(null)
  const [examQuestions, setExamQuestions] = useState<typeof questions>([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string[]>>({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  // 倒计时
  useEffect(() => {
    if (mode !== 'examining' || timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          handleSubmit()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [mode, timeLeft])

  // 开始考试
  const startExam = (config: ExamConfig) => {
    // 随机抽题
    const shuffled = [...questions].sort(() => Math.random() - 0.5)
    const selected = shuffled.slice(0, config.questionCount)
    setExamQuestions(selected)
    setCurrentConfig(config)
    setTimeLeft(config.duration * 60)
    setAnswers({})
    setCurrentIdx(0)
    setSubmitted(false)
    setMode('examining')
  }

  // 选择答案
  const handleSelect = (qid: number, key: string) => {
    if (submitted) return
    const q = examQuestions.find((qu) => qu.id === qid)
    if (!q) return
    setAnswers((prev) => {
      const current = prev[qid] || []
      if (q.type === 'single') {
        return { ...prev, [qid]: [key] }
      } else {
        if (current.includes(key)) {
          return { ...prev, [qid]: current.filter((k) => k !== key) }
        }
        return { ...prev, [qid]: [...current, key] }
      }
    })
  }

  // 提交
  const handleSubmit = () => {
    setSubmitted(true)
    setMode('result')
  }

  // 重新开始
  const restart = () => {
    setMode('intro')
    setCurrentConfig(null)
    setExamQuestions([])
    setAnswers({})
    setTimeLeft(0)
  }

  // 计算成绩
  const calculateScore = () => {
    let correct = 0
    examQuestions.forEach((q) => {
      const userAns = answers[q.id] || []
      if (
        userAns.length === q.answer.length &&
        q.answer.every((a) => userAns.includes(a))
      ) {
        correct++
      }
    })
    return {
      correct,
      total: examQuestions.length,
      percent: Math.round((correct / examQuestions.length) * 100),
    }
  }

  if (mode === 'intro') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            模拟试卷
          </h1>
          <p className="text-sm text-text-dim mt-1">限时模考体验，感受真实考试节奏</p>
        </div>

        <div className="grid gap-4">
          {examConfigs.map((c, i) => (
            <Card key={i} className="hover:border-primary/50 transition-all">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text mb-2">{c.name}</h3>
                    <p className="text-sm text-text-dim mb-3">{c.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-text-dim">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-primary" />
                        {c.duration} 分钟
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="h-3.5 w-3.5 text-accent-light" />
                        {c.questionCount} 题
                      </span>
                      <span className="flex items-center gap-1">
                        <Award className="h-3.5 w-3.5 text-yellow-400" />
                        及格 {c.passScore} 分
                      </span>
                    </div>
                  </div>
                  <Button onClick={() => startExam(c)}>
                    <PlayCircle className="h-4 w-4" />
                    开始考试
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (mode === 'examining' && currentConfig) {
    const currentQ = examQuestions[currentIdx]
    const minutes = Math.floor(timeLeft / 60)
    const seconds = timeLeft % 60
    const answeredCount = Object.keys(answers).filter((k) => answers[Number(k)].length > 0).length

    return (
      <div className="max-w-3xl mx-auto space-y-4">
        {/* 考试状态栏 */}
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h2 className="font-semibold text-text">{currentConfig.name}</h2>
                <p className="text-xs text-text-dim mt-1">
                  第 {currentIdx + 1} / {examQuestions.length} 题 · 已答 {answeredCount} 题
                </p>
              </div>
              <div
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm',
                  timeLeft < 60
                    ? 'bg-red-500/20 text-red-400'
                    : timeLeft < 300
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-primary/10 text-primary'
                )}
              >
                <Clock className="h-4 w-4" />
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 题目卡片 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-text-dim">{currentQ.category}</span>
                <span className="text-xs px-2 py-0.5 rounded bg-accent/10 text-accent-light">
                  {currentQ.type === 'single' ? '单选' : '多选'}
                </span>
              </div>
            </div>
            <CardTitle className="text-lg leading-relaxed pt-2">
              {currentIdx + 1}. {currentQ.stem}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {currentQ.options.map((opt) => {
              const selected = (answers[currentQ.id] || []).includes(opt.key)
              return (
                <button
                  key={opt.key}
                  onClick={() => handleSelect(currentQ.id, opt.key)}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-all',
                    selected
                      ? 'border-primary bg-primary/10'
                      : 'border-primary/20 hover:border-primary/50 hover:bg-primary/5'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold',
                        selected
                          ? 'border-primary bg-primary text-bg'
                          : 'border-primary/30 text-primary'
                      )}
                    >
                      {opt.key}
                    </span>
                    <span className="text-text pt-0.5">{opt.text}</span>
                  </div>
                </button>
              )
            })}
          </CardContent>
        </Card>

        {/* 导航 */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
          >
            上一题
          </Button>
          {currentIdx < examQuestions.length - 1 ? (
            <Button onClick={() => setCurrentIdx((i) => i + 1)}>
              下一题
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="accent" onClick={handleSubmit}>
              提交试卷
            </Button>
          )}
        </div>

        {/* 答题卡 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">答题卡</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-10 sm:grid-cols-15 gap-2">
              {examQuestions.map((q, i) => {
                const isAnswered = (answers[q.id] || []).length > 0
                const isCurrent = i === currentIdx
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIdx(i)}
                    className={cn(
                      'h-9 w-9 rounded text-xs font-semibold transition-all',
                      isCurrent
                        ? 'ring-2 ring-primary'
                        : '',
                      isAnswered
                        ? 'bg-primary text-bg'
                        : 'bg-bg-deep text-text-dim'
                    )}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (mode === 'result' && currentConfig) {
    const score = calculateScore()
    const passed = score.percent >= currentConfig.passScore

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className={cn('border-2', passed ? 'border-green-500' : 'border-red-500')}>
          <CardContent className="py-10 text-center space-y-4">
            <Trophy className={cn('h-20 w-20 mx-auto', passed ? 'text-yellow-400 glow-text' : 'text-text-dim')} />
            <h2 className="text-3xl font-bold text-text">
              {passed ? '🎉 恭喜通过！' : '继续努力！'}
            </h2>
            <p className="text-text-dim">
              {currentConfig.name} · 及格线 {currentConfig.passScore} 分
            </p>
            <div className="flex items-center justify-center gap-8 text-sm py-4">
              <div>
                <div className="text-4xl font-bold text-primary glow-text">{score.percent}</div>
                <div className="text-text-dim mt-1">总分</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-green-400">{score.correct}</div>
                <div className="text-text-dim mt-1">答对</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-red-400">{score.total - score.correct}</div>
                <div className="text-text-dim mt-1">答错</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 pt-4">
              <Button onClick={restart} variant="outline">
                <RotateCcw className="h-4 w-4" />
                返回试卷列表
              </Button>
              <Link to="/quiz">
                <Button>
                  去 AI 题库练习
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 错题解析 */}
        <Card>
          <CardHeader>
            <CardTitle>答题详情</CardTitle>
            <CardDescription>查看每道题的正确答案和 AI 解析</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {examQuestions.map((q, i) => {
              const userAns = answers[q.id] || []
              const isCorrect =
                userAns.length === q.answer.length &&
                q.answer.every((a) => userAns.includes(a))
              return (
                <div
                  key={q.id}
                  className={cn(
                    'p-4 rounded-lg border',
                    isCorrect
                      ? 'border-green-500/30 bg-green-500/5'
                      : 'border-red-500/30 bg-red-500/5'
                  )}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <div className="text-sm text-text mb-1">
                        第 {i + 1} 题：{q.stem}
                      </div>
                      <div className="text-xs text-text-dim">
                        你的答案：<span className={isCorrect ? 'text-green-400' : 'text-red-400'}>{userAns.join('、') || '未作答'}</span>
                        {!isCorrect && (
                          <span className="ml-2 text-green-400">正确答案：{q.answer.join('、')}</span>
                        )}
                      </div>
                      {!isCorrect && (
                        <div className="mt-2 text-xs text-text-dim bg-bg-deep/50 p-2 rounded">
                          💡 {q.aiAnalysis.knowledgePoint}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
