function getTeamByRank(state, groupId, rank) {
  return state.rankings[groupId]?.[rank - 1] || "";
}

function getThirds(state) {
  return GROUPS.map((group) => ({
    group: group.id,
    team: getTeamByRank(state, group.id, 3)
  })).filter((entry) => entry.team);
}

function renderGroups(state, onChange) {
  const root = document.getElementById("groups");
  root.innerHTML = "";

  GROUPS.forEach((group) => {
    const card = document.createElement("article");
    card.className = "group-card";
    card.innerHTML = `
      <div class="group-title">
        <h3>Gruppe ${group.id}</h3>
        <span class="status-pill">${isCompleteGroup(state, group.id) ? "komplett" : "offen"}</span>
      </div>
    `;

    for (let rank = 1; rank <= 4; rank += 1) {
      const row = document.createElement("div");
      row.className = "rank-row";
      row.innerHTML = `<span class="rank-number">${rank}.</span><span class="select-wrap"></span>`;
      const select = document.createElement("select");
      select.dataset.group = group.id;
      select.dataset.rank = String(rank);

      const selected = getTeamByRank(state, group.id, rank);
      const chosenInGroup = new Set(state.rankings[group.id].filter(Boolean));
      const empty = new Option("Team wählen", "");
      select.add(empty);

      group.teams.forEach((team) => {
        if (team === selected || !chosenInGroup.has(team)) {
          select.add(new Option(team, team));
        }
      });

      select.value = selected;
      select.addEventListener("change", () => {
        state.rankings[group.id][rank - 1] = select.value;
        state.selectedThirds = state.selectedThirds.filter((groupId) => getTeamByRank(state, groupId, 3));
        clearInvalidWinners(state);
        onChange();
      });
      row.querySelector(".select-wrap").append(select);
      card.append(row);
    }

    root.append(card);
  });

  const completeCount = GROUPS.filter((group) => isCompleteGroup(state, group.id)).length;
  document.getElementById("groupStatus").textContent = `${completeCount}/12 komplett`;
}

function renderThirds(state, onChange) {
  const root = document.getElementById("thirds");
  root.innerHTML = "";

  getThirds(state).forEach(({ group, team }) => {
    const card = document.createElement("label");
    card.className = "third-card";
    const checked = state.selectedThirds.includes(group);
    card.innerHTML = `
      <span class="team-line">
        <span class="team-name">${team}</span>
        <span class="team-meta">Gruppe ${group}, Platz 3</span>
      </span>
      <input type="checkbox" ${checked ? "checked" : ""}>
    `;
    const input = card.querySelector("input");
    input.disabled = !checked && state.selectedThirds.length >= 8;
    input.addEventListener("change", () => {
      if (input.checked) {
        state.selectedThirds.push(group);
      } else {
        state.selectedThirds = state.selectedThirds.filter((entry) => entry !== group);
      }
      clearInvalidWinners(state);
      onChange();
    });
    root.append(card);
  });

  document.getElementById("thirdStatus").textContent = `${state.selectedThirds.length}/8 gewählt`;
}

function isCompleteGroup(state, groupId) {
  const ranking = state.rankings[groupId] || [];
  return ranking.length === 4 && new Set(ranking).size === 4 && ranking.every(Boolean);
}

function clearInvalidWinners(state) {
  state.winners = {};
}
