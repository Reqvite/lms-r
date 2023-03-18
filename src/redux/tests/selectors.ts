import { TestsStateI } from "types/testTypes";

export const selectUserTests = ({ tests }: { tests: TestsStateI }) =>
  tests.items;

export const selectUserFinishedTests = ({ tests }: { tests: TestsStateI }) =>
  tests.finishedTests;

export const selectUserStatistic = ({ tests }: { tests: TestsStateI }) =>
  tests.statistics;

export const selectIsLoading = ({ tests }: { tests: TestsStateI }) =>
  tests.isLoading;
