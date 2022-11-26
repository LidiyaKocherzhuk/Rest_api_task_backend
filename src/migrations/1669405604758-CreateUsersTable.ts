import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1669405604758 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY AUTO_INCREMENT,
                first_name VARCHAR(50) NOT NULL,
                gender VARCHAR(10) NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS users');
    }
}
