export interface UploadUrlRes {
  url: string;
  fields: {
    "Content-Type": string;
    "key": string;
    "x-amz-algorithm": string;
    "x-amz-credential": string;
    "x-amz-date": string;
    "x-amz-security-token": string;
    "policy": string;
    "x-amz-signature": string;
  };
}

export interface S3UploadFields {
  [key: string]: any;
  'Content-Type': string;
  key: string;
  'x-amz-algorithm': string;
  'x-amz-credential': string;
  'x-amz-date': string;
  'x-amz-security-token': string;
  policy: string;
  'x-amz-signature': string;
}

export interface UploadFileReq{
  url: string;
  data: FormData;
}