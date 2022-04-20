import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Plugin } from '../entities/plugin.entity';
import { Template } from 'src/entities/template.entity';
import { ResponseUtil } from 'src/utils/response';

@Injectable()
export class TemplateService {
  async findAll(): Promise<ResponseUtil> {
    const list = await getRepository(Template).find()
    return new ResponseUtil().ok(list)
  }

  async findOne(query): Promise<ResponseUtil> {
    const list = await getRepository(Project).findOne(query.id, { where: { id: query.id } })
    return new ResponseUtil().ok(list)
  }

  async updateOne(template, manager): Promise<ResponseUtil> {
    const data = await manager.update(Template, { id: template.id }, template);
    return new ResponseUtil().ok(data)
  }
}
