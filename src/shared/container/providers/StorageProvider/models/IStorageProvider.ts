export default interface IStorageProvider {
  downloadFile(files: string): Promise<string | void>;
  saveFile(file: string): Promise<string | void>;
  deleteFile(file: string): Promise<void>;
}
