// 与善同行 - 考生端 Hub 页面
// 承载考生 5 步逻辑线：考生端 → AI 题库 → 错题本 → 模拟考试 → 学习计划
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  GraduationCap,
  Brain,
  Heart,
  FileText,
  Calendar,
  CheckCircle2,
  Sparkles,
  Target,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// 5 步逻辑线（白话：从进考生门开始，到完成备考的 5 步）
const steps = [
  { icon: <GraduationCap className="h-5 w-5" />, label: '考生端', desc: '当前所在', path: '/student', current: true },
  { icon: <Brain className="h-5 w-5" />, label: 'AI 题库练习', desc: '50 道真题 + 5 维解析', path: '/quiz' },
  { icon: <Heart className="h-5 w-5" />, label: '错题本复盘', desc: '智能收藏 · 重点突破', path: '/wrong-book' },
  { icon: <FileText className="h-5 w-5" />, label: '模拟考试', desc: '限时模考 · 评估水平', path: '/exam' },
  { icon: <Calendar className="h-5 w-5" />, label: '学习计划', desc: '30 天备考路径', path: '/study-plan' },
]

// 4 个核心功能卡片
const quickCards = [
  {
    to: '/quiz',
    icon: <Brain className="h-6 w-6" />,
    title: 'AI 智能题库',
    desc: '50 道精选真题，每题配 5 维 AI 解析（答案/知识点/真实案例/常见误区/关联点）',
    color: 'primary' as const,
    badge: '50 题',
  },
  {
    to: '/wrong-book',
    icon: <Heart className="h-6 w-6" />,
    title: '错题本',
    desc: '自动收藏错题 + 练习记录双 tab，薄弱点逐一击破',
    color: 'warning' as const,
    badge: '智能复盘',
  },
  {
    to: '/exam',
    icon: <FileText className="h-6 w-6" />,
    title: '模拟试卷',
    desc: '3 套完整试卷，倒计时 + 答题卡 + 成绩单，体验真实考试',
    color: 'accent' as const,
    badge: '3 套',
  },
  {
    to: '/study-plan',
    icon: <Calendar className="h-6 w-6" />,
    title: '学习计划',
    desc: '30 天科学备考路径，10 个任务按日期分组，每日任务清晰',
    color: 'success' as const,
    badge: '30 天',
  },
]

export default function StudentHubPage() {
  return (
    <div className="space-y-12">
      {/* ===== 1. Hub Hero ===== */}
      <section className="relative pt-4 pb-2 text-center">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-sm text-primary">
            <GraduationCap className="h-4 w-4" />
            <span>考生端 · 学习备考中心</span>
          </div>
          <h1 className="mb-3 text-3xl font-bold leading-tight text-text md:text-5xl">
            <span className="glow-text">5 步搞定社工备考</span>
          </h1>
          <p className="text-sm md:text-base text-text-dim">
            从 AI 题库到学习计划，一站式闭环路径
          </p>
        </div>
      </section>

      {/* ===== 2. 5 步逻辑线（流程图） ===== */}
      <section>
        <Card className="bg-gradient-to-r from-primary/5 via-transparent to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between gap-1 overflow-x-auto pb-2">
              {steps.map((s, i) => (
                <div key={i} className="flex items-center flex-shrink-0">
                  <Link
                    to={s.path}
                    className={cn('group', s.current && 'pointer-events-none')}
                  >
                    <div className="flex flex-col items-center min-w-[100px]">
                      <div
                        className={cn(
                          'flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all',
                          s.current
                            ? 'bg-primary text-bg border-primary shadow-glow-primary'
                            : 'bg-primary/20 text-primary border-primary/40 group-hover:bg-primary group-hover:text-bg group-hover:scale-110'
                        )}
                      >
                        {s.current ? <CheckCircle2 className="h-5 w-5" /> : s.icon}
                      </div>
                      <div className="text-xs font-semibold text-text mt-2 whitespace-nowrap">
                        {s.label}
                      </div>
                      <div className="text-[10px] text-text-dim mt-0.5 whitespace-nowrap">
                        {s.desc}
                      </div>
                    </div>
                  </Link>
                  {i < steps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-primary/40 mx-1 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ===== 3. 4 个核心功能 QuickCard ===== */}
      <section>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-text mb-2">
            <span className="glow-text">核心功能</span>
          </h2>
          <p className="text-sm text-text-dim">点击任意卡片直接进入对应功能</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickCards.map((card) => (
            <QuickCard key={card.to} {...card} />
          ))}
        </div>
      </section>

      {/* ===== 4. 快速开始 CTA ===== */}
      <section className="text-center pb-8">
        <Link to="/quiz">
          <Button size="lg" className="gap-2 shadow-glow-primary">
            <Sparkles className="h-5 w-5" />
            从 AI 题库开始
            <ArrowRight className="h-5 w-5" />
          </Button>
        </Link>
        <p className="text-xs text-text-dim mt-3">建议从「AI 题库」起步，逐项通关</p>
      </section>
    </div>
  )
}

// ===== QuickCard 组件 =====
function QuickCard({
  to,
  icon,
  title,
  desc,
  color,
  badge,
}: {
  to: string
  icon: React.ReactNode
  title: string
  desc: string
  color: 'primary' | 'accent' | 'warning' | 'success'
  badge: string
}) {
  // 不同颜色对应不同边框 + 文字（白话：让卡片看起来不单调）
  const colorMap = {
    primary: { text: 'text-primary', border: 'border-primary/30', glow: 'shadow-glow-primary' },
    accent: { text: 'text-accent-light', border: 'border-accent/30', glow: 'shadow-glow-accent' },
    warning: { text: 'text-yellow-400', border: 'border-yellow-400/30', glow: '' },
    success: { text: 'text-green-400', border: 'border-green-400/30', glow: '' },
  }
  const c = colorMap[color]
  return (
    <Link to={to} className="group block h-full">
      <Card className={cn('h-full cursor-pointer transition-all hover:scale-[1.03] hover:border-opacity-100', c.border, c.glow, 'group-hover:border-opacity-100')}>
        <CardContent className="pt-6 h-full flex flex-col">
          <div className="flex items-start justify-between mb-3">
            <div className={cn('flex h-11 w-11 items-center justify-center rounded-lg bg-bg-card/50', c.text)}>
              {icon}
            </div>
            <span className={cn('text-[10px] px-2 py-0.5 rounded-full border', c.border, c.text)}>
              {badge}
            </span>
          </div>
          <h3 className={cn('text-base font-bold mb-1.5', c.text)}>{title}</h3>
          <p className="text-xs text-text-dim leading-relaxed flex-1">{desc}</p>
          <div className={cn('mt-3 flex items-center gap-1 text-xs font-medium', c.text)}>
            <Target className="h-3 w-3" />
            <span>立即开始</span>
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
