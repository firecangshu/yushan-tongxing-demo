// 与善同行 - 社工端数据（客户、个案、风险、AI建议）
// 全部由 TRAE 静态生成
export type RiskLevel = 'low' | 'medium' | 'high'
export type CaseStage = 'intake' | 'assessment' | 'planning' | 'intervention' | 'evaluation' | 'closure'
export type CaseCategory = 'elderly' | 'child' | 'youth' | 'family' | 'disability' | 'mental' | 'community'

export interface Client {
  id: string
  /** 姓名 */
  name: string
  /** 性别 */
  gender: '男' | '女'
  /** 年龄 */
  age: number
  /** 联系电话 */
  phone: string
  /** 居住地址 */
  address: string
  /** 服务对象类型 */
  category: CaseCategory
  /** 主要困难 */
  mainIssue: string
  /** 风险等级 */
  riskLevel: RiskLevel
  /** 紧急联系人 */
  emergencyContact: string
  /** 登记日期 */
  registeredAt: string
  /** 隐私保护等级：1-普通 2-敏感 3-高度敏感 */
  privacyLevel: 1 | 2 | 3
}

export interface ServiceCase {
  id: string
  caseNo: string
  /** 关联客户 ID */
  clientId: string
  /** 个案名称 */
  title: string
  /** 案例类别 */
  category: CaseCategory
  /** 当前阶段 */
  stage: CaseStage
  /** 风险等级 */
  riskLevel: RiskLevel
  /** 负责社工 */
  socialWorker: string
  /** 负责督导 */
  supervisor: string
  /** 接案日期 */
  openedAt: string
  /** 最后跟进日期 */
  lastFollowUp: string
  /** 距上次跟进天数（用于风险判断） */
  daysSinceLastFollowUp: number
  /** 跟进次数 */
  followUpCount: number
  /** 案例简介 */
  summary: string
  /** 计划完成度 0-100 */
  progress: number
}

export interface RiskAlert {
  id: string
  /** 关联个案 */
  caseId: string
  /** 客户姓名（展示用） */
  clientName: string
  /** 风险类型 */
  type: 'overdue' | 'high_risk' | 'incomplete' | 'emergency'
  /** 风险等级 */
  level: RiskLevel
  /** 标题 */
  title: string
  /** 详情 */
  description: string
  /** 触发时间 */
  triggeredAt: string
  /** 是否已处理 */
  resolved: boolean
  /** 建议措施 */
  suggestion: string
}

export interface AIAdvice {
  id: string
  /** 关联个案 */
  caseId: string
  clientName: string
  /** AI 建议类型 */
  type: 'assessment' | 'intervention' | 'resource' | 'risk'
  /** 建议标题 */
  title: string
  /** 建议内容 */
  content: string
  /** 关键建议点 */
  keyPoints: string[]
  /** 推荐资源 */
  resources: { name: string; type: string }[]
  /** 生成时间 */
  generatedAt: string
  /** 置信度 0-100 */
  confidence: number
}

