"use client";

import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {};

const ToasterComponents = (props: Props) => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ToasterComponents;