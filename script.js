// 45 OYUNCULUK GENİŞLETİLMİŞ HAVUZ (Ömür 76 reyting ile en başta)
const masterPlayerPool = [
  { id: "p_1", name: "Ömür Faik Köse", pos: "ST", ovr: 76, playstyle: "Rapid+", stats: { PAC: 90, SHO: 78, PAS: 70, DRI: 76, DEF: 74, PHY: 82 } },
  { id: "p_2", name: "Şaban Efe Turgut", pos: "ST", ovr: 75, playstyle: "Power Shot+", stats: { PAC: 79, SHO: 82, PAS: 68, DRI: 74, DEF: 40, PHY: 64 } },
  { id: "p_3", name: "Kaan Berk Kılavuz", pos: "RB", ovr: 74, playstyle: "Relentless+", stats: { PAC: 84, SHO: 40, PAS: 64, DRI: 55, DEF: 72, PHY: 80 } },
  { id: "p_4", name: "Poyraz", pos: "GK", ovr: 73, playstyle: "Cat+", stats: { DIV: 72, HAN: 74, KIC: 70, REF: 75, SPD: 58, POS: 73 } },
  { id: "p_5", name: "İhsan", pos: "CB", ovr: 72, playstyle: "Anticipate+", stats: { PAC: 68, SHO: 62, PAS: 64, DRI: 65, DEF: 75, PHY: 76 } },
  { id: "p_6", name: "Mustafa Kerem Çınar", pos: "CB", ovr: 72, playstyle: "Long Ball+", stats: { PAC: 65, SHO: 50, PAS: 65, DRI: 60, DEF: 73, PHY: 75 } },
  { id: "p_7", name: "Kaan Gedik", pos: "CAM", ovr: 72, playstyle: "Trickster+", stats: { PAC: 66, SHO: 62, PAS: 67, DRI: 78, DEF: 52, PHY: 65 } },
  { id: "p_8", name: "Kağan Bozkurt", pos: "CAM", ovr: 72, playstyle: "Incisive Pass+", stats: { PAC: 72, SHO: 68, PAS: 75, DRI: 74, DEF: 50, PHY: 66 } },
  { id: "p_9", name: "Mevlüt Can Tok", pos: "CB", ovr: 71, playstyle: "Bruiser+", stats: { PAC: 62, SHO: 45, PAS: 58, DRI: 55, DEF: 72, PHY: 75 } },
  { id: "p_10", name: "Ahoora", pos: "GK", ovr: 69, playstyle: "Cross Claimer+", stats: { DIV: 54, HAN: 68, KIC: 67, REF: 68, SPD: 60, POS: 71 } },
  { id: "p_11", name: "Azad Yaşar", pos: "GK", ovr: 66, playstyle: "Far Throw+", stats: { DIV: 60, HAN: 72, KIC: 58, REF: 65, SPD: 58, POS: 64 } },
  { id: "p_12", name: "Bekir Akdoğan", pos: "ST", ovr: 65, playstyle: "Finesse Shot+", stats: { PAC: 52, SHO: 82, PAS: 48, DRI: 62, DEF: 32, PHY: 42 } },
  { id: "p_13", name: "Emre Can", pos: "CAM", ovr: 68, playstyle: "Playmaker", stats: { PAC: 68, SHO: 60, PAS: 70, DRI: 70, DEF: 45, PHY: 60 } },
  { id: "p_14", name: "Burak Yılmaz", pos: "ST", ovr: 67, playstyle: "Poacher", stats: { PAC: 70, SHO: 71, PAS: 50, DRI: 63, DEF: 30, PHY: 65 } },
  { id: "p_15", name: "Ahmet Demir", pos: "CB", ovr: 67, playstyle: "Stopper", stats: { PAC: 58, SHO: 40, PAS: 52, DRI: 50, DEF: 70, PHY: 74 } },
  { id: "p_16", name: "Mehmet Kaya", pos: "RB", ovr: 66, playstyle: "Engine", stats: { PAC: 75, SHO: 45, PAS: 58, DRI: 60, DEF: 63, PHY: 68 } },
  { id: "p_17", name: "Berkay Şen", pos: "GK", ovr: 65, playstyle: "Wall", stats: { DIV: 64, HAN: 66, KIC: 60, REF: 67, SPD: 50, POS: 65 } },
  { id: "p_18", name: "Oğuzhan Koç", pos: "CAM", ovr: 65, playstyle: "Vision", stats: { PAC: 62, SHO: 63, PAS: 68, DRI: 66, DEF: 40, PHY: 58 } },
  { id: "p_19", name: "Volkan Demirel", pos: "GK", ovr: 64, playstyle: "Keeper", stats: { DIV: 62, HAN: 65, KIC: 62, REF: 64, SPD: 48, POS: 64 } },
  { id: "p_20", name: "Serdar Aziz", pos: "CB", ovr: 64, playstyle: "Brawler", stats: { PAC: 55, SHO: 38, PAS: 50, DRI: 48, DEF: 68, PHY: 72 } },
  { id: "p_21", name: "Cenk Tosun", pos: "ST", ovr: 64, playstyle: "Striker", stats: { PAC: 63, SHO: 68, PAS: 52, DRI: 60, DEF: 30, PHY: 66 } },
  { id: "p_22", name: "Hakan Çalhanoğlu", pos: "CAM", ovr: 63, playstyle: "Deadball", stats: { PAC: 60, SHO: 66, PAS: 70, DRI: 64, DEF: 45, PHY: 56 } },
  { id: "p_23", name: "Uğurcan Çakır", pos: "GK", ovr: 63, playstyle: "Reflex", stats: { DIV: 61, HAN: 63, KIC: 59, REF: 65, SPD: 52, POS: 62 } },
  { id: "p_24", name: "Merih Demiral", pos: "CB", ovr: 63, playstyle: "Aggressive", stats: { PAC: 60, SHO: 35, PAS: 48, DRI: 46, DEF: 67, PHY: 73 } },
  { id: "p_25", name: "Kerem Aktürkoğlu", pos: "ST", ovr: 62, playstyle: "Winger", stats: { PAC: 78, SHO: 60, PAS: 55, DRI: 68, DEF: 32, PHY: 52 } },
  { id: "p_26", name: "Barış Alper", pos: "RB", ovr: 62, playstyle: "Power", stats: { PAC: 76, SHO: 52, PAS: 54, DRI: 62, DEF: 58, PHY: 70 } },
  { id: "p_27", name: "Salih Uçan", pos: "CAM", ovr: 62, playstyle: "Technique", stats: { PAC: 60, SHO: 56, PAS: 65, DRI: 64, DEF: 48, PHY: 58 } },
  { id: "p_28", name: "Mert Müldür", pos: "RB", ovr: 61, playstyle: "Fener", stats: { PAC: 72, SHO: 42, PAS: 56, DRI: 58, DEF: 60, PHY: 64 } },
  { id: "p_29", name: "Abdülkerim", pos: "CB", ovr: 61, playstyle: "Leader", stats: { PAC: 54, SHO: 40, PAS: 55, DRI: 50, DEF: 64, PHY: 68 } },
  { id: "p_30", name: "İrfan Can", pos: "CAM", ovr: 61, playstyle: "Finesse", stats: { PAC: 62, SHO: 64, PAS: 63, DRI: 63, DEF: 42, PHY: 56 } },
  { id: "p_31", name: "Arda Güler", pos: "CAM", ovr: 60, playstyle: "Maestro", stats: { PAC: 65, SHO: 62, PAS: 66, DRI: 68, DEF: 38, PHY: 50 } },
  { id: "p_32", name: "Kenan Yıldız", pos: "ST", ovr: 60, playstyle: "Prospect", stats: { PAC: 72, SHO: 60, PAS: 50, DRI: 65, DEF: 30, PHY: 55 } },
  { id: "p_33", name: "Ferdi Kadıoğlu", pos: "RB", ovr: 60, playstyle: "Versatile", stats: { PAC: 74, SHO: 50, PAS: 60, DRI: 66, DEF: 58, PHY: 62 } },
  { id: "p_34", name: "Altay Bayındır", pos: "GK", ovr: 59, playstyle: "Saver", stats: { DIV: 58, HAN: 60, KIC: 56, REF: 60, SPD: 48, POS: 59 } },
  { id: "p_35", name: "Orkun Kökçü", pos: "CAM", ovr: 59, playstyle: "Box2Box", stats: { PAC: 62, SHO: 58, PAS: 62, DRI: 60, DEF: 46, PHY: 60 } },
  { id: "p_36", name: "Zeki Çelik", pos: "RB", ovr: 59, playstyle: "Solid", stats: { PAC: 68, SHO: 38, PAS: 54, DRI: 55, DEF: 60, PHY: 63 } },
  { id: "p_37", name: "Samet Akaydin", pos: "CB", ovr: 58, playstyle: "Hardman", stats: { PAC: 52, SHO: 30, PAS: 45, DRI: 42, DEF: 62, PHY: 66 } },
  { id: "p_38", name: "Yusuf Yazıcı", pos: "CAM", ovr: 58, playstyle: "Shooter", stats: { PAC: 60, SHO: 62, PAS: 58, DRI: 58, DEF: 38, PHY: 54 } },
  { id: "p_39", name: "Rıdvan Yılmaz", pos: "RB", ovr: 58, playstyle: "Runner", stats: { PAC: 72, SHO: 40, PAS: 52, DRI: 58, DEF: 54, PHY: 56 } },
  { id: "p_40", name: "Doğan Alemdar", pos: "GK", ovr: 57, playstyle: "YoungGK", stats: { DIV: 56, HAN: 58, KIC: 52, REF: 58, SPD: 45, POS: 57 } },
  { id: "p_41", name: "Emre Mor", pos: "ST", ovr: 57, playstyle: "Dribbler", stats: { PAC: 75, SHO: 52, PAS: 48, DRI: 68, DEF: 25, PHY: 46 } },
  { id: "p_42", name: "Ahmet Can", pos: "CB", ovr: 57, playstyle: "Defender", stats: { PAC: 52, SHO: 30, PAS: 44, DRI: 40, DEF: 60, PHY: 64 } },
  { id: "p_43", name: "Berke Özer", pos: "GK", ovr: 56, playstyle: "ShotStopper", stats: { DIV: 55, HAN: 56, KIC: 50, REF: 57, SPD: 44, POS: 56 } },
  { id: "p_44", name: "Gökhan Gönül", pos: "RB", ovr: 56, playstyle: "Veteran", stats: { PAC: 62, SHO: 40, PAS: 55, DRI: 52, DEF: 58, PHY: 60 } },
  { id: "p_45", name: "Umut Nayır", pos: "ST", ovr: 55, playstyle: "TargetMan", stats: { PAC: 58, SHO: 58, PAS: 42, DRI: 50, DEF: 30, PHY: 65 } }
];

