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
import { useQuery } from "@tanstack/react-query"
import { getUserPublications } from "@/lib/actions/publications"

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
  const { data: publications, isLoading } = useQuery({
    queryKey: ['publications'],
    queryFn: getUserPublications
  })

  const [selectedPublication, setSelectedPublication] = React.useState<string | null>(null)
  const currentPlan = "free" // This would come from your auth context or similar

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full justify-between font-normal"
          disabled={isLoading}
        >
          <span className="truncate">
            {isLoading ? 'Loading...' : selectedPublication || 'All Publications'}
          </span>
          <ChevronUpIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[260px]" align="start">
        <DropdownMenuLabel>Switch Publication</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => setSelectedPublication(null)}
          className="cursor-pointer"
        >
          All Publications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {publications?.map((pub) => (
            <DropdownMenuItem
              key={pub.id}
              onClick={() => setSelectedPublication(pub.name)}
              className="cursor-pointer"
            >
              <div className="flex items-center justify-between w-full">
                <span>{pub.name}</span>
                <span className="text-xs text-gray-500">
                  {pub._count.subscribers} subscribers
                </span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            className={`w-full text-white ${PLANS[currentPlan].color}`}
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            Upgrade to {PLANS[currentPlan].name}
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 