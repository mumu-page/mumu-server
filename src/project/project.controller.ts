import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Put,
} from '@nestjs/common';

import { Transaction, TransactionManager, EntityManager } from 'typeorm';

import { ProjectService } from './project.service';

import { Project } from '../entities/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) { }

  @Get('query')
  findAll(): Promise<Project[]> {
    return this.projectService.findAll();
  }

  @Post('createProject')
  @Transaction()
  createProject(
    @Body() body,
    @TransactionManager() manager: EntityManager,
  ): Promise<Project[]> {
    return this.projectService.createProject(body, manager);
  }

  /* 
    查询单个详情
    @Query ?id=xxx
   */
  @Get('detail')
  findOne(@Query() query): Promise<Project> {
    return this.projectService.findOne(query);
  }
  /* 
    新增账号和用户信息数据
    新增时候由于有可能出现两张表同时进行操作的情况
    因此开启事务事件：为了让同时进行的表操作要么一起完成，要么都失败
    @Transaction()和 @TransactionManager() manager: EntityManager 是事务的装饰器和对象
    @Body ：注意先给category表随便加三条数据
    {
      "title": "问题1",
      "description": "这是1号问题的描述",
      "list": [1,3]
    }
  }
  */
  @Post('add')
  @Transaction()
  addOne(
    @Body() rUser,
    @TransactionManager() manager: EntityManager,
  ): Promise<string> {
    return this.projectService.addOne(rUser, manager);
  }
  /* 
    修改账号和用户信息数据
    事务同上
    @Body
    {
      "id": 1,
      "title": "问题1.111",
      "description": "问题1.111的描述",
      "list": [1,2]
    }
  */
  @Put('update')
  @Transaction()
  updateOne(
    @Body() uUser,
    @TransactionManager() manager: EntityManager,
  ): Promise<string> {
    return this.projectService.updateOne(uUser, manager);
  }
  /* 
    删除数据
    事务同上
    @Query ?id=xxx
   */
  @Delete('del')
  @Transaction()
  delOne(
    @Query() query,
    @TransactionManager() manager: EntityManager,
  ): Promise<string> {
    return this.projectService.delOne(query, manager);
  }
}
