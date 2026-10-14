// "84 KB", "1,3 MB": a file's weight, worth knowing before downloading it on mobile data
const sizeFormat = new Intl.NumberFormat('pt-PT', { maximumFractionDigits: 1 });
export const fileSize = (bytes) =>
  bytes >= 1024 * 1024
    ? `${sizeFormat.format(bytes / (1024 * 1024))} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
