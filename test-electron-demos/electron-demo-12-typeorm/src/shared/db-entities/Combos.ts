import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, OneToOne, JoinColumn, Unique } from 'typeorm'
import { Combo } from './Element';
import { NodeCodeFunc } from './Nodes';



@Entity()
@Unique(['path', 'moduleName'])
export class ComboModulesGraphModule {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @OneToOne(type => Combo)
  @JoinColumn()
  combo: Combo | undefined;

  @Column({
    type: 'varchar',
  })
  path: string

  @Column({
    type: 'varchar',
  })
  moduleName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @ManyToOne(type => ComboModulesGraphModule)
  parent?: ComboModulesGraphModule | null

  @OneToMany(type => NodeCodeFunc, codeFunc => codeFunc.module)
  codeFuncs: NodeCodeFunc[] | undefined

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(moduleName: string = '', path: string, desc: string | undefined = '',  parent: ComboModulesGraphModule| null) {

    this.moduleName = moduleName
    this.desc = desc
    this.path = path
    this.parent = parent
  }
}


@Entity()
@Unique(['type', 'aggregationName'])
export class ComboFuncodeAggregation {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @OneToOne(type => Combo)
  @JoinColumn()
  combo: Combo | undefined;

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

  @ManyToOne(type => ComboFuncodeAggregation)
  parent?: ComboFuncodeAggregation

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(aggregationName: string = '', desc: string | undefined = '') {

    this.aggregationName = aggregationName
    this.desc = desc
  }
}
