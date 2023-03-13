import { Icons } from "@/components/Icons";
import { RadioGroup } from "@headlessui/react";
import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

type RadioInputProps<TInputs extends FieldValues> = {
  control: Control<TInputs, any>;
  name: Path<TInputs>;
  options: {
    value: PathValue<TInputs, Path<TInputs>>;
    label: string;
    description: string;
  }[];
  label?: string;
};

const RadioInput = <TInputs extends FieldValues>({
  control,
  name,
  options,
  label = "Radio input",
}: RadioInputProps<TInputs>) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange } }) => (
        <RadioGroup
          value={selected}
          onChange={(val) => {
            setSelected(val);
            onChange(val);
          }}
        >
          <RadioGroup.Label className="sr-only">{label}</RadioGroup.Label>
          <div className="space-y-2">
            {options.map((option) => (
              <RadioGroup.Option
                key={option.label}
                value={option}
                className={({ active, checked }) =>
                  twMerge(
                    active
                      ? "ring-2 ring-slate-400 ring-offset-2 ring-offset-slate-900"
                      : "",
                    checked ? "bg-violet-600/80 text-white" : "bg-slate-700/80",
                    "relative flex cursor-pointer rounded-md px-5 py-4 shadow-md focus:outline-none"
                  )
                }
              >
                {({ checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-slate-50"
                            }`}
                          >
                            {option.label}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? "text-slate-300" : "text-slate-400"
                            }`}
                          >
                            {option.description}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-600 to-violet-500 p-1 text-white">
                          <Icons.check className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      )}
    />
  );
};

export default RadioInput;
