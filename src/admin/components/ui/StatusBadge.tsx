import { cn } from '@/lib/utils'

const variants: Record<string, string> = {
  active: 'bg-green-50 text-green-700 border-green-200',
  published: 'bg-green-50 text-green-700 border-green-200',
  draft: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-purple-50 text-purple-700 border-purple-200',
  closed: 'bg-gray-50 text-gray-700 border-gray-200',
  spam: 'bg-red-50 text-red-700 border-red-200',
}

const labels: Record<string, string> = {
  active: 'Active', published: 'Published', draft: 'Draft',
  new: 'Mới', contacted: 'Đã liên hệ', closed: 'Đã chốt', spam: 'Spam',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn('inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold', variants[status] || 'bg-gray-50 text-gray-700 border-gray-200')}>
      {labels[status] || status}
    </span>
  )
}
