"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import PillNav from "@/components/PillNav"
import { useActiveSection } from "@/hooks/use-active-section"

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Events", href: "#events" },
  { label: "Themes", href: "#themes" },
  { label: "Organisers", href: "#clubs" },
  { label: "Contact", href: "#contact" },
  { label: "Developers", href: "#developers" },
]

export function SiteHeader() {
  const activeHref = useActiveSection(NAV_ITEMS.map((item) => item.href))
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  const handleMobileMenuClick = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      window.history.pushState(null, "", "#home")
      return
    }
    const target = document.querySelector(href)
    if (target) {
      const headerOffset = 64
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset
      window.scrollTo({ top, behavior: "smooth" })
      window.history.pushState(null, "", href)
    } else {
      window.location.hash = href
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/20 bg-red-700">
      <div className="relative z-50 mx-auto flex h-16 w-full max-w-[1332px] items-center justify-between px-3 md:h-20 md:px-0">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
            window.history.pushState(null, "", "#home")
            setIsMobileMenuOpen(false)
          }}
          className="mr-3 flex shrink-0 items-center md:mr-0"
        >
          <span
            className="h-8 w-8 shrink-0 bg-[#ede1c5]"
            style={{
              WebkitMaskImage: "url(/logo-atom.png)",
              maskImage: "url(/logo-atom.png)",
              maskMode: "luminance",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          />
        </a>

        <div className="hidden md:absolute md:left-1/2 md:block md:-translate-x-1/2">
          <PillNav
            items={NAV_ITEMS}
            activeHref={activeHref}
            baseColor="#ede1c5"
            pillColor="rgba(237, 225, 197, 0.16)"
            pillTextColor="#ede1c5"
            hoveredPillTextColor="#b91c1c"
            trackBg="transparent"
            className="font-tagline lowercase"
          />
        </div>

        <button
          className="flex items-center justify-center p-2 text-[#ede1c5] md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-red-700 md:hidden">
          <nav className="flex flex-col items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`font-tagline text-2xl font-bold tracking-[0.16em] lowercase ${activeHref === item.href ? "text-[#ede1c5] underline underline-offset-8" : "text-[#ede1c5]/70"
                  }`}
                onClick={(e) => {
                  e.preventDefault()
                  handleMobileMenuClick(item.href)
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
