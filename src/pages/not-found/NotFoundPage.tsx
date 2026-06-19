import { Home } from 'lucide-react'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="flex min-h-[60vh] items-center py-20">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Lỗi 404</p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Không tìm thấy trang
          </h1>
          <p className="mt-4 text-lg text-muted">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>
          <Button to="/" size="lg" className="mt-10">
            <Home className="h-4 w-4" />
            Về trang chủ
          </Button>
        </div>
      </Container>
    </section>
  )
}
