import axios from "axios";

async function upload(payload) {
  return await axios
    .post("https://api.cloudinary.com/v1_1/dz3ndfxtg/upload", {
      upload_preset: "ml_default",
      tags: "browser_upload",
      file: payload
    })
    .then(response => ({
      status: "success",
      url: response.data.url
    }))
    .catch(error => ({
      status: "error",
      message: "Erro no upload da Imagem"
    }));
}

export { upload };
