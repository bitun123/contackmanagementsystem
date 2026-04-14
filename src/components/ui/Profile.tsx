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
} from "lucide-react";
import { useRouter } from "next/navigation";

function Profile({ id }: { id: string }) {

    // Get contacts from the custom hook and find the specific contact by ID
  const { contacts } = useContact();
  const router = useRouter();


  // Find the contact with the matching ID from the contacts array
  const contact = contacts.find((c) => c._id === id);

 
  if (!contact) {
    return <p>Contact not found</p>;
  }


  // Handle back button click to navigate to the previous page
  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={20} />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Profile Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 sm:px-8 py-8 sm:py-10">
            <div className="flex items-start gap-4 sm:gap-6">
              {/* Avatar */}
              <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white shadow-md flex-shrink-0">
                <span className="text-3xl sm:text-4xl font-bold text-blue-600">
                  {contact.name.charAt(0).toUpperCase()}
                </span>
              </div>

              {/* Name & Status */}
              <div className="flex-1 pt-1 sm:pt-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {contact.name}
                </h1>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-6 sm:px-8 py-8 sm:py-10">
            {/* Contact Information */}
            <div className="space-y-6">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Mail size={20} className="text-blue-600 mt-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Email Address
                  </p>
                  <p className="text-sm sm:text-base text-gray-900 break-all">
                    {contact.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Phone size={20} className="text-blue-600 mt-1" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Phone Number
                  </p>
                  <p className="text-sm sm:text-base text-gray-900">
                    {contact.phone || "N/A"}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <MapPin size={20} className="text-blue-600 mt-1" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Location
                  </p>
                  <p className="text-sm sm:text-base text-gray-900">
                    {contact.location || "N/A"}
                  </p>
                  {(contact.city || contact.state) && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      {[contact.city, contact.state].filter(Boolean).join(", ")}
                    </p>
                  )}
                </div>
              </div>

              {/* Last Contact Date */}
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <Calendar size={20} className="text-blue-600 mt-1" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
                    Last Contact
                  </p>
                  <p className="text-sm sm:text-base text-gray-900">
                    {new Date(contact.dateOfLastContact).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>

              {/* Remarks */}
              {contact.remarks && (
                <div className="pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                    Remarks
                  </p>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                    {contact.remarks}
                  </p>
                </div>
              )}
            </div>

            {/* Footer Information */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {contact.isArchived ? (
                      <span className="flex items-center gap-1">
                        <Archive size={16} />
                        Archived
                      </span>
                    ) : contact.isActive ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle2 size={16} />
                        Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-gray-500">
                        Inactive
                      </span>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Created</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {new Date(contact.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
