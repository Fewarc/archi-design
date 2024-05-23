import { Product, Shop } from "@prisma/client";

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

export const getShopName = (name: Shop) => {
  switch (name) {
    case "castorama":
      return "Castorama";

    case "ikea":
      return "Ikea";

    case "leroymerlin":
      return "Leroy Merlin";

    default:
      return name;
  }
};

export const getPriceNumber = (price: string) => {
  const regex = /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d+)?/g;
  const match = price.match(regex);

  if (match) {
    const number = Number(match[0].replace(",", "."));
    if (number && !isNaN(number)) {
      return number;
    }
  }
};

export const getProductPrice = (product: Product) => {
  if (!!product.price && !!product.metersOrPieces) {
    return (getPriceNumber(product.price)! * product.metersOrPieces).toFixed(2);
  }
};
