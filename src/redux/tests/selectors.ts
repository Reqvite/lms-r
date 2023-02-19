import { TestsState } from "types/types";

export const selectUserTests = ({ tests }: { tests: TestsState }) =>
  tests.items;

export const selectIsLoading = ({ tests }: { tests: TestsState }) =>
  tests.isLoading;
