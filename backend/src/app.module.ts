import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import mongoose from 'mongoose';
import { EmployeeModule } from './employee/employee.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 5,
      minPoolSize: 0,
    }),
    EmployeeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