let userData = JSON.parse(localStorage.getItem('pelitlibag_user')) || null;
let players = JSON.parse(localStorage.getItem('pelitlibag_players')) || [];
let activeTrainings = JSON.parse(localStorage.getItem('pelitlibag_trainings')) || {};
let lastRestTimes = JSON.parse(localStorage.getItem('pelitlibag_rest_times')) || {};
let currentLineup = JSON.parse(localStorage.getItem('pelitlibag_lineup')) || { st: "", mid: "", def: "", gk: "", captain: "" };
let matchHistory = JSON.parse(localStorage.getItem('pelitlibag_history')) || [];
let leagueTable = JSON.parse(localStorage.getItem('pelitlibag_league')) || [
  { rank: 1, name: "Pelitlibağ FK", p: 0, w: 0, d: 0, l: 0, pts: 0 },
  { rank: 2, name: "Pamukkalespor", p: 0, w: 0, d: 0, l: 0, pts: 0 },
  { rank: 3, name: "Denizli İdman Yurdu", p: 0, w: 0, d: 0, l: 0, pts: 0 },
  { rank: 4, name: "Kaleiçi FK", p: 0, w: 0, d: 0, l: 0, pts: 0 }
];

function saveAll() {
  localStorage.setItem('pelitlibag_user', JSON.stringify(userData));
  localStorage.setItem('pelitlibag_players', JSON.stringify(players));
  localStorage.setItem('pelitlibag_trainings', JSON.stringify(activeTrainings));
  localStorage.setItem('pelitlibag_rest_times', JSON.stringify(lastRestTimes));
  localStorage.setItem('pelitlibag_lineup', JSON.stringify(currentLineup));
  localStorage.setItem('pelitlibag_history', JSON.stringify(matchHistory));
  localStorage.setItem('pelitlibag_league', JSON.stringify(leagueTable));
}

