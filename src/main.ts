import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { createConnection } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // createConnection方法会自动读取来自ormconfig文件或环境变量中的连接选项
  await createConnection();
  app.enableCors({
    origin: ['http://localhost:3000', 'https://mumu-page.github.io'],
    credentials: true,
  });
  // swagger配置
  const options = new DocumentBuilder()
    .setTitle('页面搭建(mumu-page)后端API文档')
    .setDescription('页面搭建服务端(mumu-server)')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(7001);
}

bootstrap();
