import {useMutation, useQuery} from "@tanstack/react-query";
import queryOptions from "@Src/services/files/queries";
import {UploadFileReq} from "@Src/services/files/model";


export function findByUploadUrl() {
  return queryOptions.uploadUrl();
}

export function useUploadFiles() {
  return useMutation(queryOptions.uploadFiles());
}