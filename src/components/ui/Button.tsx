import LoadingDots from "@/components/ui/LoadingDots";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  isLoading?: boolean;
  loadingVariant?: "spinner" | "dots";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      isLoading = false,
      loadingVariant = "spinner",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={twMerge(
          "flex h-10 w-full items-center justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-800",
          variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700",
          variant === "secondary" &&
            "bg-gray-50 text-gray-900 hover:bg-gray-200",
          variant === "ghost" &&
            "bg-transparent hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-100",
          className
        )}
        {...props}
      >
        {isLoading ? (
          loadingVariant === "spinner" ? (
            <div className="flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            <LoadingDots
              color={variant === "primary" ? "#f9fafb" : "#111827"}
              size="large"
            />
          )
        ) : (
          props.children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
