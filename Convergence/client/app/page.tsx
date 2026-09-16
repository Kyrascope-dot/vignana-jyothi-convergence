"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import { AnimatePresence, motion } from "framer-motion"
import { Search, X } from "lucide-react"
import { Instagram } from "@/components/icons"
import { useEffect, useRef, useState } from "react"

import { EVENTS } from "@/data/events"
import { Hero } from "@/components/hero"
import { SiteHeader } from "@/components/site-header"

const DomeGallery = dynamic(() => import("@/components/DomeGallery"), {
  ssr: false,
})
const CircularGallery = dynamic(() => import("@/components/CircularGallery"), {
  ssr: false,
})

const EVENT_CATEGORIES = ["All", "Technical", "Workshops", "Gaming", "Social", "Cultural", "Sports", "Hackathon"]

const EVENTS_PER_PAGE = 8

function getPaginationRange(current: number, total: number): (number | string)[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total]
  }
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total]
  }
  return [1, "...", current - 1, current, current + 1, "...", total]
}

const THEMES = [
  "Robotics & Automation",
  "HealthcareTech & Wellness",
  "Mobility & Logistics",
  "Green Technologies",
  "Enterprise & Fintech",
  "Design & Manufacturing",
  "Smart Living",
  "Tech for Social Good",
]

const THEME_ITEMS = [
  { image: "/themes/robotic-automation.jpeg", text: "Robotics & Automation" },
  { image: "/themes/health-and-wellness.png", text: "HealthcareTech & Wellness" },
  { image: "/themes/mobility-and-logistics.png", text: "Mobility & Logistics" },
  { image: "/themes/green-technologies.jpg", text: "Green Technologies" },
  { image: "/themes/fintech.jpg", text: "Enterprise & Fintech" },
  { image: "/themes/design-and-manufacturing.jpg", text: "Design & Manufacturing" },
  { image: "/themes/smart-living.jpg", text: "Smart Living" },
  { image: "/themes/tech-for-social-good.png", text: "Tech for Social Good" },
]

const FACULTY_COORDINATORS = [
  { name: "Dr T Srinivasa Rao", role: ["Dean-Student Progression"], photoUrl: "/coordinators/dean.png" },
  { name: "Dr. D. Srinivasa Rao", role: ["Sponsorship & Finance", "Web & IT", "Hospitality & Guest Relations"], phone: "+91 9966232722", photoUrl: "/coordinators/srinivasa%20rao.jpeg" },
  { name: "Dr. Y. Chalapathi Rao", role: ["Event Management & Coordination", "Registration & Help Desk"], phone: "+91 9491127967", photoUrl: "/coordinators/chalapatirao.jpeg" },
  { name: "Mrs. E. Lalitha", role: ["PR & Outreach", "Social Media & Content", "Photography & Videography"], phone: "+91 9014355042", photoUrl: "/coordinators/lalitha.jpeg" },
  { name: "Dr. S. Sangeetha", role: ["Sponsorship & Finance", "Logistics & Operations"], phone: "+91 9849575415", photoUrl: "/coordinators/sangeetha.jpeg" },
  { name: "Dr. O. Sobhana", role: ["Design & Creatives", "Social Media & Content", "Documentation"], phone: "+91 9441169927", photoUrl: "/coordinators/sobhana.jpeg" },
]

const EVENT_COORDINATORS = [
  { name: "P Maheshwar", role: ["Web & IT Coordinator"], phone: "+91 9515871625", photoUrl: "/coordinators/mahesh.jpeg" },
  { name: "E. V. Gaurav", role: ["Registrations & Help Desk Coordinator"], phone: "+91 8179590621", photoUrl: "/coordinators/gaurav.jpeg" },
  { name: "Sarvani Divakarla", role: ["Web & IT Coordinator"], phone: "+91 6302944144", photoUrl: "/coordinators/sarvani_divakarla.jpeg" },
  { name: "Naga Sresht", role: ["Web & IT Coordinator"], phone: "+91 8978531856", photoUrl: "/coordinators/naga%20sresht.jpeg" },
]

const DEVELOPERS = [
  {
    name: "Sruthi Sami",
    role: ["Web Dev Team, GDGC"],
    phone: "+91 9866832109",
    photoUrl: "/developers/sruthi.jpg.jpeg",
    instagram: "@sruthisamii",
  },
  {
    name: "Amruth Padmanaban",
    role: ["Web Dev Team, GDGC"],
    phone: "+91 9014714939",
    photoUrl: "/developers/amruth.jpeg",
    instagram: "@p_amruth007",
  },
  {
    name: "Satya Prakash",
    role: ["Web Dev Team, GDGC"],
    phone: "+91 9581056624",
    photoUrl: "/developers/satya prakash.jpeg",
    instagram: "@satyaprakash_2205",
  },
  {
    name: "Vaishnavi Koppakula",
    role: ["Design Team, GDGC"],
    phone: "+91 9642896448",
    photoUrl: "/developers/vaishnavi.PNG",
    instagram: "@vaish_o.0",
  },
  {
    name: "Anjali Kotha",
    role: ["Web Dev Team, GDGC"],
    phone: "+91 9550824115",
    photoUrl: "/developers/anjali.jpeg",
    instagram: "@anjali_kotha_",
  },
  {
    name: "Santosh",
    role: ["Web Dev Team, GDGC"],
    phone: "+91 9182285342",
    photoUrl: "/developers/santosh.jpeg",
    instagram: "@santoshpulikonda",
  },
]

