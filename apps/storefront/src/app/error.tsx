"use client"

export default function Error({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-6">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <button
        type="button"
        className="text-sm underline underline-offset-4"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
}
