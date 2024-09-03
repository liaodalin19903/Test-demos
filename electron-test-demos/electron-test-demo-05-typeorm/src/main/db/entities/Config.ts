import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("config")
export class ConfigEntities {
  // 主键设置，无需手动生成，自动为uuid
  @PrimaryGeneratedColumn("uuid")
  id: string = "";

  // 注意sqlite3中文本的存储没有varchar等,这里可以选择text存储
  @Column({ type: "text", default: "" })
  locale?: string | undefined = "";

  // default 设置默认值
  @Column({ type: "text", default: "light" })
  theme?: string | undefined = "";

  @Column({ type: "text", default: "magazine" })
  listMode?: string | undefined = "";

  // 创建数据条的时间，无需手动维护插入单条数据的时间
  @CreateDateColumn()
  createDate?: Date | undefined;
}
