import { ArrowLeft } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

interface PlaceholderPageProps {
  eyebrow: string
  title: string
  description: string
}

export function PlaceholderPage({ eyebrow, title, description }: PlaceholderPageProps) {
  return (
    <section className="py-32 sm:py-40">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {eyebrow}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-muted">{description}</p>
          <p className="mt-2 text-sm text-subtle">Nội dung trang đang được hoàn thiện.</p>
          <Button to="/" variant="outline" size="lg" className="mt-10">
            <ArrowLeft className="h-4 w-4" />
            Quay về trang chủ
          </Button>
        </div>
      </Container>
    </section>
  )
}
