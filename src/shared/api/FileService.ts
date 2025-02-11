class FileService {
  rootRoute = (...inline: string[]) =>
    `${import.meta.env.VITE_APP_SERVER_URL}:${import.meta.env.VITE_APP_SERVER_PORT}/files` +
    inline.join("");

  getFile(fileName: string) {
    return this.rootRoute("/get_file/", fileName.toString());
  }

  getProductThumbnail(productId: number) {
    return this.rootRoute("/get_product_thumbnail/", productId.toString());
  }
}

export default new FileService();
