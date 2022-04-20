import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { ComponentService } from './component.service';
import { ResponseUtil } from 'src/utils/response';

@Controller('component')
export class ComponentController {
  constructor(private readonly componentService: ComponentService) { }

  @Post('add')
  @Transaction()
  async addComponent(
    @Body() body,
    @TransactionManager() manager: EntityManager
  ): Promise<ResponseUtil> {
    return this.componentService.addComponent(body, manager);
  }

  @Post('update')
  async updateComponent(
    @Body() body,
    @TransactionManager() manager: EntityManager
  ): Promise<ResponseUtil> {
    return this.componentService.updateComponent(body, manager);
  }

  @Get('findAll')
  findAll(@Query() query): Promise<ResponseUtil> {
    return this.componentService.findAll();
  }

  @Get('findOne')
  findOne(@Query() query): Promise<ResponseUtil> {
    return this.componentService.findOne(query);
  }
}
