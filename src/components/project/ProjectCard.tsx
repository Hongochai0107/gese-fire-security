import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '@/data/projects'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { slug, icon: Icon, category, year, title, location, description, scope } = project

  return (
    <div className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors duration-200 hover:border-primary/40">
      <div className="relative aspect-4/3 overflow-hidden bg-linear-to-br from-surface to-card">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
        <Icon
          className="absolute -bottom-8 -right-8 h-40 w-40 text-primary/10 transition-transform duration-300 group-hover:scale-105"
          strokeWidth={1.25}
        />
        <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur">
          {category}
        </span>
        <span className="absolute right-4 top-4 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-semibold text-muted backdrop-blur">
          {year}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5" />
          {location}
        </div>
        <h3 className="mt-2 text-lg font-bold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {scope.map((item) => (
            <span key={item} className="rounded-md border border-border px-2 py-1 text-xs text-muted">
              {item}
            </span>
          ))}
        </div>
        <Link
          to={`/projects/${slug}`}
          className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          Xem chi tiết
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>
  )
}
