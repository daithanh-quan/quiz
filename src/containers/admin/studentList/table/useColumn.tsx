import React, { Fragment, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useQueryClient } from "@tanstack/react-query";
import { ColumnDef, Row } from "@tanstack/react-table";
import dayjs from "dayjs";
import { CheckIcon, Pencil, PencilLine, TrashIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { keys } from "src/api/users";
import InputPwField from "src/components/forms/passwordField";
import { Button } from "src/components/ui/button";
import { Checkbox } from "src/components/ui/checkbox";
import Modal from "src/components/ui/modal";
import { Switch } from "src/components/ui/switch";
import { useQuery } from "src/hooks/useQuery";
import { cn } from "src/lib/utils";
import { useChangeStatus, useUpdateProfile } from "src/queries/user/detail";

import DeleteConfirm from "./deleteConfirm";
import InsetStudent from "./insetStudent";

const useColumn = () => {
  const query = useQuery();

  const columns: ColumnDef<unknown, unknown>[] = useMemo(() => {
    return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table?.getIsAllPageRowsSelected() ||
              ((table?.getIsSomePageRowsSelected() &&
                "indeterminate") as CheckedState)
            }
            onCheckedChange={(value) =>
              table?.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
      },
      {
        accessorKey: "username",
        header: "Name Student",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (props) => {
          const row = props.row as Row<Response.Me>;
          const client = useQueryClient();

          const { mutate, isPending } = useChangeStatus(row?.original?.id!, {
            onSuccess: async () => {
              await client.invalidateQueries({
                queryKey: keys.getList({
                  page: query?.page || 1,
                  limit: query?.limit || 10,
                }),
              });
              toast.success("Change status successfully");
            },
            onError: () => {
              toast.error("Change status failed");
            },
          });

          return (
            <Switch
              loading={isPending}
              onCheckedChange={(value) => {
                mutate({
                  status: value ? "active" : "pending",
                });
              }}
              checked={row.original.status === "active"}
            />
          );
        },
      },
      {
        accessorKey: "Password",
        header: "Password",
        cell: (props) => {
          const row = props.row as Row<Response.Me>;

          const schema = z.object({
            password: z
              .string({
                required_error: "Password is required",
              })
              .min(6, "Password must be at least 6 characters"),
          });

          const client = useQueryClient();
          const form = useForm({
            resolver: zodResolver(schema),
          });

          const [isEditing, setIsEditing] = React.useState(false);

          const { mutate, isPending } = useUpdateProfile(row?.original?.id!, {
            onSuccess: async () => {
              await client.invalidateQueries({
                queryKey: keys.getList({
                  page: query?.page || 1,
                  limit: query?.limit || 10,
                }),
              });
              setIsEditing(false);
              form.reset();
              toast.success("Change status successfully");
            },
            onError: () => {
              toast.error("Change status failed");
            },
          });

          return (
            <FormProvider {...form}>
              <div
                className={cn("flex items-center gap-2", {
                  "items-start": form.formState.errors.password,
                })}
              >
                <InputPwField
                  wrapperClassName="max-w-[150px]"
                  name="password"
                  placeholder="******"
                  disabled={!isEditing}
                />
                {!isEditing && (
                  <Button
                    className="px-2 py-0.5"
                    onClick={() => setIsEditing(true)}
                    type="button"
                  >
                    <PencilLine size={5} width={5} height={5} />
                  </Button>
                )}
                {isEditing && (
                  <Fragment>
                    <Button
                      disabled={isPending}
                      loading={isPending}
                      onClick={form.handleSubmit((v) => {
                        mutate({
                          password: v.password,
                        });
                      })}
                      type="button"
                      className="px-2 py-0.5"
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      disabled={isPending}
                      variant="delete"
                      className="px-2 py-0.5"
                      onClick={() => {
                        setIsEditing(false);
                        form.reset();
                      }}
                      type="button"
                    >
                      <XIcon />
                    </Button>
                  </Fragment>
                )}
              </div>
            </FormProvider>
          );
        },
      },
      {
        accessorKey: "created_at",
        header: "Created At",
        cell: ({ row }) =>
          dayjs(row.getValue("created_at")).format("DD/MM/YYYY"),
      },
      {
        accessorKey: "actions",
        header: "",
        cell: (props) => {
          const row = props.row as Row<Response.Me>;

          return (
            <div className="flex items-center justify-end gap-2">
              <Modal
                title="Delete Class"
                content={({ setOpen }) => (
                  <DeleteConfirm
                    idClass={row?.original?.id!}
                    setOpen={setOpen}
                  />
                )}
                trigger={
                  <Button variant="delete">
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                }
              />
              <Modal
                title="Edit Student"
                content={({ setOpen }) => (
                  <InsetStudent
                    id={row?.original?.id}
                    defaultValues={{
                      username: row?.original?.username,
                      email: row?.original?.email,
                    }}
                    setOpen={setOpen}
                  />
                )}
                trigger={
                  <Button variant="default">
                    <Pencil className="h-4 w-4" />
                  </Button>
                }
              />
            </div>
          );
        },
      },
    ];
  }, []);

  return {
    columns,
  };
};

export default useColumn;