// ===== 客户数据 =====
export const clients: Client[] = [
  {
    id: 'C001',
    name: '王秀英',
    gender: '女',
    age: 78,
    phone: '138****2356',
    address: '阳光小区 12-3-501',
    category: 'elderly',
    mainIssue: '独居，子女在外地，身体多病',
    riskLevel: 'medium',
    emergencyContact: '王强（儿子）139****8888',
    registeredAt: '2026-03-15',
    privacyLevel: 2,
  },
  {
    id: 'C002',
    name: '李建国',
    gender: '男',
    age: 65,
    phone: '139****1234',
    address: '和平路 56 号',
    category: 'elderly',
    mainIssue: '中风后康复，需要心理支持',
    riskLevel: 'high',
    emergencyContact: '李梅（女儿）136****5678',
    registeredAt: '2026-02-20',
    privacyLevel: 2,
  },
  {
    id: 'C003',
    name: '张小雨',
    gender: '女',
    age: 12,
    phone: '监护人：138****9999',
    address: '光明社区 8 号楼',
    category: 'child',
    mainIssue: '父母离异，厌学情绪明显',
    riskLevel: 'high',
    emergencyContact: '张父 138****9999',
    registeredAt: '2026-04-08',
    privacyLevel: 3,
  },
  {
    id: 'C004',
    name: '陈美华',
    gender: '女',
    age: 35,
    phone: '137****4567',
    address: '新华街 23 号',
    category: 'family',
    mainIssue: '家庭暴力受害者，需要庇护和法律援助',
    riskLevel: 'high',
    emergencyContact: '陈母 135****1111',
    registeredAt: '2026-05-02',
    privacyLevel: 3,
  },
  {
    id: 'C005',
    name: '刘洋',
    gender: '男',
    age: 17,
    phone: '本人：156****3344',
    address: '建设路 89 号',
    category: 'youth',
    mainIssue: '沉迷网络，辍学边缘',
    riskLevel: 'medium',
    emergencyContact: '刘父 139****2222',
    registeredAt: '2026-04-25',
    privacyLevel: 1,
  },
  {
    id: 'C006',
    name: '赵玉兰',
    gender: '女',
    age: 45,
    phone: '136****7890',
    address: '幸福里 5-2-301',
    category: 'disability',
    mainIssue: '肢体二级残障，希望就业',
    riskLevel: 'low',
    emergencyContact: '赵姐 137****3333',
    registeredAt: '2026-01-10',
    privacyLevel: 1,
  },
  {
    id: 'C007',
    name: '周健',
    gender: '男',
    age: 28,
    phone: '158****6789',
    address: '民安社区 7 号',
    category: 'mental',
    mainIssue: '抑郁症康复期，需持续关注',
    riskLevel: 'medium',
    emergencyContact: '周母 138****4444',
    registeredAt: '2026-03-30',
    privacyLevel: 3,
  },
  {
    id: 'C008',
    name: '孙秀珍',
    gender: '女',
    age: 82,
    phone: '139****0011',
    address: '颐养社区 3 栋',
    category: 'elderly',
    mainIssue: '高龄失能，需要长期照护',
    riskLevel: 'high',
    emergencyContact: '孙女 136****5555',
    registeredAt: '2026-02-15',
    privacyLevel: 2,
  },
  {
    id: 'C009',
    name: '黄小宝',
    gender: '男',
    age: 8,
    phone: '监护人：135****2233',
    address: '育苗社区 4 栋',
    category: 'child',
    mainIssue: '留守童童，祖辈抚养',
    riskLevel: 'medium',
    emergencyContact: '黄父 135****2233',
    registeredAt: '2026-04-12',
    privacyLevel: 3,
  },
  {
    id: 'C010',
    name: '钱桂花',
    gender: '女',
    age: 58,
    phone: '139****6677',
    address: '祥和里 9 号',
    category: 'family',
    mainIssue: '丧偶后情绪低落，社会支持弱',
    riskLevel: 'low',
    emergencyContact: '钱子 137****6666',
    registeredAt: '2026-05-18',
    privacyLevel: 2,
  },
  {
    id: 'C011',
    name: '吴明',
    gender: '男',
    age: 72,
    phone: '136****8899',
    address: '和谐社区 6 号',
    category: 'elderly',
    mainIssue: '认知障碍早期，需专业照护',
    riskLevel: 'high',
    emergencyContact: '吴妻 138****7777',
    registeredAt: '2026-01-22',
    privacyLevel: 3,
  },
  {
    id: 'C012',
    name: '徐小红',
    gender: '女',
    age: 22,
    phone: '本人：187****1122',
    address: '青年公寓 12 号',
    category: 'youth',
    mainIssue: '应届毕业生求职焦虑',
    riskLevel: 'low',
    emergencyContact: '徐母 139****8888',
    registeredAt: '2026-05-25',
    privacyLevel: 1,
  },
]

