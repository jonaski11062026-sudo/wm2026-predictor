const GROUPS = [
  { id: "A", teams: ["Mexiko", "Südafrika", "Südkorea", "Tschechien"] },
  { id: "B", teams: ["Kanada", "Bosnien und Herzegowina", "Katar", "Schweiz"] },
  { id: "C", teams: ["Brasilien", "Marokko", "Haiti", "Schottland"] },
  { id: "D", teams: ["USA", "Paraguay", "Australien", "Türkei"] },
  { id: "E", teams: ["Deutschland", "Curaçao", "Elfenbeinküste", "Ecuador"] },
  { id: "F", teams: ["Niederlande", "Japan", "Schweden", "Tunesien"] },
  { id: "G", teams: ["Belgien", "Ägypten", "Iran", "Neuseeland"] },
  { id: "H", teams: ["Spanien", "Kap Verde", "Saudi-Arabien", "Uruguay"] },
  { id: "I", teams: ["Frankreich", "Senegal", "Irak", "Norwegen"] },
  { id: "J", teams: ["Argentinien", "Algerien", "Österreich", "Jordanien"] },
  { id: "K", teams: ["Portugal", "DR Kongo", "Usbekistan", "Kolumbien"] },
  { id: "L", teams: ["England", "Kroatien", "Ghana", "Panama"] }
];

const ROUND_OF_32 = [
  { id: "M73", a: { type: "rank", group: "A", rank: 2 }, b: { type: "rank", group: "B", rank: 2 } },
  { id: "M74", a: { type: "rank", group: "E", rank: 1 }, b: { type: "third", allowed: ["A", "B", "C", "D", "F"] } },
  { id: "M75", a: { type: "rank", group: "F", rank: 1 }, b: { type: "rank", group: "C", rank: 2 } },
  { id: "M76", a: { type: "rank", group: "C", rank: 1 }, b: { type: "rank", group: "F", rank: 2 } },
  { id: "M77", a: { type: "rank", group: "I", rank: 1 }, b: { type: "third", allowed: ["C", "D", "F", "G", "H"] } },
  { id: "M78", a: { type: "rank", group: "E", rank: 2 }, b: { type: "rank", group: "I", rank: 2 } },
  { id: "M79", a: { type: "rank", group: "A", rank: 1 }, b: { type: "third", allowed: ["C", "E", "F", "H", "I"] } },
  { id: "M80", a: { type: "rank", group: "L", rank: 1 }, b: { type: "third", allowed: ["E", "H", "I", "J", "K"] } },
  { id: "M81", a: { type: "rank", group: "D", rank: 1 }, b: { type: "third", allowed: ["B", "E", "F", "I", "J"] } },
  { id: "M82", a: { type: "rank", group: "G", rank: 1 }, b: { type: "third", allowed: ["A", "E", "H", "I", "J"] } },
  { id: "M83", a: { type: "rank", group: "K", rank: 2 }, b: { type: "rank", group: "L", rank: 2 } },
  { id: "M84", a: { type: "rank", group: "H", rank: 1 }, b: { type: "rank", group: "J", rank: 2 } },
  { id: "M85", a: { type: "rank", group: "B", rank: 1 }, b: { type: "third", allowed: ["E", "F", "G", "I", "J"] } },
  { id: "M86", a: { type: "rank", group: "J", rank: 1 }, b: { type: "rank", group: "H", rank: 2 } },
  { id: "M87", a: { type: "rank", group: "K", rank: 1 }, b: { type: "third", allowed: ["D", "E", "I", "J", "L"] } },
  { id: "M88", a: { type: "rank", group: "D", rank: 2 }, b: { type: "rank", group: "G", rank: 2 } }
];

const NEXT_ROUNDS = [
  { name: "Achtelfinal", matches: [["M73", "M75"], ["M76", "M78"], ["M77", "M79"], ["M80", "M84"], ["M81", "M82"], ["M83", "M86"], ["M85", "M87"], ["M88", "M74"]] },
  { name: "Viertelfinal", matches: [["R16-1", "R16-2"], ["R16-3", "R16-4"], ["R16-5", "R16-6"], ["R16-7", "R16-8"]] },
  { name: "Halbfinal", matches: [["QF-1", "QF-2"], ["QF-3", "QF-4"]] },
  { name: "Final", matches: [["SF-1", "SF-2"]] },
  { name: "Spiel um Platz 3", matches: [["L-SF-1", "L-SF-2"]] }
];
