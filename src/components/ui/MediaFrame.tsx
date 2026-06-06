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
    <article className="rounded-xl border border-white/10 bg-white/5 p-2.5 shadow-lg backdrop-blur-xl sm:p-3">
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
              className={`h-40 w-full object-cover transition duration-300 hover:scale-105 sm:h-44 md:h-48 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            />
          </>
        ) : (
          <div className="h-40 w-full animate-pulse bg-gradient-to-r from-neonBlue/10 via-transparent to-neonGreen/10 sm:h-44 md:h-48" />
        )}
      </div>
      <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-300">{caption}</p>
    </article>
  )
}
