"use client";
import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

type Option = { value: string; label: string };

type Props = {
  options: Option[];
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
  icon?: React.ReactNode;
};

export default function CopaSelect({
  options,
  value,
  defaultValue,
  placeholder,
  onChange,
  className = "",
  icon,
}: Props) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(
    value ?? defaultValue ?? options[0]?.value,
  );
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const currentValue = value ?? selectedValue;
  const selected =
    currentValue && currentValue !== ""
      ? options.find((o) => o.value === currentValue)
      : undefined;

  function handleSelect(v: string) {
    if (value === undefined) setSelectedValue(v);
    onChange?.(v);
    setOpen(false);
  }

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const itemHeight = 40;
            const maxVisible = Math.min(options.length, 6);
            const dropdownHeight = itemHeight * maxVisible + 8;
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;
            setOpenUp(spaceBelow < dropdownHeight && spaceAbove > spaceBelow);
          }
          setOpen((s) => !s);
        }}
        className={`w-full flex items-center gap-3 justify-between px-3 py-2 rounded-xl transition focus:outline-none bg-neutral-900 text-white border border-white/10`}
      >
        <div className="flex items-center gap-3">
          <div className="pointer-events-none">{icon}</div>
          <span className="truncate">
            {selected?.label ?? placeholder ?? options[0]?.label}
          </span>
        </div>

        <ChevronDown size={16} />
      </button>

      {open && (
        <div
          className={`absolute left-0 right-0 z-50 rounded-lg border border-white/10 bg-neutral-900 shadow-lg ${
            openUp ? "bottom-full mb-2" : "mt-2 top-full"
          }`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === currentValue;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => handleSelect(opt.value)}
                className={`w-full text-left flex items-center justify-between px-3 py-2 text-sm transition hover:bg-white/5 ${
                  isSelected
                    ? "bg-orange-500 text-black rounded-md"
                    : "text-white"
                }`}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check size={16} className="ml-2" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
