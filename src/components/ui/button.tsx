import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "sm";

const base =
  "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:hover:translate-y-0";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-linear-to-r from-accent to-accent-2 text-accent-foreground shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_10px_30px_-12px_rgba(217,122,63,0.65)] hover:shadow-[0_1px_0_0_rgba(255,255,255,0.2)_inset,0_14px_36px_-10px_rgba(217,122,63,0.8)]",
  secondary:
    "border border-border bg-surface/60 text-foreground hover:border-accent/50 hover:text-accent",
  ghost: "text-muted hover:text-foreground",
};

const sizes: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  sm: "px-3.5 py-1.5 text-sm",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children?: ReactNode;
};

type ButtonProps =
  | (CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string })
  | (CommonProps &
      ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined });

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href) {
    return (
      <a
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
