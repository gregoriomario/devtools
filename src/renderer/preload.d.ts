import { ImageConfiguration } from './containers/ImageResize';
import { ImageType } from './shared/Image';

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        uploadFile(files: string[]): Promise<Array<ImageType>>;
        processImage(
          conf: ImageConfiguration & { images: ImageType[] }
        ): Promise<void>;
        dragUploadFile(files: string[]): Promise<Array<ImageType>>;
        saveFile(file: string): Promise<void>;
        openFile(file: string): Promise<string>;
      };
    };
  }
}

export {};
