"use client";

import React from "react";

import { useParams } from "next/navigation";

import { useIsMutating } from "@tanstack/react-query";
import { TableOptions } from "@tanstack/table-core";
import { PlusIcon, TrashIcon } from "lucide-react";

import { UsersInClassResponse } from "src/api/class";
import CusTomTable from "src/components/tables";
import { Button } from "src/components/ui/button";
import Modal from "src/components/ui/modal";
import AddStudentToClass from "src/containers/admin/classDetail/table/addStudentToClass";
import RemoveStudentFromClassConfirm from "src/containers/admin/classDetail/table/removeStudentFromClassConfirm";
import { useGetStudentInClass } from "src/queries/class/detail";

import useColumn from "./useColumn";

const Table = () => {
  const isMutating = useIsMutating();
  const params = useParams();
  const classId = params?.id as unknown as number;

  const { data, isLoading } = useGetStudentInClass<UsersInClassResponse>(
    classId,
    {
      retry: false,
    },
  );

  const [rowSelection, setRowSelection] = React.useState({});
  const { columns } = useColumn();
  const itemsSelected =
    Object.keys(rowSelection)?.map((item) => Number(item)) || [];

  return (
    <div className="mt-5 rounded-md border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-lg font-bold italic"> Students In Class</h2>
        <div className="flex items-center gap-2">
          {itemsSelected.length > 0 && (
            <Modal
              title="Remove Student From Class"
              content={({ setOpen }) => (
                <RemoveStudentFromClassConfirm
                  idsStudent={itemsSelected}
                  setOpen={setOpen}
                  onSuccess={() => setRowSelection({})}
                />
              )}
              trigger={
                <Button
                  variant="delete"
                  icon={<TrashIcon className="h-4 w-4" />}
                  iconPosition="left"
                >
                  Remove {itemsSelected.length}
                  {itemsSelected.length > 1 ? " Students" : " Student"}
                </Button>
              }
            />
          )}
          <Modal
            closeOutSide={!!isMutating}
            title="Add Student In Class"
            size="xl"
            content={({ setOpen }) => <AddStudentToClass />}
            trigger={
              <Button
                iconPosition="left"
                icon={<PlusIcon className="h-4 w-4 text-white" />}
              >
                Add Student In Class
              </Button>
            }
          />
        </div>
      </div>
      <CusTomTable
        data={data?.users || []}
        wrapperClassName="max-h-[450px] overflow-y-hidden"
        isLoading={isLoading}
        paginator={null}
        columns={columns}
        options={
          {
            state: {
              rowSelection,
            },
            onRowSelectionChange: setRowSelection,
          } as TableOptions<any>
        }
      />
    </div>
  );
};

export default Table;
