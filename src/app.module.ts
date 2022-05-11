import { Module } from '@nestjs/common';
import { BannerModule } from './banner/banner.module';
import { ComponentModule } from './component/component.module';
import { PluginModule } from './plugin/plugin.module';
import { ProjectModule } from './project/project.module';
import { ReleaseModule } from './release/release.module';
import { TemplateModule } from './template/template.module';
import { UserModule } from './user/user.module';
import { BingModule } from './bing/bing.module';

@Module({
  imports: [
    UserModule,
    BannerModule,
    ComponentModule,
    PluginModule,
    ProjectModule,
    ReleaseModule,
    TemplateModule,
    BingModule,
  ],
})
export class AppModule {}
