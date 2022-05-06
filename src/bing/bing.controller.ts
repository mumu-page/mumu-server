import { Controller, Get, Req, Res } from '@nestjs/common';
import { BingService } from './bing.service';
import { Response, Request } from 'express';
import { ResponseUtil } from '../utils/response'

@Controller('bing')
export class BingController {
  constructor(private readonly bingService: BingService) { }

  @Get()
  getHello(): string {
    return this.bingService.getHello();
  }

  @Get('/image/today')
  async getBingImgs(): Promise<ResponseUtil<any>> {
    const data = await this.bingService.getBingImgs();
    return new ResponseUtil().ok(data)
  }

  @Get('/image/rand')
  async getRandImg(@Res() res: Response): Promise<any> {
    const data = await this.bingService.getRandImg(res);
    if (!data) {
      res.json(new ResponseUtil().fail(null,'没有图片'))
    }
  }

  @Get('/image/all')
  getFiles(@Res() res: Response, @Req() req: Request) {
    const images = this.bingService.getAllImages(req)
    if(!images) return res.json(new ResponseUtil().fail(null, '没有图片'))
    return res.json(new ResponseUtil().ok(images))
  }
}
