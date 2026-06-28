-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Decision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "decisionNumber" INTEGER NOT NULL,
    "body" TEXT NOT NULL,
    "decisionType" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "createdByRole" TEXT NOT NULL,
    "createdByIdentifier" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "titleEn" TEXT,
    "contentEn" TEXT,
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "submittedAt" DATETIME,
    "approvedAt" DATETIME,
    "lockedAt" DATETIME,
    "createdById" TEXT NOT NULL,
    "lockedById" TEXT,
    CONSTRAINT "Decision_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Decision_lockedById_fkey" FOREIGN KEY ("lockedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Decision" ("approvedAt", "body", "content", "contentEn", "createdAt", "createdById", "createdByIdentifier", "createdByRole", "decisionNumber", "decisionType", "id", "lockedAt", "lockedById", "scope", "status", "submittedAt", "title", "titleEn") SELECT "approvedAt", "body", "content", "contentEn", "createdAt", "createdById", "createdByIdentifier", "createdByRole", "decisionNumber", "decisionType", "id", "lockedAt", "lockedById", "scope", "status", "submittedAt", "title", "titleEn" FROM "Decision";
DROP TABLE "Decision";
ALTER TABLE "new_Decision" RENAME TO "Decision";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
