-- Backfill-safe migration for existing Decision rows (SQLite)

-- 1) Add new columns as NULLABLE first
ALTER TABLE "Decision" ADD COLUMN "decisionNumber" INTEGER;
ALTER TABLE "Decision" ADD COLUMN "body" TEXT;
ALTER TABLE "Decision" ADD COLUMN "decisionType" TEXT;
ALTER TABLE "Decision" ADD COLUMN "scope" TEXT;
ALTER TABLE "Decision" ADD COLUMN "createdByRole" TEXT;
ALTER TABLE "Decision" ADD COLUMN "createdByIdentifier" TEXT;

-- 2) Backfill existing rows with deterministic defaults
UPDATE "Decision"
SET
  decisionNumber = COALESCE(decisionNumber, id),
  body = COALESCE(body, content),
  decisionType = COALESCE(decisionType, 'OTHER'),
  scope = COALESCE(scope, 'PUBLIC'),
  createdByRole = COALESCE(createdByRole, 'system'),
  createdByIdentifier = COALESCE(createdByIdentifier, 'seed');

-- 3) Enforce NOT NULL constraints by table rebuild (SQLite pattern)
PRAGMA foreign_keys=off;

CREATE TABLE "Decision_new" (
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
  "status" TEXT NOT NULL,
  "createdAt" DATETIME NOT NULL,
  "submittedAt" DATETIME,
  "approvedAt" DATETIME,
  "lockedAt" DATETIME,
  "createdById" TEXT NOT NULL,
  "lockedById" TEXT,
  CONSTRAINT "Decision_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Decision_lockedById_fkey" FOREIGN KEY ("lockedById") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO "Decision_new" (
  id, decisionNumber, body, decisionType, scope,
  createdByRole, createdByIdentifier,
  title, content, titleEn, contentEn,
  status, createdAt, submittedAt, approvedAt, lockedAt,
  createdById, lockedById
)
SELECT
  id, decisionNumber, body, decisionType, scope,
  createdByRole, createdByIdentifier,
  title, content, titleEn, contentEn,
  status, createdAt, submittedAt, approvedAt, lockedAt,
  createdById, lockedById
FROM "Decision";

DROP TABLE "Decision";
ALTER TABLE "Decision_new" RENAME TO "Decision";

PRAGMA foreign_keys=on;
