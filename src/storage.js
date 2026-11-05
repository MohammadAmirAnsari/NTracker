import { Preferences } from '@capacitor/preferences';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

const KEY = 'pending_tracker_v1';
const DIR = 'PendingTracker';
const FILE = `${DIR}/backup.json`;

export const PRAYERS = ['Fajr', 'Zohar', 'Asr', 'Maghrib', 'Isha', 'Witr'];

export function defaultState() {
  const prayers = {};
  PRAYERS.forEach((p) => (prayers[p] = { pending: 0, done: 0 }));
  return { version: 1, updatedAt: 0, prayers };
}

// Kisi bhi source (prefs / file / import) ke data ko safe format me badalta hai
export function normalize(raw) {
  const base = defaultState();
  if (!raw || typeof raw !== 'object' || !raw.prayers) return null;
  PRAYERS.forEach((p) => {
    const r = raw.prayers[p] || {};
    base.prayers[p].pending = Math.max(0, parseInt(r.pending, 10) || 0);
    base.prayers[p].done = Math.max(0, parseInt(r.done, 10) || 0);
  });
  base.updatedAt = Number(raw.updatedAt) || 0;
  return base;
}

async function readPrefs() {
  try {
    const { value } = await Preferences.get({ key: KEY });
    return value ? normalize(JSON.parse(value)) : null;
  } catch (e) {
    console.error('prefs read fail', e);
    return null;
  }
}

async function readBackupFile() {
  try {
    const res = await Filesystem.readFile({
      path: FILE,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
    });
    return normalize(JSON.parse(res.data));
  } catch (e) {
    return null; // file nahi hai ya permission nahi
  }
}

export async function askPermission() {
  try {
    await Filesystem.requestPermissions();
  } catch (e) {
    // Naye Android me ye throw kar sakta hai, ignore
  }
}

// Dono jagah se padho, jo naya ho wahi use karo
export async function loadState() {
  await askPermission();
  const [fromPrefs, fromFile] = await Promise.all([readPrefs(), readBackupFile()]);

  let state = null;
  let source = 'new';

  if (fromPrefs && fromFile) {
    if (fromFile.updatedAt > fromPrefs.updatedAt) {
      state = fromFile;
      source = 'backup-file';
    } else {
      state = fromPrefs;
      source = 'prefs';
    }
  } else if (fromPrefs) {
    state = fromPrefs;
    source = 'prefs';
  } else if (fromFile) {
    state = fromFile; // data clear hua tha, file se wapas aaya
    source = 'backup-file';
  }

  return { state: state || defaultState(), source };
}

export async function saveState(state) {
  const json = JSON.stringify(state);
  let prefsOk = false;
  let fileOk = false;

  try {
    await Preferences.set({ key: KEY, value: json });
    prefsOk = true;
  } catch (e) {
    console.error('prefs save fail', e);
  }

  try {
    await Filesystem.writeFile({
      path: FILE,
      data: json,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true,
    });
    fileOk = true;
  } catch (e) {
    console.error('file backup fail', e);
  }

  return { prefsOk, fileOk };
}