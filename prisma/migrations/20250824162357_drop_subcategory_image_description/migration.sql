/*
  Warnings:

  - You are about to drop the column `description` on the `subcategories` table. All the data in the column will be lost.
  - You are about to drop the column `image_url` on the `subcategories` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."subcategories" DROP COLUMN "description",
DROP COLUMN "image_url";
