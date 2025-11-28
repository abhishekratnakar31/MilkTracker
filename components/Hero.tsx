"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ArrowDown } from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

// Placeholder images – replace with real assets later
// const cardData = [
//     {
//         id: 1,
//         "img": "/card1.webp",
//         title: "What is MilkTracker?",
//         description:
//             "MilkTracker records every batch of milk on the blockchain, ensuring transparency from farm to table."
//     },
//     {
//         id: 2,
//         "img": "/card2.jpg",
//         title: "Why use blockchain?",
//         description:
//             "Immutable records prevent tampering, building trust for producers and consumers alike."
//     }
// ]

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const subtitleRef = useRef<HTMLParagraphElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // const [flipped, setFlipped] = useState<Record<number, boolean>>({})

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
        tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
            .fromTo(
                titleRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1 },
                "-=0.5"
            )
            .fromTo(
                subtitleRef.current,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8 },
                "-=0.6"
            )
            .fromTo(
                buttonRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6 },
                "-=0.4"
            )
    }, [])

    const scrollToConnect = () => {
        const el = document.getElementById("wallet-connect-section")
        if (el) el.scrollIntoView({ behavior: "smooth" })
    }

    // const toggleFlip = (id: number) => {
    //     setFlipped(prev => ({ ...prev, [id]: !prev[id] }))
    // }

    return (
        <div className="relative overflow-x-hidden">
            {/* Wallet Connect button */}
            <div className="absolute top-4 right-4 z-10">
                <ConnectButton showBalance={false} />
            </div>

            {/* Section 1 – Intro */}
            <section
                ref={containerRef}
                className="min-h-screen flex flex-col items-center justify-center text-center px-4 relative overflow-hidden"
            >
                {/* Background shapes */}
                <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl mix-blend-multiply animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-3xl mix-blend-multiply animate-pulse delay-700" />
                </div>
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-6"
                >
                    Milk<span className="text-primary">Tracker</span>
                </h1>
                <p
                    ref={subtitleRef}
                    className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-light"
                >
                    A transparent, decentralized journey from farm to table. Track quality, quantity, and origin with immutable trust.
                </p>
                <button
                    ref={buttonRef}
                    onClick={scrollToConnect}
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                    Start Tracking
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </button>
            </section>

            {/* Section 2 – Flip Card Gallery */}
            {/* <section className="min-h-screen flex flex-col items-center justify-center py-12 bg-background">
                <h2 className="text-3xl font-bold text-foreground mb-8">Learn More</h2>
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cardData.map(card => (
                        <div
                            key={card.id}
                            className="group perspective-1000 cursor-pointer"
                            onClick={() => toggleFlip(card.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") toggleFlip(card.id) }}
                            aria-pressed={!!flipped[card.id]}
                        > */}
                            {/* <div
                                className={`relative w-full h-150 transition-transform duration-500 preserve-3d ${flipped[card.id] ? "rotate-y-180" : ""}`}
                                style={{ transformStyle: "preserve-3d" }}
                            > */}
                                {/* Front */}
                                {/* <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden shadow-lg">
                                    <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
                                </div> */}
                                {/* Back */}
                                {/* <div className="absolute inset-0 backface-hidden rounded-xl bg-card border border-border p-4 flex flex-col justify-center items-center rotate-y-180">
                                    <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
                                    <p className="text-sm text-muted-foreground text-center">{card.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}

            {/* Section 3 – How It Works */}
            {/* <section className="min-h-screen flex flex-col md:flex-row items-center justify-center py-12 bg-background"> */}
                {/* Text side */}
                {/* <div className="flex-1 space-y-4 px-6">
                    <h2 className="text-3xl font-bold text-foreground">How MilkTracker Works</h2>
                    <p className="text-lg text-muted-foreground">
                        Producers add batch details via the form, which are stored on the blockchain. Consumers can view the immutable history, ensuring trust and traceability.
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                        <li>Record source farm and quantity</li>
                        <li>Secure on‑chain storage</li>
                        <li>Instant verification of provenance</li>
                        <li>Easy repurchase with pre‑filled data</li>
                    </ul>
                </div> */}
                {/* Image side */}
                {/* <div className="flex-1 px-6"> */}
                    {/* <img
                        src="https://via.placeholder.com/500x300?text=How+It+Works"
                        alt="How MilkTracker works"
                        className="w-full h-auto rounded-xl shadow-lg hover:scale-105 transition-transform"
                    />
                </div>
            </section> */}
        </div>
    )
}
