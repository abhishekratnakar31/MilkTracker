"use client"

import { useState } from "react"
import { useMilkTracker } from "@/hooks/useContract"
import { useAccount } from "wagmi"
import { Package, Calendar, Droplets, Building2, History, RefreshCw, XCircle, Clock } from "lucide-react"
import Lottie from "lottie-react"

// Simple Lottie animation data (placeholder for a milk/farm animation)
const lottieData = {
    v: "5.5.7",
    fr: 29.9700012207031,
    ip: 0,
    op: 60.0000024438501,
    w: 512,
    h: 512,
    nm: "Milk Bottle",
    ddd: 0,
    assets: [],
    layers: [{
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Circle",
        sr: 1,
        ks: {
            o: { a: 0, k: 100, ix: 11 },
            r: { a: 0, k: 0, ix: 10 },
            p: { a: 0, k: [256, 256, 0], ix: 2 },
            a: { a: 0, k: [0, 0, 0], ix: 1 },
            s: { a: 1, k: [{ i: { x: [0.667, 0.667, 0.667], y: [1, 1, 1] }, o: { x: [0.333, 0.333, 0.333], y: [0, 0, 0] }, t: 0, s: [0, 0, 100] }, { t: 60.0000024438501, s: [100, 100, 100] }], ix: 6 }
        },
        ao: 0,
        shapes: [{
            ty: "gr",
            it: [{
                d: 1,
                ty: "el",
                s: { a: 0, k: [200, 200], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                nm: "Ellipse Path 1",
                mn: "ADBE Vector Shape - Ellipse",
                hd: false
            }, {
                ty: "fl",
                c: { a: 0, k: [0.545, 0.369, 0.235, 1], ix: 4 }, // #8B5E3C (Primary color)
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: "Fill 1",
                mn: "ADBE Vector Graphic - Fill",
                hd: false
            }, {
                ty: "tr",
                p: { a: 0, k: [0, 0], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: "Transform"
            }],
            nm: "Ellipse 1",
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false
        }],
        ip: 0,
        op: 60.0000024438501,
        st: 0,
        bm: 0
    }]
}

interface BatchListProps {
    onRepurchase: (farmName: string) => void
}

export const BatchList = ({ onRepurchase }: BatchListProps) => {
    const { isConnected } = useAccount()
    const { data } = useMilkTracker()
    const [showHistory, setShowHistory] = useState(false)

    if (!isConnected) return null

    return (
        <section className="pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Stats Card with Lottie */}
                    <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110 duration-500" />
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-primary-foreground/80 font-medium mb-2 uppercase tracking-wider text-sm">Total Batches</p>
                                <p className="text-5xl font-bold">{data.totalBatches}</p>
                            </div>
                            <div className="w-16 h-16 opacity-80">
                                <Lottie animationData={lottieData} loop={true} />
                            </div>
                        </div>
                        <button
                            onClick={() => setShowHistory(true)}
                            className="mt-8 flex items-center gap-2 text-sm font-medium text-primary-foreground/80 hover:text-white transition-colors"
                        >
                            <History className="w-4 h-4" />
                            View Full History
                        </button>
                    </div>

                    {/* Latest Batch Card (Static) */}
                    <div className="bg-card border border-border rounded-3xl p-8 shadow-lg relative overflow-hidden">
                        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            Most Recent Batch
                        </h3>

                        {data.lastBatch ? (
                            <div className="space-y-4">
                                <div className="flex items-start justify-between pb-4 border-b border-border/50">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-1">Source Farm</p>
                                        <p className="font-semibold text-foreground text-lg">{data.lastBatch.sourceFarm}</p>
                                    </div>
                                    <div className="bg-secondary/20 p-2 rounded-lg">
                                        <Building2 className="w-5 h-5 text-secondary-foreground" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-50 p-2 rounded-lg">
                                            <Droplets className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Quantity</p>
                                            <p className="font-semibold text-foreground">{data.lastBatch.quantityLiters} L</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="bg-orange-50 p-2 rounded-lg">
                                            <Calendar className="w-5 h-5 text-orange-500" />
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Recorded</p>
                                            <p className="font-semibold text-foreground">
                                                {new Date(Number(data.lastBatch.timestamp) * 1000).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-32 flex flex-col items-center justify-center text-muted-foreground">
                                <Package className="w-8 h-8 mb-2 opacity-50" />
                                <p>No batches recorded yet</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Full History Modal */}
            {showHistory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-background border border-border rounded-3xl shadow-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-2xl font-bold text-foreground flex items-center gap-2">
                                <Clock className="w-6 h-6 text-primary" />
                                Transaction History
                            </h3>
                            <button
                                onClick={() => setShowHistory(false)}
                                className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
                            >
                                <XCircle className="w-6 h-6 text-muted-foreground" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {data.recentBatches.length > 0 ? (
                                data.recentBatches.map((batch) => (
                                    <div key={batch.id} className="bg-secondary/10 p-4 rounded-xl flex justify-between items-center group hover:bg-secondary/20 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                                <p className="font-bold text-foreground">{batch.sourceFarm}</p>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                <span className="flex items-center gap-1">
                                                    <Droplets className="w-3 h-3" />
                                                    {batch.quantityLiters} L
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(batch.timestamp * 1000).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => {
                                                onRepurchase(batch.sourceFarm)
                                                setShowHistory(false)
                                            }}
                                            className="ml-4 px-4 py-2 bg-background border border-border hover:border-primary text-foreground rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
                                        >
                                            <RefreshCw className="w-3 h-3" />
                                            Repurchase
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
                                    <p>No transaction history found.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}


