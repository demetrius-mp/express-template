/*
  Warnings:

  - You are about to drop the `CategoriesOnInvoices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CategoriesOnInvoices" DROP CONSTRAINT "CategoriesOnInvoices_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "CategoriesOnInvoices" DROP CONSTRAINT "CategoriesOnInvoices_invoiceId_fkey";

-- DropTable
DROP TABLE "CategoriesOnInvoices";

-- CreateTable
CREATE TABLE "_CategoryToInvoice" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToInvoice_AB_unique" ON "_CategoryToInvoice"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToInvoice_B_index" ON "_CategoryToInvoice"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToInvoice" ADD FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToInvoice" ADD FOREIGN KEY ("B") REFERENCES "Invoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;
