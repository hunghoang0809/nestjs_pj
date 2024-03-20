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

    @Column({ default: true })
    isActive: boolean
}