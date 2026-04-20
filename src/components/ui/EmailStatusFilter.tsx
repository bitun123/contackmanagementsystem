"use client";

import { useEffect, useState } from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useContact } from "@/hooks/useContact";
import { Filter } from "lucide-react";

export function NativeSelectDemo() {
  const { getContacts } = useContact();
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
  };

  useEffect(() => {
    if (selectedValue === "") {
      // Avoid fetching on mount if contacts already exists
      return; 
    }
    getContacts({ emailStatus: selectedValue, page: 1 });
  }, [selectedValue, getContacts]);

  return (
    <div className="flex items-center gap-2">
      <div className="p-2 rounded-xl bg-primary/10 border border-primary/20">
        <Filter className="w-4 h-4 text-primary" />
      </div>
      <NativeSelect
        className="!w-[160px] !h-11 rounded-xl bg-card border-border/50 text-sm font-semibold"
        value={selectedValue}
        onChange={handleStatusChange}
      >
        <NativeSelectOption value="">Status: All</NativeSelectOption>
        <NativeSelectOption value="safe">Status: Safe</NativeSelectOption>
        <NativeSelectOption value="invalid">Status: Invalid</NativeSelectOption>
        <NativeSelectOption value="unverified">Status: Unverified</NativeSelectOption>
        <NativeSelectOption value="bounced">Status: Bounced</NativeSelectOption>
        <NativeSelectOption value="risky">Status: Risky</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
