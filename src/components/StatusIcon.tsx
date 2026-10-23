type IconName =
  | "arrow"
  | "check"
  | "chevronDown"
  | "chevronUp"
  | "coffee"
  | "eye"
  | "lock"
  | "refresh"
  | "shield"
  | "terminal"
  | "warning";

export function StatusIcon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
    check: <path d="m5 12 4 4L19 6" />,
    chevronDown: <path d="m6 9 6 6 6-6" />,
    chevronUp: <path d="m18 15-6-6-6 6" />,
    coffee: (
      <>
        <path d="M4 8h11v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z" />
        <path d="M15 10h2a3 3 0 0 1 0 6h-3M7 4v1m4-1v1" />
      </>
    ),
    eye: (
      <>
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="2.5" />
      </>
    ),
    lock: (
      <>
        <rect x="5" y="10" width="14" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7v5h-5" />
        <path d="M19 12a7 7 0 1 1-2-5" />
      </>
    ),
    shield: <path d="M12 3 4.5 6v5.5c0 4.7 3.2 8.1 7.5 9.5 4.3-1.4 7.5-4.8 7.5-9.5V6Z" />,
    terminal: (
      <>
        <path d="m5 7 4 4-4 4M11 17h7" />
        <rect x="2.5" y="3.5" width="19" height="17" rx="2" />
      </>
    ),
    warning: (
      <>
        <path d="M10.3 3.7 2.5 18a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0Z" />
        <path d="M12 9v4m0 4h.01" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
