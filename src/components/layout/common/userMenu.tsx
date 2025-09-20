"use client";

import React from "react";

import { useIsMutating } from "@tanstack/react-query";
import { User } from "lucide-react";

import UpdatePassword from "src/components/layout/common/updatePassword";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import Modal from "src/components/ui/modal";
import { useGetMe } from "src/queries/auth/me";

import UpdateUsername from "./updateUsername";

const UserMenu = () => {
  const [valueDropdown, setValueDropdown] = React.useState("");
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const isMutating = useIsMutating();

  const { data } = useGetMe<Response.Me>();

  const handleOpenModal = (type: "username" | "password") => {
    setValueDropdown(type);
    setIsModalOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <>
      <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
        <DropdownMenuTrigger asChild>
          <div className="flex cursor-pointer items-center space-x-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-gray-900">
                {data?.username}
              </p>
              <p className="text-xs capitalize text-gray-500">{data?.role}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Settings Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioItem
            value="bottom"
            className="pl-2"
            onClick={() => handleOpenModal("username")}
          >
            User name
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            value="Password"
            className="pl-2"
            onClick={() => handleOpenModal("password")}
          >
            Password
          </DropdownMenuRadioItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Modal
        closeOutSide={!!isMutating}
        isCloseIcon={!!isMutating}
        title="Update Profile"
        open={isModalOpen}
        setOpen={setIsModalOpen}
        content={() => (
          <div>
            {valueDropdown === "username" && (
              <UpdateUsername onCancel={() => setIsModalOpen(false)} />
            )}
            {valueDropdown === "password" && (
              <UpdatePassword onCancel={() => setIsModalOpen(false)} />
            )}
          </div>
        )}
      />
    </>
  );
};

export default UserMenu;
