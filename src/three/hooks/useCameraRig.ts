import { useFrame, useThree } from '@react-three/fiber'
import { useRef } from 'react'
import { Vector3 } from 'three'
import useSceneState from './useSceneState'
import useScroll from '../../hooks/useScroll'
import { NODES } from '../config/nodes.config'

const tempVec = new Vector3()
const scrollTargetVec = new Vector3()
const focusTargetVec = new Vector3()
const blendedTargetVec = new Vector3()
const lookTargetVec = new Vector3()
const focusLookTargetVec = new Vector3()
const blendedLookTargetVec = new Vector3()
const contactTargetVec = new Vector3(0, 0.2, 6)
const hoverDirVec = new Vector3()

const nodeMap = new Map(NODES.map((node) => [node.id, node.position]))

export default function useCameraRig() {
  const { camera } = useThree()
  const scrollProgress = useScroll()
  const { section, focusNode, hoverNode } = useSceneState()
  const smoothScrollRef = useRef(0)
  const smoothFocusRef = useRef(0)

  useFrame(({ clock }) => {
    smoothScrollRef.current += (scrollProgress - smoothScrollRef.current) * 0.08
    const scrollFactor = smoothScrollRef.current * 4
    const hasFocusTarget = section !== 'contact' && Boolean(focusNode && nodeMap.has(focusNode))

    smoothFocusRef.current += ((hasFocusTarget ? 1 : 0) - smoothFocusRef.current) * 0.08

    lookTargetVec.set(0, 0, 0)
    focusLookTargetVec.copy(lookTargetVec)

    switch (section) {
      case 'hero':
        {
          const easedInput = Math.min(Math.max(scrollFactor / 2, 0), 1)
          const ease = 1 - Math.pow(1 - easedInput, 3)
          scrollTargetVec.set(0, 0.4, 5 - ease * 2)
        }
        break
      case 'skills':
        {
          const angle = scrollFactor * Math.PI * 0.6
          const radius = 5
          scrollTargetVec.set(Math.sin(angle) * radius, Math.sin(angle * 0.5) * 0.8, Math.cos(angle) * radius)
          lookTargetVec.set(0, 0.5, 0)
        }
        break
      case 'projects':
        scrollTargetVec.set(Math.sin(scrollFactor) * 2, 0.3 + Math.sin(scrollFactor * 0.5) * 0.5, 4.5 - Math.cos(scrollFactor) * 0.5)
        lookTargetVec.set(1, 0, 0)
        break
      case 'contact':
        scrollTargetVec.lerp(contactTargetVec, 0.05)
        break
      default:
        scrollTargetVec.set(0.1, 0.4, 5)
    }

    // Priority: focus override blend > hover bias > normal scroll
    if (!hasFocusTarget && hoverNode && nodeMap.has(hoverNode)) {
      const hoverPosition = nodeMap.get(hoverNode)
      if (hoverPosition) {
        hoverDirVec.set(hoverPosition[0], hoverPosition[1], hoverPosition[2]).normalize().multiplyScalar(0.15)
        scrollTargetVec.add(hoverDirVec)
      }
    }

    if (hasFocusTarget && focusNode) {
      const focusPosition = nodeMap.get(focusNode)
      if (focusPosition) {
        const zoom = 2 + Math.sin(smoothFocusRef.current * Math.PI) * 0.5
        focusTargetVec.set(focusPosition[0], focusPosition[1], focusPosition[2] + zoom)
        focusLookTargetVec.set(focusPosition[0], focusPosition[1], focusPosition[2])
      }
    } else {
      focusTargetVec.copy(scrollTargetVec)
      focusLookTargetVec.copy(lookTargetVec)
    }

    blendedTargetVec.copy(scrollTargetVec).lerp(focusTargetVec, smoothFocusRef.current)
    blendedLookTargetVec.copy(lookTargetVec).lerp(focusLookTargetVec, smoothFocusRef.current)

    const time = clock.getElapsedTime()
    blendedTargetVec.x += Math.sin(time * 0.5) * 0.02
    blendedTargetVec.y += Math.cos(time * 0.5) * 0.015

    const damping = section === 'contact' ? 0.03 : 0.06
    camera.position.lerp(tempVec.copy(blendedTargetVec), damping)
    camera.lookAt(blendedLookTargetVec)
  })
}
