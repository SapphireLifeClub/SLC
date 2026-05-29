export function isBackForwardNavigation(): boolean {
  if (typeof window === "undefined") return false
  try {
    const entries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[]
    return entries[0]?.type === "back_forward"
  } catch {
    return false
  }
}
