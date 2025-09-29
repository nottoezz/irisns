// imports
import React from "react";

type PillProps = {
  label: string;
  icon?: React.ReactNode;
  className?: string;
};

// pill guiding
export default function Pill({ label, icon, className = "" }: PillProps) {
  return (
    <div className={`chip chip-pill whitespace-nowrap ${className}`}>
      <div className="flex items-center gap-3 min-w-0">
        {icon ?? null}
        <span className="chip-text font-semibold leading-tight">{label}</span>
      </div>
    </div>
  );
}
