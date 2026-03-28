import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export function FirstLetterUpperCase(string) {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ReplaceUnderscoreSpace(str) {
  return str ? str.replace(/[_]/g, ' ') : '';
}
