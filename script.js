const players = [
  { id: "player_001", name: "Ömür Faik Köse", pos: "ST", ovr: 76, stats: { PAC: 90, SHO: 78, PAS: 70, DRI: 76, DEF: 74, PHY: 82 }, playstyle: "Rapid+" },
  { id: "player_002", name: "Şaban Efe Turgut", pos: "ST", ovr: 75, stats: { PAC: 79, SHO: 82, PAS: 68, DRI: 74, DEF: 40, PHY: 64 }, playstyle: "Power Shot+" },
  { id: "player_003", name: "Kaan Berk Kılavuz", pos: "RB", ovr: 74, stats: { PAC: 84, SHO: 40, PAS: 64, DRI: 55, DEF: 72, PHY: 80 }, playstyle: "Relentless+" },
  { id: "player_004", name: "Poyraz", pos: "GK", ovr: 73, stats: { DIV: 72, HAN: 74, KIC: 70, REF: 75, SPD: 58, POS: 73 }, playstyle: "Cat+" },
  { id: "player_005", name: "İhsan", pos: "CB", ovr: 72, stats: { PAC: 68, SHO: 62, PAS: 64, DRI: 65, DEF: 75, PHY: 76 }, playstyle: "Anticipate+" },
  { id: "player_006", name: "Mustafa Kerem Çınar", pos: "CB", ovr: 72, stats: { PAC: 65, SHO: 50, PAS: 65, DRI: 60, DEF: 73, PHY: 75 }, playstyle: "Long Ball+" },
  { id: "player_007", name: "Kaan Gedik", pos: "CAM", ovr: 72, stats: { PAC: 66, SHO: 62, PAS: 67, DRI: 78, DEF: 52, PHY: 65 }, playstyle: "Trickster+" },
  { id: "player_008", name: "Mevlüt Can Tok", pos: "CB", ovr: 71, stats: { PAC: 62, SHO: 45, PAS: 58, DRI: 55, DEF: 72, PHY: 75 }, playstyle: "Bruiser+" },
  { id: "player_009", name: "Ahoora", pos: "GK", ovr: 69, stats: { DIV: 54, HAN: 68, KIC: 67, REF: 68, SPD: 60, POS: 71 }, playstyle: "Cross Claimer+" },
  { id: "player_010", name: "Azad Yaşar", pos: "GK", ovr: 66, stats: { DIV: 60, HAN: 72, KIC: 58, REF: 65, SPD: 58, POS: 64 }, playstyle: "Far Throw+" },
  { id: "player_011", name: "Bekir Akdoğan", pos: "ST", ovr: 65, stats: { PAC: 52, SHO: 82, PAS: 48, DRI: 62, DEF: 32, PHY: 42 }, playstyle: "Finesse Shot+" }
];

const container = document.getElementById('cardContainer');
const searchInput = document.getElementById('searchInput');
const posFilter = document.getElementById('posFilter');

