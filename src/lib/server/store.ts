import "server-only";
import { randomBytes, randomUUID } from "node:crypto";
import { appendFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ARTWORK_MAX_BYTES, ARTWORK_MAX_FILES, ARTWORK_TYPES } from "../validation";

/**
 * MVP persistence: append-only JSON Lines files under `.data/`.
 *
 * This keeps the site usable end-to-end without infrastructure. It is NOT
 * suitable for production or serverless hosting — replace with PostgreSQL
 * (Prisma/Drizzle) and object storage with signed uploads (blueprint §13–14).
 * Keep the function signatures and swap the internals.
 */
const DATA_DIR = path.join(process.cwd(), ".data");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

export type RecordKind = "quotes" | "orders" | "contacts";

export function makeReference(prefix: "Q" | "O" | "C") {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `RB-${prefix}-${ymd}-${randomBytes(3).toString("hex").toUpperCase()}`;
}

export async function saveRecord(kind: RecordKind, record: Record<string, unknown>) {
  await mkdir(DATA_DIR, { recursive: true });
  const row = { id: randomUUID(), createdAt: new Date().toISOString(), ...record };
  await appendFile(path.join(DATA_DIR, `${kind}.jsonl`), JSON.stringify(row) + "\n", "utf8");
  return row;
}

export async function findRecord(kind: RecordKind, predicate: (r: Record<string, unknown>) => boolean) {
  try {
    const raw = await readFile(path.join(DATA_DIR, `${kind}.jsonl`), "utf8");
    for (const line of raw.split("\n")) {
      if (!line) continue;
      const r = JSON.parse(line) as Record<string, unknown>;
      if (predicate(r)) return r;
    }
  } catch {
    /* no file yet */
  }
  return undefined;
}

export type StoredArtwork = { originalName: string; storedAs: string; size: number; type: string };

const SIGNATURES: Record<string, (b: Buffer) => boolean> = {
  ".png": (b) => b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])),
  ".jpg": (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  ".jpeg": (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff,
  ".pdf": (b) => b.subarray(0, 5).toString("latin1") === "%PDF-",
  ".ai": (b) => ["%PDF-", "%!PS-"].includes(b.subarray(0, 5).toString("latin1")),
  ".eps": (b) => b.subarray(0, 4).toString("latin1") === "%!PS" || b.readUInt32BE(0) === 0xc5d0d3c6,
  ".svg": (b) => /<svg[\s>]/i.test(b.subarray(0, 2048).toString("utf8")),
};

/**
 * Validates and stores uploaded artwork. Files are stored under random names
 * outside `public/`, so they are never publicly addressable.
 * TODO(production): malware scan server-side before staff open files (§8).
 */
export async function storeArtwork(files: File[]): Promise<{ ok: true; files: StoredArtwork[] } | { ok: false; error: string }> {
  const real = files.filter((f) => f && typeof f === "object" && f.size > 0);
  if (real.length === 0) return { ok: true, files: [] };
  if (real.length > ARTWORK_MAX_FILES) return { ok: false, error: `Upload up to ${ARTWORK_MAX_FILES} files.` };

  const checked: { file: File; ext: string; buf: Buffer }[] = [];
  for (const file of real) {
    const ext = path.extname(file.name).toLowerCase();
    if (!ARTWORK_TYPES.includes(ext)) return { ok: false, error: `${file.name}: file type not accepted.` };
    if (file.size > ARTWORK_MAX_BYTES) return { ok: false, error: `${file.name}: file is larger than 15 MB.` };
    const buf = Buffer.from(await file.arrayBuffer());
    if (!SIGNATURES[ext]?.(buf)) return { ok: false, error: `${file.name}: file content does not match its type.` };
    checked.push({ file, ext, buf });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });
  const stored: StoredArtwork[] = [];
  for (const { file, ext, buf } of checked) {
    const storedAs = `${randomUUID()}${ext}`;
    await writeFile(path.join(UPLOAD_DIR, storedAs), buf);
    stored.push({ originalName: file.name.slice(0, 200), storedAs, size: file.size, type: ext });
  }
  return { ok: true, files: stored };
}
