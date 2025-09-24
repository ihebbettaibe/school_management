"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreateAssignmentModal } from "./create-assignment-modal"
import { Plus } from "lucide-react"

export function CreateAssignmentButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Create Assignment
      </Button>

      {isModalOpen && <CreateAssignmentModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
