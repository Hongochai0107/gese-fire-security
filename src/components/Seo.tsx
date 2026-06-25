import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

const SITE_NAME = 'GESE Fire & Security'
const DEFAULT_DESC = 'Tư vấn, thiết kế, thi công và bảo trì hệ thống PCCC & An ninh đạt chuẩn cho nhà máy, tòa nhà và trung tâm thương mại.'

export function Seo({ title, description = DEFAULT_DESC, image, url }: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
