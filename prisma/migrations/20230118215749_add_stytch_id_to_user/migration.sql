/*
  Warnings:

  - Added the required column `stytch_user_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "stytch_user_id" TEXT NOT NULL;
ALTER TABLE "users" ADD COLUMN     "stytch_auth_id" TEXT NOT NULL;
ALTER TABLE "tasks" ADD COLUMN     "title" TEXT NOT NULL;
