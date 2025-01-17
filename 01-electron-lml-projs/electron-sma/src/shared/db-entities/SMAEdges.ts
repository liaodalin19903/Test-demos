// 标准化：https://www.yuque.com/markemotionact/txyhqy/rqmetn4m86mbi9zr?inner=u27bd5031

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, Unique } from 'typeorm'
import { SMANodeCodeFunc } from './SMANodes';
import { ProjMod } from './Proj';

export const SMAEdgeTypeMap = {
  SMAEdgeCommonSupport: 'SMAEdgeCommonSupport',
  SMAEdgeCAIInherit: 'SMAEdgeCAIInherit',
  SMAEdgeCAIImplement: 'SMAEdgeCAIImplement'
}

// 1对1到Edge
@Entity()
export class SMAEdgeCommonSupport {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaEdgeCommonSupports)
  projMod: ProjMod

  @Column({
    type: 'varchar',
    default: '支撑'  // 理论-支撑、技术-支撑 ...
  })
  supportName: string | undefined

  @Column({
    type: 'varchar',
  })
  sourceAndTarget: string // eg. SMANodeCodeFunc_21_SMANodeCodeFunc_7  (表示：从SMANodeCodeFunc:21 -> SMANodeCodeFunc:7)

  @Column({
    type: 'text',
    nullable: true
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

  constructor(projMod: ProjMod, supportName: string = '', sourceAndTarget: string, desc: string | undefined = '' ) {
    this.projMod = projMod
    this.supportName = supportName
    this.sourceAndTarget = sourceAndTarget
    this.desc = desc
  }
}


// 1对1到Node
@Entity()
export class SMAEdgeCAIInherit {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaEdgeCAIInherits)
  projMod: ProjMod

  @Column({
    type: 'varchar',
    default: '继承'
  })
  inheritName: string | undefined

  @Column({
    type: 'text',
    nullable: true
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

  constructor(projMod: ProjMod, desc: string | undefined = '', parent: SMANodeCodeFunc| undefined) {
    this.projMod = projMod
    this.desc = desc
    this.parent = parent
  }
}

// 1对1到Node
@Entity()
export class SMAEdgeCAIImplement {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.smaEdgeCAIImplements)
  projMod: ProjMod

  @Column({
    type: 'varchar',
    default: '实现'
  })
  implementName: string

  @Column({
    type: 'text',
    nullable: true
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

  constructor(projMod: ProjMod ,implementName: string = '', desc: string | undefined = '' ) {

    this.projMod = projMod
    this.implementName = implementName
    this.desc = desc
  }
}
