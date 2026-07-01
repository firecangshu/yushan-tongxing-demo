// 与善同行 - AI 个案建议页
import { useState } from 'react'
import {
  Wand2,
  Sparkles,
  Brain,
  CheckCircle2,
  Target,
  Lightbulb,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { aiAdvices } from '@/data/socialWorker'
import { cn } from '@/lib/utils'

const typeLabel = {
  assessment: { label: '评估分析', icon: '📊', color: 'primary' },
  intervention: { label: '介入建议', icon: '🎯', color: 'accent' },
  resource: { label: '资源链接', icon: '🔗', color: 'success' },
  risk: { label: '风险预警', icon: '⚠️', color: 'warning' },
} as const

const typeColor = {
  primary: 'border-primary/30 bg-primary/5 text-primary',
  accent: 'border-accent/30 bg-accent/5 text-accent-light',
  success: 'border-green-500/30 bg-green-500/5 text-green-400',
  warning: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400',
} as const

export default function AIAdvicePage() {
  const [selectedId, setSelectedId] = useState(aiAdvices[0]?.id)
  const selected = aiAdvices.find((a) => a.id === selectedId)

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-accent-light" />
          AI 个案建议
        </h1>
        <p className="text-sm text-text-dim mt-1">智能分析 · 辅助决策 · 资源精准匹配</p>
      </div>

      {/* AI 能力介绍 */}
      <Card className="bg-gradient-to-br from-accent/5 via-primary/5 to-transparent border-accent/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent-light flex-shrink-0">
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-text mb-1">AI 智能分析引擎</h3>
              <p className="text-sm text-text-dim leading-relaxed">
                基于 10 年+ 社工实务案例库 + 政策法规 + 循证研究证据，
                为每个个案提供评估分析、介入建议、资源链接、风险预警 4 类智能辅助。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左侧：建议列表 */}
        <div className="space-y-2">
          <div className="text-sm text-text-dim px-2">
            共 <span className="text-accent-light font-semibold">{aiAdvices.length}</span> 条 AI 建议
          </div>
          {aiAdvices.map((a) => {
            const t = typeLabel[a.type]
            const isSelected = a.id === selectedId
            return (
              <button
                key={a.id}
                onClick={() => setSelectedId(a.id)}
                className={cn(
                  'w-full text-left p-4 rounded-lg border transition-all',
                  isSelected
                    ? 'border-accent bg-accent/10 shadow-glow-accent'
                    : 'border-primary/10 bg-card-gradient hover:border-primary/30'
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn('text-xs px-2 py-0.5 rounded border', typeColor[t.color])}>
                    {t.icon} {t.label}
                  </span>
                  <span className="text-xs text-text-dim">{a.clientName}</span>
                </div>
                <h4 className={cn(
                  'text-sm font-semibold mb-1',
                  isSelected ? 'text-accent-light' : 'text-text'
                )}>
                  {a.title}
                </h4>
                <div className="flex items-center justify-between text-xs text-text-dim">
                  <span>置信度 {a.confidence}%</span>
                  <ChevronRight className={cn('h-3 w-3', isSelected && 'text-accent-light')} />
                </div>
              </button>
            )
          })}
        </div>

        {/* 右侧：详情 */}
        <div className="lg:col-span-2">
          {selected ? (
            <Card className="sticky top-20">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className={cn('text-xs px-2 py-0.5 rounded border', typeColor[typeLabel[selected.type].color])}>
                    {typeLabel[selected.type].icon} {typeLabel[selected.type].label}
                  </span>
                  <span className="text-xs text-text-dim">{selected.clientName}</span>
                  <span className="text-xs text-text-dim ml-auto">
                    {selected.generatedAt}
                  </span>
                </div>
                <CardTitle className="text-xl">{selected.title}</CardTitle>
                <div className="flex items-center gap-2 text-xs text-text-dim">
                  <Sparkles className="h-3 w-3 text-accent-light" />
                  <span>AI 置信度：<span className="text-accent-light font-semibold">{selected.confidence}%</span></span>
                </div>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* 主要内容 */}
                <div className="rounded-lg bg-bg-deep/50 p-4 border border-accent/10">
                  <div className="flex items-center gap-2 text-sm font-semibold text-accent-light mb-2">
                    <Target className="h-4 w-4" />
                    综合建议
                  </div>
                  <p className="text-text leading-relaxed">{selected.content}</p>
                </div>

                {/* 关键建议点 */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3">
                    <Lightbulb className="h-4 w-4 text-primary" />
                    关键建议点
                  </div>
                  <div className="space-y-2">
                    {selected.keyPoints.map((p, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-3 rounded-lg bg-primary/5 border border-primary/10"
                      >
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-bg text-xs font-semibold">
                          {i + 1}
                        </div>
                        <p className="text-sm text-text leading-relaxed">{p}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 推荐资源 */}
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-text mb-3">
                    <Sparkles className="h-4 w-4 text-accent-light" />
                    推荐资源
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selected.resources.map((r, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-accent/20 bg-accent/5 hover:border-accent/40 transition-colors"
                      >
                        <div className="text-sm font-semibold text-text">{r.name}</div>
                        <div className="text-xs text-text-dim mt-1">{r.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-2 pt-2">
                  <Button className="flex-1">
                    <CheckCircle2 className="h-4 w-4" />
                    采纳建议
                  </Button>
                  <Button variant="outline" className="flex-1">
                    反馈调整
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  )
}
