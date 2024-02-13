import React, { useState } from "react";
import {
  Dialog,
  Heading,
  ListBox,
  Modal,
  ModalOverlay,
} from "react-aria-components";
import CloseIcon from "@heroicons/react/24/outline/XMarkIcon";
import { IconButton } from "./IconButton";
import { DrawerItems } from "./DrawerItems/DrawerItems.enum";

import { Modules, ModuleListItem } from "./DrawerItems/modules";
import { APIs, ApiListItem } from "./DrawerItems/apis";

export function DevToolsDrawer() {
  const [openDevToolOption, setOpenDevToolOption] = useState<DrawerItems>();

  return (
    <ModalOverlay
      className={({ isEntering, isExiting }) => `
          fixed inset-0 z-10 overflow-y-auto bg-black/25 flex min-h-full items-stretch justify-end text-center backdrop-blur
          ${isEntering ? "animate-in fade-in duration-300 ease-out" : ""}
          ${isExiting ? "animate-out fade-out duration-200 ease-in" : ""}
        `}
      isDismissable={true}
    >
      <Modal
        className={({ isEntering, isExiting }) => `
            w-full max-w-md overflow-hidden bg-white text-left align-middle shadow-xl
            ${
              isEntering
                ? "animate-in slide-in-from-right ease-out duration-300"
                : ""
            }
            ${
              isExiting
                ? "animate-out slide-out-to-right ease-in duration-200"
                : ""
            }
          `}
        isDismissable={true}
      >
        <Dialog className={"outline-none relative"}>
          {({ close }) => (
            <>
              <div className="flex items-center justify-between px-6 py-4 border-b-gray-300 border-b border-solid">
                <Heading
                  level={1}
                  className={"text-gray-800 font-semibold text-2xl"}
                >
                  Developer Tools
                </Heading>
                <IconButton onPress={close} label={"Close Developer Tools"}>
                  <CloseIcon className={"w-6 h-6"} />
                </IconButton>
              </div>
              {openDevToolOption === undefined && (
                <ListBox
                  aria-label="Developer tools actions"
                  selectionMode="single"
                  selectedKeys={openDevToolOption ? [openDevToolOption] : []}
                  onSelectionChange={(keys) => {
                    const array = Array.from(keys);
                    if (array.length > 0) {
                      setOpenDevToolOption(array[0] as DrawerItems);
                    } else {
                      setOpenDevToolOption(undefined);
                    }
                  }}
                >
                  <ModuleListItem />
                  <ApiListItem />
                </ListBox>
              )}
              {openDevToolOption === DrawerItems.MODULES && (
                <Modules close={() => setOpenDevToolOption(undefined)} />
              )}
              {openDevToolOption === DrawerItems.APIS && (
                <APIs close={() => setOpenDevToolOption(undefined)} />
              )}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
