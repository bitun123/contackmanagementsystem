"use client";

import { useContact } from "@/hooks/useContact";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Archive,
  CheckCircle2,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { setContacts } from "@/store/slice/conatactSlice";
import { useDispatch } from "react-redux";

function Profile({ id }: { id: string }) {
  // Get contacts from the custom hook and find the specific contact by ID
  const { contacts } = useContact();
  const router = useRouter();
  const dispatch = useDispatch();
  // Find the contact with the matching ID from the contacts array
  const contact = contacts.find((c) => c._id === id);

  if (!contact) {
    return <p>Contact not found</p>;
  }



  // Handle back button click to navigate to the previous page
  const handleBack = () => {
    router.back();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email);
    alert("Email copied to clipboard!");
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this contact?"))
      return;

    const updatedContacts = contacts.filter((c) => c._id !== id);
    dispatch(setContacts(updatedContacts));
    router.back();
  };

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/30 py-12 px-4 sm:px-6 lg:px-8">

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Navigation */}
        <button
          onClick={handleBack}
          className="group mb-12 flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300"
        >
          <div className="p-2 rounded-xl bg-card border border-border group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-sm font-black uppercase tracking-widest">Return to Ledger</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-md p-10">
              <div className="absolute top-0 right-0 p-8">
                <div className={`px-4 py-1.5 rounded-full ${contact.isActive ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'} text-[10px] font-black uppercase tracking-[0.2em] border border-current/20`}>
                  {contact.isActive ? 'Operational' : 'Stagnant'}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-12">
                <div className="relative">
                  <div className="w-28 h-28 rounded-[2rem] bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
                    <span className="text-5xl font-black text-primary">
                      {contact.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-secondary/10 border border-secondary/20">
                    <CheckCircle2 className="w-4 h-4 text-secondary" />
                  </div>
                </div>

                <div className="text-center sm:text-left pt-2">
                  <h1 className="text-4xl sm:text-5xl font-black text-foreground tracking-tight mb-2 leading-none">
                    {contact.name}
                  </h1>
                  <p className="text-lg text-primary font-medium opacity-80">{contact.location || "Global Citizen"}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-2 ml-1">Digital Coordinates</p>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/30 border border-border/50 transition-all group-hover:border-primary/30">
                      <Mail size={18} className="text-primary" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-foreground truncate">{contact.email}</p>
                      </div>
                      <button 
                        onClick={handleCopyEmail}
                        className="text-[10px] font-black uppercase text-primary/60 hover:text-primary transition-colors pr-2"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-2 ml-1">Direct Line</p>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/30 border border-border/50 transition-all group-hover:border-primary/30">
                      <Phone size={18} className="text-primary" />
                      <p className="text-sm font-bold text-foreground">{contact.phone || "Restricted"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-2 ml-1">Geographic Hub</p>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/30 border border-border/50 transition-all group-hover:border-primary/30">
                      <MapPin size={18} className="text-secondary" />
                      <div>
                        <p className="text-sm font-bold text-foreground">{contact.location || "N/A"}</p>
                        {contact.city && <p className="text-[10px] text-muted-foreground font-medium">{contact.city}, {contact.state}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="group">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/60 mb-2 ml-1">Chronology</p>
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-background/30 border border-border/50 transition-all group-hover:border-primary/30">
                      <Calendar size={18} className="text-secondary" />
                      <p className="text-sm font-bold text-foreground">
                        {new Date(contact.dateOfLastContact).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Remarks Section */}
            <div className="rounded-2xl bg-card border border-border p-8">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary/80 mb-6">Strategic Remarks</h3>
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-primary/20 rounded-full" />
                <p className="text-base text-foreground leading-relaxed pl-4">
                  {contact.remarks || "No supplementary strategic data has been logged for this contact."}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="rounded-3xl bg-primary text-primary-foreground p-8 shadow-xl shadow-primary/20 overflow-hidden relative group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <h4 className="text-xs font-black uppercase tracking-widest mb-4 opacity-70">Legacy Metadata</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-60">Identity Established</p>
                  <p className="text-lg font-black">
                    {new Date(contact.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold opacity-60">Source Origin</p>
                  <p className="text-lg font-black">{contact.source?.name || "Direct"}</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleDelete}
              className="w-full group flex items-center justify-between p-6 rounded-3xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500 hover:border-rose-500 transition-all duration-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-500/10 group-hover:bg-white/20 transition-colors">
                  <Trash2 size={20} className="text-rose-500 group-hover:text-white" />
                </div>
                <span className="text-sm font-black uppercase tracking-widest text-rose-500 group-hover:text-white">Purge Record</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
