-- CreateEnum
CREATE TYPE "Papel" AS ENUM ('ADMIN', 'COORDENADOR', 'DENTISTA', 'ASSISTENTE', 'ARROLADOR');

-- CreateEnum
CREATE TYPE "Genero" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- CreateEnum
CREATE TYPE "Etnia" AS ENUM ('BRANCA', 'PARDA', 'PRETA', 'INDIGENA', 'AMARELA');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('REALIZADO', 'NAO_REALIZADO_FALTA_DE_AUTORIZACAO', 'NAO_REALIZADO_AUTORIZADO_MAS_NAO_PERMITIDO', 'NAO_REALIZADO_AUSENCIA_DO_MORADOR', 'NAO_REALIZADO_OUTRAS_RAZOES');

-- CreateEnum
CREATE TYPE "FluoroseDentaria" AS ENUM ('NORMAL', 'QUESTIONAVEL', 'MUITO_LEVE', 'LEVE', 'MODERADO', 'GRAVE');

-- CreateEnum
CREATE TYPE "RelacaoMolarAnteroPosterior" AS ENUM ('NORMAL', 'MEIA_CUSPIDE', 'CUSPIDE_INTEIRA');

-- CreateEnum
CREATE TYPE "Escolaridade" AS ENUM ('ANALFABETO', 'ALFABETIZADO_SEM_EDUCACAO_FORMAL', 'ALFABETIZADO_COM_EDUCACAO_FORMAL_PARA_ADULTOS', 'ENSINO_FUNDAMENTAL_ATE_4_SERIE', 'ENSINO_FUNDAMENTAL_ATE_8_SERIE', 'ENSINO_MEDIO_COMPLETO', 'ENSINO_SUPERIOR_COMPLETO', 'NAO_SE_APLICA');

-- CreateEnum
CREATE TYPE "UltimaConsulta" AS ENUM ('NUNCA_FOI', 'MENOS_1_ANO', 'DE_1_A_2_ANOS', 'DE_3_OU_MAIS', 'NAO_SE_APLICA');

-- CreateEnum
CREATE TYPE "LocalConsulta" AS ENUM ('NUNCA_FOI', 'PUBLICO', 'PARTICULAR', 'PLANO_CONVENIO', 'NAO_SE_APLICA');

-- CreateEnum
CREATE TYPE "MotivoUltimaConsulta" AS ENUM ('NUNCA_FOI', 'REVISAO_PREVENCAO_CHECKUP', 'DOR', 'EXTRACAO', 'TRATAMENTO', 'OUTROS', 'NAO_SE_APLICA');

-- CreateEnum
CREATE TYPE "AvaliacaoUltimaConsulta" AS ENUM ('NUNCA_FOI', 'MUITO_BOM', 'BOM', 'REGULAR', 'RUIM', 'MUTIO_RUIM', 'NAO_SE_APLICA');

-- CreateEnum
CREATE TYPE "AvaliacaoBucal" AS ENUM ('MUITO_SATISFEITO', 'SATISFEITO', 'REGULAR', 'INSATISFEITO', 'MUITO_INSATISFEITO', 'NAO_SE_APLICA');

-- CreateEnum
CREATE TYPE "FilhoQtdEscovacoesPorDia" AS ENUM ('NENHUMA', 'UMA', 'DUAS', 'TRES_OU_MAIS');

-- CreateEnum
CREATE TYPE "FrequenciaTrocaEscovas" AS ENUM ('ATE_3_MESES', 'DE_3_A_6_MESES', 'DE_6_MESES_A_1_ANO', 'MAIS_1_ANO');

-- CreateEnum
CREATE TYPE "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" AS ENUM ('NAO_COMI', 'UM_DIA', 'DOIS_DIAS', 'TRES_DIAS', 'QUATRO_DIAS', 'CINCO_DIAS', 'SEIS_DIAS', 'SETE_DIAS');

-- CreateEnum
CREATE TYPE "RespostasSoho" AS ENUM ('NAO', 'UM_POUCO', 'MUITO');

-- CreateEnum
CREATE TYPE "RespostasCPQ" AS ENUM ('NUNCA', 'UMA_OU_DUAS_VEZES', 'ALGUMAS_VEZES', 'FREQUENTEMENTE', 'TODOS_OS_DIAS_OU_QUASE');

