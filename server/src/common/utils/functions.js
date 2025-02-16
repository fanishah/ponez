const path = require("path");
function ListOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files.map((file) => {
      return path.join(fileUploadPath.replace(/\\/g, "/"), file.filename);
    });
  } else {
    return [];
  }
}

module.exports = {
  ListOfImagesFromRequest,
};
