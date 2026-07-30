import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // DB-free health check: distinguishes a broken deploy (this 404s/500s)
  // from a broken Atlas connection (this works, /employees fails).
  @Get('api/health')
  getHealth(): { ok: boolean; env: string } {
    return { ok: true, env: process.env.VERCEL_ENV || 'local' };
  }
}
