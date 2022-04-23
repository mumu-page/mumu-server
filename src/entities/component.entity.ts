import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Component extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', name: 'description', comment: '描述' })
  description: string;

  @Column({ type: 'varchar', name: 'name', comment: '组件名称' })
  name: string;

  @Column({ type: 'varchar', name: 'author', comment: '作者' })
  author: string;

  @Column({ type: 'varchar', name: 'gitUrl', comment: 'GIT地址' })
  gitUrl: string;

  @Column({ type: 'varchar', name: 'config', comment: 'Config', length: 99999 })
  config: string;

  @Column({ type: 'varchar', name: 'status', comment: '组件状态' })
  status: string;
}
