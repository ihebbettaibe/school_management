"use client"

import { Badge } from "@/components/ui/badge"

interface NotificationBadgeProps {
  count: number
  className?: string
}

export function NotificationBadge({ count, className = "" }: NotificationBadgeProps) {
  if (count === 0) return null

  return (
    <Badge variant="destructive" className={`h-5 w-5 p-0 text-xs flex items-center justify-center ${className}`}>
      {count > 99 ? "99+" : count}
    </Badge>
  )
}
