import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Project } from '../entities/project.entity';
import { Release } from 'src/entities/release.entity';
import { ResponseUtil } from 'src/utils/response';

@Injectable()
export class ReleaseService {
  async findAll(): Promise<ResponseUtil> {
    const list = await getRepository(Release).find()
    return new ResponseUtil().ok(list)
  }

  async findOne(query): Promise<ResponseUtil> {
    const data = await getRepository(Project).findOne(query.id)
    return new ResponseUtil().ok(data)
  }

  async addOne(release, manager): Promise<ResponseUtil> {
    const data = await manager.save(Project, release);
    return new ResponseUtil().ok(data)
  }
}
