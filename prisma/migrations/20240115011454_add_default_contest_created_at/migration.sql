-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contest" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "startsAt" DATETIME NOT NULL,
    "endsAt" DATETIME NOT NULL
);
INSERT INTO "new_Contest" ("createdAt", "endsAt", "id", "name", "startsAt", "type") SELECT "createdAt", "endsAt", "id", "name", "startsAt", "type" FROM "Contest";
DROP TABLE "Contest";
ALTER TABLE "new_Contest" RENAME TO "Contest";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
