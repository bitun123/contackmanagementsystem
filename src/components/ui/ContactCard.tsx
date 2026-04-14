import { Contact } from "@/types/contact";
import { Mail, MapPin, Calendar } from "lucide-react";

// Define status colors for different email statuses
const statusColors: Record<string, { bg: string; text: string; dot: string }> =
  {
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

{
  /* ContactCard component to display individual contact information */
}
function ContactCard({ contact }: { contact: Contact }) {
  // Get the appropriate colors based on the contact's email status
  const statusColor =
    statusColors[contact.emailStatus] || statusColors["unverified"];
  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">

  {/* Header */}
  <div className=" flex items-start justify-between mb-4 gap-2 relative">

    <div className="flex items-center gap-3 sm:gap-4">
      {/* Avatar */}
      <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-300">
        <span className="text-lg sm:text-xl font-bold text-blue-700">
          {contact.name.charAt(0)}
        </span>
      </div>

      {/* Name + Email */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
          {contact.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail size={16} />
          <span className="break-all">{contact.email}</span>
        </div>
      </div>
    </div>

    {/* Status */}
    <div className={`rounded-full ${statusColor.bg} px-2 sm:px-3 py-1`}>
      <span className={`text-xs font-medium ${statusColor.text}`}>
        {contact.emailStatus}
      </span>
    </div>

  </div>

  <div className="mb-4 h-px bg-gray-200"></div>

  {/* Bottom Section */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Location */}
    <div className="flex items-start gap-3">
      <MapPin size={18} className="mt-1 flex-shrink-0 text-gray-500" />
      <div>
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-500">
          Location
        </p>
        <p className="mt-1 text-sm text-gray-900 break-words">
          {contact.location}
        </p>
      </div>
    </div>

    {/* Last Contact */}
    <div className="flex items-start gap-3">
      <Calendar size={18} className="mt-1 flex-shrink-0 text-gray-500" />
      <div>
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-gray-500">
          Last Contact
        </p>
        <p className="mt-1 text-sm text-gray-900">
          {contact.dateOfLastContact.slice(0, 10)}
        </p>
      </div>
    </div>

  </div>
</div>
  );
}

export default ContactCard;
