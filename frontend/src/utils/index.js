export function toImgUrl(str) {
  return `${str.toLowerCase().replace(/\s+/g, "_")}.webp`;
}

export function toRupiah(price) {
  return `Rp${price.toLocaleString("id-ID") || "N/A"}`;
}
