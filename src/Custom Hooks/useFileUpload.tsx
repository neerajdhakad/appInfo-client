import { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import { Buffer } from 'buffer';

// Add this line if you're using a build tool that doesn't automatically provide polyfills.
window.Buffer = Buffer;

const connectionString = ""
const containerName = "";

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);

  console.log(connectionString, containerName);

  const uploadFileToBlobStorage = async (file: File, fileName: string, folderPath: string): Promise<string> => {
    if (!connectionString || !containerName) {
      throw new Error('Azure Storage connection string or container name is not defined.');
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobName = `${folderPath}/${new Date().toISOString()}/${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(file, {
      blobHTTPHeaders: { blobContentType: file.type },
    });

    return blockBlobClient.url;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploading(true);
      try {
        const url = await uploadFileToBlobStorage(file, file.name, '/fileUpload');
        callback(url);
      } catch (error) {
        console.error('Error uploading file:', error);
      } finally {
        setUploading(false);
      }
    }
  };

  return { handleFileUpload, uploading };
};
