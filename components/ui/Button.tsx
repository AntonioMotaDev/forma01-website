import Link from "next/link";
import { cn } from "@/lib/cn";
import { ArrowIcon } from "@/components/icons/ArrowIcon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full font-medium transition-[background-color,color,border-color,transform] duration-300 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Dorado como acento estratégico: solo en la acción principal.
  primary:
    "bg-bronze text-carbon hover:bg-carbon hover:text-linen dark:hover:bg-linen dark:hover:text-carbon",
  secondary: "border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-bg",
  ghost: "text-fg underline-offset-4 hover:underline px-0!",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: Omit<CommonProps, "children">) {
  return cn(base, variants[variant], sizes[size], className);
}

function Arrow() {
  return (
    <ArrowIcon className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1" />
  );
}

export function ButtonLink({
  href,
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<React.ComponentProps<typeof Link>, "href" | "className">) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const classes = buttonClasses({ variant, size, className });
  const content = (
    <>
      {children}
      {arrow && <Arrow />}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}

export function Button({
  variant,
  size,
  arrow,
  className,
  children,
  ...props
}: CommonProps & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
