import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoose, { Connection } from 'mongoose';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeController } from './employee/employee.controller';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnsureDbConnectionMiddleware } from './ensure-db-connection.middleware';
import { MONGO_CONNECT_OPTIONS } from './mongo-options';

// With lazyConnection, queries issued before the connection is up are
// buffered; cap the buffer wait so requests fail fast with a clear error
// instead of hanging when Atlas is unreachable (default is 10s).
mongoose.set('bufferTimeoutMS', 5000);

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI!, {
      // Serverless-friendly settings: don't block bootstrap on Atlas
      // (keeps /api/health alive when the DB is down), fail queries fast
      // instead of hanging until the function times out, and keep the
      // per-container pool small so parallel warm containers don't
      // exhaust the Atlas M0 connection cap.
      lazyConnection: true,
      ...MONGO_CONNECT_OPTIONS,
      // With lazyConnection nothing awaits the initial connect, so a
      // failure would surface as an unhandled rejection / unhandled
      // 'error' event and crash the process. Swallow it here; requests
      // still fail fast via the buffering timeout above. (connectionFactory,
      // not onConnectionCreate: @nestjs/mongoose 11.0.3 skips the latter
      // when lazyConnection is set.)
      connectionFactory: (connection: Connection) => {
        connection.on('error', (err: Error) => {
          console.error('MongoDB connection error:', err.message);
        });
        connection.asPromise().catch((err: Error) => {
          console.error('MongoDB initial connection failed:', err.message);
        });
        return connection;
      },
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // DB routes wait for (or re-establish) the Mongo connection before
    // their handlers run; / and /api/health stay DB-free.
    consumer.apply(EnsureDbConnectionMiddleware).forRoutes(EmployeeController);
  }
}
