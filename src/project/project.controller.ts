import {
  Controller,
  Get,
  Post,
  Body,
  Query,
} from '@nestjs/common';
import { Transaction, TransactionManager, EntityManager } from 'typeorm';
import { ProjectService } from './project.service';
import { ResponseUtil } from 'src/utils/response';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get('findAll')
  findAll(@Query() query): Promise<ResponseUtil> {
    return this.projectService.findAll(query);
  }

  @Post('createProject')
  @Transaction()
  createProject(
    @Body() body,
    @TransactionManager() manager: EntityManager,
  ): Promise<ResponseUtil> {
    return this.projectService.createProject(body, manager);
  }

  @Get('preview')
  preview(@Query() query): Promise<ResponseUtil> {
    return this.projectService.findOne(query);
  }

  @Post('updateConfig')
  @Transaction()
  updateConfig(@Body() body,
    @TransactionManager() manager: EntityManager,): Promise<ResponseUtil> {
    return this.projectService.updateConfig(body, manager);
  }

  @Post('release')
  @Transaction()
  release(@Body() body,
    @TransactionManager() manager: EntityManager,): Promise<ResponseUtil> {
    return this.projectService.release(body, manager);
  }
}
