import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Plugin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'pluginName', comment: '插件名称' })
  pluginName: string;

  @Column({ type: 'varchar', name: 'name', comment: '插件名称' })
  name: string;

  @Column({ type: 'varchar', name: 'status', comment: '插件状态' })
  status: string;

  @Column({ type: 'varchar', name: 'author', comment: '插件作者' })
  author: string;

  @Column({ type: 'varchar', name: 'logo', comment: 'Logo' })
  logo: string;

  @Column({ type: 'varchar', name: 'gitUrl', comment: 'GITHUB地址' })
  gitUrl: string;

  @Column({ type: 'varchar', name: 'title', comment: '插件标题' })
  title: string;

  @Column({ type: 'varchar', name: 'description', comment: '插件描述' })
  description: string;

  @Column({ type: 'varchar', name: 'version', comment: '插件版本' })
  version: string;

  @Column({ type: 'varchar', name: 'downloadUrl', comment: '插件下载地址' })
  downloadUrl: string;

  @Column({ type: 'varchar', name: 'detail', comment: '详情' })
  detail: string;
}
