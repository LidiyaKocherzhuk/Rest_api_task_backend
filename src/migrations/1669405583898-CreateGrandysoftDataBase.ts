import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGrandysoftDataBase1669405583898 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createDatabase('grandysoft');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropDatabase('grandysoft');
    }
}
