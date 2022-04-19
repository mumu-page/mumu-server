import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Release extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '项目版本',
    name: 'version',
  })
  version: string;

  @Column({
    comment: '下载地址',
    name: 'downloadUrl',
  })
  downloadUrl: string;

  @Column({
    comment: '发布信息',
    name: 'msg',
  })
  msg: string;
}
