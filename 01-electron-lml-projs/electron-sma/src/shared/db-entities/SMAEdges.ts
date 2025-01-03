// 标准化：https://www.yuque.com/markemotionact/txyhqy/rqmetn4m86mbi9zr?inner=u27bd5031

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, Unique } from 'typeorm'
import { G6Edge } from './SMAG6Element';

// 1对1到Edge
@Entity()
export class SMAEdgeCommonSupport {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属Combo
  @OneToOne(type => G6Edge)
  @JoinColumn()
  edge: G6Edge | undefined;

  @Column({
    type: 'varchar',
    default: '支撑'  // 理论-支撑、技术-支撑 ...
  })
  supportName: string | undefined

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

  constructor(supportName: string = '', desc: string | undefined = '' ) {

    this.supportName = supportName
    this.desc = desc
  }
}


// 1对1到Node
@Entity()
export class SMAEdgeCAIInherit {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属Combo
  @OneToOne(type => G6Edge)
  @JoinColumn()
  edge: G6Edge | undefined;

  @Column({
    type: 'varchar',
    default: '继承'
  })
  inheritName: string | undefined

  @Column({
    type: 'text'
  })
  desc?: string

  @ManyToOne(type => SMANodeCodeFunc)
  parent?: SMANodeCodeFunc

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

  constructor(codefuncName: string = '', desc: string | undefined = '', parent: SMANodeCodeFunc| undefined) {

    this.codefuncName = codefuncName
    this.desc = desc
    this.parent = parent
  }
}

// 1对1到Node
@Entity()
export class SMAEdgeCAIImplement {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属Combo
  @OneToOne(type => G6Edge)
  @JoinColumn()
  edge: G6Edge | undefined;

  @Column({
    type: 'varchar',
    default: '实现'
  })
  implementName: string

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

  constructor(implementName: string = '', desc: string | undefined = '' ) {

    this.implementName = implementName
    this.desc = desc
  }
}