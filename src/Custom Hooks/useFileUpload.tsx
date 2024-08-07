import { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';

const connectionString = import.meta.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = import.meta.env.AZURE_STORAGE_CONTAINER_NAME;

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadFileToBlobStorage = async (file: File, fileName: string, folderPath: string): Promise<string> => {
    if (!connectionString || !containerName) {
      throw new Error('Azure Storage connection string or container name is not defined in the environment variables.');
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
        const url = await uploadFileToBlobStorage(file, file.name, 'your-folder-path');
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
