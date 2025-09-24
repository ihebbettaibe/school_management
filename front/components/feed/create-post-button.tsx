"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CreatePostModal } from "./create-post-modal"
import { Plus } from "lucide-react"

export function CreatePostButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Créer une Publication
      </Button>

      {isModalOpen && <CreatePostModal onClose={() => setIsModalOpen(false)} />}
    </>
  )
}
