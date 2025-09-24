"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { MeetingRequestModal } from "./meeting-request-modal"

export function MeetingRequestButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="w-4 h-4 mr-2" />
        Request Meeting
      </Button>

      {isOpen && <MeetingRequestModal onClose={() => setIsOpen(false)} />}
    </>
  )
}
