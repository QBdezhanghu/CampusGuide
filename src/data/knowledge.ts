import type { ActionCard, KnowledgeEntry } from '../types'

/**
 * 演示用知识库。
 * 合规说明：仅收录公开可查的办事路径，不包含任何需要登录才能获取的数据；
 * 未与官方核对过的条目 verified=false，界面上会显式标注"待核验"。
 * 迁移说明：换一所学校 = 换这份 JSON + 一组 URL，前端代码零改动。
 */
export const kb: KnowledgeEntry[] = [
  {
    school: 'hdu',
    id: 'life.dorm.water-repair',
    category: '生活 / 寝室',
    triggers: ['停水', '没水', '水龙头', '漏水', '水管', '用水报修', '寝室水'],
    title: '寝室用水故障报修',
    summary: '寝室停水或水管漏水时，向后勤提交报修单，由维修师傅上门处理。',
    entry: { channel: '后勤服务报修入口（从学校官网服务大厅进入）', url: 'https://www.hdu.edu.cn' },
    steps: [
      '确认是单间问题还是整层停水，整层停水先问宿管是否在检修',
      '进入后勤报修入口，选择"水暖 / 给排水"类别',
      '填写楼栋、房间号、故障描述，可附现场照片',
      '提交后记录工单号，等待师傅电话联系上门时间'
    ],
    materials: ['楼栋 + 房间号', '故障描述', '现场照片（可选）'],
    sla: '一般 48 小时内响应，紧急漏水可同时联系宿管',
    source: {
      title: '学校官网 → 服务大厅 → 后勤报修',
      url: 'https://www.hdu.edu.cn',
      note: '具体入口路径以当学期服务大厅为准'
    },
    verified: false
  },
  {
    school: 'hdu',
    id: 'life.dorm.electricity',
    category: '生活 / 寝室',
    triggers: ['电费', '电量', '欠费', '跳闸', '充电费', '寝室电', '断电'],
    title: '寝室电费查询与充值',
    summary: '查询剩余电量并为寝室电费账户充值，欠费会导致自动断电。',
    entry: { channel: '后勤 / 一卡通线上服务入口', url: 'https://www.hdu.edu.cn' },
    steps: [
      '先在查询页确认当前余额与欠费金额',
      '选择对应楼栋房间号，核对账户信息',
      '在线支付充值，注意到账可能有几分钟延迟',
      '若充值后仍断电，检查是否跳闸或联系宿管复位'
    ],
    materials: ['楼栋 + 房间号', '校园卡 / 支付账户'],
    sla: '线上充值通常几分钟内到账',
    source: { title: '学校官网 → 服务大厅 → 水电缴费', url: 'https://www.hdu.edu.cn' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'life.dorm.laundry',
    category: '生活 / 寝室',
    triggers: ['洗衣机', '洗衣服', '洗衣房', '烘干', '洗衣卡'],
    title: '宿舍洗衣机使用',
    summary: '使用楼内公共洗衣机，扫码或刷卡启动，注意错峰与卫生。',
    entry: { channel: '楼内洗衣房自助设备' },
    steps: [
      '确认所在楼栋洗衣房位置与开放时间（多数全天，部分楼栋限时）',
      '把衣物放入空机，关好舱门',
      '按设备提示扫码或刷卡支付并选择模式',
      '结束后及时取走衣物，避免占用'
    ],
    materials: ['待洗衣物', '手机（扫码）或校园卡'],
    source: { title: '宿舍楼内设备使用说明（现场张贴）', note: '不同楼栋设备与支付方式可能不同' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'life.dorm.parcel',
    category: '生活 / 寝室',
    triggers: ['快递', '取件', '驿站', '包裹', '寄快递'],
    title: '快递收寄与取件',
    summary: '校内快递集中在驿站，凭取件码领取；寄件需实名。',
    entry: { channel: '校内快递驿站（按短信 / APP 通知的站点）' },
    steps: [
      '收到取件通知后确认站点位置与营业时间',
      '到站凭取件码或扫码取件，核对姓名手机号',
      '大件或超时包裹留意保管期限，逾期可能退回',
      '寄件需携带身份证实名登记'
    ],
    materials: ['取件码', '手机', '寄件时需身份证'],
    source: { title: '驿站现场公告', note: '各驿站营业时间不同' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'life.sport.running',
    category: '生活 / 运动',
    triggers: ['阳光长跑', '长跑', '跑步打卡', '体育打卡', '跑步次数', '体测'],
    title: '阳光长跑打卡',
    summary: '按学期要求完成规定次数与里程的跑步打卡，计入体育成绩。',
    entry: { channel: '体育部指定平台 / 运动 APP' },
    steps: [
      '开学初确认本学期要求的次数、单次最低里程与配速区间',
      '在指定场地或路线内使用指定 APP 记录',
      '每次跑完确认记录已上传成功，避免无效记录',
      '学期末前留出余量，遇到天气或伤病提前补足'
    ],
    materials: ['学号', '指定运动 APP', '校园卡（部分场地需要）'],
    sla: '按学期截止，建议提前两周完成',
    source: { title: '体育部学期通知', note: '次数与里程每学期可能调整，以当学期通知为准' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'academic.assignment.deadline',
    category: '教务 / 作业',
    triggers: ['作业', 'ddl', '截止', '交作业', '没交', '作业在哪交', '课程作业'],
    title: '课程作业查询与提交',
    summary: '作业一般发布在课程平台或课程群，提交截止前需确认已成功上传。',
    entry: { channel: '课程平台 / 任课教师指定渠道' },
    steps: [
      '确认该课程作业的发布渠道（平台、群公告或课堂口头）',
      '记下截止时间与提交格式要求（文件名、格式、份数）',
      '提前一天上传，避免截止前网络拥堵',
      '提交后回看状态是否为"已提交"，必要时截图留证'
    ],
    materials: ['作业文件', '以学号姓名命名的文件名'],
    sla: '以任课教师公布的截止时间为准',
    source: { title: '各课程教学大纲与任课教师通知', note: '不同课程渠道不统一，这是当前最碎片的一环' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'academic.exam.makeup',
    category: '教务 / 考试',
    triggers: ['缓考', '补考', '重修', '考试时间', '考场', '缺考'],
    title: '缓考 / 补考 / 重修办理',
    summary: '因病因事无法参加考试需在规定时间内申请缓考；未通过课程按规定参加补考或重修。',
    entry: { channel: '教务处 / 学院教务办' },
    steps: [
      '确认属于缓考、补考还是重修，三者流程不同',
      '缓考需在考试前提交申请并附证明材料（如医院证明）',
      '补考 / 重修关注教务处发布的报名与考试安排通知',
      '留意是否影响学分与绩点计算，必要时咨询辅导员'
    ],
    materials: ['申请表', '证明材料（病历等）', '学号信息'],
    sla: '缓考须在考试前申请，逾期一般不予受理',
    source: { title: '教务处学籍管理规定', note: '以教务处当学期通知为准' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'academic.transcript',
    category: '教务 / 证明',
    triggers: ['成绩单', '在读证明', '证明', '盖章', '中英文成绩单'],
    title: '成绩单与在读证明开具',
    summary: '出国、实习或评奖常需成绩单与在读证明，注意是否需要盖章及中英文版本。',
    entry: { channel: '教务处 / 自助打印终端' },
    steps: [
      '先确认接收方要求：是否需要盖章、是否需要英文版',
      '在自助终端或教务系统申请打印',
      '需要盖章的到教务处窗口办理',
      '留学申请等场景注意是否需要密封件'
    ],
    materials: ['校园卡 / 学号', '接收方要求说明'],
    sla: '自助打印即时可取，盖章件以教务处办公时间为准',
    source: { title: '教务处办事指南', note: '链接待核验' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'academic.leave',
    category: '教务 / 学籍',
    triggers: ['请假', '事假', '病假', '离校', '请假条', '外出'],
    title: '学生请假办理',
    summary: '请假需按天数走不同审批层级，离校前务必完成审批而非事后补。',
    entry: { channel: '辅导员 / 学院学工办' },
    steps: [
      '确认请假天数对应的审批层级（短期辅导员，较长需学院）',
      '填写请假事由、起止时间、去向与联系方式',
      '病假附医院证明，事假说明具体原因',
      '返校后按规定销假'
    ],
    materials: ['请假申请', '证明材料（病假）', '家长知情同意（较长假期）'],
    source: { title: '学生手册 · 考勤与请假管理规定' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'library.borrow',
    category: '图书馆',
    triggers: ['借书', '还书', '借阅', '图书馆', '续借', '逾期', '找不到书'],
    title: '图书借阅与续借',
    summary: '凭校园卡借书，可在图书馆网站查询馆藏并在线续借，逾期会影响继续借阅。',
    entry: { channel: '图书馆网站 / 馆内自助借还机', url: 'https://lib.hdu.edu.cn' },
    steps: [
      '在图书馆网站检索书名，确认馆藏位置与是否在架',
      '到对应书库按索书号取书',
      '自助借还机刷校园卡借出，核对借期',
      '临近到期可在网站续借，被他人预约时无法续借'
    ],
    materials: ['校园卡', '索书号'],
    sla: '借期与可续借次数以图书馆规定为准',
    source: { title: '图书馆官网借阅规则', url: 'https://lib.hdu.edu.cn' },
    verified: true
  },
  {
    school: 'hdu',
    id: 'library.seat',
    category: '图书馆',
    triggers: ['自习', '座位', '占座', '预约座位', '图书馆没位置'],
    title: '图书馆座位预约',
    summary: '考试周座位紧张，多数情况需提前在系统预约并按时签到。',
    entry: { channel: '图书馆座位预约系统', url: 'https://lib.hdu.edu.cn' },
    steps: [
      '在预约系统选择馆区、日期与时段',
      '到馆后在规定时间内签到，超时未签到会被释放',
      '离开较久时按规定释放座位，避免被记违规',
      '多次违约可能限制后续预约'
    ],
    materials: ['校园卡 / 学号', '预约记录'],
    source: { title: '图书馆座位管理规则', url: 'https://lib.hdu.edu.cn' },
    verified: false
  },
  {
    school: 'hdu',
    id: 'campus.card',
    category: '校园卡',
    triggers: ['校园卡', '一卡通', '卡丢了', '挂失', '补卡', '充值'],
    title: '校园卡挂失与补办',
    summary: '校园卡丢失后应先线上挂失冻结余额，再补办新卡。',
    entry: { channel: '一卡通服务中心 / 线上挂失入口' },
    steps: [
      '立即线上挂失，冻结卡内余额，防止被盗刷',
      '确认卡确实丢失后再补办，找回可解挂',
      '携带身份证件到一卡通服务中心办理补卡',
      '补卡后原卡余额转移，部分门禁需重新同步'
    ],
    materials: ['身份证 / 学生证', '补卡工本费'],
    source: { title: '一卡通服务中心办事说明', note: '链接待核验' },
    verified: false
  }
]

/** 发给模型时使用的精简索引，只给判断所需字段，降低 token 消耗与幻觉空间 */
export function kbIndexForPrompt(entries: KnowledgeEntry[]) {
  return entries.map((e) => ({
    id: e.id,
    title: e.title,
    category: e.category,
    triggers: e.triggers
  }))
}

export function toActionCard(entry: KnowledgeEntry, reason?: string): ActionCard {
  return {
    id: entry.id,
    title: entry.title,
    summary: entry.summary,
    category: entry.category,
    steps: entry.steps,
    materials: entry.materials,
    sla: entry.sla,
    entry: entry.entry,
    source: entry.source,
    verified: entry.verified,
    reason
  }
}