function renderCards(data) {
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

function filterData() {
  const query = searchInput.value.toLowerCase();
  const selectedPos = posFilter.value;

  const filtered = players.filter(p => {
    const matchesName = p.name.toLowerCase().includes(query);
    const matchesPos = selectedPos === 'ALL' || p.pos === selectedPos;
    return matchesName && matchesPos;
  });

  renderCards(filtered);
}

searchInput.addEventListener('input', filterData);
posFilter.addEventListener('change', filterData);
const players = [
  { 
    id: "player_001", 
    name: "Ömür Faik Köse", 
    pos: "ST", 
    ovr: 76, 
    stats: { PAC: 90, SHO: 78, PAS: 70, DRI: 76, DEF: 74, PHY: 82 }, 
    playstyle: "Rapid+", 
    isLocked: false, 
    energy: 100,
    level: 1 
  },
  { 
    id: "player_012", 
    name: "Özel Efsane Oyuncu", 
    pos: "CAM", 
    ovr: 88, 
    stats: { PAC: 85, SHO: 86, PAS: 88, DRI: 89, DEF: 60, PHY: 75 }, 
    playstyle: "Master+", 
    isLocked: true, // KİLİTLİ OYUNCI
    unlockRequirement: "5 Antrenman Tamamla",
    energy: 100,
    level: 1 
  }
  // Diğer oyuncular...
];
      
// Sayfa yüklendiğinde kartları bas
renderCards(players);
   // Antrenman Yaptırma Fonksiyonu
function trainPlayer(playerId, statToImprove) {
  const player = players.find(p => p.id === playerId);
  
  if (!player || player.isLocked) return;
  
  if (player.energy >= 20) {
    player.stats[statToImprove] += 1; // İstatistiği artır
    player.energy -= 20;              // Enerjiyi düşür
    
    // Genel Reytingi Yeniden Hesapla
    updateOverallRating(player);
    alert(`${player.name} oyuncusunun ${statToImprove} değeri +1 arttı!`);
    renderTraining();
  } else {
    alert("Oyuncunun enerjisi çok düşük! Dinlendirmelisin.");
  }
}
// 1. Oyuncu Veri Tabanı (Gelişmiş Format)
const players = [
  { id: "player_001", name: "Ömür Faik Köse", pos: "ST", ovr: 76, energy: 100, xp: 0, level: 1, stats: { PAC: 90, SHO: 78, PAS: 70, DRI: 76, DEF: 74, PHY: 82 } },
  { id: "player_002", name: "Şaban Efe Turgut", pos: "ST", ovr: 75, energy: 100, xp: 0, level: 1, stats: { PAC: 79, SHO: 82, PAS: 68, DRI: 74, DEF: 40, PHY: 64 } },
  { id: "player_003", name: "Kaan Berk Kılavuz", pos: "RB", ovr: 74, energy: 100, xp: 0, level: 1, stats: { PAC: 84, SHO: 40, PAS: 64, DRI: 55, DEF: 72, PHY: 80 } },
  { id: "player_004", name: "Poyraz", pos: "GK", ovr: 73, energy: 100, xp: 0, level: 1, stats: { DIV: 72, HAN: 74, KIC: 70, REF: 75, SPD: 58, POS: 73 } },
  { id: "player_005", name: "İhsan", pos: "CB", ovr: 72, energy: 100, xp: 0, level: 1, stats: { PAC: 68, SHO: 62, PAS: 64, DRI: 65, DEF: 75, PHY: 76 } },
  { id: "player_006", name: "Mustafa Kerem Çınar", pos: "CB", ovr: 72, energy: 100, xp: 0, level: 1, stats: { PAC: 65, SHO: 50, PAS: 65, DRI: 60, DEF: 73, PHY: 75 } },
  { id: "player_007", name: "Kaan Gedik", pos: "CAM", ovr: 72, energy: 100, xp: 0, level: 1, stats: { PAC: 66, SHO: 62, PAS: 67, DRI: 78, DEF: 52, PHY: 65 } },
  { id: "player_008", name: "Mevlüt Can Tok", pos: "CB", ovr: 71, energy: 100, xp: 0, level: 1, stats: { PAC: 62, SHO: 45, PAS: 58, DRI: 55, DEF: 72, PHY: 75 } },
  { id: "player_009", name: "Ahoora", pos: "GK", ovr: 69, energy: 100, xp: 0, level: 1, stats: { DIV: 54, HAN: 68, KIC: 67, REF: 68, SPD: 60, POS: 71 } },
  { id: "player_010", name: "Azad Yaşar", pos: "GK", ovr: 66, energy: 100, xp: 0, level: 1, stats: { DIV: 60, HAN: 72, KIC: 58, REF: 65, SPD: 58, POS: 64 } },
  { id: "player_011", name: "Bekir Akdoğan", pos: "ST", ovr: 65, energy: 100, xp: 0, level: 1, stats: { PAC: 52, SHO: 82, PAS: 48, DRI: 62, DEF: 32, PHY: 42 } }
];

// 2. Antrenman Ekranını Çizen Fonksiyon
function renderTraining() {
  const container = document.getElementById('trainingContainer');
  if (!container) return;
  container.innerHTML = '';

  players.forEach(p => {
    const isEnergyLow = p.energy < 25;

    // Stat Butonları HTML
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

      <!-- Enerji BARI -->
      <div class="bar-container">
        <div class="bar-label">
          <span>Enerji</span>
          <span>%${p.energy}</span>
        </div>
        <div class="progress-bg">
          <div class="progress-fill-energy" style="width: ${p.energy}%;"></div>
        </div>
      </div>

      <!-- XP BARI -->
      <div class="bar-container">
        <div class="bar-label">
          <span>XP (Seviye İlerlemesi)</span>
          <span>${p.xp} / 100 XP</span>
        </div>
        <div class="progress-bg">
          <div class="progress-fill-xp" style="width: ${p.xp}%;"></div>
        </div>
      </div>

      <!-- Çalıştırılacak İstatistikler -->
      <div class="stat-buttons">
        ${statBtns}
      </div>

      <!-- Dinlendir Butonu -->
      <button class="btn-rest" onclick="restPlayer('${p.id}')">⚡ Dinlendir (+30 Enerji)</button>
    `;

    container.appendChild(card);
  });
}

// 3. Antrenman Yapma Mantığı
function trainPlayer(playerId, statKey) {
  const p = players.find(item => item.id === playerId);
  if (!p) return;

  if (p.energy >= 25) {
    p.stats[statKey] += 1; // İstatistiği artır
    p.energy -= 25;        // Enerjiyi düşür
    p.xp += 35;            // XP ekle

    // Seviye Atlama Kontrolü (100 XP üzeri)
    if (p.xp >= 100) {
      p.level += 1;
      p.xp = p.xp - 100;
      p.ovr += 1; // Seviye atlayınca Genel Reyting +1 artar!
    }

    renderTraining(); // Ekranı güncelle
    if (typeof renderCards === "function") renderCards(players); // Kartlar sekmesini de güncelle
  }
}

// 4. Dinlendirme Mantığı
function restPlayer(playerId) {
  const p = players.find(item => item.id === playerId);
  if (!p) return;

  if (p.energy < 100) {
    p.energy = Math.min(100, p.energy + 30); // Max 100 olabilir
    renderTraining();
  }
}

// Sayfa yüklendiğinde Antrenman Modülünü Çalıştır
document.addEventListener("DOMContentLoaded", () => {
  renderTraining();
});

// Sekme Geçiş Fonksiyonu
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById(`tab-${tabName}`).classList.add('active');
  event.target.classList.add('active');
}

