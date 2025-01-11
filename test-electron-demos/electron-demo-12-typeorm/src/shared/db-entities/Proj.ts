import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'

import { Node, Edge, Combo } from './Element'

@Entity()
export class Proj {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @Column({
    type: 'varchar',
    unique: true,
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

  @OneToMany(type => Node, g6Node => g6Node.projMod)
  g6Nodes?: Node[]

  @OneToMany(type => Edge, g6Edge => g6Edge.projMod)
  g6Edges?: Edge[]

  @OneToMany(type => Combo, g6Combo => g6Combo.projMod)
  g6Combos?: Combo[]
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
