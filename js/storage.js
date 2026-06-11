const STORAGE_KEY = "wm2026-predictor-state-v2";
const LEGACY_STORAGE_KEYS = ["wm2026-predictor-state-v1"];

function defaultState() {
  return {
    rankings: Object.fromEntries(GROUPS.map((group) => [group.id, ["", "", "", ""]])),
    selectedThirds: [],
    winners: {},
    theme: "light"
  };
}

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function resetState() {
  LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  localStorage.removeItem(STORAGE_KEY);
  return defaultState();
}
