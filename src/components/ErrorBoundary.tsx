import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'
import { AlertTriangle, RotateCcw } from 'lucide-react'
import { Container } from '@/components/ui/Container'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-background">
          <Container>
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-error/10">
                <AlertTriangle className="h-8 w-8 text-error" />
              </div>
              <h1 className="text-2xl font-bold text-white">Đã xảy ra lỗi</h1>
              <p className="mt-3 text-muted">
                Ứng dụng gặp sự cố không mong muốn. Vui lòng thử tải lại trang.
              </p>
              <button
                onClick={this.handleReset}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                <RotateCcw className="h-4 w-4" />
                Về trang chủ
              </button>
            </div>
          </Container>
        </div>
      )
    }

    return this.props.children
  }
}
