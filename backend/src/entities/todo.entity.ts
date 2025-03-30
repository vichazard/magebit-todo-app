import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { CoreEntity } from "./core.entity";

@Entity({ name: "todos" })
export class TodoEntity extends CoreEntity {
  @PrimaryGeneratedColumn({ type: "bigint" })
  id: number;

  @Column({ nullable: true, type: "varchar" })
  title: string;

  @Column({ nullable: true, type: "text" })
  description: string;

  @Column({ default: false, type: "boolean" })
  isCompleted: boolean;

  markAsComplete() {
    this.isCompleted = true;
    this.updatedAt = new Date();
  }

  markAsIncomplete() {
    this.isCompleted = false;
    this.updatedAt = new Date();
  }
}
