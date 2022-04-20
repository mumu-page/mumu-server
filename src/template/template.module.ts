import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from 'src/entities/template.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Template])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
