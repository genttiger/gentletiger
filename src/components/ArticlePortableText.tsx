import {PortableText} from '@portabletext/react'
import {urlFor} from '../lib/image'

const embedUrl = (sourceUrl?: string) => {
  if (!sourceUrl) return null

  try {
    const url = new URL(sourceUrl)
    if (url.hostname === 'youtu.be') {
      return `https://www.youtube-nocookie.com/embed/${url.pathname.slice(1)}`
    }
    if (url.hostname.endsWith('youtube.com')) {
      const videoId = url.searchParams.get('v')
      return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null
    }
    if (url.hostname === 'vimeo.com' || url.hostname.endsWith('.vimeo.com')) {
      const videoId = url.pathname.split('/').filter(Boolean).pop()
      return videoId ? `https://player.vimeo.com/video/${videoId}` : null
    }
  } catch {
    return null
  }

  return null
}

const isDirectVideo = (sourceUrl?: string) =>
  /\.(mp4|webm|mov)(?:[?#].*)?$/i.test(sourceUrl || '')

const components = {
  block: {
    normal: ({children}: any) => <p>{children}</p>,
    h2: ({children}: any) => <h2>{children}</h2>,
    h3: ({children}: any) => <h3>{children}</h3>,
  },
  types: {
    image: ({value}: any) => (
      <figure className="article-media">
        <img
          src={urlFor(value).width(1400).fit('max').auto('format').url()}
          alt={value.alt || ''}
          loading="lazy"
        />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    videoFile: ({value}: any) => (
      <figure className="article-media">
        <video
          controls
          preload="metadata"
          poster={
            value.poster
              ? urlFor(value.poster).width(1400).fit('max').auto('format').url()
              : undefined
          }
          aria-label={value.title || 'Article video'}
        >
          <source src={value.url} type={value.mimeType || undefined} />
          Your browser does not support embedded video.
        </video>
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    videoEmbed: ({value}: any) => {
      const iframeUrl = embedUrl(value.url)

      return (
        <figure className="article-media">
          {iframeUrl ? (
            <iframe
              src={iframeUrl}
              title={value.title || 'External video'}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : isDirectVideo(value.url) ? (
            <video controls preload="metadata" aria-label={value.title || 'External video'}>
              <source src={value.url} />
              Your browser does not support embedded video.
            </video>
          ) : (
            <p>
              <a href={value.url} rel="noreferrer">
                Watch video
              </a>
            </p>
          )}
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      )
    },
  },
}

export default function ArticlePortableText({value}: {value: any[]}) {
  return <PortableText value={value} components={components} />
}
