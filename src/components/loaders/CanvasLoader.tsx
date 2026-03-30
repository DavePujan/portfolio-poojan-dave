import { Html, useProgress } from '@react-three/drei'

export default function CanvasLoader() {
  const { progress } = useProgress()

  return (
    <Html center>
      <div className="rounded-xl border border-white/15 bg-slate-950/85 px-5 py-3 text-center backdrop-blur-md">
        <div className="mx-auto mb-2 h-2 w-24 overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-gradient-to-r from-neonCyan to-neonGreen transition-all duration-300" style={{ width: `${Math.round(progress)}%` }} />
        </div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-slate-300">Pujan Dave Experience</p>
        <p className="mt-1 text-xs font-semibold tracking-[0.2em] text-neonCyan">LOADING {Math.round(progress)}%</p>
      </div>
    </Html>
  )
}
