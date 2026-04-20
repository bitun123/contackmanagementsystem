import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addContact } from "@/store/slice/conatactSlice";
import { Contact } from "@/types/contact";

interface ContactFormInput {
  firstName: string;
  lastName: string;
  email: string;
  status: "active" | "inactive";
  emailStatus: "risky" | "safe" | "invalid" | "unverified" | "bounced";
}

function PopupCreateContactPage({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<ContactFormInput>({
    defaultValues: {
      status: "active",
      emailStatus: "unverified",
    },
  });

  const onSubmit = (data: ContactFormInput) => {
    const now = new Date().toISOString();
    const newContact: Contact = {
      _id: Math.random().toString(36).substr(2, 9),
      firstName: data.firstName,
      lastName: data.lastName,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: "",
      city: "",
      state: "",
      location: "",
      emailStatus: data.emailStatus,
      remarks: "",
      dateOfLastContact: now,
      isActive: data.status === "active",
      isArchived: false,
      createdAt: now,
      updatedAt: now,
      lists: [],
      source: {
        _id: "default",
        name: "Manual",
        value: "manual",
        type: "source",
        createdAt: now,
        updatedAt: now,
      },
      status: {
        _id: "default",
        name: data.status,
        value: data.status,
        type: "status",
        createdAt: now,
        updatedAt: now,
      },
    };

    dispatch(addContact(newContact));
    reset();
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="absolute top-90  inset-0 z-50 flex items-center justify-center p-4 bg-background/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-xl bg-card p-8 shadow-xl border border-border">
        <div className="relative mb-6 text-center sm:text-left">
          <h2 className="text-2xl font-bold text-foreground tracking-tight mb-1">
            New Contact
          </h2>
          <p className="text-sm text-muted-foreground">
            Add a new contact to your list.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="text-xs font-semibold text-muted-foreground">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName", { required: true })}
                className="w-full h-10 rounded-md bg-background border border-border px-3 text-sm font-medium outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="lastName" className="text-xs font-semibold text-muted-foreground">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName", { required: true })}
                className="w-full h-10 rounded-md bg-background border border-border px-3 text-sm font-medium outline-none focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-semibold text-muted-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email", { required: true })}
              className="w-full h-10 rounded-md bg-background border border-border px-3 text-sm font-medium outline-none focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="emailStatus" className="text-xs font-semibold text-muted-foreground">
                Verification Status
              </label>
              <select
                id="emailStatus"
                {...register("emailStatus", { required: true })}
                className="w-full h-10 rounded-md bg-background border border-border px-3 text-sm font-medium outline-none focus:border-primary transition-all appearance-none cursor-pointer"
              >
                <option value="safe">Safe</option>
                <option value="risky">Risky</option>
                <option value="invalid">Invalid</option>
                <option value="unverified">Unverified</option>
                <option value="bounced">Bounced</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-muted-foreground">Engagement</label>
              <div className="flex items-center gap-2 h-10">
                <label className="flex-1 flex items-center justify-center gap-2 h-full rounded-md border border-border bg-background hover:bg-muted/50 transition-all cursor-pointer has-[:checked]:bg-primary has-[:checked]:border-primary has-[:checked]:text-primary-foreground">
                  <input type="radio" value="active" {...register("status")} className="hidden" />
                  <span className="text-xs font-bold uppercase tracking-wider">Active</span>
                </label>
                <label className="flex-1 flex items-center justify-center gap-2 h-full rounded-md border border-border bg-background hover:bg-muted/50 transition-all cursor-pointer has-[:checked]:bg-primary has-[:checked]:border-primary has-[:checked]:text-primary-foreground">
                  <input type="radio" value="inactive" {...register("status")} className="hidden" />
                  <span className="text-xs font-bold uppercase tracking-wider">Passive</span>
                </label>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-border/50">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2 rounded-md border border-border text-sm font-semibold hover:bg-muted/50 transition-colors sm:order-1"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-semibold text-sm hover:opacity-90 active:scale-95 transition-all outline-none sm:order-2"
            >
              Save Contact
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupCreateContactPage;