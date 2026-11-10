import { localAnswer } from './match'
import type { AskResponse } from '../types'

/**
 * 唯一的后端调用。失败时不抛给用户，而是静默降级到本地检索，
 * 保证答辩现场断网也能出卡（降级原因打在 mode 上）。
 */
export async function ask(query: string): Promise<AskResponse> {
  try {
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      throw new Error(data.error || `请求失败 (${res.status})`)
    }
    return (await res.json()) as AskResponse
  } catch (err) {
    console.warn('[ask] 接口不可用，降级为本地检索：', (err as Error).message)
    return localAnswer(query)
  }
}