// ===== 个案数据 =====
export const cases: ServiceCase[] = [
  {
    id: 'CASE001',
    caseNo: 'AN-2026-001',
    clientId: 'C001',
    title: '王秀英居家安全与情感支持',
    category: 'elderly',
    stage: 'intervention',
    riskLevel: 'medium',
    socialWorker: '张社工',
    supervisor: '李督导',
    openedAt: '2026-03-15',
    lastFollowUp: '2026-06-28',
    daysSinceLastFollowUp: 3,
    followUpCount: 8,
    summary: '独居老人，子女异地，每月电话联系有限。最近摔倒一次，需关注居家安全和心理孤独。',
    progress: 65,
  },
  {
    id: 'CASE002',
    caseNo: 'AN-2026-002',
    clientId: 'C002',
    title: '李建国中风后心理康复',
    category: 'elderly',
    stage: 'intervention',
    riskLevel: 'high',
    socialWorker: '张社工',
    supervisor: '李督导',
    openedAt: '2026-02-20',
    lastFollowUp: '2026-06-15',
    daysSinceLastFollowUp: 16,
    followUpCount: 12,
    summary: '中风后肢体功能部分恢复，但情绪低落、社交退缩。需要心理支持和康复指导。',
    progress: 45,
  },
  {
    id: 'CASE003',
    caseNo: 'AN-2026-003',
    clientId: 'C003',
    title: '张小雨厌学情绪辅导',
    category: 'child',
    stage: 'planning',
    riskLevel: 'high',
    socialWorker: '王社工',
    supervisor: '陈督导',
    openedAt: '2026-04-08',
    lastFollowUp: '2026-06-30',
    daysSinceLastFollowUp: 1,
    followUpCount: 6,
    summary: '父母离异后随父生活，厌学情绪明显，与同学关系紧张。需家庭治疗+学校支持。',
    progress: 35,
  },
  {
    id: 'CASE004',
    caseNo: 'AN-2026-004',
    clientId: 'C004',
    title: '陈美华家暴庇护与法律支持',
    category: 'family',
    stage: 'intervention',
    riskLevel: 'high',
    socialWorker: '王社工',
    supervisor: '陈督导',
    openedAt: '2026-05-02',
    lastFollowUp: '2026-06-25',
    daysSinceLastFollowUp: 6,
    followUpCount: 5,
    summary: '长期遭受家暴，已协助申请庇护中心和法律援助，需持续关注安全。',
    progress: 55,
  },
  {
    id: 'CASE005',
    caseNo: 'AN-2026-005',
    clientId: 'C005',
    title: '刘洋网络沉迷矫治',
    category: 'youth',
    stage: 'intervention',
    riskLevel: 'medium',
    socialWorker: '张社工',
    supervisor: '李督导',
    openedAt: '2026-04-25',
    lastFollowUp: '2026-06-20',
    daysSinceLastFollowUp: 11,
    followUpCount: 4,
    summary: '沉迷网络游戏影响学习，已停学。与家庭关系紧张，需家庭关系修复+兴趣引导。',
    progress: 30,
  },
  {
    id: 'CASE006',
    caseNo: 'AN-2026-006',
    clientId: 'C006',
    title: '赵玉兰职业康复',
    category: 'disability',
    stage: 'planning',
    riskLevel: 'low',
    socialWorker: '王社工',
    supervisor: '陈督导',
    openedAt: '2026-01-10',
    lastFollowUp: '2026-06-29',
    daysSinceLastFollowUp: 2,
    followUpCount: 9,
    summary: '肢体残障，希望获得合适工作。已链接残联就业资源，进行职业评估。',
    progress: 70,
  },
  {
    id: 'CASE007',
    caseNo: 'AN-2026-007',
    clientId: 'C007',
    title: '周健抑郁康复期支持',
    category: 'mental',
    stage: 'evaluation',
    riskLevel: 'medium',
    socialWorker: '张社工',
    supervisor: '李督导',
    openedAt: '2026-03-30',
    lastFollowUp: '2026-06-22',
    daysSinceLastFollowUp: 9,
    followUpCount: 7,
    summary: '抑郁症恢复期，已回归工作。需要持续心理支持和复发预防。',
    progress: 80,
  },
  {
    id: 'CASE008',
    caseNo: 'AN-2026-008',
    clientId: 'C008',
    title: '孙秀珍长期照护安排',
    category: 'elderly',
    stage: 'assessment',
    riskLevel: 'high',
    socialWorker: '王社工',
    supervisor: '陈督导',
    openedAt: '2026-02-15',
    lastFollowUp: '2026-06-10',
    daysSinceLastFollowUp: 21,
    followUpCount: 10,
    summary: '高龄失能老人，需要长期专业照护。正在协调机构和家庭资源。',
    progress: 50,
  },
  {
    id: 'CASE009',
    caseNo: 'AN-2026-009',
    clientId: 'C009',
    title: '黄小宝留守儿童关爱',
    category: 'child',
    stage: 'intervention',
    riskLevel: 'medium',
    socialWorker: '张社工',
    supervisor: '李督导',
    openedAt: '2026-04-12',
    lastFollowUp: '2026-06-27',
    daysSinceLastFollowUp: 4,
    followUpCount: 5,
    summary: '留守儿童，祖辈抚养。定期开展关爱活动，联系父母增加远程陪伴。',
    progress: 60,
  },
  {
    id: 'CASE010',
    caseNo: 'AN-2026-010',
    clientId: 'C010',
    title: '钱桂花丧偶心理辅导',
    category: 'family',
    stage: 'closure',
    riskLevel: 'low',
    socialWorker: '王社工',
    supervisor: '陈督导',
    openedAt: '2026-05-18',
    lastFollowUp: '2026-06-28',
    daysSinceLastFollowUp: 3,
    followUpCount: 4,
    summary: '丧偶半年，情绪逐渐稳定。已建立新社交网络，准备结案。',
    progress: 95,
  },
  {
    id: 'CASE011',
    caseNo: 'AN-2026-011',
    clientId: 'C011',
    title: '吴明认知障碍照护支持',
    category: 'elderly',
    stage: 'intervention',
    riskLevel: 'high',
    socialWorker: '张社工',
    supervisor: '李督导',
    openedAt: '2026-01-22',
    lastFollowUp: '2026-06-19',
    daysSinceLastFollowUp: 12,
    followUpCount: 14,
    summary: '认知障碍进行性加重，需专业照护和家属支持。已链接记忆门诊。',
    progress: 55,
  },
  {
    id: 'CASE012',
    caseNo: 'AN-2026-012',
    clientId: 'C012',
    title: '徐小红求职焦虑支持',
    category: 'youth',
    stage: 'closure',
    riskLevel: 'low',
    socialWorker: '王社工',
    supervisor: '陈督导',
    openedAt: '2026-05-25',
    lastFollowUp: '2026-06-30',
    daysSinceLastFollowUp: 1,
    followUpCount: 3,
    summary: '求职焦虑已缓解，已拿到 offer。准备结案。',
    progress: 100,
  },
]

