function buildThirdAssignments(state) {
  if (state.selectedThirds.length !== 8) return {};

  const thirdSlots = ROUND_OF_32
    .filter((match) => match.b.type === "third")
    .map((match) => ({ matchId: match.id, allowed: match.b.allowed }));
  const selected = [...state.selectedThirds].sort();

  const search = (slotIndex, remaining, assignments) => {
    if (slotIndex === thirdSlots.length) return assignments;
    const slot = thirdSlots[slotIndex];
    const candidates = remaining.filter((group) => slot.allowed.includes(group));
    for (const group of candidates) {
      const next = search(
        slotIndex + 1,
        remaining.filter((entry) => entry !== group),
        { ...assignments, [slot.matchId]: group }
      );
      if (next) return next;
    }
    return null;
  };

  return search(0, selected, {}) || {};
}

function resolveSeed(seed, state, thirdAssignments) {
  if (seed.type === "rank") {
    return getTeamByRank(state, seed.group, seed.rank);
  }

  const group = thirdAssignments[seed.matchId];
  return group ? getTeamByRank(state, group, 3) : "";
}

function buildMatches(state) {
  const thirdAssignments = buildThirdAssignments(state);
  const matches = {};

  ROUND_OF_32.forEach((match) => {
    const seedA = match.a;
    const seedB = { ...match.b, matchId: match.id };
    matches[match.id] = {
      id: match.id,
      round: "Sechzehntelfinal",
      teams: [resolveSeed(seedA, state, thirdAssignments), resolveSeed(seedB, state, thirdAssignments)]
    };
  });

  NEXT_ROUNDS.forEach((round) => {
    round.matches.forEach((pair, index) => {
      const prefix = round.name === "Achtelfinal" ? "R16" : round.name === "Viertelfinal" ? "QF" : round.name === "Halbfinal" ? "SF" : round.name === "Final" ? "F" : "P3";
      const id = `${prefix}-${index + 1}`;
      matches[id] = {
        id,
        round: round.name,
        teams: pair.map((source) => {
          if (source.startsWith("L-")) {
            const sourceMatch = matches[source.slice(2)];
            const winner = state.winners[source.slice(2)];
            return sourceMatch?.teams.find((team) => team && team !== winner) || "";
          }
          return state.winners[source] || "";
        })
      };
    });
  });

  Object.values(matches).forEach((match) => {
    if (!match.teams.includes(state.winners[match.id])) {
      delete state.winners[match.id];
    }
  });

  return matches;
}

function renderBracket(state, onChange) {
  const root = document.getElementById("bracket");
  const matches = buildMatches(state);
  const rounds = ["Sechzehntelfinal", "Achtelfinal", "Viertelfinal", "Halbfinal", "Final", "Spiel um Platz 3"];
  root.innerHTML = "";
  root.style.gridTemplateColumns = `repeat(${rounds.length}, minmax(210px, 1fr))`;

  rounds.forEach((round) => {
    const column = document.createElement("section");
    column.className = "round";
    column.innerHTML = `<h3>${round}</h3>`;
    Object.values(matches).filter((match) => match.round === round).forEach((match) => {
      column.append(renderMatch(match, state, onChange));
    });
    root.append(column);
  });

  const champion = state.winners["F-1"];
  document.getElementById("championBadge").textContent = champion ? `Weltmeister: ${champion}` : "Weltmeister offen";
}

function renderMatch(match, state, onChange) {
  const article = document.createElement("article");
  article.className = "match";
  article.innerHTML = `
    <div class="match-label"><span>${match.id}</span><span>${match.round}</span></div>
    <div class="team-slot ${match.teams[0] ? "" : "empty"}">${match.teams[0] || "offen"}</div>
    <div class="team-slot ${match.teams[1] ? "" : "empty"}">${match.teams[1] || "offen"}</div>
    <div class="select-wrap winner-select"></div>
  `;

  const select = document.createElement("select");
  select.add(new Option("Sieger wählen", ""));
  match.teams.filter(Boolean).forEach((team) => select.add(new Option(team, team)));
  select.value = state.winners[match.id] || "";
  select.disabled = match.teams.filter(Boolean).length < 2;
  select.addEventListener("change", () => {
    state.winners[match.id] = select.value;
    onChange();
  });
  article.querySelector(".winner-select").append(select);
  return article;
}
