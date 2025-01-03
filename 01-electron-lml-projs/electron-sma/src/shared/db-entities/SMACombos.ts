import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, Unique } from 'typeorm'
import { G6Combo } from './SMAG6Element';


// 1对1到Combo
@Entity()
@Unique(['path', 'moduleName'])
export class SMAComboModulesGraphModule {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属Combo
  @OneToOne(type => G6Combo)
  @JoinColumn()
  combo: G6Combo | undefined;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  moduleName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @ManyToOne(type => SMAComboModulesGraphModule)
  parent?: SMAComboModulesGraphModule

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

  constructor(moduleName: string = '', desc: string | undefined = '', parent: SMAComboModulesGraphModule| undefined) {

    this.moduleName = moduleName
    this.desc = desc
    this.parent = parent
  }
}

// 1对1到Combo
@Entity()
@Unique(['type', 'aggregationName'])  // eg. 服务侧api-procedure
export class SMAComboFuncodeAggregation {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属Combo
  @OneToOne(type => G6Combo)
  @JoinColumn()
  combo: G6Combo | undefined;

  // 类型
  @Column({
    type: 'varchar',
  })
  type: string | undefined

  @Column({
    type: 'varchar',
  })
  aggregationName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @ManyToOne(type => SMAComboFuncodeAggregation)
  parent?: SMAComboFuncodeAggregation

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

  constructor(aggregationName: string = '', desc: string | undefined = '') {

    this.aggregationName = aggregationName
    this.desc = desc
  }
}
