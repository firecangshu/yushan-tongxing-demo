// 与善同行 - AI 智能题库练习页
// 功能：答题交互、AI 解析展示、错题收藏、进度条、上一题/下一题
import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Lightbulb,
  BookOpen,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  Trophy,
  Heart,
  Eye,
  EyeOff,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { questions } from '@/data/questions'
import { cn } from '@/lib/utils'
import type { Question } from '@/types'

// 错题本地存储 key
const WRONG_BOOK_KEY = 'yushan_wrong_book'

export default function QuizPage() {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const [wrongBook, setWrongBook] = useState<number[]>([])
  const [startTime, setStartTime] = useState(Date.now())
  const [stats, setStats] = useState({ correct: 0, wrong: 0 })

  const currentQuestion: Question = questions[currentIdx]
  const isLast = currentIdx === questions.length - 1
  const isFirst = currentIdx === 0
  const progress = ((currentIdx + 1) / questions.length) * 100

  // 初始化加载错题本
  useEffect(() => {
    try {
      const stored = localStorage.getItem(WRONG_BOOK_KEY)
      if (stored) setWrongBook(JSON.parse(stored))
    } catch (e) {
      console.warn('加载错题本失败', e)
    }
  }, [])

  // 切题时重置状态
  useEffect(() => {
    setSelected([])
    setSubmitted(false)
    setShowAnalysis(false)
    setStartTime(Date.now())
  }, [currentIdx])

  // 是否在错题本中
  const isInWrongBook = useMemo(
    () => wrongBook.includes(currentQuestion.id),
    [wrongBook, currentQuestion.id]
  )

  // 切换选项
  const toggleOption = (key: string) => {
    if (submitted) return
    if (currentQuestion.type === 'single') {
      setSelected([key])
    } else {
      setSelected((prev) =>
        prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      )
    }
  }

  // 提交答案
  const handleSubmit = () => {
    if (selected.length === 0) return
    setSubmitted(true)
    setShowAnalysis(true)
    const isCorrect =
      selected.length === currentQuestion.answer.length &&
      currentQuestion.answer.every((a) => selected.includes(a))
    if (isCorrect) {
      setStats((s) => ({ ...s, correct: s.correct + 1 }))
      // 答对自动从错题本移除
      if (isInWrongBook) toggleWrongBook()
    } else {
      setStats((s) => ({ ...s, wrong: s.wrong + 1 }))
      // 答错自动加入错题本
      if (!isInWrongBook) toggleWrongBook()
    }
    // 写入练习历史
    writeHistory(currentQuestion.id, isCorrect)
  }

  // 写入练习历史（白话：把答题记录存到本地）
  const writeHistory = (questionId: number, isCorrect: boolean) => {
    try {
      const stored = localStorage.getItem('yushan_quiz_history')
      const list: { questionId: number; isCorrect: boolean; answeredAt: number }[] = stored
        ? JSON.parse(stored)
        : []
      list.push({ questionId, isCorrect, answeredAt: Date.now() })
      // 限制最多保留 200 条
      const trimmed = list.slice(-200)
      localStorage.setItem('yushan_quiz_history', JSON.stringify(trimmed))
    } catch (e) {
      console.warn('写入练习历史失败', e)
    }
  }

  // 错题本切换
  const toggleWrongBook = () => {
    setWrongBook((prev) => {
      const next = prev.includes(currentQuestion.id)
        ? prev.filter((id) => id !== currentQuestion.id)
        : [...prev, currentQuestion.id]
      localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify(next))
      return next
    })
  }

  // 下一题
  const handleNext = () => {
    if (!isLast) setCurrentIdx((i) => i + 1)
  }

  // 上一题
  const handlePrev = () => {
    if (!isFirst) setCurrentIdx((i) => i - 1)
  }

  // 重新开始
  const handleRestart = () => {
    setCurrentIdx(0)
    setStats({ correct: 0, wrong: 0 })
  }

  // 判断选项是否正确
  const isOptionCorrect = (key: string) => currentQuestion.answer.includes(key)
  const isOptionWrong = (key: string) => submitted && selected.includes(key) && !isOptionCorrect(key)

  // 完成度判断
  const isFinished = currentIdx === questions.length - 1 && submitted

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* 顶部状态栏 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI 智能题库
          </h1>
          <p className="text-sm text-text-dim mt-1">22 道精选真题 · AI 深度解析 · 真实场景举例</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="h-4 w-4" />
              返回首页
            </Button>
          </Link>
        </div>
      </div>

      {/* 进度条 + 统计 */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-dim">
              进度：<span className="text-primary font-semibold">{currentIdx + 1}</span> / {questions.length}
            </span>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1 text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                正确 {stats.correct}
              </span>
              <span className="flex items-center gap-1 text-red-400">
                <XCircle className="h-4 w-4" />
                错误 {stats.wrong}
              </span>
              <span className="flex items-center gap-1 text-accent-light">
                <Heart className="h-4 w-4" />
                错题本 {wrongBook.length}
              </span>
            </div>
          </div>
          <div className="h-2 bg-bg-deep rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 shadow-glow-primary"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* 题目卡片 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs text-primary">
                {currentQuestion.category}
              </span>
              <span className="inline-flex items-center rounded-md bg-accent/10 px-2.5 py-1 text-xs text-accent-light">
                {currentQuestion.type === 'single' ? '单选题' : '多选题'}
              </span>
              <span className="inline-flex items-center rounded-md bg-bg-deep px-2.5 py-1 text-xs text-text-dim">
                难度 {'★'.repeat(currentQuestion.difficulty)}
              </span>
            </div>
            <Button
              variant={isInWrongBook ? 'accent' : 'outline'}
              size="sm"
              onClick={toggleWrongBook}
            >
              <Heart className={cn('h-4 w-4', isInWrongBook && 'fill-current')} />
              {isInWrongBook ? '已收藏' : '收藏错题'}
            </Button>
          </div>
          <CardTitle className="text-lg leading-relaxed pt-2">
            {currentIdx + 1}. {currentQuestion.stem}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* 选项列表 */}
          {currentQuestion.options.map((opt) => {
            const isSelected = selected.includes(opt.key)
            const correct = submitted && isOptionCorrect(opt.key)
            const wrong = isOptionWrong(opt.key)
            return (
              <button
                key={opt.key}
                onClick={() => toggleOption(opt.key)}
                disabled={submitted}
                className={cn(
                  'w-full text-left p-4 rounded-lg border transition-all',
                  'hover:border-primary/50 hover:bg-primary/5',
                  !submitted && isSelected && 'border-primary bg-primary/10',
                  submitted && correct && 'border-green-500 bg-green-500/10',
                  submitted && wrong && 'border-red-500 bg-red-500/10',
                  !submitted && !isSelected && 'border-primary/20',
                  submitted && 'cursor-default'
                )}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={cn(
                      'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold',
                      isSelected ? 'border-primary bg-primary text-bg' : 'border-primary/30 text-primary',
                      submitted && correct && 'border-green-500 bg-green-500 text-white',
                      submitted && wrong && 'border-red-500 bg-red-500 text-white'
                    )}
                  >
                    {opt.key}
                  </span>
                  <span className="flex-1 text-text pt-0.5">{opt.text}</span>
                  {submitted && correct && <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />}
                  {submitted && wrong && <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />}
                </div>
              </button>
            )
          })}

          {/* 提交按钮 */}
          {!submitted && (
            <div className="pt-2 flex justify-end">
              <Button
                onClick={handleSubmit}
                disabled={selected.length === 0}
                size="lg"
              >
                提交答案
                <CheckCircle2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI 解析（提交后展示） */}
      {submitted && showAnalysis && (
        <Card className="border-primary/40 animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-primary">
                <Lightbulb className="h-5 w-5" />
                AI 智能解析
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAnalysis(false)}
              >
                <EyeOff className="h-4 w-4" />
                收起
              </Button>
            </div>
            <CardDescription>
              正确答案：<span className="text-green-400 font-semibold">{currentQuestion.answer.join('、')}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AnalysisItem
              icon={<CheckCircle2 className="h-4 w-4" />}
              title="答案解读"
              content={currentQuestion.aiAnalysis.answerExplanation}
              color="text-green-400"
            />
            <AnalysisItem
              icon={<BookOpen className="h-4 w-4" />}
              title="知识点讲解"
              content={currentQuestion.aiAnalysis.knowledgePoint}
              color="text-primary"
            />
            <AnalysisItem
              icon={<Heart className="h-4 w-4" />}
              title="真实场景举例"
              content={currentQuestion.aiAnalysis.realCaseExample}
              color="text-accent-light"
            />
            <AnalysisItem
              icon={<AlertTriangle className="h-4 w-4" />}
              title="易错点提示"
              content={currentQuestion.aiAnalysis.commonMistake}
              color="text-yellow-400"
            />
            <div>
              <div className="flex items-center gap-2 text-sm font-semibold text-text-dim mb-2">
                <Sparkles className="h-4 w-4 text-primary" />
                相关考点延伸
              </div>
              <div className="flex flex-wrap gap-2">
                {currentQuestion.aiAnalysis.relatedPoints.map((p, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-md bg-primary/10 px-2.5 py-1 text-xs text-primary border border-primary/20"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* 已提交但折叠分析时显示展开按钮 */}
      {submitted && !showAnalysis && (
        <div className="text-center">
          <Button variant="outline" onClick={() => setShowAnalysis(true)}>
            <Eye className="h-4 w-4" />
            查看 AI 解析
          </Button>
        </div>
      )}

      {/* 导航按钮 */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="outline" onClick={handlePrev} disabled={isFirst}>
          <ChevronLeft className="h-4 w-4" />
          上一题
        </Button>
        {!isLast ? (
          <Button onClick={handleNext} disabled={!submitted}>
            下一题
            <ChevronRight className="h-4 w-4" />
          </Button>
        ) : isFinished ? (
          <Button variant="accent" onClick={handleRestart}>
            <RotateCcw className="h-4 w-4" />
            重新开始
          </Button>
        ) : (
          <Button onClick={handleNext} disabled={!submitted}>
            下一题
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* 完成弹窗 */}
      {isFinished && (
        <Card className="border-primary shadow-glow-primary animate-fade-in">
          <CardContent className="py-8 text-center space-y-4">
            <Trophy className="h-16 w-16 text-primary mx-auto glow-text" />
            <h2 className="text-2xl font-bold text-text">练习完成！</h2>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div>
                <div className="text-3xl font-bold text-green-400">{stats.correct}</div>
                <div className="text-text-dim">答对</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-400">{stats.wrong}</div>
                <div className="text-text-dim">答错</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary">
                  {Math.round((stats.correct / questions.length) * 100)}%
                </div>
                <div className="text-text-dim">正确率</div>
              </div>
            </div>
            <p className="text-text-dim">已自动收录错题到本地错题本，下次可优先复习</p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button variant="outline" onClick={handleRestart}>
                <RotateCcw className="h-4 w-4" />
                再来一次
              </Button>
              <Link to="/">
                <Button>返回首页</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// 解析项组件
function AnalysisItem({
  icon,
  title,
  content,
  color,
}: {
  icon: React.ReactNode
  title: string
  content: string
  color: string
}) {
  return (
    <div className="rounded-lg bg-bg-deep/50 p-4 border border-primary/10">
      <div className={cn('flex items-center gap-2 text-sm font-semibold mb-2', color)}>
        {icon}
        {title}
      </div>
      <p className="text-sm text-text-dim leading-relaxed">{content}</p>
    </div>
  )
}
