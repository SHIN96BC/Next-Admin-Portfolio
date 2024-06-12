/* eslint-disable */
// material-ui
import * as Theme from '@mui/material/styles';

// project import
import { CustomShadowProps } from '@Src/ypes/theme';

declare module '@mui/material/styles' {
  interface Theme {
    customShadows: CustomShadowProps;
  }
}
