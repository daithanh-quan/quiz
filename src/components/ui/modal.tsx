import React from "react";

import { cn } from "src/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

type Props = {
  trigger?: React.ReactNode | string;
  title?: React.ReactNode | string;
  contentClassName?: string;
  titleClassName?: string;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  content: ({
    open,
    setOpen,
  }: {
    open: boolean;
    setOpen: (open: boolean) => void;
  }) => React.ReactNode | string;
  closeOutSide?: boolean;
  position?: "bl" | "bc" | "br" | "tl" | "tc" | "tr";
  size?: "sm" | "md" | "lg" | "xl" | "fullscreen";
  isCloseIcon?: boolean;
};

const Modal: React.FC<Props> = ({
  trigger,
  title,
  contentClassName,
  titleClassName,
  closeOutSide,
  isCloseIcon,
  ...props
}) => {
  const [open, setOpen] = React.useState(false);
  const isOpenOutside = typeof props?.open === "boolean";

  const handleOpenChange = (open: boolean) => {
    if (typeof props?.setOpen === "function") {
      props?.setOpen(open);
    } else {
      setOpen(open);
    }
  };

  return (
    <Dialog
      onOpenChange={handleOpenChange}
      open={isOpenOutside ? props?.open : open}
    >
      {trigger && (
        <DialogTrigger asChild onClick={() => handleOpenChange(true)}>
          {trigger}
        </DialogTrigger>
      )}
      <DialogContent
        position={props?.position}
        size={props?.size}
        className={cn("p-5", contentClassName, {
          "[&>.close-icon]:hidden": isCloseIcon,
        })}
        onInteractOutside={(e) => closeOutSide && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle
            className={cn(titleClassName, {
              hidden: !title,
            })}
          >
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          {typeof props?.content === "function"
            ? props?.content({
                open: isOpenOutside ? (props.open as boolean) : open,
                setOpen: isOpenOutside
                  ? (props.setOpen as (open: boolean) => void)
                  : setOpen,
              })
            : props?.content}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
