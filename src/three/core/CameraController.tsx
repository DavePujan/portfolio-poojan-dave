import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import useSceneState from '../hooks/useSceneState'

export default function CameraController() {
  const { camera } = useThree()
  const { section, cameraMode } = useSceneState()
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      }
    }

    window.addEventListener('pointermove', onPointerMove)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  useFrame((_state, delta) => {
    const sectionTargets: Record<typeof section, [number, number, number]> = {
      hero: [0.15, 0.35, 5.2],
      skills: [0.05, 0.3, 4.7],
      projects: [0.18, 0.2, 4.45],
      contact: [0.08, 0.4, 5.75],
    }

    const [tx, ty, tz] = sectionTargets[section]
    const focusOffset = cameraMode === 'focus' ? -0.28 : 0

    const targetX = tx + pointerRef.current.x * 0.08
    const targetY = ty + pointerRef.current.y * -0.06
    const targetZ = tz + focusOffset

    camera.position.set(
      THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2.4),
      THREE.MathUtils.lerp(camera.position.y, targetY, delta * 2.2),
      THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 2.4),
    )

    camera.lookAt(0.2, 0.05, 0)
  })

  return null
}
