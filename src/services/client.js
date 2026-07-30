import { S3Client, ListObjectsV2Command, GetObjectCommand } from '@aws-sdk/client-s3';

// TODO: Create a lightweight server to handle API requests coming from this client and R2 secrets...
const CLOUDFLARE_ACCOUNT_ID = "526ad746388934fe367e244ac17f74b9";
const CLOUDFLARE_ACCESS_KEY = "fd7d9c09c1edb79ffaa2285ef4a7e743";
const CLOUDFLARE_ACCESS_SECRET = "b9e49a5c66f0135d989d8aef179c9717f2b9975fe36b0d1ff3b5ee33b357dcf4";
const BUCKET_NAME = 'botoes-memes';

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS_KEY,
    secretAccessKey: CLOUDFLARE_ACCESS_SECRET,
  },
});

export async function listFiles() {
  try {
    const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
    const response = await s3.send(command);
    return (response.Contents || []).map((obj) => ({
      id: obj.Key,
      name: obj.Key,
    }));
  } catch (error) {
      console.error('Error fetching file list:', error);
      throw error;
  }
}

export async function getFile(fileKey) {
  try {
    const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: fileKey });
    const response = await s3.send(command);
    const byteArray = await response.Body.transformToByteArray();
    return new Blob([byteArray], { type: 'audio/wav' });
  } catch (error) {
      console.error('Error fetching file:', error);
      throw error;
  }
}