import { apiClient } from "@/lib/api-client";
import { LoginSchemaType, SignupSchemaType } from "@/zod-schemas/auth";

export const login = async (body: LoginSchemaType) => {
  const data = await apiClient.post("auth/login", body);
  console.log(data.data);
  return data.data;
};

export const signup = async (body: SignupSchemaType) => {
  const data = await apiClient.post("auth/signup", body);
  console.log(data.data);
  return data.data;
};
