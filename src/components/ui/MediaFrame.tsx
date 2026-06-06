import { useEffect, useState } from 'react'

type MediaFrameProps = {
  src?: string
  alt: string
  title: string
  caption: string
}

export default function MediaFrame({ src, alt, title, caption }: MediaFrameProps) {
  const [broken, setBroken] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const shouldShowImage = Boolean(src) && !broken

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }

      if (event.key === '+' || event.key === '=') {
        setZoom((currentZoom) => Math.min(currentZoom + 0.25, 3))
      }

      if (event.key === '-' || event.key === '_') {
        setZoom((currentZoom) => Math.max(currentZoom - 0.25, 1))
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const openLightbox = () => {
    if (!shouldShowImage) {
      return
    }

    setZoom(1)
    setIsOpen(true)
  }

  const closeLightbox = () => {
    setIsOpen(false)
    setZoom(1)
  }

  return (
    <>
      <article className="rounded-xl border border-white/10 bg-white/5 p-2.5 shadow-lg backdrop-blur-xl sm:p-3">
        <button
          type="button"
          onClick={openLightbox}
          disabled={!shouldShowImage}
          className="group relative block w-full overflow-hidden rounded-lg border border-white/10 text-left disabled:cursor-default"
          aria-label={`Open ${title}`}
        >
          {shouldShowImage ? (
            <>
              {!loaded && <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-neonBlue/10 via-white/10 to-neonGreen/10" />}
              <img
                src={src}
                alt={alt}
                loading="lazy"
                onLoad={() => setLoaded(true)}
                onError={() => setBroken(true)}
                className={`h-40 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-44 md:h-48 ${loaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="m-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                  View image
                </span>
              </div>
            </>
          ) : (
            <div className="h-40 w-full animate-pulse bg-gradient-to-r from-neonBlue/10 via-transparent to-neonGreen/10 sm:h-44 md:h-48" />
          )}
        </button>
        <h3 className="mt-3 text-base font-semibold text-white">{title}</h3>
        <p className="mt-1 text-sm text-slate-300">{caption}</p>
        {shouldShowImage && (
          <button
            type="button"
            onClick={openLightbox}
            className="mt-3 inline-flex touch-target items-center rounded-md border border-white/15 bg-black/25 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 transition-colors duration-200 hover:bg-white/10"
          >
            Open full view
          </button>
        )}
      </article>

      {isOpen && shouldShowImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-6"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            className="relative flex h-[100dvh] w-full flex-col overflow-hidden rounded-none border border-white/15 bg-slate-950/95 shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-6xl sm:rounded-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col gap-3 border-b border-white/10 px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-white sm:text-base">{title}</h3>
                <p className="text-xs text-slate-400 sm:truncate">Scroll to zoom, use + / - buttons, press Esc to close</p>
              </div>
              <div className="flex flex-wrap items-center justify-end gap-2 sm:flex-nowrap">
                <button
                  type="button"
                  onClick={() => setZoom((currentZoom) => Math.max(currentZoom - 0.25, 1))}
                  className="touch-target inline-flex min-w-[44px] items-center justify-center rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  aria-label="Zoom out"
                >
                  −
                </button>
                <button
                  type="button"
                  onClick={() => setZoom(1)}
                  className="touch-target inline-flex min-w-[64px] items-center justify-center rounded-md border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-200 hover:bg-white/10"
                  aria-label="Reset zoom"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((currentZoom) => Math.min(currentZoom + 0.25, 3))}
                  className="touch-target inline-flex min-w-[44px] items-center justify-center rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="touch-target inline-flex min-w-[44px] items-center justify-center rounded-md border border-white/15 bg-white/5 px-3 py-2 text-lg font-semibold text-white transition-colors duration-200 hover:bg-white/10"
                  aria-label="Close image viewer"
                >
                  ×
                </button>
              </div>
            </div>

            <div
              className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-black/40 p-3 sm:p-4 sm:py-6"
              onWheel={(event) => {
                event.preventDefault()
                setZoom((currentZoom) => {
                  const nextZoom = event.deltaY < 0 ? currentZoom + 0.15 : currentZoom - 0.15
                  return Math.min(Math.max(nextZoom, 1), 3)
                })
              }}
            >
              <img
                src={src}
                alt={alt}
                className="max-h-[calc(100dvh-180px)] max-w-none select-none object-contain transition-transform duration-200 sm:max-h-[72vh]"
                style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                draggable={false}
              />
            </div>

            <div className="border-t border-white/10 px-3 py-3 text-sm text-slate-300 sm:px-5">{caption}</div>
          </div>
        </div>
      )}
    </>
  )
}
