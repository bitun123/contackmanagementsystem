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
    <div className="w-full max-w-md rounded-lg border h-[13rem] border-gray-200 bg-white p-3 sm:p-4 md:p-5 lg:p-6 shadow-sm">
      {/* Header */}
      <div className="relative flex flex-col xs:flex-row xs:items-start xs:justify-between mb-3 xs:mb-4 gap-2 xs:gap-3 w-full">
        <div className="flex items-center gap-2 xs:gap-3 sm:gap-4 flex-1 min-w-0">
          {/* Avatar */}
          <div className="flex h-12 w-12 xs:h-14 xs:w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-300 flex-shrink-0">
            <span className="text-base xs:text-lg sm:text-xl font-bold text-blue-700">
              {contact.name.charAt(0)}
            </span>
          </div>

          {/* Name and Email */}
          <div className="min-w-0 flex-1">
            <h3 className="text-sm xs:text-base sm:text-lg font-semibold text-gray-900 truncate">
              {contact.name}
            </h3>
            <div className="flex items-center gap-1 xs:gap-2 text-xs xs:text-sm text-gray-600 min-w-0">
              <Mail size={14} className="xs:w-4 xs:h-4 flex-shrink-0" />
              <span className="break-all text-xs xs:text-sm">{contact.email}</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div
          className={`absolute top-3 right-3 rounded-full ${statusColor.bg} px-2 xs:px-2.5 sm:px-3 py-0.5 xs:py-1 whitespace-nowrap `}
        >
          <span className={`text-xs font-medium ${statusColor.text}`}>
            {contact.emailStatus}
          </span>
        </div>
      </div>

      <div className="mb-3 xs:mb-4 h-px bg-gray-200"></div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
        {/* Location */}
        <div className="flex items-start gap-2 xs:gap-3">
          <MapPin size={16} className="mt-0.5 xs:mt-1 flex-shrink-0 text-gray-500 xs:w-4 xs:h-4" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Location
            </p>
            <p className="mt-0.5 xs:mt-1 text-xs xs:text-sm text-gray-900 break-words">
              {contact.location}
            </p>
          </div>
        </div>

        {/* Last Contact */}
        <div className="flex items-start gap-2 xs:gap-3">
          <Calendar size={16} className="mt-0.5 xs:mt-1 flex-shrink-0 text-gray-500 xs:w-4 xs:h-4" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Last Contact
            </p>
            <p className="mt-0.5 xs:mt-1 text-xs xs:text-sm text-gray-900">
              {contact.dateOfLastContact.slice(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
