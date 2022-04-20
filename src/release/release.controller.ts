import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { ReleaseService } from './release.service';
import { ResponseUtil } from 'src/utils/response';

@Controller('release')
export class ReleaseController {
  constructor(private readonly releaseService: ReleaseService) { }

  @Get('findAll')
  findAll(): Promise<ResponseUtil> {
    return this.releaseService.findAll();
  }

  @Get('findOne')
  findOne(@Query() query): Promise<ResponseUtil> {
    return this.releaseService.findOne(query);
  }

  @Post('create')
  @Transaction()
  addOne(
    @Body() rUser,
    @TransactionManager() manager: EntityManager,
  ): Promise<ResponseUtil> {
    return this.releaseService.addOne(rUser, manager);
  }
}
