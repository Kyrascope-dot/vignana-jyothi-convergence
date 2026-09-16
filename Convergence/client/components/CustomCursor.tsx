"use client"

import { useEffect, useRef } from "react"

/**
 * Custom retro 3D-pixel cursor using /cursor.png.
 * pointer-events is ALWAYS "none" so clicks/drags pass through.
 */
export default function CustomCursor() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const raf = useRef(0)
  const pos = useRef({ x: -100, y: -100 })

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return

    const wrap = wrapRef.current
    if (!wrap) return

    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (!raf.current) {
        raf.current = requestAnimationFrame(() => {
          wrap.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
          raf.current = 0
        })
      }
    }

    const enter = () => { wrap.style.opacity = "1" }
    const leave = () => { wrap.style.opacity = "0" }

    document.addEventListener("mousemove", move, { passive: true })
    document.addEventListener("mouseenter", enter)
    document.addEventListener("mouseleave", leave)

    return () => {
      document.removeEventListener("mousemove", move)
      document.removeEventListener("mouseenter", enter)
      document.removeEventListener("mouseleave", leave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: "-4px", // slight offset to align the tip
        left: "-4px",
        width: "36px",
        height: "36px",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: 0,
        willChange: "transform",
        transition: "opacity 0.15s ease",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src="/cursor.png"
        alt=""
        draggable={false}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none",
          userSelect: "none",
          transition: "filter 0.15s ease",
          filter: "drop-shadow(2px 2px 2px rgba(0,0,0,0.3))"
        }}
      />
    </div>
  )
}
