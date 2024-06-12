// material-ui
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/material';

//third-party
import { DropzoneOptions } from 'react-dropzone';
import {UseFormRegisterReturn} from "react-hook-form";

// ==============================|| TYPES - DROPZONE ||============================== //

export enum DropzopType {
  default = 'DEFAULT',
  standard = 'STANDARD',
  product = 'PRODUCT',
}

export interface CustomFile extends File {
  path?: string;
  preview?: string;
  lastModifiedDate?: Date;
}

export interface UploadProps extends DropzoneOptions {
  error?: boolean;
  layoutType?: 'circle' | 'box',
  file: CustomFile[] | null;
  setFieldValue: (value: any) => void;
  sx?: SxProps<Theme>;
  register?: UseFormRegisterReturn<any>;
}

export interface UploadMultiFileProps extends DropzoneOptions {
  files?: CustomFile[] | null;
  error?: boolean;
  showList?: boolean;
  type?: DropzopType;
  sx?: SxProps<Theme>;
  onUpload?: VoidFunction;
  onRemove?: (file: File | string) => void;
  onRemoveAll?: VoidFunction;
  setFieldValue: (value: any) => void;
}

export interface FilePreviewProps {
  showList?: boolean;
  type?: DropzopType;
  files: (File | string)[];
  onRemove?: (file: File | string) => void;
}
