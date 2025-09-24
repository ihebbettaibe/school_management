"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "lucide-react"

interface Child {
  id: string
  name: string
  grade: string
  section: string
}

interface ChildSelectorProps {
  children: Child[]
}

export function ChildSelector({ children }: ChildSelectorProps) {
  const [selectedChild, setSelectedChild] = useState(children[0]?.id || "")

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-600">Child:</span>
      <Select value={selectedChild} onValueChange={setSelectedChild}>
        <SelectTrigger className="w-48 border-gray-300 bg-white text-gray-800">
          <SelectValue placeholder="Select child" />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200">
          {children.map((child) => (
            <SelectItem key={child.id} value={child.id} className="text-gray-800">
              <div className="flex flex-col">
                <span className="font-medium">{child.name}</span>
                <span className="text-xs text-gray-500">
                  {child.grade} - Section {child.section}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
