-- CreateTable
CREATE TABLE "_NewsletterToSubscriber" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_NewsletterToSubscriber_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_NewsletterToSubscriber_B_index" ON "_NewsletterToSubscriber"("B");

-- AddForeignKey
ALTER TABLE "_NewsletterToSubscriber" ADD CONSTRAINT "_NewsletterToSubscriber_A_fkey" FOREIGN KEY ("A") REFERENCES "Newsletter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsletterToSubscriber" ADD CONSTRAINT "_NewsletterToSubscriber_B_fkey" FOREIGN KEY ("B") REFERENCES "Subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;
