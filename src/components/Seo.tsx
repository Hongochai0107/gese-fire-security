import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title?: string
  description?: string
  image?: string
  url?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

const SITE_NAME = 'GESE Fire & Security'
const SITE_URL = 'https://gesefiresecurity.vn'
const DEFAULT_DESC = 'Tư vấn, thiết kế, thi công và bảo trì hệ thống PCCC & An ninh đạt chuẩn cho nhà máy, tòa nhà và trung tâm thương mại.'

export function Seo({ title, description = DEFAULT_DESC, image, url, jsonLd }: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonical = url ? `${SITE_URL}${url}` : SITE_URL
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}

/* ── Preset schemas ── */

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.svg`,
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '1900-1234',
    contactType: 'customer service',
    areaServed: 'VN',
    availableLanguage: 'Vietnamese',
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tầng 12, Tòa nhà GESE Tower',
    addressLocality: 'Quận 1',
    addressRegion: 'TP. Hồ Chí Minh',
    addressCountry: 'VN',
  },
  sameAs: [
    'https://www.facebook.com/gesefiresecurity',
    'https://www.linkedin.com/company/gesefiresecurity',
  ],
}

export function buildProductSchema(product: {
  name: string
  description: string | null
  shortDescription: string
  sku: string
  price: number
  slug: string
  thumbnail: string | null
  category: { name: string } | null
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description ?? product.shortDescription,
    sku: product.sku,
    image: product.thumbnail ?? undefined,
    url: `${SITE_URL}/products-catalog/${product.slug}`,
    brand: { '@type': 'Brand', name: SITE_NAME },
    category: product.category?.name,
    ...(product.price > 0 && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'VND',
        price: product.price,
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: SITE_NAME },
      },
    }),
  }
}
