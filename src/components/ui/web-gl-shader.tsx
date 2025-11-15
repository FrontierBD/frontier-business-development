"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function WebGLShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isVisible = useIntersectionObserver(canvasRef, { threshold: 0.1 })
  const [isMobile, setIsMobile] = useState(false)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas })
      // Lower pixel ratio on mobile for better performance
      const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
      refs.renderer.setPixelRatio(pixelRatio)
      refs.renderer.setClearColor(new THREE.Color(0x000000))

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: { value: [window.innerWidth, window.innerHeight] },
        time: { value: 0.0 },
        xScale: { value: 1.0 },
        yScale: { value: 0.5 },
        distortion: { value: 0.05 },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      // Only animate when visible
      if (!isVisible) {
        refs.animationId = null
        return
      }
      
      if (refs.uniforms) refs.uniforms.time.value += 0.01
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms) return
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2)
      refs.renderer.setSize(width, height, false)
      refs.renderer.setPixelRatio(pixelRatio)
      refs.uniforms.resolution.value = [width, height]
    }

    // Debounced resize handler - only runs 150ms after resize stops
    const debouncedResize = debounce(handleResize, 150)

    initScene()
    if (isVisible) animate()
    window.addEventListener("resize", debouncedResize)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      window.removeEventListener("resize", debouncedResize)
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [isMobile, isVisible])

  // Restart animation when component becomes visible
  useEffect(() => {
    const { current: refs } = sceneRef
    if (isVisible && !refs.animationId) {
      const animate = () => {
        if (!isVisible) {
          refs.animationId = null
          return
        }
        
        if (refs.uniforms) refs.uniforms.time.value += 0.01
        if (refs.renderer && refs.scene && refs.camera) {
          refs.renderer.render(refs.scene, refs.camera)
        }
        refs.animationId = requestAnimationFrame(animate)
      }
      animate()
    }
  }, [isVisible])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full block"
    />
  )
}
