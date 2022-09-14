-- CreateTable
CREATE TABLE "RoomFacility" (
    "id" TEXT NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "desk" BOOLEAN NOT NULL,
    "socketPlug" BOOLEAN NOT NULL,
    "airCondition" BOOLEAN NOT NULL,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "RoomFacility_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomFacility" ADD CONSTRAINT "RoomFacility_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
