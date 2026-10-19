// Shared task list for /takip.
// Storage: an Upstash Redis store added from the Vercel dashboard (Storage → Upstash for Redis),
// which sets KV_REST_API_URL / KV_REST_API_TOKEN (or UPSTASH_REDIS_REST_URL / _TOKEN).
// Access: every request must carry the team passcode in `x-tracker-key`, matching TRACKER_KEY.
const KEY = 'munus:tasks';
const MAX_TASKS = 500;

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

async function redis(cmd) {
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json()).result;
}

async function readTasks() {
  const raw = await redis(['GET', KEY]);
  return raw ? JSON.parse(raw) : null;
}

const STR = (v, n) => (typeof v === 'string' ? v.slice(0, n) : '');
const AREAS = ['company', 'web', 'social', 'reel', 'print', 'partners'];
const STATUSES = ['todo', 'doing', 'hold', 'done'];

function clean(t, prev) {
  const base = prev || {};
  const out = { ...base };
  if (t.title !== undefined) out.title = STR(t.title, 160).trim();
  if (t.area !== undefined && AREAS.includes(t.area)) out.area = t.area;
  if (t.status !== undefined && STATUSES.includes(t.status)) out.status = t.status;
  if (t.due !== undefined) out.due = /^\d{4}-\d{2}-\d{2}$/.test(t.due) ? t.due : '';
  if (t.owner !== undefined) out.owner = STR(t.owner, 60).trim();
  if (t.note !== undefined) out.note = STR(t.note, 600).trim();
  if (t.order !== undefined && Number.isFinite(t.order)) out.order = t.order;
  if (t.createdAt !== undefined) out.createdAt = STR(t.createdAt, 40);
  out.id = STR(t.id || base.id, 40);
  out.area = out.area || 'company';
  out.status = out.status || 'todo';
  return out;
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  if (!url || !token || !process.env.TRACKER_KEY) {
    return res.status(503).json({ error: 'not_configured' });
  }
  if (req.headers['x-tracker-key'] !== process.env.TRACKER_KEY) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  try {
    if (req.method === 'GET') {
      return res.status(200).json({ tasks: await readTasks() });
    }
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });

    const op = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    let tasks = (await readTasks()) || [];

    if (op.op === 'init') {
      // only fills an empty list, so a stale page can't wipe the shared one
      if (!tasks.length && Array.isArray(op.tasks)) {
        tasks = op.tasks.slice(0, MAX_TASKS).map((t) => clean(t)).filter((t) => t.id && t.title);
      }
    } else if (op.op === 'upsert' && op.task && op.task.id) {
      const i = tasks.findIndex((t) => t.id === op.task.id);
      if (i >= 0) tasks[i] = clean(op.task, tasks[i]);
      else if (tasks.length < MAX_TASKS) {
        const t = clean(op.task);
        if (t.title) tasks.push(t);
      }
    } else if (op.op === 'delete' && op.id) {
      tasks = tasks.filter((t) => t.id !== op.id);
    } else {
      return res.status(400).json({ error: 'bad_op' });
    }

    await redis(['SET', KEY, JSON.stringify(tasks)]);
    return res.status(200).json({ tasks });
  } catch (e) {
    return res.status(500).json({ error: 'storage' });
  }
};
