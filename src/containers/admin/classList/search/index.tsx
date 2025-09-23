"use client";

import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { SearchIcon } from "lucide-react";

import { InputField } from "src/components/forms";
import { Button } from "src/components/ui/button";
import { useHistory } from "src/hooks/useHistory";
import { useQuery } from "src/hooks/useQuery";

type FormValues = {
  search: string;
};

type Query = FormValues;

const Search = () => {
  const query = useQuery<Query>();
  const { push, reset } = useHistory();

  const form = useForm<FormValues>({
    defaultValues: {
      search: query?.search || "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (v) => {
    push({
      params: {
        search: v.search,
      },
    });
  };

  const onReset = () => {
    reset();
    form.reset();
  };

  return (
    <div className="rounded-md border border-gray-200 bg-white p-4">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-2"
        >
          <InputField
            leftChild={
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
            }
            name="search"
            placeholder="Search class name"
            wrapperClassName="flex-[0_0_200px]"
            className="pl-8 focus:outline-none"
          />
          <div className="flex items-center gap-2">
            <Button>Search</Button>
            {form?.watch("search") && (
              <Button onClick={onReset} type="button">
                Reset
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default Search;
