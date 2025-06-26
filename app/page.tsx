"use client"

import dynamic from "next/dynamic"

const Portfolio = dynamic(() => import("@/components/Portfolio"), { 
  ssr: false,
  loading: () => <div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>
})

export default function Page() {
  return <Portfolio />
}