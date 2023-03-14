import { TestsState } from "types/types";

export const selectUserTests = ({ tests }: { tests: TestsState }) =>
  tests.items;

export const selectUserFinishedTests = ({ tests }: { tests: TestsState }) =>
  tests.finishedTests;

export const selectUserStatistic = ({ tests }: { tests: TestsState }) =>
  tests.statistics;

export const selectIsLoading = ({ tests }: { tests: TestsState }) =>
  tests.isLoading;
