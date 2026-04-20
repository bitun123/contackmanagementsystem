"use client";
import ContactCard from "@/components/ui/ContactCard";
import { useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import { NativeSelectDemo } from "@/components/ui/EmailStatusFilter";
import { PaginationDemo } from "@/components/ui/Paginate";
import { useContact } from "@/hooks/useContact";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Users, LayoutGrid, Loader2 } from "lucide-react";

function ContactPage() {
  const { getContacts, contacts } = useContact();
  const { loading } = useSelector((state: RootState) => state.contact);

  useEffect(() => {
    if (contacts.length === 0 && !loading) {
      getContacts({ page: 1, limit: 10 });
    }
  }, [getContacts, contacts.length, loading]);

  return (
    <div className="relative w-full min-h-screen bg-background transition-colors selection:bg-primary/30 pb-20">
      {/* Header section */}
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Contacts</h1>
                <p className="text-xs text-muted-foreground">Manage your connections</p>
              </div>
            </div>
            <div className="flex-1 max-w-xl">
              <SearchBar />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Filters and Pagination Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-card/30 p-4 rounded-3xl border border-border/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background border border-border text-sm font-medium">
              <LayoutGrid className="w-4 h-4 text-primary" />
              <span>Grid View</span>
            </div>
            <NativeSelectDemo />
          </div>
          <PaginationDemo />
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in duration-500">
            <Loader2 className="w-10 h-10 text-primary animate-spin mb-4" />
            <p className="text-muted-foreground font-medium">Curation in progress...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {contacts?.length > 0 ? (
              contacts.map((contact) => (
                <ContactCard key={contact._id} contact={contact} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-20 h-20 rounded-full bg-muted/50 flex items-center justify-center mb-6">
                  <Users className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No contacts found</h3>
                <p className="text-muted-foreground max-w-xs">
                  We couldn't find any contacts matching your current filters.
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default ContactPage;
