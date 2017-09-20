import { Request, Response } from 'express';
import { errorMiddleware } from './middleware';
import Server from './server';

// 404
Server.all('*', (req: Request, res: Response): void => {
  res.error(404, 'Path Not Found');
});

// error handling middleware
Server.use(errorMiddleware);

const port = process.env.PORT || 4000;

// // listen for requests
Server.listen(port, () => console.log(`API running on localhost:${port}`));
