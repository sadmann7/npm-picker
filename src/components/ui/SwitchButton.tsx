import { Switch } from "@headlessui/react";
import { useState } from "react";
import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";
import { twMerge } from "tailwind-merge";

type SwitchButtonProps<TInputs extends FieldValues> = {
  control: Control<TInputs, any>;
  name: Path<TInputs>;
  defaultChecked?: boolean;
  label: string;
};

const SwitchButton = <TInputs extends FieldValues>({
  control,
  name,
  defaultChecked = false,
  label,
}: SwitchButtonProps<TInputs>) => {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <Controller
      control={control}
      name={name}
      // defaultValue={defaultChecked as TInputs[typeof name]}
      render={({ field: { onChange } }) => (
        <Switch.Group>
          <div className="flex items-center justify-between gap-5">
            <Switch.Label className="text-sm text-slate-400 sm:text-base">
              {label}
            </Switch.Label>
            <Switch
              checked={enabled}
              onChange={(val) => {
                onChange(val);
                setEnabled(val);
              }}
              className={twMerge(
                "relative inline-flex h-6 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ui-checked:hover:bg-slate-400/90 ui-not-checked:hover:bg-slate-500/90",
                "focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2  focus:ring-offset-slate-900",
                enabled ? "bg-slate-400" : "bg-slate-500"
              )}
            >
              <span className="sr-only">Use setting</span>
              <span
                aria-hidden="true"
                className={twMerge(
                  "inline-block h-5 w-5 rounded-full shadow ring-0 transition duration-200 ease-in-out",
                  enabled
                    ? "translate-x-6 bg-violet-700"
                    : "translate-x-0 bg-slate-100"
                )}
              />
            </Switch>
          </div>
        </Switch.Group>
      )}
    />
  );
};

export default SwitchButton;
