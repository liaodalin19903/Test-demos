// G6  elements： node/edge/combo 的表

// 然后其他的上层概念 eg.关系  可以进行依赖于此，那么就可以图有唯一元素。

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn, OneToOne } from 'typeorm'
import { ProjMod } from './Proj'

@Entity()
export class G6Node {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.g6Nodes)
  projMod: ProjMod

  @OneToMany(type => G6Edge, edge => edge.g6NodeSource)
  edgeSources: G6Edge[] | undefined

  @OneToMany(type => G6Edge, edge => edge.g6NodeSource)
  edgeTargets: G6Edge[] | undefined

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

export const EdgeConnectType = {
  NodeToNode: 'NodeToNode',
  NodeToCombo: 'NodeToCombo',
  ComboToCombo: 'ComboToCombo',
  ComboToNode: 'ComboToNode'
}

@Entity()
export class G6Edge {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
  @ManyToOne(type => ProjMod, projMod => projMod.g6Nodes)
  projMod: ProjMod

  @Column({
    type: 'varchar',
    nullable: true,
    default: EdgeConnectType.NodeToNode
  })
  connecttype: string | undefined

  // Node:起点
  @OneToOne(type => G6Node)
  @JoinColumn()
  g6NodeSource?: G6Node

  // Node:终点
  @OneToOne(type => G6Node)
  @JoinColumn()
  g6NodeTarget?: G6Node

  // Combo:起点
  @OneToOne(type => G6Combo)
  @JoinColumn()
  g6ComboSource?: G6Combo

  // Combo:终点
  @OneToOne(type => G6Combo)
  @JoinColumn()
  g6ComboTarget?: G6Combo

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
export class G6Combo {
  @PrimaryGeneratedColumn()
  id: number | undefined

  // 所属ProjMod
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
