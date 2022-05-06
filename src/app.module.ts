import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerModule } from './banner/banner.module';
import { ComponentModule } from './component/component.module';
import { PluginModule } from './plugin/plugin.module';
import { ProjectModule } from './project/project.module';
import { ReleaseModule } from './release/release.module';
import { TemplateModule } from './template/template.module';

// 子模块加载
import { UserModule } from './user/user.module';
import { BingModule } from './bing/bing.module';

@Module({
  imports: [
    // 加载连接数据库
    // TypeOrmModule.forRoot({
    //   type: 'mysql', // 数据库类型
    //   host: '152.32.211.215', // 数据库ip地址
    //   port: 3306, // 端口
    //   username: 'mumu', // 登录名
    //   password: 'W3LWJXyMEKCNzHTy', // 密码
    //   database: 'mumu', // 数据库名称
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'], // 扫描本项目中.entity.ts或者.entity.js的文件
    //   synchronize: true, // 定义数据库表结构与实体类字段同步(这里一旦数据库少了字段就会自动加入,根据需要来使用)
    //   timezone: '+08:00', // 东八区
    // }),
    // 加载子模块
    UserModule,
    BannerModule,
    ComponentModule,
    PluginModule,
    ProjectModule,
    ReleaseModule,
    TemplateModule,
    BingModule
  ],
})
export class AppModule {}
