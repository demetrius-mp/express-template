/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "invoiceId";

-- CreateTable
CREATE TABLE "CategoriesOnInvoices" (
    "invoiceId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "CategoriesOnInvoices_pkey" PRIMARY KEY ("invoiceId","categoryId")
);

-- AddForeignKey
ALTER TABLE "CategoriesOnInvoices" ADD CONSTRAINT "CategoriesOnInvoices_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoriesOnInvoices" ADD CONSTRAINT "CategoriesOnInvoices_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
