import type { ComponentPropsWithRef, ForwardedRef } from "react";
import { forwardRef } from "react";
import { useId } from "react";
import { clsx } from "clsx";

type InputProps = ComponentPropsWithRef<"input"> & {
  label: string;
  error?: string;
};

const Input = forwardRef(function Input(
  { label, error, ...inputProps }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
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
      <input
        id={id}
        ref={ref}
        type="text"
        className={clsx(
          "w-full rounded border border-gray-400 p-1.5 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0 focus:ring-offset-0",
          { "border-red-500": error },
        )}
        {...inputProps}
      />
      <div className="text-xs text-red-500">{error}</div>
    </div>
  );
});

export default Input;
