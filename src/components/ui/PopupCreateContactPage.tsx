import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "./button";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-background p-6 shadow-lg border border-border">
        <div className="mb-6 space-y-1 text-center">
          <h2 className="text-xl font-semibold leading-none tracking-tight">
            Create New Contact
          </h2>
          <p className="text-sm text-muted-foreground">
            Fill in the details to add a new contact.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-medium leading-none"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="John"
                {...register("firstName", { required: true })}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-medium leading-none"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Doe"
                {...register("lastName", { required: true })}
                className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium leading-none">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email", { required: true })}
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="emailStatus"
              className="text-sm font-medium leading-none"
            >
              Email Status
            </label>
            <select
              id="emailStatus"
              {...register("emailStatus", { required: true })}
              className=" flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600"
            >
              <option value="safe">Safe</option>
              <option value="risky">Risky</option>
              <option value="invalid">Invalid</option>
              <option value="unverified">Unverified</option>
              <option value="bounced">Bounced</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium leading-none">Status</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  value="active"
                  {...register("status")}
                  className="size-4 cursor-pointer accent-primary"
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  Active
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  value="inactive"
                  {...register("status")}
                  className="size-4 cursor-pointer accent-primary"
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors">
                  Inactive
                </span>
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Contact</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupCreateContactPage;