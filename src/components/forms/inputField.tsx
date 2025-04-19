import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import Input from "src/components/ui/input";
import { cn } from "src/lib/utils";

export type InputFieldProps<T extends FieldValues> = {
  name: Path<T>;
  wrapperClassName?: string;
  className?: string;
  label?: string;
  isRequired?: boolean;
  callbackOnchange?: (e: string) => void;
  leftChild?: React.ReactNode;
} & React.HTMLProps<HTMLInputElement>;

function InputField<T extends FieldValues>(
  props: InputFieldProps<T>,
  ref: React.Ref<HTMLInputElement>,
) {
  const {
    isRequired = false,
    name,
    label,
    wrapperClassName,
    leftChild,
    callbackOnchange,
    className,
    ...rest
  } = props;
  const { control } = useFormContext();

  const onKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const exceptThisSymbols: string[] = ["e", "E", "+", "-", ","];

    if (rest?.type === "number") {
      exceptThisSymbols.includes(e.key) && e.preventDefault();
    }
  };

  return (
    <div className={wrapperClassName}>
      {label && (
        <legend className={labelClassName}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </legend>
      )}
      <Controller
        control={control}
        render={({ field, fieldState }) => (
          <div className="flex flex-wrap">
            <div className={cn("relative w-full")}>
              {leftChild}
              <Input
                ref={ref}
                value={field.value || ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  callbackOnchange && callbackOnchange?.(value);
                }}
                onKeyDown={onKeydown}
                className={cn(
                  inputClassName,
                  fieldState?.error ? errorInputClassName : "",
                  className,
                )}
                {...rest}
              />
            </div>
            {fieldState?.error && (
              <div>
                <p className={fieldState?.error ? "text-xs text-red-700" : ""}>
                  {fieldState.error.message}
                </p>
              </div>
            )}
          </div>
        )}
        name={name}
      />
    </div>
  );
}

const inputClassName =
  "w-full border border-solid border-black focus:border-black focus:ring-black focus-visible:ring-black block w-full rounded-md bg-white py-2 pl-3 text-xs sm:text-sm";
const errorInputClassName =
  "border-solid !border-red-700 focus:!border-red-700 focus:ring-red-50 focus-visible:outline-none";
const labelClassName = "mb-2 text-sm font-medium text-gray-800";
export default React.forwardRef(InputField);
