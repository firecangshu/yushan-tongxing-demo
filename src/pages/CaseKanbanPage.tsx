// 与善同行 - 个案看板（按 6 阶段分组）
import { Link } from 'react-router-dom'
import {
  FileText,
  Clock,
  User,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Plus,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cases, getClientById, type CaseStage, type RiskLevel } from '@/data/socialWorker'
import { cn } from '@/lib/utils'

const stageConfig: Record<CaseStage, { label: string; color: string; desc: string }> = {
  intake: { label: '接案', color: 'border-blue-500/30 bg-blue-500/5 text-blue-400', desc: '建立关系、初步评估' },
  assessment: { label: '预估', color: 'border-purple-500/30 bg-purple-500/5 text-purple-400', desc: '深度评估、问题分析' },
  planning: { label: '计划', color: 'border-yellow-500/30 bg-yellow-500/5 text-yellow-400', desc: '制定服务计划' },
  intervention: { label: '介入', color: 'border-primary/30 bg-primary/5 text-primary', desc: '实施服务' },
  evaluation: { label: '评估', color: 'border-orange-500/30 bg-orange-500/5 text-orange-400', desc: '效果评估' },
  closure: { label: '结案', color: 'border-green-500/30 bg-green-500/5 text-green-400', desc: '总结归档' },
}

const stageOrder: CaseStage[] = ['intake', 'assessment', 'planning', 'intervention', 'evaluation', 'closure']

export default function CaseKanbanPage() {
  const grouped = stageOrder.reduce<Record<CaseStage, typeof cases>>((acc, stage) => {
    acc[stage] = cases.filter((c) => c.stage === stage)
    return acc
  }, {} as Record<CaseStage, typeof cases>)

  return (
    <div className="max-w-[1600px] mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
            <FileText className="h-6 w-6 text-accent-light" />
            个案看板
          </h1>
          <p className="text-sm text-text-dim mt-1">按 6 阶段流程管理个案 · 拖动流转（演示版）</p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          新建个案
        </Button>
      </div>

      {/* 看板 */}
      <div className="overflow-x-auto pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3 min-w-[1100px]">
          {stageOrder.map((stage) => {
            const config = stageConfig[stage]
            const stageCases = grouped[stage]
            return (
              <div key={stage} className="flex flex-col">
                {/* 列头 */}
                <div className={cn('rounded-t-lg border border-b-0 p-3', config.color)}>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{config.label}</h3>
                    <span className="text-xs font-mono opacity-80">{stageCases.length}</span>
                  </div>
                  <p className="text-xs opacity-70">{config.desc}</p>
                </div>

                {/* 卡片列表 */}
                <div className="flex-1 min-h-[400px] bg-bg-deep/30 border border-t-0 border-primary/10 rounded-b-lg p-2 space-y-2">
                  {stageCases.length === 0 ? (
                    <div className="text-center py-8 text-xs text-text-dim">
                      暂无个案
                    </div>
                  ) : (
                    stageCases.map((c) => (
                      <CaseCard key={c.id} caseId={c.id} />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 统计说明 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">流程说明</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-text-dim">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <span>个案从"接案"→"预估"→"计划"→"介入"→"评估"→"结案"6 阶段流转</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-400" />
              <span>超过 14 天未跟进自动触发风险提醒</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span>高风险个案需督导审批后才可结案</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CaseCard({ caseId }: { caseId: string }) {
  const c = cases.find((cs) => cs.id === caseId)
  if (!c) return null
  const client = getClientById(c.clientId)
  if (!client) return null

  const riskColor: Record<RiskLevel, string> = {
    low: 'border-green-500',
    medium: 'border-yellow-500',
    high: 'border-red-500',
  }
  const riskText: Record<RiskLevel, string> = {
    low: 'text-green-400',
    medium: 'text-yellow-400',
    high: 'text-red-400',
  }
  const riskLabel: Record<RiskLevel, string> = {
    low: '低',
    medium: '中',
    high: '高',
  }

  return (
    <Link to={`/cases/${c.id}`}>
      <div
        className={cn(
          'bg-bg-card rounded-lg p-3 border-l-4 border border-primary/10 hover:border-primary/40 transition-all cursor-pointer group',
          riskColor[c.riskLevel]
        )}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-text-dim font-mono">{c.caseNo}</span>
          <span className={cn('text-xs font-semibold', riskText[c.riskLevel])}>
            {riskLabel[c.riskLevel]}风险
          </span>
        </div>
        <h4 className="text-sm font-semibold text-text mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {c.title}
        </h4>
        <div className="flex items-center gap-1 text-xs text-text-dim mb-2">
          <User className="h-3 w-3" />
          <span>{client.name}</span>
          <span>·</span>
          <span>{client.age}岁</span>
        </div>
        <div className="flex items-center justify-between text-xs text-text-dim">
          <span>{c.socialWorker}</span>
          <span
            className={cn(
              c.daysSinceLastFollowUp > 14
                ? 'text-red-400 font-semibold'
                : c.daysSinceLastFollowUp > 7
                ? 'text-yellow-400'
                : 'text-green-400'
            )}
          >
            {c.daysSinceLastFollowUp === 0 ? '今日' : `${c.daysSinceLastFollowUp}天前`}
          </span>
        </div>
        {/* 进度条 */}
        <div className="mt-2 h-1 bg-bg-deep rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent"
            style={{ width: `${c.progress}%` }}
          />
        </div>
      </div>
    </Link>
  )
}
