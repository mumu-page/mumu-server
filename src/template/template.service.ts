import { Injectable } from '@nestjs/common';
import { EntityManager, getRepository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Plugin } from '../entities/plugin.entity';
import { Template } from 'src/entities/template.entity';
import { ResponseUtil } from 'src/utils/response';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

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

  async updateOne(query, manager: EntityManager): Promise<ResponseUtil> {
    const { name, gitUrl } = query;
    if (gitUrl && name) {
      try {
        const result = await getRepository(Project).findOne(query.id, { where: { gitUrl } })
        if (result) {
          await manager.update(Template, { id: query.id }, query);
          const result = await getRepository(Project).findOne({
            where: {
              gitUrl
            }
          })
          return new ResponseUtil().ok(result)
        } else {
          const result = await getRepository(Project).create({
            ...query,
            type: 0,
          });
          return new ResponseUtil().ok(result)
        }
      } catch (e) {
        return new ResponseUtil().fail(null, e)
      }
    } else {
      return new ResponseUtil().fail(null, 'gitUrl || name 必填')
    }
  }
}
