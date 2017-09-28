// Import dependencies
import { Request, Response } from 'express';

// Import middleware
import { errorMiddleware } from './middleware';

// Import server
import Server from './server';

// 404 error
Server.all('*', (req: Request, res: Response): void => {
  res.error(404, 'Path Not Found');
});

// Error handling middleware
Server.use(errorMiddleware);

// Port number
const port = process.env.PORT || 4000;

// Listen for requests
Server.listen(port, () => console.log(`API running on localhost:${port}`));
