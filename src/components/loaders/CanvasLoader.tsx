import { Html, useProgress } from '@react-three/drei'

export default function CanvasLoader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="rounded-lg border border-white/15 bg-slate-950/80 px-4 py-2 text-xs tracking-[0.2em] text-neonCyan backdrop-blur-md">
        LOADING {Math.round(progress)}%
      </div>
    </Html>
  )
}
