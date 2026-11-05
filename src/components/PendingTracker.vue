<template>
  <div class="min-h-screen bg-slate-900 text-slate-100 p-3 pt-0 font-sans select-none">
    <header class="max-w-md mx-auto text-center sticky top-0 bg-slate-900 z-2">
      <div class="max-w-md mx-auto py-1 grid grid-cols-3 items-center">
        <div class="flex justify-start">
          <button @click="enableEdit()" type="button"
            class="w-8 h-8 active:scale-95 transition text-sm text-white rounded-full bg-slate-700 flex items-center justify-center">

            <svg v-if="enableEditing" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" class="size-4 stroke-green-500">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <svg v-else xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              class="size-4 stroke-cyan-500">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>

          </button>
        </div>

        <!-- Middle: Centered Title -->
        <h1 class="text-2xl font-bold text-emerald-400 text-center whitespace-nowrap">Tracker</h1>

        <!-- Right Side: Add Button -->
        <div class="flex justify-end">
          <button @click="moreToggle()" type="button"
            class="w-8 h-8 active:scale-95 transition text-sm text-white rounded-full bg-slate-700 flex items-center justify-center">
            <svg v-if="more" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              class="size-4 stroke-red-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              class="size-4 stroke-cyan-500">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <div
      class="max-w-md mx-auto bg-slate-800 rounded-xl p-2.5 shadow-lg grid grid-cols-2 gap-1 border border-slate-700 px-2">
      <div class="border-r border-slate-700">
        <p class="text-sm text-slate-400 tracking-wider">Pending:
          <span class="text-sm font-bold text-rose-400">{{ totals.pending }}</span>
        </p>
        <!-- <p class="text-xs text-slate-400 uppercase tracking-wider">Pending</p>
        <p class="text-xs font-bold text-rose-400">{{ totals.pending }}</p> -->
      </div>
      <div>
        <p class="text-sm text-slate-400 tracking-wider">Done:
          <span class="text-sm font-bold text-emerald-400">{{ totals.done }}</span>
        </p>
        <!-- <p class="text-xs text-slate-400 uppercase tracking-wider">Done</p>
        <p class="text-xs font-bold text-emerald-400">{{ totals.done }}</p> -->
      </div>
    </div>




    <main v-if="loaded" class="max-w-md mx-auto space-y-1 mt-1">

      <div v-for="name in PRAYERS" :key="name"
        class="bg-slate-800 rounded-2xl py-1.5 px-3 shadow-md border border-slate-700">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-md font-semibold text-slate-200">{{ name }}</h2>
            <!-- <div class="flex space-x-3 text-xs text-slate-400 mt-1">
              <span>Pending: <strong class="text-rose-400 text-sm">{{ state.prayers[name].pending }}</strong></span>
              <span>Done: <strong class="text-emerald-400 text-sm">{{ state.prayers[name].done }}</strong></span>
            </div> -->
            <div class="flex space-x-6 text-xs text-slate-400">
              <!-- Pending Column Group -->
              <div class="flex flex-col">
                <span>Pending</span>
                <strong class="text-rose-400 text-sm mt-px">{{ state.prayers[name].pending }}</strong>
              </div>

              <!-- Done Column Group -->
              <div class="flex flex-col">
                <span>Done</span>
                <strong class="text-emerald-400 text-sm mt-px">{{ state.prayers[name].done }}</strong>
              </div>
            </div>

          </div>

          <div class="w-1/2 flex items-center justify-center gap-2">
            <!-- Edit pending -->
            <!-- <button v-if="enableEditing" @click="startEdit(name)"
              class="w-12 h-12 rounded-lg bg-slate-700 border border-slate-600 text-slate-300 text-sm">✎</button> -->

            <button v-if="enableEditing" @click="startEdit(name)"
              class="w-full h-10 flex items-center justify-center rounded-xl bg-slate-700 hover:bg-slate-600 border border-slate-600 text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
              </svg>
            </button>

            <!-- Plus: galti se minus ho gaya to wapas badhao -->
            <button @click="undo(name)" :disabled="state.prayers[name].pending === 0"
              class="w-full h-10 flex items-center justify-center rounded-xl bg-slate-700 hover:bg-slate-600 border border-slate-600 text-red-400 disabled:opacity-60"><svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </button>

            <!-- Minus: ek namaz padhi, pending kam -->
            <button @click="markDone(name)" :disabled="state.prayers[name].pending === 0"
              class="w-full h-10 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 border active:bg-emerald-700 text-white disabled:opacity-30"><svg
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Edit box -->
        <div v-if="editing === name" class="mt-2 flex items-center space-x-2">
          <input v-model="editValue" type="number" inputmode="numeric" min="0"
            class="w-1/2 bg-slate-900 border border-slate-600 rounded-lg px-3 py-2 text-slate-100 select-text"
            placeholder="Pending count" />
          <button @click="saveEdit(name)" class="w-1/4 px-4 py-2 rounded-lg bg-emerald-600 text-white">Save</button>
          <button @click="editing = null" class="w-1/4 px-3 py-2 rounded-lg bg-slate-700 text-slate-300">✕</button>
        </div>
      </div>

      <!-- Backup status -->
      <p class="text-xs text-center" :class="status.fileOk ? 'text-emerald-500' : 'text-amber-400'">
        <template v-if="!loaded">Loading...</template>
        <template v-else-if="status.fileOk">Backup file saved ✓ {{ lastSaved }}</template>
        <template v-else>⚠ Backup file save nahi hua (sirf app storage me saved)</template>
      </p>

      <!-- Backup tools -->
      <div v-if="more" v-scroll-on-show class="bg-slate-800 rounded-2xl p-4 border border-slate-700 space-y-3">
        <h3 class="text-sm font-semibold text-slate-300">Backup</h3>
        <button @click="exportData" class="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold">
          Export / Share backup
        </button>
        <textarea v-model="importText" rows="3"
          class="w-full bg-slate-900 border border-slate-600 rounded-lg p-2 text-xs text-slate-100 select-text"
          placeholder="Backup JSON yahan paste karo"></textarea>
        <button @click="importData" class="w-full py-3 rounded-xl bg-slate-700 text-slate-100 font-semibold">
          Import (current data replace hoga)
        </button>
        <p v-if="msg" class="text-xs text-amber-400">{{ msg }}</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue';
