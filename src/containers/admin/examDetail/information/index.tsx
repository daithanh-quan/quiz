"use client";

import React from "react";

import { useParams } from "next/navigation";

import dayjs from "dayjs";

import { useGetDetailExam } from "src/queries/exam/detail";

import { InformationSkeleton } from "./loading";

const Information = () => {
  const params = useParams();
  const examId = params?.id as unknown as number;

  const { data, isLoading = true } = useGetDetailExam<Response.Exam>(examId);

  if (isLoading) {
    return <InformationSkeleton />;
  }

  return (
    <div className="rounded-sm border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-5 text-lg font-bold italic">Exam Information</h2>
      <div className="flex flex-wrap items-start justify-between">
        <div className="border-gray-300 sm:flex-1 sm:border-r">
          <div className="flex gap-2">
            <p className="font-semibold">Exam Name:</p>
            <p>{data?.name || "-"}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Description:</p>
            <p>{data?.description || "-"}</p>
          </div>
        </div>
        <div className="sm:flex-1 sm:pl-4">
          <div className="flex gap-2">
            <p className="font-semibold">Total Questions:</p>
            <p>{data?.questions?.length}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Created At:</p>
            <p>
              {data?.created_at
                ? dayjs(data?.created_at).format("DD/MM/YYYY")
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
