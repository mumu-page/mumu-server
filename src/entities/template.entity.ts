import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Template extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '模板名称',
    name: 'templateName',
  })
  templateName: string;

  @Column({
    comment: '作者',
    name: 'author',
  })
  author: string;

  @Column({
    comment: '模板名称',
    name: 'name',
  })
  name: string;

  @Column({
    comment: '缩略图',
    name: 'snapshot',
  })
  snapshot: string;

  @Column({
    comment: 'GIT地址',
    name: 'gitUrl',
  })
  gitUrl: string;

  @Column({
    comment: '模板类型',
    name: 'type',
  })
  type: string;

  @Column({
    comment: '模板版本',
    name: 'version',
  })
  version: string;
}
