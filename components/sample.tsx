// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useMilkTracker } from "@/hooks/useContract"

const MilkTrackerIntegration = () => {
  const { isConnected } = useAccount()
  const [sourceFarm, setSourceFarm] = useState("")
  const [quantity, setQuantity] = useState("")

  const { data, actions, state } = useMilkTracker()

  const handleAddBatch = async () => {
    if (!sourceFarm || !quantity) return
    try {
      await actions.addBatch(sourceFarm, Number(quantity))
      setSourceFarm("")
      setQuantity("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Milk Tracker</h2>
          <p className="text-muted-foreground">Please connect your wallet to track milk batches.</p>
        </div>
      </div>
    )
  }

  const canAdd = sourceFarm && quantity && Number(quantity) > 0

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Milk Tracker</h1>
          <p className="text-muted-foreground text-sm mt-1">Track milk batches on-chain</p>
        </div>

        {/* Contract Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Total Batches</p>
            <p className="text-2xl font-semibold text-foreground">{data.totalBatches}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-muted-foreground text-xs uppercase tracking-wide mb-2">Last Batch</p>
            {data.lastBatch ? (
              <div>
                <p className="text-sm font-medium text-foreground">ID: {data.lastBatch.id}</p>
                <p className="text-sm text-foreground">Farm: {data.lastBatch.sourceFarm}</p>
                <p className="text-sm text-foreground">Qty: {data.lastBatch.quantityLiters} L</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No batches yet</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Add New Batch</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Source Farm</label>
                <input
                  type="text"
                  placeholder="e.g. Green Valley Farm"
                  value={sourceFarm}
                  onChange={(e) => setSourceFarm(e.target.value)}
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">Quantity (Liters)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              <button
                onClick={handleAddBatch}
                disabled={state.isLoading || state.isPending || !canAdd}
                className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
              >
                {state.isLoading || state.isPending ? "Adding Batch..." : "Add Batch"}
              </button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {state.hash && (
          <div className="mt-6 p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Transaction Hash</p>
            <p className="text-sm font-mono text-foreground break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p className="text-sm text-primary">Waiting for confirmation...</p>}
            {state.isConfirmed && <p className="text-sm text-green-500">Transaction confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive-foreground">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MilkTrackerIntegration
