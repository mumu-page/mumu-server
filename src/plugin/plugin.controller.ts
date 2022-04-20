import {
  Controller,
  Get,
} from '@nestjs/common';
import { PluginService } from './plugin.service';
import { ResponseUtil } from 'src/utils/response';

@Controller('plugin')
export class PluginController {
  constructor(private readonly pluginService: PluginService) { }

  @Get('findAll')
  findAll(): Promise<ResponseUtil> {
    return this.pluginService.findAll();
  }
}
