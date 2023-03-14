import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronUp } from "lucide-react";
import { Fragment, useState } from "react";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type DropdownSelectProps<TFieldValues extends FieldValues, TContext = any> = {
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  options: PathValue<TFieldValues, Path<TFieldValues>>[];
};

const DropdownSelect = <TFieldValues extends FieldValues>({
  control,
  name,
  options,
}: DropdownSelectProps<TFieldValues>) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Controller
      control={control}
      name={name}
      // defaultValue={selected}
      render={({ field: { onChange } }) => (
        <Listbox
          value={selected}
          onChange={(val) => {
            onChange(val);
            setSelected(val);
          }}
        >
          <div className="relative">
            <Listbox.Button
              className={twMerge(
                "relative w-full cursor-pointer rounded-md border border-gray-400 bg-transparent py-2.5 pl-4 pr-10 text-left text-base text-gray-50 shadow-md transition-colors",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
              )}
            >
              <span className="block truncate">{selected}</span>
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
              <Listbox.Options className="absolute z-10 mt-2 max-h-72 w-full overflow-auto rounded-md bg-gray-600 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className="relative cursor-pointer select-none px-4 py-2 font-medium text-gray-300 transition hover:bg-gray-500/60 ui-selected:bg-gray-500 ui-selected:text-gray-50 hover:ui-selected:bg-gray-500/70"
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span className="block truncate">{option}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-50">
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
      )}
    />
  );
};

export default DropdownSelect;
