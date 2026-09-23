export function ArrowIcon({
  className,
  direction = "right",
}: {
  className?: string;
  direction?: "right" | "up-right" | "left";
}) {
  const rotate = { right: 0, "up-right": -45, left: 180 }[direction];
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      style={rotate ? { rotate: `${rotate}deg` } : undefined}
      aria-hidden
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}
