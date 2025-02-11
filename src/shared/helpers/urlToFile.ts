export async function urlToFile(
  url: string,
  fileName: string = "downloadedFile",
): Promise<File> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new File([blob], fileName, { type: blob.type });
}