// HESAP OLUŞTURMA
function createAccount() {
  const managerInput = document.getElementById('managerNameInput');
  const teamInput = document.getElementById('teamNameInput');

  if (!managerInput || !teamInput) return;

  const manager = managerInput.value.trim();
  const team = teamInput.value.trim();

  if(!manager || !team) {
    alert("Lütfen menajer adı ve takım adını giriniz!");
    return;
  }

  userData = { managerName: manager, teamName: team, coins: 600 };
  
  players = masterPlayerPool.slice(0, 12).map(p => ({
    ...p,
    energy: 100,
    xp: 0,
    level: 1,
    matchesPlayed: 0,
    goalsScored: 0,
    injured: false
  }));

  // Lig tablosundaki varsayılan ismi kullanıcının takımıyla güncelle
  leagueTable[0].name = team;

  saveAll();
  initGameSession();
}

function initGameSession() {
  if(!userData) return;
  
  const authModal = document.getElementById('authModal');
  const mainHeader = document.getElementById('mainHeader');
  
  if(authModal) authModal.style.display = 'none';
  if(mainHeader) mainHeader.style.display = 'block';

  const mNameElem = document.getElementById('displayManager');
  const tNameElem = document.getElementById('displayTeamName');
  const cCoinsElem = document.getElementById('displayCoins');

  if(mNameElem) mNameElem.innerText = `Menajer: ${userData.managerName}`;
  if(tNameElem) tNameElem.innerText = userData.teamName.toUpperCase();
  if(cCoinsElem) cCoinsElem.innerText = userData.coins;

  renderCards(players);
  renderTraining();
  renderLeagueTable();
  renderMatchHistory();
  initTabs();
}

