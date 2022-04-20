import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { ResponseUtil } from 'src/utils/response';
import { Plugin } from 'src/entities/plugin.entity';

@Injectable()
export class PluginService {
  
  async findAll(): Promise<ResponseUtil> {
    const list = await getRepository(Plugin).find()
    return new ResponseUtil().ok(list)
  }
}
