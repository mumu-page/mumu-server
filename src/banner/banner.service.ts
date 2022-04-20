import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Component } from '../entities/component.entity';
import { Plugin } from '../entities/plugin.entity';
import { Banner } from 'src/entities/banner.entity';
import { ResponseUtil } from 'src/utils/response';

@Injectable()
export class BannerService {
  async findAll(): Promise<ResponseUtil> {
    const data = await getRepository(Banner).find()
    return new ResponseUtil().ok(data)
  }
  async create(body, manager): Promise<ResponseUtil> {
    const data = await manager.save(Banner, body)
    return new ResponseUtil().ok(data)
  }
  /* 
    获取单个用户详情
  */
  async findOne(query): Promise<Project> {
    const list = await getRepository(Project)
      .createQueryBuilder('question')
      .innerJoin(Plugin, 'quescate', 'question.id = quescate.questionId')
      .innerJoinAndMapMany(
        'question.list',
        Component,
        'category',
        'category.id = quescate.categoryId',
      )
      .where('question.id = :id', { id: query.id })
      .getOne();
    return list;
  }
  /* 
    新增用户
    rUser格式：注意先给category表随便加三条数据
    {
      "title": "问题1",
      "description": "这是1号问题的描述",
      "list": [1,3]
    }
  */
  async addOne(rUser, manager): Promise<string> {
    // 先保存问题的数据
    const question = new Project();
    // question.title = rUser.title;
    // question.description = rUser.description;
    const que = await manager.save(Project, question);
    if (Object.keys(rUser.list).length != 0) {
      // 后保存关联表的数据
      for (let i = 0; i < rUser.list.length; i++) {
        const qescat = new Plugin();
        // qescat.categoryId = rUser.list[i];
        // qescat.questionId = que.id;
        await manager.save(Plugin, qescat);
      }
      return '新增成功!';
    }
  }
  /* 
    修改用户:有数据id则修改否则新增，然后对比数据库数据进行多余的删除
    uUser格式
    {
      "id": 1,
      "title": "问题1.111",
      "description": "问题1.111的描述",
      "list": [1,2]
    }
  */
  async updateOne(uUser, manager): Promise<string> {
    // 先修改问题表的数据
    const question = new Project();
    question.id = uUser.id;
    // question.title = uUser.title;
    // question.description = uUser.description;
    await manager.update(Project, { id: question.id }, question);
    // 在根据问题的id删除关联表中对应的数据
    await manager.delete(Plugin, { questionId: uUser.id });
    // 之后在将新的关联数据添加进关联表
    for (let i = 0; i < uUser.list.length; i++) {
      const qescat = new Plugin();
      // qescat.categoryId = uUser.list[i];
      // qescat.questionId = uUser.id;
      await manager.save(Plugin, qescat);
    }
    return '修改成功!';
  }
  /* 
    删除用户
  */
  async delOne(query, manager): Promise<string> {
    // 先删除关联表内容
    await manager.delete(Plugin, { questionId: query.id });
    // 然后在删除主表内容
    await manager.delete(Project, { id: query.id });
    return '删除成功!';
  }
}
