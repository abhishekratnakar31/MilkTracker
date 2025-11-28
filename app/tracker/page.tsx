"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAccount, useDisconnect } from "wagmi"
import { MilkTrackerForm } from "@/components/MilkTrackerForm"
import { BatchList } from "@/components/BatchList"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { ArrowLeft, LogOut } from "lucide-react"

export default function TrackerPage() {
    const [repurchaseFarm, setRepurchaseFarm] = useState<string | null>(null)
    const { isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const router = useRouter()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        if (isMounted && !isConnected) {
            router.push("/")
        }
    }, [isConnected, router, isMounted])

    if (!isMounted) return null

    if (!isConnected) {
        return null // Or a loading spinner while redirecting
    }

    return (
        <main className="min-h-screen bg-background selection:bg-primary/20 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-6 rounded-3xl border border-border shadow-sm">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/")}
                            className="p-2 hover:bg-secondary rounded-full transition-colors"
                            title="Back to Home"
                        >
                            {/* <ArrowLeft className="w-6 h-6 text-foreground" /> */}
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">Milk<span className="text-primary">Tracker</span> Dashboard</h1>
                            <p className="text-sm text-muted-foreground">Manage your milk batches on-chain</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <ConnectButton showBalance={true} />
                        <button
                            onClick={() => disconnect()}
                            className="p-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-full transition-colors"
                            title="Disconnect Wallet"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                    {/* Form Section */}
                    <MilkTrackerForm prefillFarm={repurchaseFarm} />

                    {/* List Section */}
                    <BatchList onRepurchase={setRepurchaseFarm} />
                </div>
            </div>
        </main>
    )
}
