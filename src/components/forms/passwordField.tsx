"use client";

import React from "react";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

import { EyeIcon, EyeOffIcon } from "lucide-react";

import Input from "src/components/ui/input";
import { cn } from "src/lib/utils";

import { Button } from "../ui/button";

export type PasswordField<T extends FieldValues> = {
  name: Path<T>;
  className?: string;
  label?: string;
  isRequired?: boolean;
  callbackOnchange?: (e: string) => void;
  wrapperClassName?: string;
  leftChild?: React.ReactNode;
} & React.HTMLProps<HTMLInputElement>;

function InputPwField<T extends FieldValues>(
  props: PasswordField<T>,
  ref: React.Ref<HTMLInputElement>,
) {
  const {
    isRequired = false,
    label,
    wrapperClassName,
    callbackOnchange,
    name,
    className,
    ...rest
  } = props;
  const [showPassword, setShowPassword] = React.useState(false);

  const { control } = useFormContext();

  return (
    <div className={wrapperClassName}>
      {label && (
        <legend className={labelClassName}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </legend>
      )}
      <Controller
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-wrap">
            <div className={cn("relative w-full")}>
              <Input
                ref={ref}
                value={field.value || ""}
                style={{ width: "100%" }}
                type={showPassword ? "text" : "password"}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  callbackOnchange && callbackOnchange?.(value);
                }}
                className={cn(
                  inputClassName,
                  error ? errorInputClassName : "",
                  className,
                )}
                {...rest}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={!field?.value}
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
            {error && (
              <p className={error ? "text-xs text-red-700" : ""}>
                {error?.message || "Error"}
              </p>
            )}
          </div>
        )}
        name={name}
      />
    </div>
  );
}

const labelClassName = "mb-2 text-sm font-medium text-gray-800";
const inputClassName =
  "border border-solid border-black focus:border-black focus:ring-black focus-visible:ring-black block w-full rounded-md bg-white py-2 pl-3 text-xs sm:text-sm";
const errorInputClassName =
  "border-solid !border-red-700 focus:!border-red-700 focus:ring-red-50 focus-visible:outline-none";

export default React.forwardRef(InputPwField);
