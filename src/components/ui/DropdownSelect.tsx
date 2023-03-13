import { Listbox, Transition } from "@headlessui/react";
import { Check, ChevronUp } from "lucide-react";
import { Fragment, useState } from "react";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";

type DropdownSelectProps<TInputs extends FieldValues> = {
  control: Control<TInputs, any>;
  name: Path<TInputs>;
  options: {
    value: PathValue<TInputs, Path<TInputs>>;
    label: string;
  }[];
};

const DropdownSelect = <TInputs extends FieldValues>({
  control,
  name,
  options,
}: DropdownSelectProps<TInputs>) => {
  const [selected, setSelected] = useState(options[0]);
  if (!selected) return null;

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={selected.value}
      render={({ field: { onChange } }) => (
        <Listbox
          value={selected}
          onChange={(val) => {
            onChange(val.value);
            setSelected(val);
          }}
        >
          <div className="relative">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md border border-gray-400 py-2.5 pl-4 pr-10 text-left text-base text-gray-300 shadow-md transition-colors focus:outline-none focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500">
              <span className="block truncate">{selected?.label}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUp
                  className="h-5 w-5 text-gray-400 transition-transform ui-open:rotate-180"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-sm shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                {options.map((option) => (
                  <Listbox.Option
                    key={option.label}
                    className="relative cursor-pointer select-none py-2 pl-10 pr-4 text-white transition hover:bg-gray-500 ui-selected:bg-violet-500 hover:ui-selected:bg-violet-500/80"
                    value={option}
                  >
                    {({ selected }) => (
                      <>
                        <span className="block truncate font-normal ui-selected:font-medium">
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white">
                              <Check className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                          {option.label}
                        </span>
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
