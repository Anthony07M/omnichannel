-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "addressId" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "address" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "logradouro" TEXT NOT NULL,
    "complemento" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "localidade" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "regiao" TEXT NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
