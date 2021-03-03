import Error from '@netflix/nerror';
import { nanoid } from 'nanoid';
import { firebaseAdmin } from './firebase';

export const storage = firebaseAdmin.storage();
export const quizBucket = storage.bucket('popkwiz-quiz');

export const uploadFile = async (bucket, file) => {
  return new Promise((resolve) => {
    if (!bucket || !file) {
      throw new Error.VError('Missing required params');
    }

    const newFileName = `${nanoid()}_${Date.now()}`;
    const fileUpload = bucket.file(newFileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      throw new Error.VError('Something is wrong! Unable to upload at the moment.');
    });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
};
