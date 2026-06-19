import { useRef, useState } from 'react'
import { Upload, Trash2, Copy, Check } from 'lucide-react'
import { PageHeader } from '@/admin/components/ui/PageHeader'
import { useCrud } from '@/admin/hooks/useCrud'
import api from '@/admin/lib/api'
import toast from 'react-hot-toast'

interface MediaFile { id: number; url: string; originalName: string; mimeType: string; size: number; createdAt: string }

export function MediaPage() {
  const { data, loading, fetchData, remove } = useCrud<MediaFile>('/media', { limit: 24 })
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<number | null>(null)

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length) return
    setUploading(true)
    const formData = new FormData()
    if (files.length === 1) {
      formData.append('file', files[0])
      await api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    } else {
      Array.from(files).forEach((f) => formData.append('files', f))
      await api.post('/media/upload-multiple', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    }
    toast.success('Upload thành công')
    setUploading(false)
    fetchData()
  }

  const copyUrl = (id: number, url: string) => {
    navigator.clipboard.writeText(url)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
    toast.success('Đã copy URL')
  }

  return (
    <>
      <PageHeader title="Media Library" description="Quản lý hình ảnh"
        action={
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-hover disabled:opacity-50">
            <Upload className="h-4 w-4" /> {uploading ? 'Đang upload...' : 'Upload ảnh'}
          </button>
        }
      />
      <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => handleUpload(e.target.files)} />

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      ) : data.length === 0 ? (
        <div className="rounded-xl border-2 border-dashed border-gray-300 py-20 text-center">
          <Upload className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-3 text-sm text-gray-500">Chưa có file nào. Click "Upload ảnh" để bắt đầu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {data.map((file) => (
            <div key={file.id} className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white">
              <div className="aspect-square overflow-hidden bg-gray-100">
                <img src={file.url} alt={file.originalName} className="h-full w-full object-cover" />
              </div>
              <div className="p-2">
                <p className="truncate text-xs text-gray-600">{file.originalName}</p>
                <p className="text-[10px] text-gray-400">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
              <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                <button onClick={() => copyUrl(file.id, file.url)}
                  className="rounded-lg bg-white/90 p-1.5 text-gray-600 shadow hover:bg-white">
                  {copied === file.id ? <Check className="h-3.5 w-3.5 text-green-600" /> : <Copy className="h-3.5 w-3.5" />}
                </button>
                <button onClick={() => remove(file.id)}
                  className="rounded-lg bg-white/90 p-1.5 text-red-500 shadow hover:bg-white">
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
