/*
  Warnings:

  - You are about to drop the `RoomFacility` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomFacility" DROP CONSTRAINT "RoomFacility_roomId_fkey";

-- DropTable
DROP TABLE "RoomFacility";
