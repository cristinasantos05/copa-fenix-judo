import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  value: string;
  label: string;
  highlight?: boolean;
};

export default function ModelCard({
  icon,
  value,
  label,
  highlight = false,
}: Props) {
  return (
    <div>
      <div
        className={`
        flex items-center gap-2 sm:gap-4
        rounded-2xl
        border
        px-3 py-4 sm:px-6 sm:py-5
        w-full
        min-h-20 sm:min-h-22.5
        bg-neutral-900/40
        ${highlight ? "border-orange-500/60" : "border-white/10 "}
      `}
      >
        <div
          className={`
          shrink-0
          p-2 sm:p-3 rounded-xl
          bg-white/5
        `}
        >
          {icon}
        </div>

        <div className="flex flex-col justify-center min-w-0">
          <p className="text-lg sm:text-2xl font-semibold text-white wrap-break-word">
            {value}
          </p>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
