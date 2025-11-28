"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccount } from "wagmi"
import { Hero } from "@/components/Hero"
import { WalletConnectSection } from "@/components/WalletConnectSection"

export default function Home() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (isMounted && isConnected) {
      router.push("/tracker")
    }
  }, [isConnected, router, isMounted])

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      <Hero />
      <WalletConnectSection />

      {/* Simple Footer */}
      <footer className="py-8 text-center text-muted-foreground text-sm border-t border-border/50">
        <p>© 2024 MilkTracker. Built on Flare Network.</p>
      </footer>
    </main>
  )
}
