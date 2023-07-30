import { NextApiRequest, NextApiResponse } from 'next';
import { Method, Params, proxyBackend } from '@/api/backendApi';

const proxy = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, body, query } = req;

  const backendEndpoint = `${req.url}`;

  try {
    // Forward the request to the backend server.
    const response = await proxyBackend(
      method?.toLowerCase() as Method,
      backendEndpoint,
      query as Params,
      body,
    );

    // Forward the response back to the client.
    res.status(200).json(response);
  } catch (error: any) {
    console.log('Error proxying request to backend:', error);
    // Forward the error status and message to the client.
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.statusText });
    } else {
      res.status(500).json({ message: 'An error occurred while processing the request' });
    }
  }
};

export default proxy;