// const FACULTY_COORDINATORS = [
//   { name: "Dr. Y. Chalapathi Rao", phone: "+91 9491127967" },
//   { name: "Mrs. E. Lalitha", phone: "+91 9014355042" },
//   { name: "Dr. S. Sangeetha", phone: "+91 9849575415" },
//   { name: "Dr. D. Srinivasa Rao", phone: "+91 9966232722" },
//   { name: "Dr. O. Sobhana", phone: "+91 9441169927" },
// ]

const CLUB_IMAGES = [
  { src: '/clubs/acm.png', alt: 'ACM' },
  { src: '/clubs/airbots.png', alt: 'Airbots' },
  { src: '/clubs/asma.png', alt: 'Asma' },
  { src: '/clubs/aws.png', alt: 'AWS' },
  { src: '/clubs/candleves.png', alt: 'Candleves' },
  { src: '/clubs/cea.png', alt: 'CEA' },
  { src: '/clubs/creativearts.png', alt: 'Creative Arts' },
  { src: '/clubs/csi.png', alt: 'CSI' },
  { src: '/clubs/dq.png', alt: 'DQ' },
  { src: '/clubs/garuda.png', alt: 'Garuda' },
  { src: '/clubs/ici.png', alt: 'ICI' },
  { src: '/clubs/ieee.png', alt: 'IEEE' },
  { src: '/clubs/gdgc.png', alt: 'GDGC' },
  { src: '/clubs/iete.png', alt: 'IETE' },
  { src: '/clubs/igbc.png', alt: 'IGBC' },
  { src: '/clubs/internetsoc.png', alt: 'Internet Society' },
  { src: '/clubs/ioe.png', alt: 'IOE' },
  { src: '/clubs/isi.png', alt: 'ISI' },
  { src: '/clubs/isie.png', alt: 'ISIE' },
  { src: '/clubs/iste.png', alt: 'ISTE' },
  { src: '/clubs/iucee.png', alt: 'IUCEE' },
  { src: '/clubs/kaksya.png', alt: 'Kaksya' },
  { src: '/clubs/krithomedh.png', alt: 'Krithomedh' },
  { src: '/clubs/mathletes.png', alt: 'Mathletes' },
  { src: '/clubs/mih.png', alt: 'MIH' },
  { src: '/clubs/nss.png', alt: 'NSS' },
  { src: '/clubs/sae.png', alt: 'SAE' },
  { src: '/clubs/sahthivanam.png', alt: 'Sahthivanam' },
  { src: '/clubs/scintillate.png', alt: 'Scintillate' },
  { src: '/clubs/sforce.png', alt: 'Sforce' },
  { src: '/clubs/smc.png', alt: 'SMC' },
  { src: '/clubs/stent.png', alt: 'Stent' },
  { src: '/clubs/th.png', alt: 'TH' },
  { src: '/clubs/toastmasters.png', alt: 'Toastmasters' },
  { src: '/clubs/vjarc.png', alt: 'VJARC' },
  { src: '/clubs/vjstartups.png', alt: 'VJ Startups' },
  { src: '/clubs/vjteatro.png', alt: 'Teatro' },
  { src: '/clubs/vjvibes.png', alt: 'VJ Vibes' },
  { src: '/clubs/voice.png', alt: 'Voice' },
  { src: '/clubs/xplor.png', alt: 'Xplor' },
]

