#### 简介


#### typeorm定义sqlite表的数据类型-积累


boolean
varchar
text

使用eg：
```
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
```


