import FilesService from "@Src/services/files/FilesService";
import {UploadFileReq} from "@Src/services/files/model";

const queryKeys = {
  uploadUrl: ['uploadUrl'] as const,
};

const queryOptions = {
  uploadUrl: () => FilesService.getUploadUrl(),
  uploadFiles: () => ({
    mutationFn: (data: UploadFileReq) => FilesService.uploadFile(data),
  }),
};

export default queryOptions;