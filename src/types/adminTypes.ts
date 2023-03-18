export interface AdminStateI {
  users: any;
  tests: any;
  isLoading: {
    tests: boolean;
    users: boolean;
  };
}