function ContactCard({
  name,
  role,
  phone,
  photoUrl,
  isFaculty,
  isDeveloper,
  instagram,
}: {
  name: string
  role?: string[]
  phone?: string
  photoUrl?: string
  isFaculty?: boolean
  isDeveloper?: boolean
  instagram?: string
}) {
  const parts = name.split(" ")
  const initials = isFaculty
    ? parts[1]
      ? parts[1][0] + (parts[2] ? parts[2][0] : parts[1][1] || "")
      : name[0]
    : parts.length > 1
      ? parts[0][0] + parts[1][0]
      : name[0]

  const passPrefix = isDeveloper ? "DEV" : isFaculty ? "FAC" : "COORD"
  const passId = `${passPrefix}-${name.replace(/[^A-Za-z]/g, "").slice(0, 4).toUpperCase()}`

  return (
    <div className="group relative flex flex-col items-center border-2 border-foreground/20 bg-background/95 p-5 text-center retro-shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-foreground/60 hover:retro-shadow">
      {/* Top lanyard hole / header accent */}
      <div className="mb-3 flex w-full items-center justify-between border-b border-border/80 pb-2.5">
        <span className="font-mono text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
          {isDeveloper ? "GDGC DEV TEAM" : isFaculty ? "FACULTY DESK" : "STUDENT OPERATIONS"}
        </span>
        <div className="h-1.5 w-7 rounded-full bg-foreground/20 ring-1 ring-border" title="Lanyard clip slot" />
        <span className="font-mono text-[9px] font-bold text-red-700 tracking-wider">
          {passId}
        </span>
      </div>

      {/* ID Photo box */}
      {isDeveloper ? (
        <div className="relative mb-3 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border-2 border-foreground/30 bg-[#ddd0aa]/80 shadow-inner">
          {photoUrl ? (
            <div className="relative h-full w-full overflow-hidden rounded-full">
              <Image
                src={photoUrl}
                alt={`${name} photo`}
                fill
                sizes="(max-width: 640px) 96px, 112px"
                className="object-cover object-center"
              />
            </div>
          ) : (
            <span className="font-mono text-2xl font-black tracking-tight text-foreground">
              {initials}
            </span>
          )}
          {/* GDGC Logo badge on bottom-right corner of frame */}
          <div
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground bg-[#ffffff] shadow-md overflow-hidden p-0.5"
            title="Google Developer Groups on Campus • VNRVJIET"
          >
            <div className="relative h-full w-full">
              <Image
                src="/club-gdgc2.png"
                alt="GDGC Logo"
                fill
                sizes="128px"
                className="scale-[5] object-contain"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative mb-3 flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center border-2 border-foreground/30 bg-[#ddd0aa]/80 shadow-inner">
          {photoUrl ? (
            <Image
              src={photoUrl}
              alt={`${name} photo`}
              fill
              sizes="(max-width: 640px) 96px, 112px"
              className="object-cover object-center"
            />
          ) : (
            <span className="font-mono text-2xl font-black tracking-tight text-foreground">
              {initials}
            </span>
          )}
          <span className="pointer-events-none absolute -bottom-1 -right-1 bg-red-700 px-1.5 py-0.5 font-mono text-[8px] font-bold text-[#ede1c5]">
            {isFaculty ? "FAC" : "LEAD"}
          </span>
        </div>
      )}

      <p className="text-sm font-bold tracking-tight text-foreground">{name}</p>

      {/* Role tag chips */}
      <div className="my-2.5 flex min-h-[44px] flex-wrap items-center justify-center content-center gap-1.5">
        {role?.map((r, i) => (
          <span
            key={i}
            className="inline-block h-fit border border-border bg-[#e2d5b0]/60 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wide text-foreground/90 leading-tight"
          >
            {r}
          </span>
        ))}
      </div>

      {/* Contact links */}
      <div className="mt-auto flex w-full flex-col items-center gap-1.5 border-t border-dashed border-border/80 pt-2.5">
        {phone && (
          <a
            href={`tel:${phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-red-700"
          >
            <span aria-hidden className="font-bold text-red-700">☎</span>
            <span className="tracking-wider">{phone}</span>
          </a>
        )}

        {isDeveloper && instagram && (
          <a
            href={`https://instagram.com/${instagram.replace(/^@/, "")}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-red-700"
          >
            <Instagram className="h-3 w-3 text-red-700" />
            <span className="tracking-wider">{instagram.startsWith("@") ? instagram : `@${instagram}`}</span>
          </a>
        )}
      </div>

      {/* Retro barcode lines at bottom */}
      <div className="mt-3 flex h-2.5 w-full items-center justify-center gap-[2px] opacity-40 transition-opacity group-hover:opacity-75">
        <span className="h-full w-1 bg-foreground" />
        <span className="h-full w-[2px] bg-foreground" />
        <span className="h-full w-[1px] bg-foreground" />
        <span className="h-full w-[3px] bg-foreground" />
        <span className="h-full w-[1px] bg-foreground" />
        <span className="h-full w-[2px] bg-foreground" />
        <span className="h-full w-1 bg-foreground" />
        <span className="h-full w-[1px] bg-foreground" />
        <span className="h-full w-[3px] bg-foreground" />
        <span className="h-full w-[2px] bg-foreground" />
        <span className="h-full w-1 bg-foreground" />
      </div>
    </div>
  )
}

function EventSearch({
  value,
  onChange,
  onClear,
}: {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}) {
  return (
    <div className="mx-auto mb-10 max-w-xl">
      <div className="relative flex items-center border-2 border-foreground/35 bg-background/95 retro-shadow-sm transition-all focus-within:border-foreground focus-within:retro-shadow">
        {/* Search Icon */}
        <div className="flex items-center justify-center pl-3.5 pr-1 text-foreground/60">
          <Search className="h-4 w-4" />
        </div>

        {/* Input */}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search events by name or category..."
          suppressHydrationWarning
          className="w-full bg-transparent py-3 pl-2 pr-14 font-mono text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />

        {/* Action Button / Badge */}
        <div className="absolute right-2.5 flex items-center">
          {value ? (
            <button
              type="button"
              onClick={onClear}
              suppressHydrationWarning
              className="retro-btn flex items-center gap-1 border border-foreground/70 bg-background px-2 py-1 font-mono text-[11px] font-bold text-foreground hover:bg-foreground hover:text-background"
              aria-label="Clear search"
            >
              <span>CLEAR</span>
              <X className="h-3 w-3" />
            </button>
          ) : (
            <span className="hidden border border-border/80 bg-foreground/5 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-muted-foreground sm:inline-block">
              SEARCH
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [selectedCategory, setSelectedCategory] = useState(EVENT_CATEGORIES[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreditHovered, setIsCreditHovered] = useState(false)
  const [isCreditPinned, setIsCreditPinned] = useState(false)
  const creditRef = useRef<HTMLDivElement>(null)

  const isCreditOpen = isCreditHovered || isCreditPinned

  const toggleCredit = () => {
    if (isCreditOpen) {
      setIsCreditPinned(false)
      setIsCreditHovered(false)
    } else {
      setIsCreditPinned(true)
    }
  }

  const scrollToDevelopers = (e?: React.MouseEvent | React.KeyboardEvent) => {
    e?.preventDefault()
    e?.stopPropagation()
    setIsCreditPinned(false)
    setIsCreditHovered(false)
    const el = document.getElementById("developers")
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    } else {
      window.location.hash = "developers"
    }
  }

  useEffect(() => {
    if (!isCreditOpen) return
    const handleOutsidePointer = (e: PointerEvent) => {
      if (creditRef.current && !creditRef.current.contains(e.target as Node)) {
        setIsCreditPinned(false)
        setIsCreditHovered(false)
      }
    }
    document.addEventListener("pointerdown", handleOutsidePointer)
    return () => document.removeEventListener("pointerdown", handleOutsidePointer)
  }, [isCreditOpen])

  const isSearching = searchQuery.trim().length > 0
  const filteredEvents = isSearching
    ? EVENTS.filter((event) => {
      const query = searchQuery.trim().toLowerCase()
      return (
        event.name.toLowerCase().includes(query) ||
        event.category.toLowerCase().includes(query)
      )
    })
    : EVENTS.filter(
      (event) => event.category === selectedCategory || selectedCategory === "All"
    )

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / EVENTS_PER_PAGE))
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE
  const endIndex = Math.min(startIndex + EVENTS_PER_PAGE, filteredEvents.length)
  const paginatedEvents = filteredEvents.slice(startIndex, endIndex)

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1)
    }
  }, [currentPage, totalPages])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
    const eventsSection = document.getElementById("events")
    if (eventsSection) {
      const headerOffset = 85
      const elementPosition = eventsSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  const categoryCounts = EVENT_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "All" ? EVENTS.length : EVENTS.filter((e) => e.category === cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="relative min-h-screen bg-background text-foreground retro-grid-bg selection:bg-red-700 selection:text-[#ede1c5]">
      <SiteHeader />

      <main>
        <Hero />

        {/* EVENTS SECTION */}
        <section id="events" className="relative border-b-2 border-foreground/15 py-20 scroll-mt-16 md:scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-2 flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest text-red-700 uppercase">
              <span>[ ARCHIVE // EVENT DIRECTORY ]</span>
            </div>
            <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Events
            </h2>
            <p className="mx-auto mb-8 max-w-lg text-center font-mono text-xs text-muted-foreground">
              Filter by category or search through 40+ competitions, workshops, and flagship challenges.
            </p>

            <EventSearch
              value={searchQuery}
              onChange={(query) => {
                setSearchQuery(query)
                setCurrentPage(1)
              }}
              onClear={() => {
                setSearchQuery("")
                setCurrentPage(1)
              }}
            />

            <div className="flex flex-col border-2 border-foreground/20 bg-background/90 md:flex-row retro-shadow">
              {/* CATEGORY SIDEBAR */}
              <div className="border-b-2 border-foreground/20 p-6 md:sticky md:top-20 md:w-1/3 md:self-start md:border-b-0 md:border-r-2 bg-[#e8dbbc]/40">
                <div className="mb-4 flex items-center justify-between border-b border-border/80 pb-2">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Categories
                  </p>
                  <span className="font-mono text-[10px] text-red-700 font-bold">
                    INDEX [{EVENT_CATEGORIES.length}]
                  </span>
                </div>
                <ul className="space-y-2 font-mono text-xs">
                  {EVENT_CATEGORIES.map((category) => {
                    const isSelected = selectedCategory === category && !isSearching
                    const count = categoryCounts[category] || 0
                    return (
                      <li key={category}>
                        <button
                          type="button"
                          suppressHydrationWarning
                          onClick={() => {
                            setSelectedCategory(category)
                            setSearchQuery("")
                            setCurrentPage(1)
                          }}
                          className={`group flex w-full items-center justify-between border-2 px-3 py-2.5 text-left transition-all ${isSelected
                            ? "border-foreground bg-foreground text-background retro-shadow-sm"
                            : "border-border/80 bg-background/70 text-foreground hover:border-foreground/60 hover:bg-foreground/5"
                            }`}
                        >
                          <span className="flex items-center gap-2">
                            <span
                              className={`inline-block h-1.5 w-1.5 ${isSelected ? "bg-red-500" : "bg-muted-foreground/40 group-hover:bg-red-700"
                                }`}
                            />
                            <span className="font-bold tracking-wider uppercase">{category}</span>
                          </span>
                          <span
                            className={`font-mono text-[11px] ${isSelected ? "font-bold text-red-400" : "text-muted-foreground"
                              }`}
                          >
                            [{String(count).padStart(2, "0")}]
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* EVENTS GRID */}
              <div className="flex-1 p-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-border/80 pb-3">
                  <p className="font-mono text-xs font-bold uppercase tracking-widest text-foreground">
                    {isSearching
                      ? `QUERY: "${searchQuery}" // MATCHES: ${filteredEvents.length}`
                      : `${selectedCategory} Events [${filteredEvents.length}]`}
                    {filteredEvents.length > 0 && (
                      <span className="ml-2 text-red-700">
                        // PAGE {currentPage} OF {totalPages}
                      </span>
                    )}
                  </p>
                  {isSearching && (
                    <button
                      type="button"
                      suppressHydrationWarning
                      onClick={() => {
                        setSearchQuery("")
                        setCurrentPage(1)
                      }}
                      className="border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
                    >
                      Clear query [ESC]
                    </button>
                  )}
                </div>

                {filteredEvents.length > 0 ? (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {paginatedEvents.map((event, index) => (
                        <div
                          key={event.id}
                          className="group relative flex flex-col border-2 border-foreground/20 bg-background p-4 retro-shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-foreground/70 hover:retro-shadow"
                        >
                          {/* Ticket pass top header */}
                          <div className="mb-2.5 flex items-center justify-between border-b border-border/80 pb-2">
                            <span className="font-mono text-[10px] font-bold tracking-widest text-red-700 uppercase">
                              PASS #{String(startIndex + index + 1).padStart(3, "0")}
                            </span>
                            <span className="border border-foreground/30 bg-[#ddd0aa]/60 px-2 py-0.5 font-mono text-[9px] font-bold tracking-wider text-foreground uppercase">
                              {event.category}
                            </span>
                          </div>

                          {/* Event poster or custom event labels */}
                          <div className="relative aspect-video w-full overflow-hidden border border-foreground/20 bg-black/5">
                            {event.type === "custom" ? (
                              <div className="flex h-full flex-col justify-center gap-2 p-3">
                                {event.subItems?.map((item) => (
                                  <div
                                    key={item}
                                    className={`border border-border bg-background/70 px-3 py-2 font-mono text-xs text-muted-foreground ${event.subItems?.length === 1 ? "mx-auto w-fit" : "w-full"
                                      }`}
                                  >
                                    {item}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <Image
                                src={event.posterUrl ?? ""}
                                alt={event.name}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, 33vw"
                              />
                            )}
                          </div>

                          {/* Perforated ticket divider */}
                          <div className="relative my-3 flex items-center">
                            <span className="w-full border-t-2 border-dashed border-border/80" />
                          </div>

                          {/* Details */}
                          <div className="flex flex-1 flex-col justify-between gap-3">
                            <h3 className="line-clamp-2 text-base font-bold tracking-tight text-foreground">
                              {event.name}
                            </h3>

                            {event.category !== "Social" && event.regLink && event.regLink !== "SPOT" && (
                              <div className="pt-2">
                                <a
                                  href={event.regLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="retro-btn flex w-full items-center justify-center gap-2 border-2 border-foreground bg-red-700 px-4 py-2 font-mono text-xs font-bold tracking-wider text-[#ede1c5] uppercase transition-colors hover:bg-red-800"
                                >
                                  <span>Register Here</span>
                                  <span aria-hidden className="text-[10px]">▶</span>
                                </a>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* PAGINATION BAR */}
                    {totalPages > 1 && (
                      <nav
                        aria-label="Events pagination"
                        className="mt-8 flex flex-col items-center justify-center gap-4 border-2 border-foreground/20 bg-[#e8dbbc]/50 p-3.5 retro-shadow-sm sm:flex-row sm:p-4"
                      >

                        {/* Navigation controls */}
                        <div className="flex flex-wrap items-center justify-center gap-1.5 font-mono">
                          {/* PREV */}
                          <button
                            type="button"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`retro-btn flex h-8 items-center gap-1 border-2 border-foreground px-3 font-mono text-xs font-bold uppercase transition-all ${currentPage === 1
                              ? "opacity-35 cursor-not-allowed bg-background/50 text-muted-foreground border-foreground/30"
                              : "bg-background text-foreground hover:bg-foreground hover:text-background"
                              }`}
                            aria-label="Previous page"
                          >
                            <span aria-hidden>◀</span>
                            <span className="hidden sm:inline">PREV</span>
                          </button>

                          {/* Page Numbers */}
                          {getPaginationRange(currentPage, totalPages).map((item, idx) => {
                            if (item === "...") {
                              return (
                                <span
                                  key={`ellipsis-${idx}`}
                                  className="flex h-8 min-w-[28px] items-center justify-center font-mono text-xs font-bold text-muted-foreground select-none"
                                >
                                  ...
                                </span>
                              )
                            }

                            const pageNum = item as number
                            const isCurrent = pageNum === currentPage

                            return (
                              <button
                                key={pageNum}
                                type="button"
                                onClick={() => handlePageChange(pageNum)}
                                aria-current={isCurrent ? "page" : undefined}
                                aria-label={`Page ${pageNum}`}
                                className={`retro-btn flex h-8 min-w-[34px] items-center justify-center border-2 px-2.5 font-mono text-xs font-bold transition-all ${isCurrent
                                  ? "border-foreground bg-red-700 text-[#ede1c5] retro-shadow-sm font-black scale-105"
                                  : "border-border/90 bg-background/80 text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
                                  }`}
                              >
                                {String(pageNum).padStart(2, "0")}
                              </button>
                            )
                          })}

                          {/* NEXT */}
                          <button
                            type="button"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`retro-btn flex h-8 items-center gap-1 border-2 border-foreground px-3 font-mono text-xs font-bold uppercase transition-all ${currentPage === totalPages
                              ? "opacity-35 cursor-not-allowed bg-background/50 text-muted-foreground border-foreground/30"
                              : "bg-background text-foreground hover:bg-foreground hover:text-background"
                              }`}
                            aria-label="Next page"
                          >
                            <span className="hidden sm:inline">NEXT</span>
                            <span aria-hidden>▶</span>
                          </button>
                        </div>
                      </nav>
                    )}
                  </>
                ) : (
                  <div className="border-2 border-dashed border-border/80 py-16 text-center">
                    <p className="font-mono text-sm text-muted-foreground">
                      {isSearching
                        ? `[!] NO_RESULTS: No events found matching "${searchQuery}"`
                        : "[!] NO_EVENTS: No events listed in this category yet"}
                    </p>
                    {isSearching && (
                      <button
                        type="button"
                        suppressHydrationWarning
                        onClick={() => {
                          setSearchQuery("")
                          setCurrentPage(1)
                        }}
                        className="mt-4 border-2 border-foreground bg-foreground px-4 py-1.5 font-mono text-xs font-bold text-background transition-colors hover:bg-red-700 hover:border-red-700"
                      >
                        Reset search filters
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* THEMES SECTION */}
        <section id="themes" className="relative border-b-2 border-foreground/15 py-20 scroll-mt-16 md:scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-2 flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest text-red-700 uppercase">
              <span>[ ARCHIVE // 08 CURATED TRACKS ]</span>
            </div>
            <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Themes & Tracks
            </h2>
            <p className="mb-8 text-center font-mono text-xs text-muted-foreground">
              Explore the specialized innovation tracks for this year&apos;s edition
            </p>
          </div>

          {/* Viewfinder HUD Container */}
          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative h-[600px] w-full overflow-hidden border-2 border-foreground/25 bg-[#e4d7b8]/40 retro-shadow md:h-[700px]">
              {/* Corner HUD markers */}
              <span className="pointer-events-none absolute top-3 left-3 z-10 font-mono text-[11px] font-bold text-foreground/60">
                ⌜ 01 // NORTH
              </span>
              <span className="pointer-events-none absolute top-3 right-3 z-10 font-mono text-[11px] font-bold text-foreground/60">
                FOV: 45° ⌝
              </span>
              <span className="pointer-events-none absolute bottom-3 left-3 z-10 font-mono text-[11px] font-bold text-foreground/60">
                ⌞ 360° CYLINDER
              </span>
              <span className="pointer-events-none absolute bottom-3 right-3 z-10 font-mono text-[11px] font-bold text-foreground/60">
                CONVERGENCE 2K26 ⌟
              </span>

              {/* Top Viewfinder Badge */}
              <div className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center">
                <span className="border border-border/80 bg-background/90 px-3 py-0.5 font-mono text-[10px] tracking-widest text-muted-foreground uppercase shadow-xs">
                  DIAL-A-TRACK // CYLINDRICAL VIEWPORT
                </span>
              </div>

              <CircularGallery
                items={THEME_ITEMS}
                bend={2.4}
                textColor="#171412"
                borderRadius={0.05}
                scrollEase={0.03}
                font="700 20px 'Geist Mono', monospace"
              />

              {/* Bottom Tuner Bar Hint */}
              <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center">
                <span className="border-2 border-foreground/50 bg-background px-4 py-1.5 font-mono text-xs font-bold tracking-widest text-foreground retro-shadow-sm uppercase">
                  ◄◄ DRAG OR SCROLL TO TUNE TRACKS ►►
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ORGANISED BY / CLUBS SECTION */}
        <section id="clubs" className="relative border-b-2 border-foreground/15 py-20 scroll-mt-16 md:scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <div className="mb-2 flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest text-red-700 uppercase">
              <span>[ COMMUNITY ALLIANCE // 55 CHAPTERS ]</span>
            </div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Organisers
            </h2>
            <p className="mx-auto mb-10 max-w-xl font-mono text-xs text-muted-foreground">
              Convergence 2K26 is brought to you by 55 student clubs and technical societies working together to create an unforgettable experience
            </p>

            <div className="mt-4 w-full" style={{ height: '400px' }}>
              <DomeGallery
                images={CLUB_IMAGES}
                fit={0.6}
                fitBasis="auto"
                minRadius={500}
                maxRadius={800}
                overlayBlurColor="#000000"
                imageBorderRadius="20px"
                openedImageBorderRadius="20px"
                openedImageWidth="500px"
                openedImageHeight="500px"
                grayscale={false}
                dragSensitivity={18}
                maxVerticalRotationDeg={8}
                segments={35}
                dragDampening={2}
                hideOverlays={true}
              />
            </div>
            <p className="mt-6 font-mono text-xs font-bold tracking-wider text-muted-foreground uppercase">
              [ ◄ DRAG DOME TO EXPLORE • CLICK SPHERE TO ENLARGE ► ]
            </p>
          </div>
        </section>

        {/* COORDINATORS & CONTACT SECTION */}
        <section id="contact" className="relative border-b-2 border-foreground/15 py-20 scroll-mt-16 md:scroll-mt-20">
          <div className="mx-auto max-w-6xl space-y-16 px-6">
            <div>
              <div className="mb-2 flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest text-red-700 uppercase">
                <span>[ DIRECTORY // FACULTY SUPERVISORS ]</span>
              </div>
              <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Faculty Coordinators
              </h2>
              <p className="mb-8 text-center font-mono text-xs text-muted-foreground">
                Official faculty committee directing operations and coordination.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {FACULTY_COORDINATORS.map((person, i) => (
                  <ContactCard key={i} {...person} isFaculty={true} />
                ))}
              </div>
            </div>

            <div className="border-t-2 border-dashed border-border/80 pt-16">
              <div className="mb-2 flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest text-red-700 uppercase">
                <span>[ HOTLINE // STUDENT COORDINATORS ]</span>
              </div>
              <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Contact Us
              </h2>
              <p className="mb-8 text-center font-mono text-xs text-muted-foreground">
                Get in direct touch with student leads for immediate assistance.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {EVENT_COORDINATORS.map((person, i) => (
                  <ContactCard key={i} {...person} />
                ))}
              </div>
            </div>

            {/* DEVELOPERS SECTION */}
            <div id="developers" className="border-t-2 border-dashed border-border/80 pt-16 scroll-mt-20 md:scroll-mt-24">
              <div className="mb-2 flex items-center justify-center gap-2 font-mono text-xs font-bold tracking-widest text-red-700 uppercase">
                <span>[ TERMINAL // CORE DEVELOPERS ]</span>
              </div>
              <h2 className="mb-2 text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Development Team
              </h2>
              <div className="mb-3 flex items-center justify-center gap-2 font-mono text-xs text-muted-foreground">
                <span>Engineered with passion by</span>
                <span className="inline-flex items-center gap-1.5 font-bold text-foreground">
                  <span className="relative flex h-6 w-6 overflow-hidden rounded-full border-2 border-foreground bg-white p-0.5 shadow-sm">
                    <span className="relative h-full w-full">
                      <Image
                        src="/club-gdgc2.png"
                        alt="GDGC"
                        fill
                        className="scale-[5] object-contain"
                      />
                    </span>
                  </span>
                  Google Developer Groups on Campus
                </span>
                <span className="hidden sm:inline">• VNRVJIET</span>
              </div>
              <p className="mb-8 text-center font-mono text-[11px] text-muted-foreground">
                The minds and hands behind the Convergence 2K26 digital platform.
              </p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {DEVELOPERS.map((person, i) => (
                  <ContactCard key={i} {...person} isDeveloper={true} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-foreground/15 bg-background">
        <motion.div
          className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 text-sm text-muted-foreground"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          {/* Colophon readout */}
          <div className="flex flex-wrap items-center justify-center gap-3 border-b border-border/80 pb-4 text-center font-mono text-xs">
            <span className="flex items-center gap-1.5 font-bold text-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              SYS_STATUS: ONLINE
            </span>
            <span className="text-border">|</span>
            <span>CONVERGENCE 2K26</span>
            <span className="text-border">|</span>
            <span>VNR VJIET, HYDERABAD</span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="font-mono text-xs uppercase tracking-widest"
          >
            Connect With The Network
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.18 } },
            }}
          >
            {[
              { label: "INSTAGRAM", href: "https://www.instagram.com/convergence2k26_vnrvjiet/" },
              { label: "EMAIL", href: "mailto:convergence@vnrvjiet.in" },
              { label: "LINKEDIN", href: "https://www.linkedin.com/school/vnrvjiethyd/home/" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="retro-btn border-2 border-foreground/30 bg-background px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-foreground uppercase hover:border-red-700 hover:bg-red-700 hover:text-[#ede1c5] transition-colors"
              >
                [ {social.label} ]
              </motion.a>
            ))}
          </motion.div>

          <p className="mt-4 text-center font-mono text-[10px] tracking-wide text-muted-foreground/80">
            © 2026 CONVERGENCE • VNR VIGNANA JYOTHI INSTITUTE OF ENGINEERING AND TECHNOLOGY
          </p>
        </motion.div>
      </footer>

      {/* FLOATING GDGC VOLUNTEER BADGE */}
      <div
        ref={creditRef}
        className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7"
        onMouseEnter={() => {
          if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
            setIsCreditHovered(true)
          }
        }}
        onMouseLeave={() => {
          if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
            setIsCreditHovered(false)
          }
        }}
      >
        <AnimatePresence>
          {isCreditOpen && (
            <motion.div
              initial={{ opacity: 0, x: 16, scale: 0.94 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.94 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              role="button"
              tabIndex={0}
              onClick={scrollToDevelopers}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  scrollToDevelopers(e)
                }
              }}
              title="Click to view Development Team"
              className="group absolute bottom-1 right-16 w-max max-w-[calc(100vw-7rem)] cursor-pointer border-2 border-foreground bg-background p-3 font-mono text-xs retro-shadow transition-all duration-150 hover:-translate-y-0.5 hover:border-red-700 select-none"
            >
              <div className="mb-1.5 flex items-center justify-between border-b border-border pb-1 font-mono text-[10px] font-bold text-red-700 tracking-wider uppercase">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 bg-red-700" />
                  <span>DEV_TERMINAL // CREDITS</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsCreditPinned(false)
                    setIsCreditHovered(false)
                  }}
                  aria-label="Close credits"
                  className="ml-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  [✕]
                </button>
              </div>
              <p className="font-bold text-foreground transition-colors group-hover:text-red-700">
                Developed by GDGC Web Dev Team
              </p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">
                Google Developer Groups on Campus • VNRVJIET
              </p>

              {/* Intuitive Call-to-Action */}
              <div className="mt-2.5 flex items-center justify-between rounded border border-red-700/30 bg-red-700/10 px-2 py-1 font-mono text-[10px] font-bold text-red-700 transition-colors group-hover:bg-red-700 group-hover:text-[#ede1c5]">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block animate-pulse">▶</span>
                  <span>MEET THE TEAM</span>
                </span>
                <span className="font-bold transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button
          type="button"
          aria-label="Toggle development credit"
          title="Developer credits"
          aria-expanded={isCreditOpen}
          suppressHydrationWarning
          onClick={toggleCredit}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="retro-btn relative flex h-13 w-13 items-center justify-center overflow-hidden rounded-md border-2 border-foreground bg-[#ffffff] p-1.5 shadow-md outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-primary"
        >
          <div className="relative h-[160px] w-[160px] overflow-hidden">
            <Image
              src="/club-gdgc2.png"
              alt="GDGC logo"
              fill
              sizes="128px"
              className="object-cover object-center"
            />
          </div>
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-500 ring-1 ring-black" title="System Dev Status" />
        </motion.button>
      </div>
    </div>
  )
}