-- CreateTable
CREATE TABLE "BlogAnalytics" (
    "id" SERIAL NOT NULL,
    "blogID" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "reads" INTEGER NOT NULL DEFAULT 0,
    "totalHoursRead" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "averageHoursRead" DECIMAL(65,30) NOT NULL DEFAULT 0.0,

    CONSTRAINT "BlogAnalytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BlogAnalytics_blogID_date_key" ON "BlogAnalytics"("blogID", "date");

-- AddForeignKey
ALTER TABLE "BlogAnalytics" ADD CONSTRAINT "BlogAnalytics_blogID_fkey" FOREIGN KEY ("blogID") REFERENCES "Blog"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
