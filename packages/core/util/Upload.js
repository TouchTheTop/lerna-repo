import AppConfig from "./getConfig";
import TUpload from "./TecentUpload";
import AUpload from "./AliUpload";

function GenUpload() {
  const { upload } = AppConfig;
  return upload.Type === "tecent" ? TUpload(upload) : AUpload(upload);
}

export default GenUpload();
