"use client"

import { useAccount, useBalance, useDisconnect } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { LogOut } from "lucide-react"

export const WalletConnectSection = () => {
    const { address, isConnected } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: balance } = useBalance({
        address: address,
    })

    const [showLogoutModal, setShowLogoutModal] = useState(false)

    const handleDisconnect = () => {
        disconnect()
        setShowLogoutModal(true)
        // Auto-close after 3 seconds
        setTimeout(() => setShowLogoutModal(false), 3000)
    }

    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isConnected && sectionRef.current) {
            gsap.fromTo(
                sectionRef.current.children,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, stagger: 0.1 }
            )
        }
    }, [isConnected])

    return (
        <section
            id="wallet-connect-section"
            className="py-20 px-4 flex flex-col items-center justify-center "
        >
            <div ref={sectionRef} className="max-w-4xl w-full flex flex-col items-center gap-8">
                <h2 className="text-3xl font-bold text-foreground">Connect Your Wallet</h2>

                <div className="scale-110 flex flex-col items-center gap-4">
                    <ConnectButton
                        showBalance={false}
                        accountStatus={{
                            smallScreen: 'avatar',
                            largeScreen: 'full',
                        }}
                    />

                    {isConnected && (
                        <button
                            onClick={handleDisconnect}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-colors mt-2"
                        >
                            <LogOut className="w-4 h-4" />
                            Disconnect Wallet
                        </button>
                    )}
                </div>

                {isConnected && balance && (
                    <div className="mt-8 p-6 bg-card border border-border rounded-2xl shadow-sm w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Current Balance</span>
                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                                {balance.symbol}
                            </span>
                        </div>
                        <p className="text-4xl font-bold text-foreground">
                            {Number(balance.formatted).toFixed(4)}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                            Available for transaction fees
                        </p>
                    </div>
                )}
            </div>
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-background border border-border rounded-3xl p-8 shadow-lg">
                        <h3 className="text-xl font-bold text-foreground mb-4">Logged Out</h3>
                        <p className="text-muted-foreground">You have successfully disconnected your wallet.</p>
                    </div>
                </div>
            )}
        </section>
    )
}
