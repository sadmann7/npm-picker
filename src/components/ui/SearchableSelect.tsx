import { Icons } from "@/components/Icons";
import { Combobox, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

type SearchableSelectProps<TInputs extends FieldValues> = {
  control: Control<TInputs, any>;
  name: Path<TInputs>;
  options: string[];
  placeholder?: string;
};

const SearchableSelect = <TInputs extends FieldValues>({
  control,
  name,
  options,
  placeholder = "Search for a option...",
}: SearchableSelectProps<TInputs>) => {
  const [selected, setSelected] = useState<string>(options[0]);
  const [query, setQuery] = useState<string>("");

  const filteredOptions =
    query === ""
      ? options
      : options
          .filter((option) =>
            option.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: true,
        validate: (value) => value !== options[0],
      }}
      render={({ field: { onChange } }) => (
        <Combobox
          value={selected}
          onChange={(value) => {
            setSelected(value);
            onChange(value);
          }}
        >
          <div className="relative mt-1">
            <Combobox.Input
              className="w-full rounded-md border-slate-400 bg-transparent px-4 py-2.5 text-white placeholder:text-slate-300 focus:border-violet-500 focus:outline-none focus:ring-violet-500"
              placeholder={placeholder}
              defaultValue={selected}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={(event) => {
                const value = event.target.value;
                event.target.value = "";
                event.target.value = value;
              }}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <Icons.chevronDown
                className="h-5 w-5 rotate-180 text-gray-400 transition-transform ui-open:rotate-0"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute z-10 mt-2 max-h-48 w-full overflow-auto rounded-md bg-slate-900/80 py-1 text-sm shadow-lg ring-1 ring-slate-500 backdrop-blur-md backdrop-filter focus:outline-none">
                {filteredOptions.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-red-500">
                    Nothing found.
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <Combobox.Option
                      key={option}
                      className="relative cursor-default select-none py-2 px-4 text-slate-200 ui-active:bg-slate-700"
                      value={option}
                    >
                      <span>{option}</span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <Icons.check
                          className="h-5 w-5 text-current opacity-0 ui-active:opacity-100"
                          aria-hidden="true"
                        />
                      </span>
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      )}
    />
  );
};

export default SearchableSelect;
