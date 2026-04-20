import { Contact } from "@/types/contact";
import { Mail, MapPin, Calendar, ArrowUpRight, ShieldCheck, AlertCircle, XCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const statusConfig: Record<string, { bg: string; text: string; icon: any }> = {
  safe: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-500",
    icon: ShieldCheck,
  },
  risky: {
    bg: "bg-amber-500/10",
    text: "text-amber-500",
    icon: AlertCircle,
  },
  invalid: {
    bg: "bg-rose-500/10",
    text: "text-rose-500",
    icon: XCircle,
  },
  unverified: {
    bg: "bg-slate-500/10",
    text: "text-slate-500",
    icon: Clock,
  },
  bounced: {
    bg: "bg-orange-500/10",
    text: "text-orange-500",
    icon: AlertCircle,
  },
};

function ContactCard({ contact }: { contact: Contact }) {
  const router = useRouter();
  const config = statusConfig[contact.emailStatus] || statusConfig["unverified"];
  const StatusIcon = config.icon;

  const handleClick = (id: string): void => {
    router.push(`/contact/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => handleClick(contact._id)}
      className="group cursor-pointer w-full rounded-xl bg-card border border-border p-5 transition-all hover:bg-accent/50 hover:shadow-sm"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center border border-primary/10">
            <span className="text-lg font-bold text-primary">
              {contact.name.charAt(0)}
            </span>
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${config.bg} border-2 border-background flex items-center justify-center p-0.5`}>
            <StatusIcon className={`w-full h-full ${config.text}`} />
          </div>
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-foreground leading-tight group-hover:text-primary transition-colors truncate">
            {contact.name}
          </h3>
          <p className="text-xs text-muted-foreground truncate">
            {contact.email}
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{contact.location}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar size={12} className="shrink-0" />
          <span>
            {new Date(contact.dateOfLastContact).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
        <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${config.bg} ${config.text}`}>
          {contact.emailStatus}
        </div>
        <span className="text-[10px] font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
          View Detail
        </span>
      </div>
    </motion.div>
  );
}

export default ContactCard;

