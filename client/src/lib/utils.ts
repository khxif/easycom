import { isAxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: Error) {
  let errorMessage;
  if (isAxiosError(error)) errorMessage = error.response?.data?.message;
  else errorMessage = error.message;

  return errorMessage;
}
