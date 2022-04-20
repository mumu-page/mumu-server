import { Controller, Get, Body, Query, Post } from '@nestjs/common';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { TemplateService } from './template.service';
import { ResponseUtil } from 'src/utils/response';

@Controller('template')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get('list')
  findAll(): Promise<ResponseUtil> {
    return this.templateService.findAll();
  }

  @Get('detail')
  findOne(@Query() query): Promise<ResponseUtil> {
    return this.templateService.findOne(query);
  }

  @Post('update')
  @Transaction()
  updateOne(
    @Body() template,
    @TransactionManager() manager: EntityManager,
  ): Promise<ResponseUtil> {
    return this.templateService.updateOne(template, manager);
  }
}
