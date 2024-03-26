import { minLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class User {
   @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number

    @Column()
    name: String

    @Column()
    email: string

    @Column()
    phone: number

    @Column()
    createdAt: Date

    @Column({ default: false })
    isActive: boolean
}