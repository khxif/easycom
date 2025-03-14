declare module 'react-heart';

interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin' | 'super-admin';
  phone_number?: string;
  is_admin: boolean;
  profile_picture?: string;
  location?: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image_url: string;
  category: string;
  location: string;
}
