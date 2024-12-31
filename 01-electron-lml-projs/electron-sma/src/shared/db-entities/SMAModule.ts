import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from 'typeorm'


@Entity()
export class SMAModule {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属Combo


  @Column({
    type: 'varchar',
    unique: true, // 通过添加unique选项设置为唯一约束
  })
  moduleName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @ManyToOne(type => SMAModule)
  parentSMAModule?: SMAModule

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

  constructor(moduleName: string = '', desc: string | undefined = '', parentSMAModule: SMAModule| undefined) {

    this.moduleName = moduleName
    this.desc = desc
    this.parentSMAModule = parentSMAModule
  }
}
