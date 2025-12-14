// 📁 lib/utils.ts

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// A função 'cn' é usada em todos os componentes Shadcn para estilização.
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}