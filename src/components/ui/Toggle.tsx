import { Switch } from "@headlessui/react";
import { type Dispatch, type SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type ToggleProps = {
  enabled: boolean;
  setEnabled: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  enabledLabel?: string;
  disabledLabel?: string;
};

const Toggle = ({
  enabled,
  setEnabled,
  disabled = false,
  enabledLabel,
  disabledLabel,
}: ToggleProps) => {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label
          as="span"
          className={twMerge(
            "mr-3 cursor-default",
            disabledLabel ? "not-sr-only" : "sr-only"
          )}
        >
          <span
            className={`text-sm font-medium ${
              !enabled ? "text-white" : "text-gray-500"
            } `}
          >
            {disabledLabel}
          </span>
        </Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={twMerge(
            "relative inline-flex h-8 w-16 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
            enabled ? "bg-blue-700" : "bg-blue-600",
            disabled && "pointer-events-none opacity-50"
          )}
          disabled={disabled}
        >
          <span className="sr-only">Use setting</span>
          <span
            aria-hidden="true"
            className={twMerge(
              "pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out",
              enabled ? "translate-x-9" : "translate-x-0"
            )}
          />
        </Switch>
        <Switch.Label
          as="span"
          className={twMerge(
            "ml-3 cursor-default",
            enabledLabel ? "not-sr-only" : "sr-only"
          )}
        >
          <span
            className={`text-sm font-medium ${
              enabled ? "text-white" : "text-gray-500"
            } `}
          >
            {enabledLabel}
          </span>
        </Switch.Label>
      </div>
    </Switch.Group>
  );
};

export default Toggle;
