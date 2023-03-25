import type { SetState } from "@/types/globals";
import { toTitleCase } from "@/utils/format";
import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronUp } from "lucide-react";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type DropdownProps<T extends string> = {
  options: T[];
  selected: T;
  setSelected: SetState<T>;
} & React.HTMLAttributes<HTMLDivElement>;

const Dropdown = <T extends string>({
  options,
  selected,
  setSelected,
  className,
}: DropdownProps<T>) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className={twMerge("relative", className)}>
        <Listbox.Button
          className={twMerge(
            "relative w-full cursor-pointer rounded-md border border-gray-400 bg-transparent py-2.5 pl-4 pr-10 text-left text-base text-gray-50 shadow-md transition-colors",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
          )}
        >
          <span className="block truncate">{toTitleCase(selected)}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUp
              className="h-5 w-5 text-gray-200 transition-transform ui-open:rotate-180"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Listbox.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-md bg-gray-50 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {options.map((option) => (
              <Listbox.Option
                key={option}
                className={twMerge(
                  "relative cursor-pointer select-none px-4 py-2 font-medium text-gray-800 transition",
                  "ui-selected:bg-gray-300/70 ui-active:bg-gray-300 hover:ui-active:bg-gray-300/50"
                )}
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className="block truncate">
                      {toTitleCase(option)}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-800">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default Dropdown;
