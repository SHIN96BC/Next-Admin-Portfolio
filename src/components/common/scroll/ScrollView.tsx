import Box from "@mui/material/Box";
import {forwardRef, ReactNode} from "react";
import {border} from "@mui/system";

type Props = {
  width?: string | number,
  height: string | number,
  border?: string,
  children?: ReactNode,
};

const ScrollView = forwardRef(({ width, height, border, children }: Props, ref) => {
  return (
    <Box
      ref={ref}
      sx={{
        width: width ? width : '100%',
        height,
        border: border ? border : '',
        overflowY: 'scroll',
        overflowX: 'hidden',}}
    >
      { children }
    </Box>
  );
});

ScrollView.displayName = 'ScrollView';

export default ScrollView;