// 与善同行 - 错题本页（基于 localStorage 错题本）
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Lightbulb,
  Heart,
  Trash2,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getQuestionById } from '@/data/questions'
import type { Question } from '@/types'
import { cn } from '@/lib/utils'

const WRONG_BOOK_KEY = 'yushan_wrong_book'
const HISTORY_KEY = 'yushan_quiz_history'

interface QuizHistory {
  questionId: number
  isCorrect: boolean
  answeredAt: number
}

export default function WrongBookPage() {
  const [wrongIds, setWrongIds] = useState<number[]>([])
  const [history, setHistory] = useState<QuizHistory[]>([])
  const [activeTab, setActiveTab] = useState<'wrong' | 'all'>('wrong')

  useEffect(() => {
    try {
      const wrong = localStorage.getItem(WRONG_BOOK_KEY)
      if (wrong) setWrongIds(JSON.parse(wrong))
      const hist = localStorage.getItem(HISTORY_KEY)
      if (hist) setHistory(JSON.parse(hist))
    } catch (e) {
      console.warn('读取本地数据失败', e)
    }
  }, [])

  const wrongQuestions: Question[] = wrongIds
    .map((id) => getQuestionById(id))
    .filter((q): q is Question => Boolean(q))

  const allHistoryQuestions: { question: Question; record: QuizHistory }[] = history
    .map((h) => ({ question: getQuestionById(h.questionId), record: h }))
    .filter((item): item is { question: Question; record: QuizHistory } => Boolean(item.question))

  const removeFromWrongBook = (id: number) => {
    const next = wrongIds.filter((i) => i !== id)
    setWrongIds(next)
    localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify(next))
  }

  const clearWrongBook = () => {
    if (!confirm('确定清空所有错题？')) return
    setWrongIds([])
    localStorage.setItem(WRONG_BOOK_KEY, JSON.stringify([]))
  }

  // 统计
  const stats = {
    wrongCount: wrongIds.length,
    totalHistory: history.length,
    correctRate:
      history.length > 0
        ? Math.round((history.filter((h) => h.isCorrect).length / history.length) * 100)
        : 0,
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-primary" />
            错题本
          </h1>
          <p className="text-sm text-text-dim mt-1">智能复盘，重点攻克薄弱点</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/quiz">
            <Button variant="outline">
              <RotateCcw className="h-4 w-4" />
              继续练习
            </Button>
          </Link>
          {wrongIds.length > 0 && (
            <Button variant="ghost" onClick={clearWrongBook}>
              <Trash2 className="h-4 w-4" />
              清空
            </Button>
          )}
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<Heart className="h-5 w-5" />}
          label="错题数"
          value={String(stats.wrongCount)}
          color="red"
        />
        <StatCard
          icon={<BookOpen className="h-5 w-5" />}
          label="总练习题数"
          value={String(stats.totalHistory)}
          color="primary"
        />
        <StatCard
          icon={<CheckCircle2 className="h-5 w-5" />}
          label="历史正确率"
          value={stats.totalHistory > 0 ? `${stats.correctRate}%` : '--'}
          color="green"
        />
      </div>

      {/* Tab 切换 */}
      <div className="flex border-b border-primary/20">
        <button
          onClick={() => setActiveTab('wrong')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-all',
            activeTab === 'wrong'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-dim hover:text-text'
          )}
        >
          <Heart className="inline h-4 w-4 mr-1" />
          错题列表 ({wrongIds.length})
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={cn(
            'px-4 py-2 text-sm font-medium border-b-2 transition-all',
            activeTab === 'all'
              ? 'border-primary text-primary'
              : 'border-transparent text-text-dim hover:text-text'
          )}
        >
          <BookOpen className="inline h-4 w-4 mr-1" />
          练习记录 ({history.length})
        </button>
      </div>

      {/* 错题列表 */}
      {activeTab === 'wrong' &&
        (wrongQuestions.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <CheckCircle2 className="h-16 w-16 mx-auto text-green-500 mb-4" />
              <h3 className="text-lg font-semibold text-text mb-2">错题本是空的</h3>
              <p className="text-sm text-text-dim mb-6">
                还没做错题目，或者已经全部掌握啦！
              </p>
              <Link to="/quiz">
                <Button>
                  <BookOpen className="h-4 w-4" />
                  开始练习
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {wrongQuestions.map((q, i) => (
              <Card key={q.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-text-dim">错题 #{i + 1}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-primary/10 text-primary">
                          {q.category}
                        </span>
                      </div>
                      <CardTitle className="text-base leading-relaxed">{q.stem}</CardTitle>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFromWrongBook(q.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-xs text-text-dim">
                    <span className="text-green-400">正确答案：{q.answer.join('、')}</span>
                  </div>
                  <div className="rounded bg-bg-deep/50 p-3 border border-primary/10">
                    <div className="flex items-center gap-2 text-sm font-semibold text-primary mb-1">
                      <Lightbulb className="h-4 w-4" />
                      AI 提示
                    </div>
                    <p className="text-sm text-text-dim leading-relaxed">
                      {q.aiAnalysis.commonMistake}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}

      {/* 练习记录 */}
      {activeTab === 'all' &&
        (allHistoryQuestions.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <BookOpen className="h-16 w-16 mx-auto text-text-dim mb-4" />
              <h3 className="text-lg font-semibold text-text mb-2">还没有练习记录</h3>
              <p className="text-sm text-text-dim mb-6">去 AI 题库开始你的第一次练习吧</p>
              <Link to="/quiz">
                <Button>开始练习</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {allHistoryQuestions
              .sort((a, b) => b.record.answeredAt - a.record.answeredAt)
              .slice(0, 50)
              .map(({ question, record }) => (
                <Card key={question.id + record.answeredAt} className="py-3">
                  <CardContent className="pt-0 flex items-center gap-3">
                    {record.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-text truncate">{question.stem}</div>
                      <div className="text-xs text-text-dim mt-1">
                        {question.category} · {new Date(record.answeredAt).toLocaleString('zh-CN')}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ))}
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'red' | 'primary' | 'green' }) {
  const colorMap = {
    red: 'text-red-400',
    primary: 'text-primary',
    green: 'text-green-400',
  }
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={colorMap[color]}>{icon}</div>
          <div>
            <div className="text-2xl font-bold text-text">{value}</div>
            <div className="text-xs text-text-dim">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
