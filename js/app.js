let state = loadState();

function render() {
  document.documentElement.dataset.theme = state.theme;
  renderGroups(state, commit);
  renderThirds(state, commit);
  renderBracket(state, commit);
  saveState(state);
}

function commit() {
  render();
}

document.getElementById("themeToggle").addEventListener("click", () => {
  state.theme = state.theme === "dark" ? "light" : "dark";
  commit();
});

document.getElementById("resetBtn").addEventListener("click", () => {
  if (!confirm("Alle Tipps wirklich zurücksetzen?")) return;
  state = resetState();
  commit();
});

document.getElementById("exportBtn").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "wm2026-predictor.json";
  link.click();
  URL.revokeObjectURL(url);
});

document.getElementById("importInput").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    state = { ...defaultState(), ...imported };
    commit();
  } catch {
    alert("Die JSON-Datei konnte nicht gelesen werden.");
  } finally {
    event.target.value = "";
  }
});

render();
