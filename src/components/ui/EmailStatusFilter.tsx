"use client";

import { useEffect, useState } from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { useContact } from "@/hooks/useContact";
export function NativeSelectDemo() {
  const { getContacts, } = useContact();

  // State to store the selected value
  const [selectedValue, setSelectedValue] = useState<string>("");

  // Handle change event to get the value
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
  };

  useEffect(() => {
    if (selectedValue === "") {
      return;
    }
    getContacts({ emailStatus: selectedValue });
  }, [selectedValue]);
  return (
    <div>
      <NativeSelect
        className="mb-5"
        value={selectedValue}
        onChange={handleStatusChange}
      >
        <NativeSelectOption value="">All</NativeSelectOption>
        <NativeSelectOption value="safe">safe</NativeSelectOption>
        <NativeSelectOption value="invalid">invalid</NativeSelectOption>
        <NativeSelectOption value="unverified">unverified</NativeSelectOption>
        <NativeSelectOption value="bounced">bounced</NativeSelectOption>
        <NativeSelectOption value="risky">risky</NativeSelectOption>
      </NativeSelect>
    </div>
  );
}
