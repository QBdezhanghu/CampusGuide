import { useState } from 'react'

interface Props {
  draft: string
}

/** AI 生成的可直接粘贴的草稿；只复制，不代替用户提交 */
export function DraftNote({ draft }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      window.prompt('复制下面的内容：', draft)
    }
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-teal-100">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-[13px] font-semibold text-teal-800">帮你写好的草稿</h3>
        <button
          type="button"
          onClick={copy}
          className="rounded-lg bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700 active:scale-95"
        >
          {copied ? '已复制' : '复制'}
        </button>
      </div>
      <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-slate-700">{draft}</p>
      <p className="mt-2 text-[11px] text-slate-400">复制后请自行核对内容并提交，系统不会代你提交</p>
    </div>
  )
}
