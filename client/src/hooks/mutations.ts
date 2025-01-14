import { useMutation } from "@tanstack/react-query";
import * as AuthFetchers from "../fetchers/auth";

export const useLoginMutation = () => {
  return useMutation({ mutationFn: AuthFetchers.login });
};

export const useSignupMutation = () => {
  return useMutation({ mutationFn: AuthFetchers.signup });
};
