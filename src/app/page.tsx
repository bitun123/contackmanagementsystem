import ContactCard from '@/components/ui/ContactCard'
import React from 'react'

function page() {
  return (
    <div>
      <ContactCard contact={{
        _id: "1",
        email: "will@solarservices.com",
        name: "Will",
        location: "Virginia Beach, Virginia",
        lastContact: "Mar 2, 2026",
        status: "invalid",
        phone: "",
        firstName: "Will",
        lastName: "",
        city: "Virginia Beach",
        state: "Virginia",
        emailStatus: "invalid",
        remarks: "",
        dateOfLastContact: "2026-03-02T00:00:00.000Z",
        isActive: true,
        isArchived: false,
        createdAt: "2026-01-01T00:00:00.000Z",
        updatedAt: "2026-01-01T00:00:00.000Z",
      }} />
    </div>
  )
}

export default page