// SMA的节点/模块之间关系（edge）


import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm'
import { G6Edge } from './SMAG6Element'


@Entity()
export class SMARelationCommonSupport {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属Edge
  @OneToOne(type => G6Edge)
  @JoinColumn()
  g6Edge?: G6Edge

  @Column({
    type: 'varchar',
  })
  title?: string

  @Column({
    type: 'text'
  })
  desc?: string

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  // 创建数据条的时间，无需手动维护插入单条数据的时间
  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(title: string | undefined = '', desc: string | undefined = '') {

    this.title = title
    this.desc = desc

  }
}
