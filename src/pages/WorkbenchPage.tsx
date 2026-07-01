// 与善同行 - 社工工作台（核心业务总览）
import { Link } from 'react-router-dom'
import {
  Briefcase,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Wand2,
  Eye,
  Lock,
  ChevronRight,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  getWorkbenchStats,
  cases,
  alerts,
  aiAdvices,
  getClientById,
} from '@/data/socialWorker'
import { cn } from '@/lib/utils'

export default function WorkbenchPage() {
  const stats = getWorkbenchStats()
  const activeAlerts = alerts.filter((a) => !a.resolved).slice(0, 5)
  const recentCases = [...cases]
    .sort((a, b) => b.daysSinceLastFollowUp - a.daysSinceLastFollowUp)
    .slice(0, 6)
  const recentAdvices = aiAdvices.slice(0, 3)

  const stageLabel = {
    intake: '接案',
    assessment: '预估',
    planning: '计划',
    intervention: '介入',
    evaluation: '评估',
    closure: '结案',
  } as const

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 顶部欢迎区 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-accent-light" />
            社工工作台
          </h1>
          <p className="text-sm text-text-dim mt-1">今日工作总览 · 高效管理你的服务</p>
        </div>
        <Link to="/ai-advice">
          <Button variant="accent">
            <Wand2 className="h-4 w-4" />
            AI 智能建议
          </Button>
        </Link>
      </div>

      {/* 数据看板 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DataCard
          icon={<Users className="h-5 w-5" />}
          label="服务客户"
          value={stats.totalClients}
          sub="在册总数"
          color="primary"
        />
        <DataCard
          icon={<FileText className="h-5 w-5" />}
          label="进行中个案"
          value={stats.activeCases}
          sub={`共 ${stats.totalCases} 个案`}
          color="accent"
        />
        <DataCard
          icon={<AlertTriangle className="h-5 w-5" />}
          label="高风险个案"
          value={stats.highRiskCases}
          sub="需重点关注"
          color="warning"
        />
        <DataCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="待处理提醒"
          value={stats.activeAlerts}
          sub="建议尽快处理"
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 最近个案 */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  待跟进个案
                </CardTitle>
                <Link to="/cases">
                  <Button variant="ghost" size="sm">
                    查看全部
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <CardDescription>按未跟进天数排序，越久越需关注</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentCases.map((c) => {
                const client = getClientById(c.clientId)
                return (
                  <Link key={c.id} to={`/cases/${c.id}`}>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-primary/10 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer">
                      <div
                        className={cn(
                          'h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0',
                          c.riskLevel === 'high'
                            ? 'bg-red-500/20 text-red-400'
                            : c.riskLevel === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        )}
                      >
                        {client?.name[0] || '?'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-text truncate">{client?.name}</span>
                          <span className="text-xs text-text-dim flex-shrink-0">· {c.caseNo}</span>
                        </div>
                        <div className="text-xs text-text-dim truncate">{c.title}</div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div
                          className={cn(
                            'text-xs font-mono',
                            c.daysSinceLastFollowUp > 14
                              ? 'text-red-400'
                              : c.daysSinceLastFollowUp > 7
                              ? 'text-yellow-400'
                              : 'text-green-400'
                          )}
                        >
                          {c.daysSinceLastFollowUp === 0 ? '今日' : `${c.daysSinceLastFollowUp}天前`}
                        </div>
                        <div className="text-xs text-text-dim mt-0.5">
                          {stageLabel[c.stage]}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* 右侧：提醒 + AI 建议 */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  风险提醒
                </CardTitle>
                <Link to="/alerts">
                  <Button variant="ghost" size="sm">
                    全部
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {activeAlerts.length === 0 ? (
                <div className="text-center py-6 text-sm text-text-dim">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  暂无待处理提醒
                </div>
              ) : (
                activeAlerts.map((a) => (
                  <div
                    key={a.id}
                    className={cn(
                      'p-3 rounded-lg border text-xs',
                      a.level === 'high'
                        ? 'border-red-500/30 bg-red-500/5'
                        : 'border-yellow-500/30 bg-yellow-500/5'
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          a.level === 'high' ? 'bg-red-500' : 'bg-yellow-500'
                        )}
                      />
                      <span className="font-semibold text-text">{a.clientName}</span>
                      <span className="text-text-dim ml-auto">{a.triggeredAt?.split(' ')[0] || a.triggeredAt}</span>
                    </div>
                    <p className="text-text-dim">{a.title}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          <Card className="border-accent/30 bg-gradient-to-br from-accent/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-accent-light" />
                AI 个案建议
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {recentAdvices.map((a) => (
                <Link key={a.id} to="/ai-advice">
                  <div className="p-2.5 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer">
                    <div className="text-xs font-semibold text-text mb-1 line-clamp-1">
                      {a.title}
                    </div>
                    <div className="text-xs text-text-dim flex items-center gap-1">
                      <span>{a.clientName}</span>
                      <span>·</span>
                      <span className="text-accent-light">置信度 {a.confidence}%</span>
                    </div>
                  </div>
                </Link>
              ))}
              <Link to="/ai-advice">
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  查看全部 AI 建议
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 隐私保护提示 */}
      <Card className="bg-gradient-to-r from-green-500/5 via-transparent to-primary/5 border-green-500/20">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-text mb-1">隐私保护已启用</h4>
              <p className="text-sm text-text-dim leading-relaxed">
                所有敏感档案按 <span className="text-green-400">3 级</span> 分类保护，查看 2 级以上档案需二次确认并留痕。
                本月共产生 <span className="text-primary">17</span> 条访问记录，<span className="text-yellow-400">2</span> 条异常访问已标记。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function DataCard({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: number; sub: string; color: 'primary' | 'accent' | 'warning' | 'success' }) {
  const colorMap = {
    primary: { text: 'text-primary', bg: 'bg-primary/10' },
    accent: { text: 'text-accent-light', bg: 'bg-accent/10' },
    warning: { text: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    success: { text: 'text-green-400', bg: 'bg-green-400/10' },
  }
  const c = colorMap[color]
  return (
    <Card className="hover:scale-105 transition-transform">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
            {icon}
          </div>
        </div>
        <div className={`text-3xl font-bold ${c.text} glow-text`}>{value}</div>
        <div className="text-sm text-text mt-1">{label}</div>
        <div className="text-xs text-text-dim mt-0.5">{sub}</div>
      </CardContent>
    </Card>
  )
}
