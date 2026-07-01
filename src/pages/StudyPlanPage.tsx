// 与善同行 - 学习计划页（科学备考规划）
import { useState, useEffect } from 'react'
import {
  Calendar,
  Target,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  TrendingUp,
  Award,
  Brain,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { questions } from '@/data/questions'

interface PlanTask {
  id: string
  date: string
  title: string
  description: string
  duration: number // 分钟
  category: '综合能力' | '实务' | '法规' | '模考' | '复习'
  completed: boolean
  questionIds?: number[]
}

const PLAN_KEY = 'yushan_study_plan'

const defaultPlan: PlanTask[] = [
  // 第 1 周
  { id: 't1', date: '今天', title: '社会工作价值观与伦理', description: '完成核心价值观 8 道题 + 伦理决策 4 道题', duration: 60, category: '综合能力', completed: false, questionIds: [1, 11, 12, 17, 22, 38] },
  { id: 't2', date: '今天', title: '个案工作方法精讲', description: '建立关系 + 评估 + 介入技巧', duration: 45, category: '实务', completed: false, questionIds: [2, 18, 30] },
  // 第 2 周
  { id: 't3', date: '明天', title: '小组工作与社区工作', description: '小组发展阶段 + 三大社区工作模式', duration: 60, category: '实务', completed: false, questionIds: [6, 16, 31, 37] },
  { id: 't4', date: '明天', title: '政策法规专项突破', description: '社会救助 + 未保 + 老年权益', duration: 50, category: '法规', completed: false, questionIds: [4, 7, 14, 29, 32, 40, 44, 49] },
  // 第 3 周
  { id: 't5', date: '后天', title: '理论流派与模型', description: '生态系统 + 优势视角 + 认知行为 + 增能', duration: 60, category: '综合能力', completed: false, questionIds: [9, 12, 26, 30, 38, 43] },
  { id: 't6', date: '后天', title: '服务对象专项', description: '老年 + 儿童 + 青少年 + 残障 + 精神 + 家庭', duration: 75, category: '实务', completed: false, questionIds: [10, 13, 24, 27, 28, 34, 39, 45] },
  // 第 4 周
  { id: 't7', date: '本周', title: '错题本复盘', description: '重做所有错题，理解 AI 解析', duration: 45, category: '复习', completed: false },
  { id: 't8', date: '本周', title: '模拟考试（30 分钟）', description: '限时模考，体验真实考试节奏', duration: 30, category: '模考', completed: false },
  { id: 't9', date: '本周', title: '专业方法与督导', description: '三大方法 + 督导功能 + 评估', duration: 60, category: '综合能力', completed: false, questionIds: [3, 20, 35, 41, 46] },
  { id: 't10', date: '本周', title: '研究方法与循证实践', description: '定量定性 + 扎根理论 + 行动研究', duration: 45, category: '综合能力', completed: false, questionIds: [33, 48, 50] },
]

export default function StudyPlanPage() {
  const [plan, setPlan] = useState<PlanTask[]>(defaultPlan)
  const [stats, setStats] = useState({ completed: 0, totalTime: 0, todayTasks: 0 })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(PLAN_KEY)
      if (stored) {
        setPlan(JSON.parse(stored))
      }
    } catch (e) {
      console.warn('读取学习计划失败', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(PLAN_KEY, JSON.stringify(plan))
    } catch (e) {
      console.warn('保存学习计划失败', e)
    }
    // 计算统计
    const completed = plan.filter((t) => t.completed).length
    const totalTime = plan.filter((t) => t.completed).reduce((s, t) => s + t.duration, 0)
    const todayTasks = plan.filter((t) => t.date === '今天').length
    setStats({ completed, totalTime, todayTasks })
  }, [plan])

  const toggleTask = (id: string) => {
    setPlan((p) => p.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const groupByDate = plan.reduce<Record<string, PlanTask[]>>((acc, t) => {
    if (!acc[t.date]) acc[t.date] = []
    acc[t.date].push(t)
    return acc
  }, {})

  const categoryColor = {
    '综合能力': 'text-primary border-primary/30 bg-primary/5',
    '实务': 'text-accent-light border-accent/30 bg-accent/5',
    '法规': 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
    '模考': 'text-red-400 border-red-400/30 bg-red-400/5',
    '复习': 'text-green-400 border-green-400/30 bg-green-400/5',
  } as const

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
          <Calendar className="h-6 w-6 text-primary" />
          学习计划
        </h1>
        <p className="text-sm text-text-dim mt-1">科学规划备考路径，循序渐进</p>
      </div>

      {/* 概览统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={<Target className="h-5 w-5" />} label="总任务" value={String(plan.length)} color="primary" />
        <StatCard icon={<CheckCircle2 className="h-5 w-5" />} label="已完成" value={String(stats.completed)} color="green" />
        <StatCard icon={<Clock className="h-5 w-5" />} label="累计时长" value={`${stats.totalTime}分钟`} color="accent" />
        <StatCard icon={<TrendingUp className="h-5 w-5" />} label="今日任务" value={String(stats.todayTasks)} color="warning" />
      </div>

      {/* 学习目标 */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            30 天备考目标
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <GoalItem
              icon={<Brain className="h-4 w-4" />}
              title="掌握核心考点"
              desc="完成 50 道精选真题 + AI 解析"
            />
            <GoalItem
              icon={<Target className="h-4 w-4" />}
              title="模拟卷 60+ 分"
              desc="限时模考达到及格线"
            />
            <GoalItem
              icon={<CheckCircle2 className="h-4 w-4" />}
              title="错题清零"
              desc="所有错题都能理解掌握"
            />
          </div>
        </CardContent>
      </Card>

      {/* 学习任务列表 */}
      <div className="space-y-6">
        {Object.entries(groupByDate).map(([date, tasks]) => (
          <div key={date}>
            <h3 className="text-sm font-semibold text-text-dim uppercase tracking-wider mb-3 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {date} · {tasks.filter((t) => t.completed).length} / {tasks.length} 已完成
            </h3>
            <div className="space-y-2">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className={cn(
                    'transition-all cursor-pointer hover:border-primary/40',
                    task.completed && 'opacity-60'
                  )}
                  onClick={() => toggleTask(task.id)}
                >
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3">
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 text-text-dim flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className={cn('font-semibold', task.completed ? 'text-text-dim line-through' : 'text-text')}>
                            {task.title}
                          </h4>
                          <span
                            className={cn(
                              'text-xs px-2 py-0.5 rounded border',
                              categoryColor[task.category]
                            )}
                          >
                            {task.category}
                          </span>
                          <span className="text-xs text-text-dim flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.duration} 分钟
                          </span>
                        </div>
                        <p className="text-sm text-text-dim">{task.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 备考策略建议 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            备考策略
          </CardTitle>
          <CardDescription>由 AI 智能分析你的学习进度，动态调整</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-text-dim">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">▸</span>
              <span><strong className="text-text">基础阶段（前 2 周）</strong>：按模块系统学习，建立知识框架</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">▸</span>
              <span><strong className="text-text">强化阶段（3 周）</strong>：专题突破 + 错题复盘</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">▸</span>
              <span><strong className="text-text">冲刺阶段（最后 1 周）</strong>：模拟考试 + 查漏补缺</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: 'primary' | 'green' | 'accent' | 'warning' }) {
  const colorMap = {
    primary: 'text-primary',
    green: 'text-green-400',
    accent: 'text-accent-light',
    warning: 'text-yellow-400',
  }
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <div className={colorMap[color]}>{icon}</div>
          <div>
            <div className="text-xl font-bold text-text">{value}</div>
            <div className="text-xs text-text-dim">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GoalItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="text-primary mt-0.5">{icon}</div>
      <div>
        <div className="font-semibold text-text">{title}</div>
        <div className="text-xs text-text-dim">{desc}</div>
      </div>
    </div>
  )
}
