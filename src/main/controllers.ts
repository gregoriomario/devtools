import { dialog, IpcMainInvokeEvent } from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import sharp from 'sharp';
import { ImageConfiguration } from '../renderer/containers/ImageResize';
import { ImageType } from '../renderer/shared/Image';

const takeFilter = (args: unknown[]) => {
  const [first] = args;
  let filtering;
  if (Array.isArray(first)) {
    filtering = first;
  } else {
    filtering = args;
  }
  return filtering;
};

export async function openFile(
  _: IpcMainInvokeEvent,
  ...args: unknown[]
): Promise<string | null> {
  const filtering = takeFilter(args);

  const { filePaths, canceled } = await dialog.showOpenDialog({
    properties: ['openDirectory', 'openFile'],
    filters: [
      {
        name: 'JSON Files',
        extensions: filtering,
      },
    ],
  });

  if (canceled) {
    return null;
  }

  const content = readFileSync(filePaths[0], { encoding: 'utf-8' });
  return content;
}

export async function uploadFile(
  _: IpcMainInvokeEvent,
  ...args: unknown[]
): Promise<Array<ImageType> | null> {
  const filtering = takeFilter(args);

  const { filePaths, canceled } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      {
        name: 'Images',
        extensions: filtering,
      },
    ],
  });

  if (canceled) return null;

  const images: ImageType[] = [];

  filePaths.forEach((value) => {
    const buffer = readFileSync(value, { encoding: 'base64' });
    const mimeType = `image/${value.split('.').pop()}`;
    const name = value.split('/').pop() || '';
    images.push({ buffer, mimeType, name });
  });

  return images;
}

export async function dragUploadFile(
  _: IpcMainInvokeEvent,
  ...args: unknown[]
) {
  const filtering = takeFilter(args);

  const images: ImageType[] = [];

  filtering.forEach((item) => {
    const buffer = readFileSync(item, { encoding: 'base64' });
    const mimeType = `image/${item.split('.').pop()}`;
    const name = item.split('/').pop();
    images.push({ buffer, mimeType, name });
  });

  return images;
}

export async function saveFile(_: IpcMainInvokeEvent, ...args: unknown[]) {
  const content = args[0] as string;

  const { filePath, canceled } = await dialog.showSaveDialog({
    properties: ['showOverwriteConfirmation'],
    title: 'untitled',
    defaultPath: '~/untitled.yaml',
  });

  if (canceled || !filePath) {
    return false;
  }

  writeFileSync(filePath, content, { encoding: 'utf-8' });
  return true;
}

export async function processImage(
  _: IpcMainInvokeEvent,
  conf: ImageConfiguration & { images: ImageType[] }
) {
  const { images, width, height, format } = conf;

  const size = {};

  if (width) Object.assign(size, { width: +width });
  if (height) Object.assign(size, { height: +height });

  const { canceled, filePath } = await dialog.showSaveDialog({
    defaultPath: 'resize-',
    nameFieldLabel: 'Prefix',
  });

  if (canceled) return null;

  images.forEach(async (img) => {
    const buffer = Buffer.from(img.buffer, 'base64');
    let imgBuffer;
    const newImageName = `${img.name.split('.')[0]}.${format}`;
    if (format === 'jpeg') {
      imgBuffer = await sharp(buffer).resize(size).jpeg().toBuffer();
    } else {
      imgBuffer = await sharp(buffer).resize(size).png().toBuffer();
    }
    writeFileSync(filePath + newImageName, imgBuffer, { encoding: 'base64' });
  });

  return conf;
}
