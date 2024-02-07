import axios from "axios";

export const downloadFile = async (key: string, fileName: string) => {
  const url = await axios
    .get(`/api/storage/download?key=${key}`)
    .then((res) => res.data.url);
  const response = await fetch(url);
  const file = await response.blob();
  const downloadUrl = window.URL.createObjectURL(file);

  const anchorElement = document.createElement("a");
  document.body.appendChild(anchorElement);
  anchorElement.download = fileName;
  anchorElement.href = downloadUrl;

  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(downloadUrl);
};
