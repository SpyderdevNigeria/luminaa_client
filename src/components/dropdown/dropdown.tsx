import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ReactNode } from "react";

type DropdownProps = {
  triggerIcon?: ReactNode;
  triggerLabel: string;
  children: ReactNode;
  showArrow?: boolean;
  style?:string;
};

export default function Dropdown({
  triggerIcon,
  triggerLabel,
  children,
  style = "",
  showArrow = true,
}: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={
            triggerLabel !== ""
              ? `cursor-pointer bg-white inline-flex items-center gap-2 ${style} text-base py-2 px-3 border border-dashboard-gray `
              : "cursor-pointer"
          }
        >
          {triggerIcon && <span>{triggerIcon}</span>}
          <span>{triggerLabel}</span>
          {showArrow && <MdKeyboardArrowDown />}
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`bg-white shadow-md max-h-[300px] overflow-y-scroll  p-2 w-48 z-50 `}
          sideOffset={8}
          align="end"
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
