'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { addSubscriber } from "@/lib/actions/newsletters"

export default function SubscribersPage({
  params: { newsletterId }
}: {
  params: { newsletterId: string }
}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('email', email)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)

    try {
      await addSubscriber(newsletterId, formData)
      toast.success('Subscriber added successfully')
      setEmail('')
      setFirstName('')
      setLastName('')
      router.refresh()
    } catch (error) {
      toast.error('Failed to add subscriber')
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Subscriber</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <Button type="submit">Add Subscriber</Button>
      </form>
    </div>
  )
} 