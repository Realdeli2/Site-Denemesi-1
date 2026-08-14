const defaultPlayers = [
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

let players = JSON.parse(localStorage.getItem('pelitlibag_players')) || defaultPlayers;
let activeTrainings = JSON.parse(localStorage.getItem('pelitlibag_trainings')) || {};
let lastRestTimes = JSON.parse(localStorage.getItem('pelitlibag_rest_times')) || {};

function saveAll() {
  localStorage.setItem('pelitlibag_players', JSON.stringify(players));
  localStorage.setItem('pelitlibag_trainings', JSON.stringify(activeTrainings));
  localStorage.setItem('pelitlibag_rest_times', JSON.stringify(lastRestTimes));
}

function getSortedPlayers(data) {
  return [...data].sort((a, b) => b.ovr - a.ovr);
}

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

function renderCards(data) {
  const container = document.getElementById('cardContainer');
  if (!container) return;
  container.innerHTML = '';
  
  getSortedPlayers(data).forEach(p => {
    const statsHtml = Object.entries(p.stats)
      .map(([lbl, val]) => `<div class="stat-item"><span class="stat-val">${val}</span><span class="stat-lbl">${lbl}</span></div>`)
      .join('');

    const card = document.createElement('div');
    card.className = 'fc-card';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-header">
          <div class="rating-box"><span class="ovr">${p.ovr}</span><span class="pos">${p.pos}</span></div>
        </div>
        <div class="player-name">${p.name}</div>
        <div class="stats-grid">${statsHtml}</div>
        <div class="playstyle">${p.playstyle}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

const trainingCategories = [
  { id: "st", title: "🎯 Forvet Antrenmanları", drills: [{ key: "SHO", name: "Şut Çalışması" }, { key: "PAC", name: "Hız Antrenmanı" }, { key: "DRI", name: "Bitiricilik / Dribbling" }] },
  { id: "cb", title: "🛡️ Defans Antrenmanları", drills: [{ key: "DEF", name: "Kafa Çalışması / Pozisyon" }, { key: "PHY", name: "Güç ve Müdahale" }] },
  { id: "cam", title: "⚡ Orta Saha Antrenmanları", drills: [{ key: "PAS", name: "Pas ve Vizyon" }, { key: "DRI", name: "Top Kontrolü" }] },
  { id: "phy", title: "💪 Fizik ve Kondisyon", drills: [{ key: "PHY", name: "Dayanıklılık" }, { key: "PAC", name: "Sprint Çalışması" }] }
];

function renderTraining() {
  const container = document.getElementById('trainingContainer');
  if (!container) return;
  container.innerHTML = '';

  trainingCategories.forEach(cat => {
    const drillsHtml = cat.drills.map(drill => {
      const trainKey = `${cat.id}_${drill.key}`;
      const ongoing = activeTrainings[trainKey];
      let controlHtml = '';

      if (ongoing) {
        const remaining = Math.max(0, Math.ceil((ongoing.endTime - Date.now()) / 1000));
        if (remaining > 0) {
          controlHtml = `<span class="timer-text">⏳ Süre: ${Math.floor(remaining/60)}m ${remaining%60}s (${ongoing.playerName})</span>`;
        } else {
          // Süre bitti, verimi yükle
          completeTraining(trainKey);
        }
      } else {
        const options = getSortedPlayers(players).map(p => `<option value="${p.id}">${p.name} (${p.pos})</option>`).join('');
        controlHtml = `
          <div class="train-controls">
            <select id="select_${trainKey}">${options}</select>
            <button class="btn-train" onclick="startTraining('${cat.id}', '${drill.key}')">Başlat</button>
          </div>
        `;
      }

      return `
        <div class="sub-train-item">
          <span class="sub-train-title">${drill.name} (+1 ${drill.key})</span>
          <div id="control_${trainKey}">${controlHtml}</div>
        </div>
      `;
    }).join('');

    const card = document.createElement('div');
    card.className = 'training-card';
    card.innerHTML = `<div class="t-card-header">${cat.title}</div>${drillsHtml}`;
    container.appendChild(card);
  });

  // Oyuncu dinlendirme listesi ayrı bir kartta
  renderRestCard();
}

function renderRestCard() {
  const container = document.getElementById('trainingContainer');
  const sorted = getSortedPlayers(players);
  const now = Date.now();

  const restRows = sorted.map(p => {
    const lastTime = lastRestTimes[p.id] || 0;
    const diff = now - lastTime;
    const cooldown = 60 * 60 * 1000; // 1 saat
    const canRest = diff >= cooldown;
    const remainingTime = Math.ceil((cooldown - diff) / 1000 / 60);

    return `
      <div style="display: flex; justify-content: space-between; align-items: center; background: #1a1f29; padding: 8px; border-radius: 6px; margin-bottom: 6px;">
        <div>
          <span style="font-weight:600;">${p.name}</span> <span style="font-size:0.8rem; color:#aaa;">(Enerji: %${p.energy})</span>
        </div>
        <div>
          ${canRest ? `<button class="btn-rest" onclick="restPlayer('${p.id}')">Dinlendir (+25)</button>` : `<span class="timer-text">${remainingTime} dk sonra</span>`}
        </div>
      </div>
    `;
  }).join('');

  const restCard = document.createElement('div');
  restCard.className = 'training-card';
  restCard.innerHTML = `<div class="t-card-header">⚡ Oyuncu Dinlendirme (1 Saatte +25 Enerji)</div><div style="max-height:250px; overflow-y:auto;">${restRows}</div>`;
  container.appendChild(restCard);
}

function startTraining(catId, statKey) {
  const trainKey = `${catId}_${statKey}`;
  const selectElem = document.getElementById(`select_${trainKey}`);
  const playerId = selectElem.value;
  const p = players.find(x => x.id === playerId);

  if (!p) return;
  if (p.energy < 25) {
    alert("Oyuncunun enerjisi yetersiz! En az 25 enerji gerekiyor.");
    return;
  }

  p.energy -= 25;
  activeTrainings[trainKey] = {
    playerId: p.id,
    playerName: p.name,
    statKey: statKey,
    endTime: Date.now() + (10 * 60 * 1000) // 10 dakika
  };

  saveAll();
  renderTraining();
  renderCards(players);
}

function completeTraining(trainKey) {
  const data = activeTrainings[trainKey];
  if (!data) return;

  const p = players.find(x => x.id === data.playerId);
  if (p) {
    p.stats[data.statKey] = (p.stats[data.statKey] || 50) + 1;
    p.xp += 40;
    if (p.xp >= 100) {
      p.level += 1;
      p.xp -= 100;
      p.ovr += 1;
    }
  }

  delete activeTrainings[trainKey];
  saveAll();
  renderTraining();
  renderCards(players);
}

function restPlayer(playerId) {
  const p = players.find(x => x.id === playerId);
  if (!p) return;

  p.energy = Math.min(100, p.energy + 25);
  lastRestTimes[playerId] = Date.now();
  saveAll();
  renderTraining();
}

function playMatch() {
  const resultDiv = document.getElementById('matchResult');
  const goalsFor = Math.floor(Math.random() * 4);
  const goalsAgainst = Math.floor(Math.random() * 3);
  
  if (goalsFor > goalsAgainst) {
    resultDiv.innerHTML = `🎉 Tebrikler! Maçı Kazandınız: Pelitlibağ FC ${goalsFor} - ${goalsAgainst} Rakip`;
  } else if (goalsFor === goalsAgainst) {
    resultDiv.innerHTML = `🤝 Berabere Bitti: Pelitlibağ FC ${goalsFor} - ${goalsAgainst} Rakip`;
  } else {
    resultDiv.innerHTML = `❌ Mağlubiyet: Pelitlibağ FC ${goalsFor} - ${goalsAgainst} Rakip`;
  }
}

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

document.addEventListener("DOMContentLoaded", () => {
  renderCards(players);
  renderTraining();
  initTabs();

  document.getElementById('searchInput').addEventListener('input', filterData);
  document.getElementById('posFilter').addEventListener('change', filterData);

  // Her saniye arayüzdeki zamanlayıcıları güncelle
  setInterval(() => {
    if (document.getElementById('tab-training').classList.contains('active')) {
      renderTraining();
    }
  }, 1000);
});
    
