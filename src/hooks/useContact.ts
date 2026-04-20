"use client";

import { useDispatch, useSelector } from "react-redux";

import { RootState, AppDispatch } from "@/store/store";
import { fetchContactsThunk } from "../store/api/api";
import {
  setCurrentPage,
  setEmailStatus,
  setSearchQuery,
} from "@/store/slice/conatactSlice";

export const useContact = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    contacts,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    limit,
    emailStatus,
    searchQuery,
  } = useSelector((state: RootState) => state.contact);

  const getContacts = (params: {
    page?: number;
    limit?: number;
    search?: string;
    emailStatus?: string;
  }) => {
    const finalParams = {
      page:
        params.page ??
        (params.search !== undefined || params.emailStatus !== undefined
          ? 1
          : currentPage),
      limit: params.limit ?? limit,
      search: params.search ?? searchQuery,
      emailStatus: params.emailStatus ?? emailStatus,
    };

    if (params.page) dispatch(setCurrentPage(params.page));
    if (params.search !== undefined) dispatch(setSearchQuery(params.search));
    if (params.emailStatus !== undefined)
      dispatch(setEmailStatus(params.emailStatus));

    // Reset to page 1 if search or status changes
    if (params.search !== undefined || params.emailStatus !== undefined) {
      dispatch(setCurrentPage(1));
    }
    dispatch(fetchContactsThunk(finalParams));
  };


  console.log(contacts)
  return {
    contacts,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    limit,
    getContacts,
    emailStatus,
    searchQuery,
  };
};
