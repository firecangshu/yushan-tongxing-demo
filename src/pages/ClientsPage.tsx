// 与善同行 - 客户管理页
import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Search,
  Lock,
  Eye,
  ShieldAlert,
  User,
  Phone,
  MapPin,
  AlertCircle,
  FileText,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { clients, getCasesByClientId, type Client, type CaseCategory, type RiskLevel } from '@/data/socialWorker'
import { cn } from '@/lib/utils'

const categoryLabel: Record<CaseCategory, string> = {
  elderly: '老年人',
  child: '儿童',
  youth: '青少年',
  family: '家庭',
  disability: '残障',
  mental: '精神',
  community: '社区',
}

const riskColor = {
  low: { text: 'text-green-400', bg: 'bg-green-500/10', label: '低风险' },
  medium: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', label: '中风险' },
  high: { text: 'text-red-400', bg: 'bg-red-500/10', label: '高风险' },
} as const

const privacyLabel = {
  1: { text: 'text-green-400', label: '普通', icon: '🔓' },
  2: { text: 'text-yellow-400', label: '敏感', icon: '🔒' },
  3: { text: 'text-red-400', label: '高度敏感', icon: '🔐' },
} as const

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<CaseCategory | 'all'>('all')
  const [riskFilter, setRiskFilter] = useState<RiskLevel | 'all'>('all')
  const [privacyFilter, setPrivacyFilter] = useState<1 | 2 | 3 | 'all'>('all')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const filtered = useMemo(() => {
    return clients.filter((c) => {
      if (search && !c.name.includes(search) && !c.mainIssue.includes(search)) return false
      if (categoryFilter !== 'all' && c.category !== categoryFilter) return false
      if (riskFilter !== 'all' && c.riskLevel !== riskFilter) return false
      if (privacyFilter !== 'all' && c.privacyLevel !== privacyFilter) return false
      return true
    })
  }, [search, categoryFilter, riskFilter, privacyFilter])

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text glow-text flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          客户管理
        </h1>
        <p className="text-sm text-text-dim mt-1">在册服务对象 · 按风险等级和隐私分级管理</p>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardContent className="pt-6 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索姓名或问题关键词..."
              className="w-full pl-10 pr-4 py-2 bg-bg-deep border border-primary/20 rounded-lg text-text placeholder:text-text-dim focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={categoryFilter === 'all'}
              onClick={() => setCategoryFilter('all')}
              label="全部类型"
            />
            {(Object.keys(categoryLabel) as CaseCategory[]).map((cat) => (
              <FilterChip
                key={cat}
                active={categoryFilter === cat}
                onClick={() => setCategoryFilter(cat)}
                label={categoryLabel[cat]}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={riskFilter === 'all'}
              onClick={() => setRiskFilter('all')}
              label="全部风险"
            />
            <FilterChip
              active={riskFilter === 'high'}
              onClick={() => setRiskFilter('high')}
              label="高风险"
              color="red"
            />
            <FilterChip
              active={riskFilter === 'medium'}
              onClick={() => setRiskFilter('medium')}
              label="中风险"
              color="yellow"
            />
            <FilterChip
              active={riskFilter === 'low'}
              onClick={() => setRiskFilter('low')}
              label="低风险"
              color="green"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip
              active={privacyFilter === 'all'}
              onClick={() => setPrivacyFilter('all')}
              label="全部隐私"
            />
            <FilterChip
              active={privacyFilter === 1}
              onClick={() => setPrivacyFilter(1)}
              label="🔓 普通"
            />
            <FilterChip
              active={privacyFilter === 2}
              onClick={() => setPrivacyFilter(2)}
              label="🔒 敏感"
              color="yellow"
            />
            <FilterChip
              active={privacyFilter === 3}
              onClick={() => setPrivacyFilter(3)}
              label="🔐 高度敏感"
              color="red"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-text-dim">
        共 <span className="text-primary font-semibold">{filtered.length}</span> 位客户
      </div>

      {/* 客户列表 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c) => {
          const clientCases = getCasesByClientId(c.id)
          return (
            <Card
              key={c.id}
              className="hover:border-primary/40 hover:scale-[1.02] transition-all cursor-pointer"
              onClick={() => setSelectedClient(c)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className={cn(
                      'h-12 w-12 rounded-full flex items-center justify-center font-semibold flex-shrink-0',
                      c.gender === '女' ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'
                    )}
                  >
                    {c.name[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-text">{c.name}</h3>
                      <span className="text-xs text-text-dim">{c.gender} · {c.age}岁</span>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={cn('text-xs px-2 py-0.5 rounded', riskColor[c.riskLevel].bg, riskColor[c.riskLevel].text)}>
                        {riskColor[c.riskLevel].label}
                      </span>
                      <span className="text-xs text-text-dim">
                        {privacyLabel[c.privacyLevel].icon} {privacyLabel[c.privacyLevel].label}
                      </span>
                      <span className="text-xs text-text-dim">
                        {categoryLabel[c.category]}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-text-dim line-clamp-2 mb-3">{c.mainIssue}</p>
                <div className="text-xs text-text-dim flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <FileText className="h-3 w-3" />
                    {clientCases.length} 个案
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {c.address.split(' ')[0]}
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* 客户详情弹窗 */}
      {selectedClient && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setSelectedClient(null)}
        >
          <Card
            className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold',
                      selectedClient.gender === '女' ? 'bg-pink-500/20 text-pink-400' : 'bg-blue-500/20 text-blue-400'
                    )}
                  >
                    {selectedClient.name[0]}
                  </div>
                  <div>
                    <CardTitle className="text-xl">{selectedClient.name}</CardTitle>
                    <CardDescription>
                      {selectedClient.gender} · {selectedClient.age}岁 · {categoryLabel[selectedClient.category]}
                    </CardDescription>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setSelectedClient(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedClient.privacyLevel >= 2 && (
                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3 flex items-start gap-2">
                  <Lock className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-yellow-400">
                    <strong>隐私保护提示</strong>：该客户档案为{privacyLabel[selectedClient.privacyLevel].label}级别，查看完整信息已记录到审计日志。
                  </div>
                </div>
              )}

              <InfoRow icon={<AlertCircle className="h-4 w-4" />} label="主要困难" value={selectedClient.mainIssue} />
              <InfoRow icon={<User className="h-4 w-4" />} label="性别 / 年龄" value={`${selectedClient.gender} / ${selectedClient.age}岁`} />
              <InfoRow icon={<Phone className="h-4 w-4" />} label="联系电话" value={selectedClient.phone} />
              <InfoRow icon={<MapPin className="h-4 w-4" />} label="居住地址" value={selectedClient.address} />
              <InfoRow icon={<User className="h-4 w-4" />} label="紧急联系人" value={selectedClient.emergencyContact} />
              <InfoRow icon={<ShieldAlert className="h-4 w-4" />} label="风险等级" value={riskColor[selectedClient.riskLevel].label} />
              <InfoRow icon={<Lock className="h-4 w-4" />} label="隐私保护" value={privacyLabel[selectedClient.privacyLevel].label} />
              <InfoRow icon={<User className="h-4 w-4" />} label="登记日期" value={selectedClient.registeredAt} />

              {/* 关联个案 */}
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">关联个案</h4>
                {getCasesByClientId(selectedClient.id).length === 0 ? (
                  <p className="text-sm text-text-dim">暂无个案</p>
                ) : (
                  <div className="space-y-2">
                    {getCasesByClientId(selectedClient.id).map((cs) => (
                      <Link to={`/cases/${cs.id}`} key={cs.id}>
                        <div className="p-3 rounded-lg border border-primary/20 hover:border-primary/40 transition-colors">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="text-sm font-semibold text-text">{cs.title}</div>
                              <div className="text-xs text-text-dim mt-1">{cs.caseNo}</div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                              查看
                            </Button>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

function FilterChip({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color?: 'red' | 'yellow' | 'green' }) {
  const colorMap = {
    red: 'border-red-500/50 text-red-400',
    yellow: 'border-yellow-500/50 text-yellow-400',
    green: 'border-green-500/50 text-green-400',
  } as const
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 text-xs rounded-full border transition-all',
        active
          ? 'bg-primary text-bg border-primary'
          : color
          ? colorMap[color]
          : 'border-primary/20 text-text-dim hover:border-primary/40'
      )}
    >
      {label}
    </button>
  )
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="text-text-dim mt-0.5">{icon}</div>
      <div className="flex-1">
        <div className="text-text-dim text-xs mb-0.5">{label}</div>
        <div className="text-text">{value}</div>
      </div>
    </div>
  )
}
