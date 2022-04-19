import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Banner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '项目版本',
    name: 'src',
  })
  src: string;

  @Column({
    comment: '地址',
    name: 'link',
  })
  link: string;
}
