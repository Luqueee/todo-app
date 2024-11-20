import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCurrentDateTime(date: Date): string[] {
  const pad = (num: number, size: number) => String(num).padStart(size, "0");
  const date_result = `${date.getFullYear()}-${pad(
    date.getMonth() + 1,
    2
  )}-${pad(date.getDate(), 2)}`;
  const time = `${pad(date.getHours(), 2)}:${pad(date.getMinutes(), 2)}:${pad(
    date.getSeconds(),
    2
  )}.${pad(date.getMilliseconds(), 3)}Z`;
  return [date_result, time];
}
