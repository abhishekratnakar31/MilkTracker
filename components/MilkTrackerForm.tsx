"use client"

import { useState, useRef, useEffect } from "react"
import { useMilkTracker } from "@/hooks/useContract"
import { gsap } from "gsap"
import { Loader2, CheckCircle2, XCircle, Milk, Building2 } from "lucide-react"
import { useAccount } from "wagmi"

interface MilkTrackerFormProps {
    prefillFarm?: string | null
}

export const MilkTrackerForm = ({ prefillFarm }: MilkTrackerFormProps) => {
    const { isConnected } = useAccount()
    const [sourceFarm, setSourceFarm] = useState("")
    const [quantity, setQuantity] = useState("")
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    useEffect(() => {
        if (prefillFarm) {
            setSourceFarm(prefillFarm)
            // Scroll to form when prefilled
            const formEl = document.getElementById("milk-tracker-form")
            if (formEl) formEl.scrollIntoView({ behavior: "smooth" })
        }
    }, [prefillFarm])

    const { actions, state } = useMilkTracker()
    const formRef = useRef<HTMLDivElement>(null)

    // Animation on mount
    useEffect(() => {
        if (isConnected && formRef.current) {
            gsap.fromTo(
                formRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" }
            )
        }
    }, [isConnected])

    const handleAddBatch = async () => {
        if (!sourceFarm || !quantity) return
        try {
            await actions.addBatch(sourceFarm, Number(quantity))
            setSourceFarm("")
            setQuantity("")
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 5000)
        } catch (err) {
            console.error("Error:", err)
            setShowError(true)
            setTimeout(() => setShowError(false), 5000)
        }
    }

    if (!isConnected) return null

    const canAdd = sourceFarm && quantity && Number(quantity) > 0

    return (
        <section className="py-20 px-4 bg-background">
            <div className="max-w-xl mx-auto relative">

                {/* Main Form Card */}
                <div
                    id="milk-tracker-form"
                    ref={formRef}
                    className="bg-card border border-border rounded-3xl shadow-xl p-8 md:p-10 relative overflow-hidden"
                >
                    {/* Decorative background element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/30 rounded-bl-full -mr-8 -mt-8" />

                    <h2 className="text-3xl font-bold text-foreground mb-8 flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-xl text-primary">
                            <Milk className="w-6 h-6" />
                        </div>
                        New Batch Entry
                    </h2>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Source Farm Name</label>
                            <div className="relative group">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="e.g. Green Valley Farm"
                                    value={sourceFarm}
                                    onChange={(e) => setSourceFarm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-secondary/10 border border-transparent rounded-xl text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-muted-foreground ml-1">Quantity (Liters)</label>
                            <div className="relative group">
                                <Milk className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <input
                                    type="number"
                                    placeholder="0.00"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    min="1"
                                    className="w-full pl-12 pr-4 py-4 bg-secondary/10 border border-transparent rounded-xl text-foreground placeholder-muted-foreground/50 focus:outline-none focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleAddBatch}
                                disabled={state.isLoading || state.isPending || !canAdd}
                                className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-lg hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg transition-all flex items-center justify-center gap-2"
                            >
                                {state.isLoading || state.isPending ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Submit Batch Record"
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Success Popup */}
                {showSuccess && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-background border border-border rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">Batch Recorded!</h3>
                            <p className="text-muted-foreground mb-6">
                                The milk batch has been successfully added to the blockchain.
                            </p>
                            <button
                                onClick={() => setShowSuccess(false)}
                                className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}

                {/* Error Popup */}
                {showError && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
                        <div className="bg-background border border-red-200 rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
                            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <XCircle className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground mb-2">Transaction Failed</h3>
                            <p className="text-muted-foreground mb-6">
                                {state.error?.message || "Something went wrong. Please try again."}
                            </p>
                            <button
                                onClick={() => setShowError(false)}
                                className="w-full py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}
