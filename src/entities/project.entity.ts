import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '模板ID',
    name: 'templateId',
  })
  templateId: string;

  @Column({
    comment: '模板标题',
    name: 'name',
  })
  name: string;

  @Column({
    comment: '页面配置',
    name: 'pageConfig',
  })
  pageConfig: string;

  @Column({
    comment: 'GIT配置',
    name: 'gitConfig',
  })
  gitConfig: string;

  @Column({
    comment: '发布信息',
    name: 'releaseInfo',
  })
  releaseInfo: string;

  @Column({
    comment: '项目版本',
    name: 'version',
  })
  version: string;

  @Column({
    comment: '描述',
    name: 'desc',
  })
  desc: string;
}