// ===== 风险提醒数据 =====
export const alerts: RiskAlert[] = [
  {
    id: 'A001',
    caseId: 'CASE008',
    clientName: '孙秀珍',
    type: 'overdue',
    level: 'high',
    title: '长期未跟进警告',
    description: '已 21 天未跟进，距上次服务 21 天，超过 14 天警戒线。',
    triggeredAt: '2026-07-01 09:00',
    resolved: false,
    suggestion: '建议尽快安排家访或电话联系，评估老人当前状况，更新服务计划。',
  },
  {
    id: 'A002',
    caseId: 'CASE002',
    clientName: '李建国',
    type: 'overdue',
    level: 'medium',
    title: '跟进超期',
    description: '已 16 天未跟进，需要安排近期服务。',
    triggeredAt: '2026-07-01 09:00',
    resolved: false,
    suggestion: '建议本周内完成家访，重点关注心理状态和康复进展。',
  },
  {
    id: 'A003',
    caseId: 'CASE011',
    clientName: '吴明',
    type: 'overdue',
    level: 'medium',
    title: '跟进超期',
    description: '已 12 天未跟进。',
    triggeredAt: '2026-07-01 09:00',
    resolved: false,
    suggestion: '认知障碍患者需高频跟进，建议每 7-10 天一次。',
  },
  {
    id: 'A004',
    caseId: 'CASE005',
    clientName: '刘洋',
    type: 'overdue',
    level: 'medium',
    title: '跟进超期',
    description: '已 11 天未跟进，辍学青少年需高频关注。',
    triggeredAt: '2026-07-01 09:00',
    resolved: false,
    suggestion: '建议尽快家庭访问，了解孩子当前状态。',
  },
  {
    id: 'A005',
    caseId: 'CASE003',
    clientName: '张小雨',
    type: 'high_risk',
    level: 'high',
    title: '高风险个案预警',
    description: '厌学+家庭破裂+年龄12岁，多重风险叠加。',
    triggeredAt: '2026-07-01 00:30',
    resolved: false,
    suggestion: '建议升级为督导重点关注个案，必要时联动学校心理老师和社区。',
  },
  {
    id: 'A006',
    caseId: 'CASE004',
    clientName: '陈美华',
    type: 'emergency',
    level: 'high',
    title: '紧急安全关注',
    description: '家暴受害者，正处庇护期间，需 24 小时安全关注。',
    triggeredAt: '2026-06-25 14:20',
    resolved: false,
    suggestion: '保持与庇护中心联系，每周至少 2 次心理支持，关注施暴者动态。',
  },
  {
    id: 'A007',
    caseId: 'CASE002',
    clientName: '李建国',
    type: 'high_risk',
    level: 'high',
    title: '心理健康高风险',
    description: '中风后抑郁评分高，存在消极念头风险。',
    triggeredAt: '2026-06-15 11:00',
    resolved: false,
    suggestion: '建议转介精神科专业评估，家属同步接受辅导教育。',
  },
  {
    id: 'A008',
    caseId: 'CASE006',
    clientName: '赵玉兰',
    type: 'incomplete',
    level: 'low',
    title: '档案信息不完整',
    description: '缺少就业意愿详细调查表。',
    triggeredAt: '2026-06-29 16:00',
    resolved: false,
    suggestion: '建议完成《就业需求评估表》，便于精准匹配岗位。',
  },
]

