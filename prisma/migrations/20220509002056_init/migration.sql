/*
  Warnings:

  - You are about to drop the `AvaliacaoSocioEconomica` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CPQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CondicaoPeriodontal` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Equipe` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Exame` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Local` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MarcadorConsumoAlimentar` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pessoa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Soho` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Usuario` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AvaliacaoSocioEconomica" DROP CONSTRAINT "AvaliacaoSocioEconomica_idData_fkey";

-- DropForeignKey
ALTER TABLE "AvaliacaoSocioEconomica" DROP CONSTRAINT "AvaliacaoSocioEconomica_idLocal_fkey";

-- DropForeignKey
ALTER TABLE "AvaliacaoSocioEconomica" DROP CONSTRAINT "AvaliacaoSocioEconomica_idPessoa_fkey";

-- DropForeignKey
ALTER TABLE "AvaliacaoSocioEconomica" DROP CONSTRAINT "AvaliacaoSocioEconomica_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "CPQ" DROP CONSTRAINT "CPQ_idExame_fkey";

-- DropForeignKey
ALTER TABLE "Equipe" DROP CONSTRAINT "Equipe_idCoordenador_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_idCondicaoPeriodontal_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_idData_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_idLocal_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_idPessoa_fkey";

-- DropForeignKey
ALTER TABLE "Exame" DROP CONSTRAINT "Exame_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "MarcadorConsumoAlimentar" DROP CONSTRAINT "MarcadorConsumoAlimentar_idData_fkey";

-- DropForeignKey
ALTER TABLE "MarcadorConsumoAlimentar" DROP CONSTRAINT "MarcadorConsumoAlimentar_idLocal_fkey";

-- DropForeignKey
ALTER TABLE "MarcadorConsumoAlimentar" DROP CONSTRAINT "MarcadorConsumoAlimentar_idPessoa_fkey";

-- DropForeignKey
ALTER TABLE "MarcadorConsumoAlimentar" DROP CONSTRAINT "MarcadorConsumoAlimentar_idUsuario_fkey";

-- DropForeignKey
ALTER TABLE "Soho" DROP CONSTRAINT "Soho_idExame_fkey";

-- DropForeignKey
ALTER TABLE "Usuario" DROP CONSTRAINT "Usuario_idPertenceEquipe_fkey";

-- DropTable
DROP TABLE "AvaliacaoSocioEconomica";

-- DropTable
DROP TABLE "CPQ";

-- DropTable
DROP TABLE "CondicaoPeriodontal";

-- DropTable
DROP TABLE "Data";

-- DropTable
DROP TABLE "Equipe";

-- DropTable
DROP TABLE "Exame";

-- DropTable
DROP TABLE "Local";

-- DropTable
DROP TABLE "MarcadorConsumoAlimentar";

-- DropTable
DROP TABLE "Pessoa";

-- DropTable
DROP TABLE "Soho";

-- DropTable
DROP TABLE "Usuario";

-- DropEnum
DROP TYPE "AvaliacaoBucal";

-- DropEnum
DROP TYPE "AvaliacaoUltimaConsulta";

-- DropEnum
DROP TYPE "Escolaridade";

-- DropEnum
DROP TYPE "Etnia";

-- DropEnum
DROP TYPE "FilhoQtdEscovacoesPorDia";

-- DropEnum
DROP TYPE "FluoroseDentaria";

-- DropEnum
DROP TYPE "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias";

-- DropEnum
DROP TYPE "FrequenciaTrocaEscovas";

-- DropEnum
DROP TYPE "Genero";

-- DropEnum
DROP TYPE "LocalConsulta";

-- DropEnum
DROP TYPE "MotivoUltimaConsulta";

-- DropEnum
DROP TYPE "Papel";

-- DropEnum
DROP TYPE "RelacaoMolarAnteroPosterior";

-- DropEnum
DROP TYPE "RespostasCPQ";

-- DropEnum
DROP TYPE "RespostasSoho";

-- DropEnum
DROP TYPE "Status";

-- DropEnum
DROP TYPE "UltimaConsulta";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
