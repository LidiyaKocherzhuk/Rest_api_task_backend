import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFriendsTable1669405621518 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS friends (
                id INT PRIMARY KEY AUTO_INCREMENT,
                userId INT NOT NULL,
                friendId INT NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP NULL
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS friends');
    }
}
