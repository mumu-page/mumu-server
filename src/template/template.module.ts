import { Module } from '@nestjs/common';
import { TemplateController } from './template.controller';
import { TemplateService } from './template.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from '../entities/component.entity';
import { Project } from '../entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Component])],
  controllers: [TemplateController],
  providers: [TemplateService],
})
export class TemplateModule {}
