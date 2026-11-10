export interface CardSource {
  /** 依据名称，例如《学生手册》某条、校方通知标题 */
  title: string
  /** 可核验的链接，没有公开直达链接时留空 */
  url?: string
  /** 补充说明，例如"链接待核验" */
  note?: string
}

export interface KnowledgeEntry {
  school: string
  id: string
  category: string
  /** 口语化触发词，覆盖学生真实说法，是本地检索的主要依据 */
  triggers: string[]
  title: string
  summary: string
  entry: {
    channel: string
    url?: string
  }
  steps: string[]
  materials: string[]
  /** 时限 / 承诺办结时间 */
  sla?: string
  source: CardSource
  /** false 表示条目尚未与官方核对 */
  verified: boolean
}

/** 返回给前端的结构化结果，前端只负责渲染 */
export interface ActionCard {
  id: string
  title: string
  summary: string
  category: string
  steps: string[]
  materials: string[]
  sla?: string
  entry: KnowledgeEntry['entry']
  source: CardSource
  verified: boolean
  /** 命中原因，供用户理解为什么推荐这张卡 */
  reason?: string
}

export type AskMode = 'llm' | 'local'

export interface AskResponse {
  mode: AskMode
  cards: ActionCard[]
  /** 一句话回答；查不到时用于说明边界并给替代建议 */
  reply: string
  /** 草稿预填：帮用户写好的文本，用户复制后自行提交 */
  draft?: string
}

export interface TodoItem {
  id: string
  cardId: string
  title: string
  /** ISO 日期 yyyy-mm-dd */
  due?: string
  note?: string
  done: boolean
  createdAt: number
}
