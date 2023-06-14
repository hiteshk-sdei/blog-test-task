import React, { forwardRef } from "react";
import { Button as ButtonElement } from "@mui/material";

const Button = forwardRef((props, ref) => {
  const { label, loading, icon } = props;
  return (
    <ButtonElement disabled={loading ? true : undefined} ref={ref} {...props}>
      {icon} {label}
    </ButtonElement>
  );
});
export default Button;
