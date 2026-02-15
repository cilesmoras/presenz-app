"use client";

import { toast as sonnerToast } from "sonner";

export type ToastType = "success" | "error" | "info" | "warning";

export function toast(type: ToastType, message: string) {
  // const isSuccess = type === "success";
  sonnerToast[type](message, {
    style: {
      color: `var(--${type}-text)`,
      background: `var(--${type}-bg)`,
    },
  });
}
