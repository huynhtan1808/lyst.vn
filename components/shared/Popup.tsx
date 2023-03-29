import React, { useState, useRef } from "react";
import { Popover, Transition } from "@headlessui/react";
import { IoMdArrowDropdown } from "react-icons/io";
import { createPopper } from "@popperjs/core";

type PopoverProps = {
    trigger: React.ReactNode;
    content: React.ReactNode;
    position?: "top" | "right" | "bottom" | "left";
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
  
};

const PopoverComponent = ({ trigger, content, position = "bottom" }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);


  let popperInstance: any;

  const createPopperInstance = () => {
    popperInstance = createPopper(triggerRef.current!, popupRef.current!, {
      placement: position,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    });
  };

  const destroyPopperInstance = () => {
    if (popperInstance) {
      popperInstance.destroy();
      popperInstance = null;
    }
  };

  return (
    <Popover as="div" className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            ref={buttonRef}
            className={`${
              open ? "text-primary" : "text-gray-900"
            } flex items-center justify-between w-full py-2 font-medium text-left bg-white focus:outline-none`}
            onMouseEnter={() => {
              createPopperInstance();
              setIsOpen(true);
            }}
            onMouseLeave={() => {
              destroyPopperInstance();
              setIsOpen(false);
            }}
          >
            {trigger}
          </Popover.Button>
          <Transition
            as={React.Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              static
              className="absolute z-10 w-[250px] bottom-16 bg-white rounded shadow-lg"
              ref={popupRef}
            >
              {content}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default PopoverComponent;
