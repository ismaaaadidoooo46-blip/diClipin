import { POST as ingestUrlHandler } from '../src/app/api/ingest-url/route';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    return ingestUrlHandler(req, res);
  }
  
  res.status(405).json({ message: 'Method not allowed' });
}
