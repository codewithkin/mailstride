'use client'

import * as React from "react"
import { ChevronUpIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUp } from "lucide-react"

// Mock data - replace with real data later
const publications = [
  { id: 1, name: "Tech Weekly", plan: "free" },
  { id: 2, name: "Marketing Tips", plan: "free" },
  { id: 3, name: "Design Insights", plan: "free" },
]

const PLANS = {
  free: {
    name: "Pro",
    color: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
  },
  pro: {
    name: "Business",
    color: "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
  },
  business: {
    name: "Enterprise",
    color: "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
  }
} as const

export function PublicationSwitcher() {
  const [selectedPublication, setSelectedPublication] = React.useState("All Publications")
  const currentPlan = "free" // This would come from your auth context or similar

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between font-normal"
        >
          <span className="truncate">{selectedPublication}</span>
          <ChevronUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[260px]" align="start">
        <DropdownMenuLabel>Switch Publication</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setSelectedPublication("All Publications")}
          className="cursor-pointer"
        >
          All Publications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {publications.map((pub) => (
            <DropdownMenuItem
              key={pub.id}
              onClick={() => setSelectedPublication(pub.name)}
              className="cursor-pointer"
            >
              {pub.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            className={`w-full text-white ${PLANS[currentPlan].color}`}
          >
            <ArrowUp className="h-4 w-4" />
            Upgrade to {PLANS[currentPlan].name}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 