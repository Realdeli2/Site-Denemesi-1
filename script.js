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

// Sekme Geçiş Fonksiyonu
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(el => el.classList.remove('active'));
  
  document.getElementById(`tab-${tabName}`).classList.add('active');
  event.target.classList.add('active');
}

