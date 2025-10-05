import type { ComponentPropsWithRef, ForwardedRef } from "react";
import { forwardRef } from "react";
import { useId } from "react";
import { clsx } from "clsx";

type SelectProps = ComponentPropsWithRef<"select"> & {
  label: string;
  options: { label: string; value: string }[];
  error?: string;
};

const Dropdown = forwardRef(function Dropdown(
  { label, error, ...selectProps }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>,
) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block">
        <span
          className={clsx("break-words text-sm font-bold leading-5", {
            "text-red-500": error,
          })}
        >
          {label}
        </span>
      </label>
      <select
        ref={ref}
        className={`w-full rounded border border-gray-400 p-1.5 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0 focus:ring-offset-0 ${
          error ? "border-red-500" : ""
        }`}
        {...selectProps}
      >
        {selectProps.options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="text-xs text-red-500">{error}</div>
    </div>
  );
});

export default Dropdown;
