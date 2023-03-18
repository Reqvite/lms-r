import { AdminStateI } from "types/adminTypes";

export const selectUsers = ({ admin }: { admin: AdminStateI }) => admin.users;
export const selectIsLoading = ({ admin }: { admin: AdminStateI }) =>
  admin.isLoading;
export const selectAdminTests = ({ admin }: { admin: AdminStateI }) =>
  admin.tests;