document.addEventListener("DOMContentLoaded", () => {
  if(userData) {
    initGameSession();
  }

  const sInput = document.getElementById('searchInput');
  const pFilter = document.getElementById('posFilter');
  if(sInput) sInput.addEventListener('input', filterData);
  if(pFilter) pFilter.addEventListener('change', filterData);

  setInterval(() => {
    const trainingTab = document.getElementById('tab-training');
    if (trainingTab && trainingTab.classList.contains('active')) {
      renderTraining();
    }
  }, 1000);
});

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
      const targetSec = document.getElementById(`tab-${targetTab}`);
      if(targetSec) targetSec.classList.add('active');
      
      if(targetTab === 'lineup') {
        renderLineup();
      } else if(targetTab === 'league') {
        renderLeagueTable();
      }
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
        <div class="player-sub-info">Maç: ${p.matchesPlayed || 0} | Gol: ${p.goalsScored || 0} ${p.injured ? ' | 🚑 Sakat' : ''}</div>
        <div class="stats-grid">${statsHtml}</div>
        <div class="playstyle">${p.playstyle}</div>
      </div>
    `;
    container.appendChild(card);
  });
}

function openPlayerPack() {
  if(userData.coins < 100) {
    alert("Yetersiz Coin! Paket açmak için 100 coin gerekiyor.");
    return;
  }

  userData.coins -= 100;
  const coinElem = document.getElementById('displayCoins');
  if(coinElem) coinElem.innerText = userData.coins;

  const packResults = [];
  for(let i = 0; i < 50; i++) {
    const randomTemplate = masterPlayerPool[Math.floor(Math.random() * masterPlayerPool.length)];
    const newCard = {
      ...randomTemplate,
      id: 'pack_' + Math.random().toString(36).substring(2, 9),
      energy: 100,
      xp: 0,
      level: 1,
      matchesPlayed: 0,
      goalsScored: 0,
      injured: false
    };
    players.push(newCard);
    packResults.push(newCard);
  }

  saveAll();
  renderCards(players);
  renderTraining();

  const resContainer = document.getElementById('packResultContainer');
  if(!resContainer) return;
  resContainer.innerHTML = `<h3 style="grid-column: 1/-1; color: #e5b350; text-align:center;">🎁 Paket Açıldı! 50 Yeni Kart Kadroya Eklendi (En iyiler aşağıda)</h3>`;
  
  getSortedPlayers(packResults).slice(0, 8).forEach(p => {
    const statsHtml = Object.entries(p.stats)
      .map(([lbl, val]) => `<div class="stat-item"><span class="stat-val">${val}</span><span class="stat-lbl">${lbl}</span></div>`)
      .join('');
    const card = document.createElement('div');
    card.className = 'fc-card';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-header"><div class="rating-box"><span class="ovr">${p.ovr}</span><span class="pos">${p.pos}</span></div></div>
        <div class="player-name">${p.name}</div>
        <div class="stats-grid">${statsHtml}</div>
        <div class="playstyle">${p.playstyle}</div>
      </div>
    `;
    resContainer.appendChild(card);
  });
}

