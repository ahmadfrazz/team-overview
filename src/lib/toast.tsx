import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "error";

interface ShowToastOptions {
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  variant?: Variant;
}

const variantStyles: Record<Variant, string> = {
  default: "",
  success: "!bg-[#9fe2c0] !text-[#066e37] !border-[#BAE6D0]",
  error: "!bg-destructive !text-destructive-foreground !border-destructive",
};

export function showToast(title: string, options: ShowToastOptions = {}) {
  const variantClass = variantStyles[options.variant ?? "default"];

  return toast(title, {
    description: options.description,
    action: options.action,
    className: cn(
      "border shadow-lg", // keeps Sonner layout & spacing
      variantClass
    ),
    descriptionClassName: cn("!text-sm !opacity-90 !text-inherit"),
    dismissible: true,
  });
}
