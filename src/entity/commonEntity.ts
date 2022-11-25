import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    DeleteDateColumn,
    CreateDateColumn,
} from 'typeorm';

import { config } from '../config';

export interface ICommon {
    id:number;
    createdAt: string;
    deletedAt?: string;
}

@Entity('users', { database: config.MYSQL_DATABASE_NAME })
export default class CommonEntity implements ICommon {
    @PrimaryGeneratedColumn()
        id:number;

    @Column({
        nullable: false,
        default: Date.now(),
    })
    @CreateDateColumn({ type: 'timestamp' })
        createdAt: string;

    @Column()
    @DeleteDateColumn({ type: 'timestamp' })
        deletedAt?: string;
}
