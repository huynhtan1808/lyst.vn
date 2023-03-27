// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
export const humanFileSize = (size: number) => {
    if (size === 0) return "0 KB";
  
    const i = Math.floor(Math.log(size) / Math.log(1024));
  
    // @ts-ignore
    const convertedNumber = (size / Math.pow(1024, i)).toFixed(2) * 1;
    const units = ["B", "KB", "MB", "GB", "TB"];
    const unit = units[i];
  
    return `${convertedNumber} ${unit}`;
  };
  
  // https://stackoverflow.com/questions/6860853/generate-random-string-for-div-id
  export const randomString = (length: number) => {
    const chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz".split("");
  
    if (!length) {
      length = Math.floor(Math.random() * chars.length);
    }
  
    let str = "";
  
    for (var i = 0; i < length; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  };