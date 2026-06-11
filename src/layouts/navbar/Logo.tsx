import { Link } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-glow-sm">
        <ShieldCheck className="h-5 w-5" strokeWidth={2.25} />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight text-white">
          {siteConfig.shortName}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
          Fire &amp; Security
        </span>
      </span>
    </Link>
  )
}
