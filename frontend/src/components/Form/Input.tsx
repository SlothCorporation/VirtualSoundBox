import type { ComponentPropsWithRef } from "react";
import { useId } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
  label: string;
};

function Input({ label, ...inputProps }: InputProps) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="block">
        <span className="error break-words text-sm font-bold leading-5">
          {label}
        </span>
      </label>
      <input
        id={id}
        type="text"
        className="w-full rounded border border-gray-400 p-1.5 text-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-0 focus:ring-offset-0"
        {...inputProps}
      />
    </div>
  );
}

export default Input;
