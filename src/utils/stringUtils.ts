export const formatDate = (date: Date, time?: boolean) => {
  const day = date.getDate();
  const month = date.getDay();

  let formattedDate = `${day < 10 ? "0" + day : day}.${
    month < 10 ? "0" + month : month
  }.${date.getFullYear()}`;

  if (time) {
    formattedDate += ` ${date.getHours()}:${date.getMinutes()}`;
  }

  return formattedDate;
};

export const displayFileSize = (fileSize: number) => {
  if (fileSize === 0) return "0 Bajtów";

  const k = 1024;
  const sizes = ["Bajtów", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(fileSize) / Math.log(k));

  return parseFloat((fileSize / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
