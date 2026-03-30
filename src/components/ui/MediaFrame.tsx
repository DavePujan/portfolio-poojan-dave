import { useState } from 'react'

type MediaFrameProps = {
  src?: string
  alt: string
  title: string
  caption: string
}

export default function MediaFrame({ src, alt, title, caption }: MediaFrameProps) {
  const [broken, setBroken] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const shouldShowImage = Boolean(src) && !broken

  return (
    <article className="rounded-xl border border-white/10 bg-white/5 p-3 shadow-lg backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-lg border border-white/10">
        {shouldShowImage ? (
          <>
            {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neonBlue/10 via-white/10 to-neonGreen/10" />}
            <img
              src={src}
              alt={alt}
              loading="lazy"
              onLoad={() => setLoaded(true)}
              onError={() => setBroken(true)}
              className={`h-44 w-full object-cover transition duration-300 hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className="h-44 w-full animate-pulse bg-gradient-to-r from-neonBlue/10 via-transparent to-neonGreen/10" />
        )}
      </div>
      <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-300">{caption}</p>
    </article>
  )
}
