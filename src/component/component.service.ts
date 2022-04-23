import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Component } from '../entities/component.entity';
import { ResponseUtil } from 'src/utils/response';

const formatWhereCase = (params) => {
  const where = {};
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      where[key] = params[key];
    }
  });
  return where;
};

@Injectable()
export class ComponentService {
  async addComponent(component, manager): Promise<ResponseUtil> {
    if (component.gitUrl && component.name) {
      try {
        // todo 先查是否存在同名组件
        const data = await manager.save(Component, component);
        return new ResponseUtil().ok(data);
      } catch (e) {
        console.log(e);
        return new ResponseUtil().fail();
      }
    } else {
      return new ResponseUtil().fail(null, 'gitUrl || name 必填');
    }
  }

  async updateComponent(component, manager): Promise<ResponseUtil> {
    try {
      // todo 先查是否存在同名组件
      const data = await manager.update(Component, component);
      return new ResponseUtil().ok(data);
    } catch (e) {
      console.log(e);
      return new ResponseUtil().fail();
    }
  }

  async findAll(): Promise<ResponseUtil> {
    const list = await getRepository(Component).find();
    return new ResponseUtil().ok(list);
  }

  async findOne(query): Promise<ResponseUtil> {
    const { id, gitUrl } = query;
    const list = await getRepository(Component).findOne(query.id, {
      where: formatWhereCase({ id, gitUrl }),
    });
    return new ResponseUtil().ok(list);
  }
}
