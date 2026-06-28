import { kv } from "@vercel/kv";

async function main() {
  try {
    const key = "postara:analytics:ids";
    const res = await kv.del(key);
    console.log(JSON.stringify({ ok: true, deleted: key, result: res }));
  } catch (err: any) {
    console.error(JSON.stringify({ ok: false, error: err.message }));
  }
}

main();
