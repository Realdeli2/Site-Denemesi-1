// OYUNCU VERİ TABANI
const players = [
  { id: "player_001", name: "Ömür Faik Köse", pos: "ST", ovr: 76, energy: 100, xp: 0, level: 1, playstyle: "Rapid+", stats: { PAC: 90, SHO: 78, PAS: 70, DRI: 76, DEF: 74, PHY: 82 } },
  { id: "player_002", name: "Şaban Efe Turgut", pos: "ST", ovr: 75, energy: 100, xp: 0, level: 1, playstyle: "Power Shot+", stats: { PAC: 79, SHO: 82, PAS: 68, DRI: 74, DEF: 40, PHY: 64 } },
  { id: "player_003", name: "Kaan Berk Kılavuz", pos: "RB", ovr: 74, energy: 100, xp: 0, level: 1, playstyle: "Relentless+", stats: { PAC: 84, SHO: 40, PAS: 64, DRI: 55, DEF: 72, PHY: 80 } },
  { id: "player_004", name: "Poyraz", pos: "GK", ovr: 73, energy: 100, xp: 0, level: 1, playstyle: "Cat+", stats: { DIV: 72, HAN: 74, KIC: 70, REF: 75, SPD: 58, POS: 73 } },
  { id: "player_005", name: "İhsan", pos: "CB", ovr: 72, energy: 100, xp: 0, level: 1, playstyle: "Anticipate+", stats: { PAC: 68, SHO: 62, PAS: 64, DRI: 65, DEF: 75, PHY: 76 } },
  { id: "player_006", name: "Mustafa Kerem Çınar", pos: "CB", ovr: 72, energy: 100, xp: 0, level: 1, playstyle: "Long Ball+", stats: { PAC: 65, SHO: 50, PAS: 65, DRI: 60, DEF: 73, PHY: 75 } },
  { id: "player_007", name: "Kaan Gedik", pos: "CAM", ovr: 72, energy: 100, xp: 0, level: 1, playstyle: "Trickster+", stats: { PAC: 66, SHO: 62, PAS: 67, DRI: 78, DEF: 52, PHY: 65 } },
  { id: "player_008", name: "Mevlüt Can Tok", pos: "CB", ovr: 71, energy: 100, xp: 0, level: 1, playstyle: "Bruiser+", stats: { PAC: 62, SHO: 45, PAS: 58, DRI: 55, DEF: 72, PHY: 75 } },
  { id: "player_009", name: "Ahoora", pos: "GK", ovr: 69, energy: 100, xp: 0, level: 1, playstyle: "Cross Claimer+", stats: { DIV: 54, HAN: 68, KIC: 67, REF: 68, SPD: 60, POS: 71 } },
  { id: "player_010", name: "Azad Yaşar", pos: "GK", ovr: 66, energy: 100, xp: 0, level: 1, playstyle: "Far Throw+", stats: { DIV: 60, HAN: 72, KIC: 58, REF: 65, SPD: 58, POS: 64 } },
  { id: "player_011", name: "Bekir Akdoğan", pos: "ST", ovr: 65, energy: 100, xp: 0, level: 1, playstyle: "Finesse Shot+", stats: { PAC: 52, SHO: 82, PAS: 48, DRI: 62, DEF: 32, PHY: 42 } },
  { id: "player_012", name: "Kağan Bozkurt", pos: "CAM", ovr: 72, energy: 100, xp: 0, level: 1, playstyle: "Incisive Pass+", stats: { PAC: 72, SHO: 68, PAS: 75, DRI: 74, DEF: 50, PHY: 66 } }
];

// SEKME GEÇİŞİ
function initTabs() {
  const navButtons = document.querySelectorAll('.nav-btn');
  
  navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetTab = e.target.getAttribute('data-tab');

      navButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
      });
      document.getElementById(`tab-${targetTab}`).classList.add('active');
    });
  });
}

// 1. KARTLARI ÇİZME
function renderCards(data) {
  const container = document.getElementById('cardContainer');
  if (!container) return;
  container.innerHTML = '';
  
  data.forEach(p => {
    const statsHtml = Object.entries(p.stats)
      .map(([lbl, val]) => `<div class="stat-item"><span class="stat-val">${val}</span><span class="stat-lbl">${lbl}</span></div>`)
      .join('');

    const card = document.createElement('div');
    card.className = 'fc-card';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-header">
          <div class="rating-box">
            <span class="ovr">${p.ovr}</span>
            <span class="pos">${p.pos}</span>
          </div>
        </div>
        <div class="player-name">${p.name}</div>
        <div class="stats-grid">${statsHtml}</div>
        <div class="playstyle">${p.playstyle}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

// 2. ANTRENMAN EKRANI ÇİZME
function renderTraining() {
  const container = document.getElementById('trainingContainer');
  if (!container) return;
  container.innerHTML = '';

  players.forEach(p => {
    const isEnergyLow = p.energy < 25;

    const statBtns = Object.keys(p.stats).map(statKey => `
      <button class="btn-train" ${isEnergyLow ? 'disabled' : ''} onclick="trainPlayer('${p.id}', '${statKey}')">
        +1 ${statKey} (${p.stats[statKey]})
      </button>
    `).join('');

    const card = document.createElement('div');
    card.className = 'training-card';
    card.innerHTML = `
      <div class="t-card-header">
        <span class="t-name">${p.name} (${p.pos})</span>
        <span class="t-badge">OVR ${p.ovr} | Lvl ${p.level}</span>
      </div>

      <div class="bar-container">
        <div class="bar-label"><span>Enerji</span><span>%${p.energy}</span></div>
        <div class="progress-bg"><div class="progress-fill-energy" style="width: ${p.energy}%;"></div></div>
      </div>

      <div class="bar-container">
        <div class="bar-label"><span>XP İlerlemesi</span><span>${p.xp} / 100 XP</span></div>
        <div class="progress-bg"><div class="progress-fill-xp" style="width: ${p.xp}%;"></div></div>
      </div>

      <div class="stat-buttons">${statBtns}</div>
      <button class="btn-rest" onclick="restPlayer('${p.id}')">⚡ Dinlendir (+30 Enerji)</button>
    `;
    container.appendChild(card);
  });
}

// 3. ANTRENMAN İŞLEVİ
function trainPlayer(playerId, statKey) {
  const p = players.find(item => item.id === playerId);
  if (!p) return;

  if (p.energy >= 25) {
    p.stats[statKey] += 1;
    p.energy -= 25;
    p.xp += 35;

    if (p.xp >= 100) {
      p.level += 1;
      p.xp -= 100;
      p.ovr += 1;
    }

    renderTraining();
    renderCards(players);
  }
}

// 4. DİNLENDİRME İŞLEVİ
function restPlayer(playerId) {
  const p = players.find(item => item.id === playerId);
  if (!p) return;

  if (p.energy < 100) {
    p.energy = Math.min(100, p.energy + 30);
    renderTraining();
  }
}

// FİLTRELEME
function filterData() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const selectedPos = document.getElementById('posFilter').value;

  const filtered = players.filter(p => {
    const matchesName = p.name.toLowerCase().includes(query);
    const matchesPos = (selectedPos === 'ALL') || (p.pos === selectedPos);
    return matchesName && matchesPos;
  });

  renderCards(filtered);
}

// SAYFA YÜKLENDİĞİNDE
document.addEventListener("DOMContentLoaded", () => {
  renderCards(players);
  renderTraining();
  initTabs();

  document.getElementById('searchInput').addEventListener('input', filterData);
  document.getElementById('posFilter').addEventListener('change', filterData);
});
   
