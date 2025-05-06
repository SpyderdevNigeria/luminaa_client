import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MdKeyboardArrowDown } from "react-icons/md";
import { ReactNode } from "react";

type DropdownProps = {
  triggerIcon?: ReactNode;
  triggerLabel: string;
  children: ReactNode;
  showArrow?: boolean;
};

export default function Dropdown({
  triggerIcon,
  triggerLabel,
  children,
  showArrow = true,
}: DropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <div className="cursor-pointer inline-flex items-center gap-2 text-sm py-2 px-3 border border-dashboard-gray rounded-sm">
          {triggerIcon && <span>{triggerIcon}</span>}
          <h4>{triggerLabel}</h4>
          {showArrow && <MdKeyboardArrowDown />}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="bg-white shadow-md rounded-md p-2 w-48 z-50"
          sideOffset={8}
          align="end"
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
