import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
} from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { NextFunction, Request, Response } from 'express';
import { Connection, STATES } from 'mongoose';
import { MONGO_CONNECT_OPTIONS } from './mongo-options';

// A failed lazy connect leaves the connection disconnected forever —
// mongoose does not retry it, so without this middleware one slow first
// attempt condemns the container until the next cold start. Re-open the
// connection on demand instead; all concurrent requests share one attempt.
let reconnectPromise: Promise<unknown> | null = null;

@Injectable()
export class EnsureDbConnectionMiddleware implements NestMiddleware {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      if (this.connection.readyState === STATES.connected) {
        return next();
      }
      if (this.connection.readyState === STATES.connecting) {
        await this.connection.asPromise();
        return next();
      }
      if (!reconnectPromise) {
        reconnectPromise = this.connection
          .openUri(process.env.MONGODB_URI!, MONGO_CONNECT_OPTIONS)
          .finally(() => {
            reconnectPromise = null;
          });
      }
      await reconnectPromise;
      next();
    } catch (err) {
      console.error(
        'MongoDB reconnect failed:',
        err instanceof Error ? err.message : err,
      );
      next(new ServiceUnavailableException('Database unavailable'));
    }
  }
}
