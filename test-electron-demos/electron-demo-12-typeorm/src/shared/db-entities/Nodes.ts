import { ComboModulesGraphModule } from './Combos';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne, Unique } from 'typeorm'
import { Node } from './Element';

@Entity()
@Unique(['path', 'moduleName'])
export class NodeCodeFunc {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @OneToOne(type => Node)
  @JoinColumn()
  node: Node | undefined;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  codefuncName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @ManyToOne(type => ComboModulesGraphModule, module => module.codeFuncs)
  module: ComboModulesGraphModule | undefined

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(codefuncName: string = '', desc: string | undefined = '', module: ComboModulesGraphModule | undefined) {

    this.codefuncName = codefuncName
    this.desc = desc
    this.module = module
  }
}

@Entity()
@Unique(['path', 'dataStructName'])
export class NodeDataStruct {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @OneToOne(type => Node)
  @JoinColumn()
  node: Node | undefined;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  dataStructName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(dataStructName: string = '', desc: string | undefined = '') {

    this.dataStructName = dataStructName
    this.desc = desc
  }
}

@Entity()
@Unique(['type', 'requirementName'])
export class NodeRequirement {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @OneToOne(type => Node)
  @JoinColumn()
  node: Node | undefined;

  @Column({
    type: 'varchar',
  })
  type: string | undefined

  @Column({
    type: 'varchar',
  })
  requirementName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @ManyToOne(type => NodeRequirement)
  parent?: NodeRequirement

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(requirementName: string = '', desc: string | undefined = '', parent: NodeRequirement| undefined) {

    this.requirementName = requirementName
    this.desc = desc
    this.parent = parent
  }
}

@Entity()
@Unique(['type', 'apiName'])
export class NodeAPI {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @OneToOne(type => Node)
  @JoinColumn()
  node: Node | undefined;

  @Column({
    type: 'varchar',
  })
  type: string | undefined

  @Column({
    type: 'varchar',
  })
  apiName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(apiName: string = '', desc: string | undefined = '') {

    this.apiName = apiName
    this.desc = desc
  }
}

@Entity()
@Unique(['path', 'className'])
export class NodeCAIClass {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @OneToOne(type => Node)
  @JoinColumn()
  node: Node | undefined;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  className: string

  @Column({
    type: 'text'
  })
  desc?: string

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(className: string = '', desc: string | undefined = '') {

    this.className = className
    this.desc = desc
  }
}


@Entity()
@Unique(['path', 'interfaceName'])
export class NodeCAIInterface {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @OneToOne(type => Node)
  @JoinColumn()
  node: Node | undefined;

  @Column({
    type: 'varchar',
  })
  path: string | undefined

  @Column({
    type: 'varchar',
  })
  interfaceName: string

  @Column({
    type: 'text'
  })
  desc?: string

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(interfaceName: string = '', desc: string | undefined = '') {

    this.interfaceName = interfaceName
    this.desc = desc
  }
}
