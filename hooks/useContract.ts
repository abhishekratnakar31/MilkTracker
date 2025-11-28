
"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useReadContracts } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface BatchData {
  id: number
  sourceFarm: string
  quantityLiters: number
  timestamp: number
}

export interface ContractData {
  totalBatches: number
  lastBatch: BatchData | null
  recentBatches: BatchData[]
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  addBatch: (sourceFarm: string, quantityLiters: number) => Promise<void>
}

export const useMilkTracker = () => {
  const { } = useAccount()
  const [isLoading, setIsLoading] = useState(false)

  // Read total batches
  const { data: totalBatchesData, refetch: refetchTotalBatches } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "totalBatches",
  })

  const totalBatches = totalBatchesData ? Number(totalBatchesData) : 0

  // Prepare calls for recent batches (last 10)
  const batchCalls = []
  if (totalBatches > 0) {
    const start = Math.max(0, totalBatches - 10)
    for (let i = totalBatches - 1; i >= start; i--) {
      batchCalls.push({
        address: contractAddress,
        abi: contractABI,
        functionName: "getBatch",
        args: [BigInt(i)],
      })
    }
  }

  // Read recent batches
  const { data: batchesData, refetch: refetchBatches } = useReadContracts({
    contracts: batchCalls,
    query: {
      enabled: totalBatches > 0,
    },
  })

  const recentBatches: BatchData[] = batchesData
    ? batchesData
      .map((result) => {
        if (result.status === "success" && result.result) {
          const b = result.result as unknown as { id: bigint, sourceFarm: string, quantityLiters: bigint, timestamp: bigint }
          return {
            id: Number(b.id),
            sourceFarm: b.sourceFarm,
            quantityLiters: Number(b.quantityLiters),
            timestamp: Number(b.timestamp),
          }
        }
        return null
      })
      .filter((b): b is BatchData => b !== null)
    : []

  const lastBatch = recentBatches.length > 0 ? recentBatches[0] : null

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    if (isConfirmed) {
      refetchTotalBatches()
      refetchBatches()
    }
  }, [isConfirmed, refetchTotalBatches, refetchBatches])

  const addBatch = async (sourceFarm: string, quantityLiters: number) => {
    if (!sourceFarm || quantityLiters <= 0) return

    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "addBatch",
        args: [sourceFarm, BigInt(quantityLiters)],
      })
    } catch (err) {
      console.error("Error adding batch:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const data: ContractData = {
    totalBatches,
    lastBatch,
    recentBatches,
  }

  const actions: ContractActions = {
    addBatch,
  }

  const state: ContractState = {
    isLoading: isLoading || isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  }

  return {
    data,
    actions,
    state,
  }
}