function renderLineup() {
  const container = document.getElementById('lineupContainer');
  if (!container) return;

  const sorted = getSortedPlayers(players);
  const stOptions = sorted.filter(p => p.pos === 'ST').map(p => `<option value="${p.id}" ${currentLineup.st === p.id ? 'selected' : ''}>${p.name} (ST - ${p.ovr})</option>`).join('');
  const midOptions = sorted.filter(p => p.pos === 'CAM').map(p => `<option value="${p.id}" ${currentLineup.mid === p.id ? 'selected' : ''}>${p.name} (CAM - ${p.ovr})</option>`).join('');
  const defOptions = sorted.filter(p => p.pos === 'CB' || p.pos === 'RB').map(p => `<option value="${p.id}" ${currentLineup.def === p.id ? 'selected' : ''}>${p.name} (${p.pos} - ${p.ovr})</option>`).join('');
  const gkOptions = sorted.filter(p => p.pos === 'GK').map(p => `<option value="${p.id}" ${currentLineup.gk === p.id ? 'selected' : ''}>${p.name} (GK - ${p.ovr})</option>`).join('');
  
  const allLineupPlayers = [currentLineup.st, currentLineup.mid, currentLineup.def, currentLineup.gk].filter(Boolean);
  const captainOptions = allLineupPlayers.map(id => {
    const pl = players.find(x => x.id === id);
    return pl ? `<option value="${pl.id}" ${currentLineup.captain === pl.id ? 'selected' : ''}>⭐ ${pl.name} (${pl.pos})</option>` : '';
  }).join('');

  container.innerHTML = `
    <div style="width: 100%; text-align: center;">
      <label style="font-size:0.85rem; color:#aaa;">Forvet Seçimi</label>
      <select id="lineup_st" class="lineup-select" onchange="updateLineup()"><option value="">Seçiniz...</option>${stOptions}</select>
    </div>
    <div style="width: 100%; text-align: center;">
      <label style="font-size:0.85rem; color:#aaa;">Orta Saha Seçimi</label>
      <select id="lineup_mid" class="lineup-select" onchange="updateLineup()"><option value="">Seçiniz...</option>${midOptions}</select>
    </div>
    <div style="width: 100%; text-align: center;">
      <label style="font-size:0.85rem; color:#aaa;">Stoper / Defans Seçimi</label>
      <select id="lineup_def" class="lineup-select" onchange="updateLineup()"><option value="">Seçiniz...</option>${defOptions}</select>
    </div>
    <div style="width: 100%; text-align: center;">
      <label style="font-size:0.85rem; color:#aaa;">Kaleci Seçimi</label>
      <select id="lineup_gk" class="lineup-select" onchange="updateLineup()"><option value="">Seçiniz...</option>${gkOptions}</select>
    </div>
    <div style="width: 100%; text-align: center; border-top: 1px solid #2a3142; padding-top: 10px;">
      <label style="font-size:0.85rem; color:#e5b350; font-weight:700;">Takım Kaptanı Seçimi (+2 OVR Bonus)</label>
      <select id="lineup_captain" class="lineup-select" onchange="updateLineup()"><option value="">Önce İlk 4'ü kurun...</option>${captainOptions}</select>
    </div>
  `;

  calcChemistry();
}

function updateLineup() {
  const stElem = document.getElementById('lineup_st');
  const midElem = document.getElementById('lineup_mid');
  const defElem = document.getElementById('lineup_def');
  const gkElem = document.getElementById('lineup_gk');
  const capElem = document.getElementById('lineup_captain');

  if(stElem) currentLineup.st = stElem.value;
  if(midElem) currentLineup.mid = midElem.value;
  if(defElem) currentLineup.def = defElem.value;
  if(gkElem) currentLineup.gk = gkElem.value;
  if(capElem) currentLineup.captain = capElem.value;

  saveAll();
  renderLineup();
}

function calcChemistry() {
  const chemDisplay = document.getElementById('chemistryDisplay');
  if(!chemDisplay) return;
  const { st, mid, def, gk } = currentLineup;
  
  if(!st || !mid || !def || !gk) {
    chemDisplay.innerHTML = `⚠️ Maça girebilmek için tüm 4 pozisyonu eksiksiz doldurmalısın!`;
    return;
  }

  const pSt = players.find(x => x.id === st);
  const pMid = players.find(x => x.id === mid);
  const pDef = players.find(x => x.id === def);
  const pGk = players.find(x => x.id === gk);

  let chem = 75;
  [pSt, pMid, pDef, pGk].forEach(p => {
    if(p && p.stats) {
      const avg = Object.values(p.stats).reduce((a,b)=>a+b,0) / Object.values(p.stats).length;
      if(avg > 65) chem += 6;
    }
  });
  chem = Math.min(100, chem);
  chemDisplay.innerHTML = `⚡ Takım Kimyası: %${chem} (Kadro Tamamlandı!)`;
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
          completeTraining(trainKey);
        }
      } else {
        const options = getSortedPlayers(players).map(p => `<option value="${p.id}">${p.name} (${p.pos}) ${p.injured ? '[Sakat]' : ''}</option>`).join('');
        controlHtml = `
          <div class="train-controls">
            <select id="select_${trainKey}">${options}</select>
            <button class="btn-train" onclick="startTraining('${cat.id}', '${drill.key}')">Başlat</button>
          </div>
        `;
      }

      return `
        <div c
