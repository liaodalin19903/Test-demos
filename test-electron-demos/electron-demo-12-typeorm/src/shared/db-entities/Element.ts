//   elements： node/edge/combo

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { ProjMod } from './Proj'

@Entity()
export class Node {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @ManyToOne(type => ProjMod, projMod => projMod.g6Nodes)
  projMod: ProjMod

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod) {
    this.projMod = projMod
  }
}

export enum EdgeType {
  NodeToNode = 'NodeToNode',
  NodeToCombo = 'NodeToCombo',
  ComboToCombo = 'ComboToCombo',
  ComboToNode = 'ComboToNode'
}

@Entity()
export class Edge {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @ManyToOne(type => ProjMod, projMod => projMod.g6Nodes)
  projMod: ProjMod

  @Column({
    type: 'enum',
    enum: EdgeType,
    nullable: false,
    default: EdgeType.NodeToNode
  })
  type!: EdgeType

  @OneToOne(type => Node)
  @JoinColumn()
  g6NodeSource?: Node

  @OneToOne(type => Node)
  @JoinColumn()
  g6NodeTarget?: Node

  @OneToOne(type => Combo)
  @JoinColumn()
  g6ComboSource?: Combo

  @OneToOne(type => Combo)
  @JoinColumn()
  g6ComboTarget?: Combo

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod) {
    this.projMod = projMod
  }
}

@Entity()
export class Combo {
  @PrimaryGeneratedColumn()
  id: number | undefined

  @ManyToOne(type => ProjMod, projMod => projMod.g6Nodes)
  projMod: ProjMod

  @Column({
    default: false,
    type: 'boolean'
  })
  isDeleted: boolean | undefined

  @CreateDateColumn()
  createDate?: Date

  @UpdateDateColumn()
  updateDate?: Date

  constructor(projMod: ProjMod) {
    this.projMod = projMod
  }
}
