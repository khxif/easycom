declare module 'react-heart';

interface User {
  _id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "super-admin";
  phone_number?: string;
  is_admin: boolean;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image_url: string;
  category: string;
}