import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'

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

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(modName: string = '', isMain: boolean = false, desc: string | undefined = '', proj:Proj) {
    this.modName = modName
    this.isMain = isMain
    this.desc = desc
    this.proj = proj
  }
}