-- CreateTable
CREATE TABLE "Soho" (
    "id" SERIAL NOT NULL,
    "idExame" INTEGER NOT NULL,
    "dificilComer" "RespostasSoho" NOT NULL,
    "dificilBeber" "RespostasSoho" NOT NULL,
    "dificilFalar" "RespostasSoho" NOT NULL,
    "dificilBrincar" "RespostasSoho" NOT NULL,
    "dificilDormir" "RespostasSoho" NOT NULL,
    "deixouDeSorrirPorDentesFeios" "RespostasSoho" NOT NULL,
    "deixouDeSorrirPorDentesDoendo" "RespostasSoho" NOT NULL,

    CONSTRAINT "Soho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CPQ" (
    "id" SERIAL NOT NULL,
    "idExame" INTEGER NOT NULL,
    "dorNosDentes" "RespostasCPQ" NOT NULL,
    "feridas" "RespostasCPQ" NOT NULL,
    "mauHalito" "RespostasCPQ" NOT NULL,
    "restosDeAlimentoPreso" "RespostasCPQ" NOT NULL,
    "demorouMaisParaTerminarRefeicao" "RespostasCPQ" NOT NULL,
    "dificuldadeMorder" "RespostasCPQ" NOT NULL,
    "dificuldadeDizer" "RespostasCPQ" NOT NULL,
    "dificuldadeIngerirQuentesFrios" "RespostasCPQ" NOT NULL,
    "irritado" "RespostasCPQ" NOT NULL,
    "timido" "RespostasCPQ" NOT NULL,
    "chateado" "RespostasCPQ" NOT NULL,
    "preocupado" "RespostasCPQ" NOT NULL,
    "evitouSorrir" "RespostasCPQ" NOT NULL,
    "discutiu" "RespostasCPQ" NOT NULL,
    "aborreceuChamaramPorApelidos" "RespostasCPQ" NOT NULL,
    "perguntaramSobreDente" "RespostasCPQ" NOT NULL,

    CONSTRAINT "CPQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarcadorConsumoAlimentar" (
    "id" SERIAL NOT NULL,
    "idData" INTEGER NOT NULL,
    "idPessoa" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "idLocal" INTEGER NOT NULL,
    "saladaCrua" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "legumesVerdurasCozidos" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "frutasFrescasSaladaDeFrutas" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "feijao" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "leiteOuIogurte" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "batataFritaBatataDePacoteSalgadosFritos" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "hamburgerEmbutidos" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "bolachasBiscoitosSalgadosSalgadinhoDePacote" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "bolachasBiscoitosDocesRecheadosDocesBalasChocolates" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,
    "refrigerante" "FrequenciaIngestaoAlimentoBebidaUltimosSeteDias" NOT NULL,

    CONSTRAINT "MarcadorConsumoAlimentar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "papel" "Papel" NOT NULL,
    "idPertenceEquipe" INTEGER,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipe" (
    "id" SERIAL NOT NULL,
    "idCoordenador" INTEGER NOT NULL,

    CONSTRAINT "Equipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "dia" INTEGER NOT NULL,
    "mes" INTEGER NOT NULL,
    "ano" INTEGER NOT NULL,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" SERIAL NOT NULL,
    "nascimento" DATE NOT NULL,
    "nome" TEXT NOT NULL,
    "genero" "Genero" NOT NULL,
    "etniaPrincipal" "Etnia" NOT NULL,
    "etniaSecundaria" "Etnia",

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Local" (
    "id" SERIAL NOT NULL,
    "municipio" TEXT NOT NULL,
    "escola" TEXT NOT NULL,

    CONSTRAINT "Local_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CondicaoPeriodontal" (
    "id" SERIAL NOT NULL,
    "d17_16" BOOLEAN NOT NULL,
    "d21_11" BOOLEAN NOT NULL,
    "d27_26" BOOLEAN NOT NULL,
    "d31" BOOLEAN NOT NULL,
    "d37_36" BOOLEAN NOT NULL,
    "d47_46" BOOLEAN NOT NULL,

    CONSTRAINT "CondicaoPeriodontal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exame" (
    "id" SERIAL NOT NULL,
    "idData" INTEGER NOT NULL,
    "idPessoa" INTEGER NOT NULL,
    "idCondicaoPeriodontal" INTEGER NOT NULL,
    "idLocal" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "fluoroseDentaria" "FluoroseDentaria" NOT NULL,
    "overjetMaxilarAnterior" INTEGER NOT NULL,
    "overjetMandibularAnterior" INTEGER NOT NULL,
    "mordidaAbertaVerticalAnterior" INTEGER NOT NULL,
    "relacaoMolarAnteroPosterior" "RelacaoMolarAnteroPosterior" NOT NULL,
    "observacao" TEXT NOT NULL,
    "odontograma" JSONB NOT NULL,

    CONSTRAINT "Exame_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvaliacaoSocioEconomica" (
    "id" SERIAL NOT NULL,
    "idData" INTEGER NOT NULL,
    "idPessoa" INTEGER NOT NULL,
    "idLocal" INTEGER NOT NULL,
    "idUsuario" INTEGER NOT NULL,
    "qtdPessoasResidencia" INTEGER NOT NULL,
    "qtdComodosDormitorio" INTEGER NOT NULL,
    "qtdBens" INTEGER NOT NULL,
    "qtdTotalRendaUltimoMes" INTEGER NOT NULL,
    "escolaridadeMae" "Escolaridade" NOT NULL,
    "escolaridadePai" "Escolaridade" NOT NULL,
    "recebeBeneficioSocial" BOOLEAN,
    "filhoDorDente6Meses" BOOLEAN,
    "filhoNivelDor" INTEGER NOT NULL,
    "filhoVisitouDentista" BOOLEAN,
    "filhoUltimaConsulta" "UltimaConsulta" NOT NULL,
    "filhoLocalConsulta" "LocalConsulta" NOT NULL,
    "motivoUltimaConsulta" "MotivoUltimaConsulta" NOT NULL,
    "avaliacaoUltimaConsulta" "AvaliacaoUltimaConsulta" NOT NULL,
    "filhoAvaliacaoBucal" "AvaliacaoBucal" NOT NULL,
    "filhoQtdEscovacoesPorDia" "FilhoQtdEscovacoesPorDia" NOT NULL,
    "frequenciaTrocaEscovas" "FrequenciaTrocaEscovas" NOT NULL,
    "usaFioDental" BOOLEAN NOT NULL,
    "usaPastaComFluor" BOOLEAN NOT NULL,

    CONSTRAINT "AvaliacaoSocioEconomica_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Soho_idExame_key" ON "Soho"("idExame");

-- CreateIndex
CREATE UNIQUE INDEX "CPQ_idExame_key" ON "CPQ"("idExame");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Equipe_idCoordenador_key" ON "Equipe"("idCoordenador");

-- CreateIndex
CREATE UNIQUE INDEX "Data_dia_mes_ano_key" ON "Data"("dia", "mes", "ano");

-- CreateIndex
CREATE UNIQUE INDEX "Exame_idCondicaoPeriodontal_key" ON "Exame"("idCondicaoPeriodontal");

-- AddForeignKey
ALTER TABLE "Soho" ADD CONSTRAINT "Soho_idExame_fkey" FOREIGN KEY ("idExame") REFERENCES "Exame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CPQ" ADD CONSTRAINT "CPQ_idExame_fkey" FOREIGN KEY ("idExame") REFERENCES "Exame"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarcadorConsumoAlimentar" ADD CONSTRAINT "MarcadorConsumoAlimentar_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarcadorConsumoAlimentar" ADD CONSTRAINT "MarcadorConsumoAlimentar_idData_fkey" FOREIGN KEY ("idData") REFERENCES "Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarcadorConsumoAlimentar" ADD CONSTRAINT "MarcadorConsumoAlimentar_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarcadorConsumoAlimentar" ADD CONSTRAINT "MarcadorConsumoAlimentar_idLocal_fkey" FOREIGN KEY ("idLocal") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_idPertenceEquipe_fkey" FOREIGN KEY ("idPertenceEquipe") REFERENCES "Equipe"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipe" ADD CONSTRAINT "Equipe_idCoordenador_fkey" FOREIGN KEY ("idCoordenador") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_idData_fkey" FOREIGN KEY ("idData") REFERENCES "Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_idLocal_fkey" FOREIGN KEY ("idLocal") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exame" ADD CONSTRAINT "Exame_idCondicaoPeriodontal_fkey" FOREIGN KEY ("idCondicaoPeriodontal") REFERENCES "CondicaoPeriodontal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoSocioEconomica" ADD CONSTRAINT "AvaliacaoSocioEconomica_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoSocioEconomica" ADD CONSTRAINT "AvaliacaoSocioEconomica_idData_fkey" FOREIGN KEY ("idData") REFERENCES "Data"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoSocioEconomica" ADD CONSTRAINT "AvaliacaoSocioEconomica_idPessoa_fkey" FOREIGN KEY ("idPessoa") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvaliacaoSocioEconomica" ADD CONSTRAINT "AvaliacaoSocioEconomica_idLocal_fkey" FOREIGN KEY ("idLocal") REFERENCES "Local"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
