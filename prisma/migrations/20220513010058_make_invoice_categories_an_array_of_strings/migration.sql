/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToInvoice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToInvoice" DROP CONSTRAINT "_CategoryToInvoice_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToInvoice" DROP CONSTRAINT "_CategoryToInvoice_B_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "categories" TEXT[];

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "_CategoryToInvoice";
