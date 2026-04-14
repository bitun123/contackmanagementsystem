import { Contact } from "@/types/contact"
import { Mail, MapPin, Calendar } from "lucide-react"


const statusColors: Record<string, { bg: string; text: string; dot: string }> = {
  safe: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    dot: "bg-emerald-500",
  },
  risky: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    dot: "bg-yellow-500",
  },
  invalid: {
    bg: "bg-red-500/10",
    text: "text-red-500",
    dot: "bg-red-500",
  },
  unverified: {
    bg: "bg-slate-500/10",
    text: "text-slate-500",
    dot: "bg-slate-500",
  },
  bounced: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    dot: "bg-orange-500",
  },
};


function ContactCard({ contact }: { contact: Contact }) {
  return (
    <div className="max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header with Avatar and Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-300">
            <span className="text-xl font-bold text-blue-700">W</span>
          </div>

          {/* Name */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Will</h3>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={16} />
              <span>will@solarservices.com</span>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="rounded-full bg-red-100 px-3 py-1">
          <span className="text-xs font-medium text-red-600">invalid</span>
        </div>
      </div>

      {/* Divider */}
      <div className="mb-4 h-px bg-gray-200"></div>

      {/* Location Section */}
      <div className="mb-4 flex items-start gap-3">
        <MapPin size={18} className="mt-1 flex-shrink-0 text-gray-500" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Location</p>
          <p className="mt-1 text-sm text-gray-900">Virginia Beach, Virginia</p>
        </div>
      </div>

      {/* Last Contact Section */}
      <div className="flex items-start gap-3">
        <Calendar size={18} className="mt-1 flex-shrink-0 text-gray-500" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Last Contact</p>
          <p className="mt-1 text-sm text-gray-900">Mar 2, 2026</p>
        </div>
      </div>
    </div>
  )
}

export default ContactCard