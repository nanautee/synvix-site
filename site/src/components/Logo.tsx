export function Logo({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <img
      src="/assets/logo.png"
      alt="Synvix"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
