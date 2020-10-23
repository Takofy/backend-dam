export default interface IStorageProvider {
  saveFile(file: string): Promise<string | void>;
  deleteFile(file: string): Promise<void>;
}
