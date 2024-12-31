import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'

import { G6Node, G6Edge, G6Combo } from './SMAG6Element'

@Entity()
export class Proj {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({
    type: 'varchar',
    unique: true, // 通过添加unique选项设置为唯一约束
  })
  projName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @OneToMany(type => ProjMod, projmod => projmod.proj)
  projmods?: ProjMod[]

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

  constructor(projName: string = '', desc: string | undefined = '') {
    this.projName = projName
    this.desc = desc
  }
}


@Entity()
export class ProjMod {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({
    type: 'varchar'
  })
  modName: string

  @Column({
    type: 'boolean'
  })
  isMain: boolean

  @Column({
    type: 'text'
  })
  desc?: string

  @ManyToOne(type => Proj, proj => proj.projmods)
  proj: Proj

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  // g6Nodes  g6Edges  g6Combos
  @OneToMany(type => G6Node, g6Node => g6Node.projMod)
  g6Nodes?: G6Node[]

  @OneToMany(type => G6Edge, g6Edge => g6Edge.projMod)
  g6Edges?: G6Edge[]

  @OneToMany(type => G6Combo, g6Combo => g6Combo.projMod)
  g6Combos?: G6Combo[]
  // END

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(modName: string = '',  isMain: boolean = false, desc: string | undefined = '', proj:Proj) {
    this.modName = modName

    this.isMain = isMain
    this.desc = desc
    this.proj = proj
  }
}
