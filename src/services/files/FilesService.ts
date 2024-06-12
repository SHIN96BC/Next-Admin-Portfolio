import Service from "@Src/services/Service";
import {S3UploadFields, UploadFileReq, UploadUrlRes} from "@Src/services/files/model";

class FilesService extends Service {
  getUploadUrl() {
    return this.http.get<UploadUrlRes>('/seller/store/packageMenu/uploadUrl');
  }

  uploadFile(data: UploadFileReq) {
    return this.file.fileUpload(data.url, data.data);
  }
}

export default new FilesService();