// ===== AI 个案建议数据 =====
export const aiAdvices: AIAdvice[] = [
  {
    id: 'AI001',
    caseId: 'CASE002',
    clientName: '李建国',
    type: 'intervention',
    title: '中风后抑郁综合介入建议',
    content: '李先生中风后出现明显抑郁症状，社交退缩明显。建议采用"药物+心理+社会"三维介入：医疗端继续规范康复训练，心理端采用认知行为疗法改善消极自动思维，社会端通过支持小组重建人际连接。',
    keyPoints: [
      '心理评估：使用 PHQ-9 和 GAD-7 量表评估抑郁焦虑水平',
      '认知行为干预：每周 1-2 次，识别"我是个废人"等自动思维',
      '家属辅导：指导家属避免过度保护，鼓励自主活动',
      '康复协同：与康复师协作设计可行的日常活动',
      '危机预案：建立 24 小时紧急联系网络',
    ],
    resources: [
      { name: '市康复医院脑卒中康复科', type: '医疗资源' },
      { name: '心晴热线 12320-5', type: '心理援助' },
      { name: '社区中风患者互助小组', type: '社会支持' },
    ],
    generatedAt: '2026-07-01 08:00',
    confidence: 92,
  },
  {
    id: 'AI002',
    caseId: 'CASE003',
    clientName: '张小雨',
    type: 'assessment',
    title: '厌学情绪成因评估',
    content: '通过 6 次面谈和家庭访问分析，张小雨厌学情绪与父母离异（1 年前）、亲子沟通不畅、被同学孤立等因素相关。建议从"家庭修复+学校支持+同伴重建"三个层面综合介入。',
    keyPoints: [
      '家庭治疗：促进父母沟通，明确共同教育责任',
      '学校协调：联系班主任、心理老师建立支持系统',
      '同伴关系：通过小组工作建立新友谊',
      '情绪管理：教她识别和表达情绪',
      '兴趣探索：发现学习之外的成就感来源',
    ],
    resources: [
      { name: '区青少年心理辅导中心', type: '专业机构' },
      { name: '学校社工站', type: '学校支持' },
      { name: '青少年成长小组（每周末）', type: '同伴支持' },
    ],
    generatedAt: '2026-07-01 08:30',
    confidence: 88,
  },
  {
    id: 'AI003',
    caseId: 'CASE004',
    clientName: '陈美华',
    type: 'intervention',
    title: '家暴受害者安全与赋能方案',
    content: '陈女士已离开施暴环境，进入庇护阶段。短期内以安全巩固为主，中期以心理康复为重，长期以独立生活能力建设为目标。三阶段方案确保稳步恢复。',
    keyPoints: [
      '安全期（前 3 个月）：保持庇护，加强心理支持',
      '康复期（3-6 个月）：处理创伤记忆，建立支持网络',
      '独立期（6-12 个月）：技能培训、经济独立准备',
      '法律支持：全程协助离婚诉讼和人身安全保护令',
      '子女关怀：评估孩子心理影响，必要时介入',
    ],
    resources: [
      { name: '市反家暴庇护中心', type: '庇护资源' },
      { name: '法律援助中心', type: '法律支持' },
      { name: '女性成长支持小组', type: '同伴支持' },
      { name: '职业技能培训机构', type: '发展资源' },
    ],
    generatedAt: '2026-07-01 09:00',
    confidence: 95,
  },
  {
    id: 'AI004',
    caseId: 'CASE005',
    clientName: '刘洋',
    type: 'intervention',
    title: '青少年网络沉迷家庭治疗建议',
    content: '刘洋网络沉迷背后是家庭沟通断裂和学业压力逃避。建议采用家庭治疗 + 兴趣转移 + 行为契约相结合方式。',
    keyPoints: [
      '家庭治疗：每周 1 次，重建亲子沟通模式',
      '兴趣评估：通过兴趣测评发现替代性活动',
      '行为契约：与刘洋协商上网时间、奖惩机制',
      '学校复学：联系学校制定弹性复学方案',
      '同伴引导：邀请正向同伴一起参与活动',
    ],
    resources: [
      { name: '青少年心理健康中心', type: '专业机构' },
      { name: '电竞兴趣小组（正向引导）', type: '兴趣资源' },
      { name: '家庭教育培训课程', type: '家庭教育' },
    ],
    generatedAt: '2026-07-01 09:30',
    confidence: 85,
  },
  {
    id: 'AI005',
    caseId: 'CASE001',
    clientName: '王秀英',
    type: 'resource',
    title: '独居老人社区支持资源整合',
    content: '王奶奶独居，摔倒风险高。建议整合社区资源构建"居家安全 + 情感慰藉 + 紧急响应"三维支持网络。',
    keyPoints: [
      '居家安全：安装紧急呼叫器、防滑设施、烟雾报警器',
      '生活协助：链接社区送餐、家政、陪医服务',
      '情感慰藉：定期探访、远程视频设备连接子女',
      '邻里互助：培育"邻里守望"小组',
      '定期评估：每月 1 次安全评估',
    ],
    resources: [
      { name: '社区居家养老服务中心', type: '生活服务' },
      { name: '"一键呼"智能终端', type: '安全设备' },
      { name: '志愿者结对探访', type: '情感支持' },
    ],
    generatedAt: '2026-07-01 10:00',
    confidence: 90,
  },
  {
    id: 'AI006',
    caseId: 'CASE008',
    clientName: '孙秀珍',
    type: 'risk',
    title: '高龄失能老人照护风险预警',
    content: '孙奶奶 82 岁失能老人，已 21 天未跟进，存在严重照护风险。建议立即安排家访并启动多方协调机制。',
    keyPoints: [
      '紧急家访：本周内完成面对面评估',
      '照护等级评估：申请专业照护等级评定',
      '机构备选：联系 2-3 家养老机构备选',
      '家属会议：召开家庭会议明确责任分工',
      '医疗对接：确保慢病管理与用药安全',
    ],
    resources: [
      { name: '市第一福利院', type: '机构照护' },
      { name: '专业居家照护公司', type: '居家照护' },
      { name: '家庭医生签约服务', type: '医疗服务' },
    ],
    generatedAt: '2026-07-01 10:30',
    confidence: 96,
  },
]

// ===== 辅助函数 =====
export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id)
}

export function getCaseById(id: string): ServiceCase | undefined {
  return cases.find((c) => c.id === id)
}

export function getCasesByClientId(clientId: string): ServiceCase[] {
  return cases.filter((c) => c.clientId === clientId)
}

export function getAlertsByCaseId(caseId: string): RiskAlert[] {
  return alerts.filter((a) => a.caseId === caseId)
}

export function getActiveAlerts(): RiskAlert[] {
  return alerts.filter((a) => !a.resolved)
}

/** 工作台统计数据 */
export function getWorkbenchStats() {
  return {
    totalClients: clients.length,
    totalCases: cases.length,
    activeCases: cases.filter((c) => c.stage !== 'closure').length,
    highRiskCases: cases.filter((c) => c.riskLevel === 'high').length,
    activeAlerts: getActiveAlerts().length,
    todayFollowUps: cases.filter((c) => c.daysSinceLastFollowUp <= 3).length,
    overdueCases: cases.filter((c) => c.daysSinceLastFollowUp > 14).length,
  }
}
