interface User {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "super-admin";
  phone_number?: string;
}
