-- AlterTable
ALTER TABLE "tags" ALTER COLUMN "upper_tag_id" DROP NOT NULL;
ALTER TABLE "tags" ADD COLUMN     "user_id" TEXT;
