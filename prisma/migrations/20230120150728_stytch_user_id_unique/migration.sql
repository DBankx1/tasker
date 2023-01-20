/*
  Warnings:

  - The `user_id` column on the `tags` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to alter the column `budget` on the `tasks` table. The data in that column could be lost. The data in that column will be cast from `Money` to `Decimal(65,30)`.
  - A unique constraint covering the columns `[stytch_user_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tags" DROP COLUMN "user_id",
ADD COLUMN     "user_id" INTEGER;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "budget" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE UNIQUE INDEX "users_stytch_user_id_key" ON "users"("stytch_user_id");