import { Share } from '@capacitor/share';
import { PRAYERS, defaultState, normalize, loadState, saveState } from '../storage';

const state = reactive(defaultState());
const loaded = ref(false);
const status = reactive({ prefsOk: false, fileOk: false, at: 0 });
const editing = ref(null);
const enableEditing = ref(false);
const more = ref(false);
const editValue = ref('');
const importText = ref('');
const msg = ref('');

const lastSaved = computed(() => (status.at ? new Date(status.at).toLocaleTimeString() : ''));

const totals = computed(() => {
  let pending = 0;
  let done = 0;
  PRAYERS.forEach((p) => {
    pending += state.prayers[p].pending;
    done += state.prayers[p].done;
  });
  return { pending, done };
});

function replaceState(next) {
  state.version = next.version;
  state.updatedAt = next.updatedAt;
  PRAYERS.forEach((p) => {
    state.prayers[p].pending = next.prayers[p].pending;
    state.prayers[p].done = next.prayers[p].done;
  });
}

onMounted(async () => {
  const { state: s, source } = await loadState();
  replaceState(s);
  loaded.value = true; // load ke baad hi save allowed (empty data se overwrite na ho)
  if (source === 'backup-file') msg.value = 'Data backup file se restore hua ✓';
});

// Save queue: ek ke baad ek, order me
let queue = Promise.resolve();
watch(
  state,
  () => {
    if (!loaded.value) return;
    const snapshot = JSON.parse(JSON.stringify(state));
    queue = queue.then(async () => {
      const r = await saveState(snapshot);
      status.prefsOk = r.prefsOk;
      status.fileOk = r.fileOk;
      status.at = Date.now();
    });
  },
  { deep: true }
);

function touch() {
  state.updatedAt = Date.now();
}

function markDone(name) {
  const p = state.prayers[name];
  if (p.pending > 0) {
    p.pending--;
    p.done++;
    touch();
  }
}

function undo(name) {
  const p = state.prayers[name];
  p.pending++;
  if (p.done > 0) p.done--;
  touch();
}

const vScrollOnShow = {
  mounted(el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

function moreToggle() {
  more.value = !more.value
}

function enableEdit() {
  enableEditing.value = !enableEditing.value;
}
function startEdit(name) {
  editing.value = name;
  editValue.value = String(state.prayers[name].pending);
}

function saveEdit(name) {
  const n = Math.max(0, parseInt(editValue.value, 10) || 0);
  state.prayers[name].pending = n;
  touch();
  editing.value = null;
}

async function exportData() {
  try {
    await Share.share({
      title: 'Pending Tracker Backup',
      text: JSON.stringify(state),
      dialogTitle: 'Backup bhejo',
    });
  } catch (e) {
    msg.value = 'Share cancel / fail ho gaya';
  }
}

function importData() {
  try {
    const next = normalize(JSON.parse(importText.value));
    if (!next) throw new Error('bad');
    replaceState(next);
    touch();
    importText.value = '';
    msg.value = 'Import ho gaya ✓';
  } catch (e) {
    msg.value = 'JSON galat hai, import nahi hua';
  }
}
</script>

<style scoped>
button {
  -webkit-tap-highlight-color: transparent;
}
</style>