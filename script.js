// Oyun Verileri ve Durum Yönetimi
let userData = JSON.parse(localStorage.getItem('pelitlibag_user')) || null;
let squad = JSON.parse(localStorage.getItem('pelitlibag_squad')) || [];
let starting11 = JSON.parse(localStorage.getItem('pelitlibag_starting11')) || { GK: null, RB: null, CB1: null, CB2: null, LB: null, CDM: null, CAM: null, LW: null, RW: null, ST: null, SUB: null };
let leagueTable = JSON.parse(localStorage.getItem('pelitlibag_league')) || generateDefaultLeague();
let matchHistory = JSON.parse(localStorage.getItem('pelitlibag_history')) || [];

function generateDefaultLeague() {
  return [
    { rank: 1, name: "Pelitlibağ FK", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 2, name: "Pamukkalespor", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 3, name: "Denizli İdman Yurdu", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 4, name: "Sarayköy 1926", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 5, name: "Kağan FK (Arkadaş)", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 6, name: "Azad Yaşar Spor", played: 0, won: 0, drawn: 0, lost: 0, points: 0 }
  ];
}

// Sayfa yüklendiğinde otomatik oturum kontrolü
window.addEventListener('DOMContentLoaded', () => {
  if (userData) {
    document.getElementById('startLockScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    initGameSession();
  }
});

function createAccount() {
  const managerNameInput = document.getElementById('managerNameInput');
  const teamNameInput = document.getElementById('teamNameInput');
  
  const managerName = managerNameInput ? managerNameInput.value.trim() : "Ömür Faik Köse";
  const teamName = teamNameInput ? teamNameInput.value.trim() : "Pelitlibağ FK";

  userData = { managerName, teamName, coins: 600, lastMatchDate: null, avatar: "", bgImage: "" };
  localStorage.setItem('pelitlibag_user', JSON.stringify(userData));

  const authModal = document.getElementById('authModal');
  const gameContainer = document.getElementById('gameContainer');
  if (authModal) authModal.style.display = 'none';
  if (gameContainer) gameContainer.style.display = 'flex';
  
  initGameSession();
}

function initGameSession() {
  const gameContainer = document.getElementById('gameContainer');
  if (gameContainer) gameContainer.style.display = 'flex';

  if (userData) {
    const teamEl = document.getElementById('displayTeamName');
    const mgrEl = document.getElementById('displayManager');
    const coinEl = document.getElementById('displayCoins');

    if (teamEl) teamEl.innerText = (userData.teamName || "PELİTLİBAĞ FK").toUpperCase();
    if (mgrEl) mgrEl.innerText = "Menajer: " + (userData.managerName || "Ömür Faik Köse");
    if (coinEl) coinEl.innerText = userData.coins || 600;
    
    if (userData.avatar) {
      const av = document.getElementById('profileAvatar');
      if (av) { av.src = userData.avatar; av.style.display = 'block'; }
    }
    if (userData.bgImage) {
      const body = document.getElementById('appBody');
      if (body) body.style.backgroundImage = `url('${userData.bgImage}')`;
    }
  }

  renderSquad();
  renderLineupSetup();
  renderTraining();
  renderLeagueTable();
  renderProfile();
  setupTabs();
  setupSwipeGestures();
}

// Sekme Geçiş Sistemi
const tabOrder = ['squad', 'market', 'training', 'lineup', 'league', 'profile', 'settings'];

function setupTabs() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      if (targetTab) switchTab(targetTab);
    });
  });
}

function switchTab(tabName) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  const btn = document.querySelector(`.nav-btn[data-tab="${tabName}"]`);
  const content = document.getElementById('tab-' + tabName);
  
  if (btn) btn.classList.add('active');
  if (content) content.classList.add('active');
}

// Sağa/Sola Kaydırma (Swipe) Mantığı
function setupSwipeGestures() {
  let touchStartX = 0;
  let touchEndX = 0;
  const swipeArea = document.getElementById('swipeArea');
  if (!swipeArea) return;

  swipeArea.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive: true});

  swipeArea.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, {passive: true});

  function handleSwipe() {
    const threshold = 50;
    const activeContent = document.querySelector('.tab-content.active');
    if (!activeContent) return;
    const currentTabId = activeContent.id.replace('tab-', '');
    let currentIndex = tabOrder.indexOf(currentTabId);

    if (touchEndX < touchStartX - threshold) {
      // Sola kaydırma -> Sonraki sekme
      if (currentIndex < tabOrder.length - 1) {
        switchTab(tabOrder[currentIndex + 1]);
      }
    }
    if (touchEndX > touchStartX + threshold) {
      // Sağa kaydırma -> Önceki sekme
      if (currentIndex > 0) {
        switchTab(tabOrder[currentIndex - 1]);
      }
    }
  }
}

// Kadro Listeleme & Serbest Bırakma
function renderSquad() {
  const container = document.getElementById('cardContainer');
  if (!container) return;
  container.innerHTML = '';

  if (squad.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #8b949e; padding: 40px;">Kadronuzda henüz oyuncu yok. Transfer Market'ten paket açarak oyuncu edinebilirsiniz!</div>`;
    return;
  }

  squad.forEach(player => {
    const releasePrice = player.rating * 15;
    const card = document.createElement('div');
    card.className = 'fc-card';
    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.8rem; background: var(--accent-color); color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold;">${player.pos}</span>
        <span class="rating-box">${player.rating}</span>
      </div>
      <div class="player-name">${player.name}</div>
      <div class="stats-grid">
        <div class="stat-item"><span class="stat-val">${player.pace || player.diving || 75}</span><span class="stat-lbl">HIZ</span></div>
        <div class="stat-item"><span class="stat-val">${player.shooting || player.handling || 75}</span><span class="stat-lbl">ŞUT</span></div>
        <div class="stat-item"><span class="stat-val">${player.passing || player.kicking || 75}</span><span class="stat-lbl">PAS</span></div>
      </div>
      <button onclick="releasePlayer(${player.id})" style="margin-top: 10px; width: 100%; background: #da3633; color: #fff; border: none; padding: 5px; border-radius: 4px; font-size: 0.75rem; font-weight: bold; cursor: pointer;">Serbest Bırak (+${releasePrice} Coin)</button>
    `;
    container.appendChild(card);
  });
}

function releasePlayer(id) {
  const playerIndex = squad.findIndex(p => p.id === id);
  if (playerIndex === -1) return;
  const player = squad[playerIndex];
  const refund = player.rating * 15;

  for (let pos in starting11) {
    if (starting11[pos] && starting11[pos].id === id) {
      starting11[pos] = null;
    }
  }

  userData.coins += refund;
  document.getElementById('displayCoins').innerText = userData.coins;
  localStorage.setItem('pelitlibag_user', JSON.stringify(userData));

  squad.splice(playerIndex, 1);
  localStorage.setItem('pelitlibag_squad', JSON.stringify(squad));
  localStorage.setItem('pelitlibag_starting11', JSON.stringify(starting11));

  renderSquad();
  renderLineupSetup();
  alert(`${player.name} serbest bırakıldı ve kulübe +${refund} Coin eklendi.`);
}

// İlk 11 Kurulumu
const positionsList = ['GK', 'RB', 'CB1', 'CB2', 'LB', 'CDM', 'CAM', 'LW', 'RW', 'ST', 'SUB'];

function renderLineupSetup() {
  const container = document.getElementById('lineupContainer');
  if (!container) return;
  container.innerHTML = '';

  positionsList.forEach(posKey => {
    const assignedPlayer = starting11[posKey];
    const row = document.createElement('div');
    row.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #0f141d; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);";
    
    let optionsHtml = `<option value="">-- ${posKey} Seç --</option>`;
    squad.forEach(p => {
      const selected = assignedPlayer && assignedPlayer.id === p.id ? 'selected' : '';
      optionsHtml += `<option value="${p.id}" ${selected}>${p.name} (${p.pos} - ${p.rating})</option>`;
    });

    row.innerHTML = `
      <span style="font-weight: bold; color: var(--accent-color); width: 50px;">${posKey}</span>
      <select onchange="assignPlayerToPosition('${posKey}', this.value)" style="flex: 1; padding: 6px; background: #161b22; border: 1px solid var(--border-color); color: #fff; border-radius: 4px;">
        ${optionsHtml}
      </select>
    `;
    container.appendChild(row);
  });

  let assignedCount = Object.values(starting11).filter(p => p !== null).length;
  const chemEl = document.getElementById('chemistryDisplay');
  if (chemEl) chemEl.innerText = `İlk 11 Kadro Doluluk: ${assignedCount} / 11`;
  localStorage.setItem('pelitlibag_starting11', JSON.stringify(starting11));
}

function assignPlayerToPosition(posKey, playerId) {
  if (!playerId) {
    starting11[posKey] = null;
  } else {
    const player = squad.find(p => p.id == playerId);
    starting11[posKey] = player || null;
  }
  renderLineupSetup();
}

// Antrenman ve Gelişme Sistemi
function renderTraining() {
  const container = document.getElementById('trainingContainer');
  if (!container) return;
  container.innerHTML = `
    <div class="match-action-box" style="margin: 0; max-width: 100%;">
      <h3 style="color: var(--accent-color); margin-bottom: 10px;">⚡ Takım Antrenmanı & Gelişme</h3>
      <p style="font-size: 0.9rem; color: #8b949e; margin-bottom: 20px;">Antrenman performansına bağlı olarak oyunculara rastgele reyting gelişim puanları (+10 ila +76 arası) dağıtılır.</p>
      <button class="btn-main" onclick="runTrainingSession()">Antrenmanı Başlat (50 Coin)</button>
    </div>
    <div id="trainingLog" style="margin-top: 15px; font-size: 0.9rem; color: #8b949e; text-align: left;"></div>
  `;
}

function runTrainingSession() {
  if (!userData || userData.coins < 50) {
    alert("Antrenman için yeterli Coin'iniz yok! (Gereken: 50 Coin)");
    return;
  }
  if (squad.length === 0) {
    alert("Antrenman yapacak oyuncunuz yok!");
    return;
  }
  userData.coins -= 50;
  document.getElementById('displayCoins').innerText = userData.coins;
  localStorage.setItem('pelitlibag_user', JSON.stringify(userData));

  let logHtml = `<h4 style="color: var(--accent-color); margin-bottom: 8px;">Son Antrenman Raporu:</h4>`;
  
  squad.forEach(p => {
    let roll = Math.random();
    let gain = 0;
    if (roll > 0.7) {
      gain = Math.floor(Math.random() * 27) + 50;
      logHtml += `<p style="color: #3fb950;">✨ ${p.name}: Harika geçti! Gelişme: <b>+${gain}</b></p>`;
    } else if (roll > 0.3) {
      gain = Math.floor(Math.random() * 10) + 15;
      logHtml += `<p style="color: #e3b341;">⚡ ${p.name}: İyi geçti. Gelişme: <b>+${gain}</b></p>`;
    } else {
      gain = Math.floor(Math.random() * 6) + 5;
      logHtml += `<p style="color: #8b949e;">⚠️ ${p.name}: Orta seviye. Gelişme: <b>+${gain}</b></p>`;
    }
    p.rating += Math.floor(gain / 20) + 1; 
  });

  localStorage.setItem('pelitlibag_squad', JSON.stringify(squad));
  renderSquad();
  const logEl = document.getElementById('trainingLog');
  if (logEl) logEl.innerHTML = logHtml;
}

// Paket Açma Mekaniği
function openPlayerPack() {
  if (!userData || userData.coins < 100) {
    alert("Yeterli Coin'iniz yok! (Gereken: 100 Coin)");
    return;
  }
  userData.coins -= 100;
  document.getElementById('displayCoins').innerText = userData.coins;
  localStorage.setItem('pelitlibag_user', JSON.stringify(userData));

  const resContainer = document.getElementById('packResultContainer');
  if (resContainer) resContainer.innerHTML = `<div style="text-align: center; color: var(--accent-color); padding: 20px; font-weight: bold;">🎁 Paket Açılıyor...</div>`;

  setTimeout(() => {
    const targetPool = [
      { name: "Ömür Faik Köse", pos: "ST", rating: 88, pace: 89, shooting: 87, passing: 84, defending: 45, physical: 82 },
      { name: "Kağan Bozkurt", pos: "CAM", rating: 85, pace: 84, shooting: 82, passing: 86, defending: 50, physical: 75 },
      { name: "Kaan Berk Kılavuz", pos: "LW", rating: 84, pace: 92, shooting: 80, passing: 78, defending: 42, physical: 70 },
      { name: "Azad Yaşar", pos: "CB", rating: 83, pace: 76, shooting: 45, passing: 70, defending: 86, physical: 88 },
      { name: "Poyraz İhsan", pos: "CM", rating: 82, pace: 79, shooting: 75, passing: 83, defending: 72, physical: 78 },
      { name: "Bekir Şaban", pos: "RB", rating: 81, pace: 85, shooting: 60, passing: 74, defending: 80, physical: 82 },
      { name: "Efe Turgut", pos: "RW", rating: 84, pace: 90, shooting: 81, passing: 76, defending: 45, physical: 72 },
      { name: "Kerem Çınar", pos: "GK", rating: 85, diving: 86, handling: 84, kicking: 80, reflexes: 87, speed: 50, positioning: 85 },
      { name: "Ahmet Yılmaz", pos: "CAM", rating: 82, pace: 80, shooting: 78, passing: 85, defending: 50, physical: 70 },
      { name: "Mehmet Demir", pos: "CB", rating: 80, pace: 75, shooting: 40, passing: 68, defending: 85, physical: 86 }
    ];

    const randomPlayerTemplate = targetPool[Math.floor(Math.random() * targetPool.length)];
    const newPlayer = { 
      id: Date.now() + Math.random(), 
      ...randomPlayerTemplate,
      goals: 0,
      passes: 0,
      energy: 100
    };

    squad.push(newPlayer);
    localStorage.setItem('pelitlibag_squad', JSON.stringify(squad));
    renderSquad();
    renderLineupSetup();

    if (resContainer) {
      resContainer.innerHTML = `
        <div class="fc-card" style="border-color: #ffd700; transform: scale(1.05); margin: 0 auto;">
          <div style="color: #ffd700; font-weight: bold; font-size: 0.85rem; margin-bottom: 5px;">✨ PAKETTEN ÇIKAN YILDIZ!</div>
          <div style="font-size: 0.8rem; background: var(--accent-color); color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold; display:inline-block;">${newPlayer.pos}</div>
          <div class="rating-box">${newPlayer.rating}</div>
          <div class="player-name">${newPlayer.name}</div>
        </div>
      `;
    }
  }, 800);
}

// Canlı Maç Simülasyonu
let liveMatchData = {
  minute: 0,
  homeGoals: 0,
  awayGoals: 0,
  opponentName: "Rakip FK",
  isHalfTime: false,
  intervalId: null
};

function startMatch() {
  const todayStr = new Date().toDateString();
  if (userData && userData.lastMatchDate === todayStr) {
    alert("Bugün oynanacak maç hakkınızı kullandınız! Günde yalnızca 1 maç yapabilirsiniz.");
    return;
  }
  
  let assignedCount = Object.values(starting11).filter(p => p !== null).length;
  if (assignedCount < 11) {
    alert(`İlk 11'de eksik oyuncu var! Tam 11 oyuncu yerleştirmelisiniz. (Mevcut: ${assignedCount}/11)`);
    return;
  }

  const opponents = leagueTable.filter(t => t.name !== userData.teamName);
  const selectedOpponent = opponents[Math.floor(Math.random() * opponents.length)].name;

  liveMatchData = {
    minute: 0,
    homeGoals: 0,
    awayGoals: 0,
    opponentName: selectedOpponent,
    isHalfTime: false,
    intervalId: null
  };

  const modal = document.getElementById('matchModal');
  if (modal) modal.style.display = 'flex';
  
  document.getElementById('homeTeamName').innerText = userData.teamName;
  document.getElementById('awayTeamName').innerText = selectedOpponent;
  document.getElementById('homeGoals').innerText = 0;
  document.getElementById('awayGoals').innerText = 0;
  document.getElementById('closeMatchBtn').style.display = 'none';

  const commentary = document.getElementById('matchCommentary');
  if (commentary) commentary.innerText = `Hakem düdüğü çaldı ve maç başladı! Pelitlibağ FK vs ${selectedOpponent}`;

  squad.forEach(p => { p.goals = p.goals || 0; p.passes = p.passes || 0; p.energy = 100; });

  liveMatchData.intervalId = setInterval(runMatchTick, 600);
}

function runMatchTick() {
  if (liveMatchData.isHalfTime) return;

  liveMatchData.minute += 1;
  const minEl = document.getElementById('matchMinute');
  if (minEl) minEl.innerText = liveMatchData.minute + "'";

  const commentary = document.getElementById('matchCommentary');

  squad.forEach(p => {
    if (Math.random() > 0.6) p.passes = (p.passes || 0) + Math.floor(Math.random() * 4) + 1;
    if (p.energy > 20) p.energy -= 1;
  });

  if (liveMatchData.minute === 45) {
    if (Math.random() > 0.5) {
      if (minEl) minEl.innerText = "45+2'";
      if (commentary) commentary.innerText = `⚠️ İlk yarı sonuna 2 dakika uzatma eklendi!`;
    } else {
      triggerHalfTime();
      return;
    }
  } else if (liveMatchData.minute === 48 && !liveMatchData.isHalfTime && minEl && minEl.innerText.includes('+')) {
    triggerHalfTime();
    return;
  }

  if (liveMatchData.minute === 90) {
    if (Math.random() > 0.5) {
      if (minEl) minEl.innerText = "90+3'";
      if (commentary) commentary.innerText = `⚠️ Maç sonuna 3 dakika uzatma eklendi!`;
    } else {
      finishMatch();
      return;
    }
  } else if (liveMatchData.minute === 93) {
    finishMatch();
    return;
  }

  let actionRoll = Math.random();
  if (actionRoll > 0.75) {
    liveMatchData.homeGoals++;
    document.getElementById('homeGoals').innerText = liveMatchData.homeGoals;
    
    let activePlayers = squad.filter(p => p.pos !== 'GK');
    let scorer = activePlayers[Math.floor(Math.random() * activePlayers.length)] || squad[0];
    scorer.goals = (scorer.goals || 0) + 1;

    if (commentary) commentary.innerHTML = `⚽ <span style="color: #ffd700; font-weight: bold;">GOL!</span> Dakika ${liveMatchData.minute}: ${scorer.name} ağları havalandırdı!`;
  } else if (actionRoll < 0.15) {
    liveMatchData.awayGoals++;
    document.getElementById('awayGoals').innerText = liveMatchData.awayGoals;
    if (commentary) commentary.innerHTML = `⚽ <span style="color: #da3633; font-weight: bold;">Rakip Gol Buldu!</span> Dakika ${liveMatchData.minute}: ${liveMatchData.opponentName} skoru değiştirdi.`;
  } else if (actionRoll > 0.65 && actionRoll < 0.70) {
    if (commentary) commentary.innerHTML = `🟥 <span style="color: #da3633; font-weight: bold;">KIRMIZI KART!</span> Dakika ${liveMatchData.minute}: Sert müdahale sonrası kırmızı kart!`;
  } else if (actionRoll > 0.55 && actionRoll < 0.60) {
    if (commentary) commentary.innerHTML = `🟨 <span style="color: #e3b341; font-weight: bold;">Sarı Kart / Faul!</span> Dakika ${liveMatchData.minute}: Faul düdüğü çaldı.`;
  } else {
    if (commentary) commentary.innerText = `Dakika ${liveMatchData.minute}: Orta saha mücadelesi devam ediyor...`;
  }
}

function triggerHalfTime() {
  liveMatchData.isHalfTime = true;
  clearInterval(liveMatchData.intervalId);
  
  const commentary = document.getElementById('matchCommentary');
  if (commentary) {
    commentary.innerHTML = `⏸️ <b style="color: var(--accent-color);">İLK YARI SONA ERDİ (Devre Arası)</b><br>Skor: Pelitlibağ FK ${liveMatchData.homeGoals} - ${liveMatchData.awayGoals} ${liveMatchData.opponentName}<br><br><button class="btn-main" onclick="resumeSecondHalf()">İkinci Yarıyı Başlat (45')</button>`;
  }
}

function resumeSecondHalf() {
  liveMatchData.isHalfTime = false;
  liveMatchData.minute = 45;
  const commentary = document.getElementById('matchCommentary');
  if (commentary) commentary.innerText = `İkinci yarı hakem düdüğüyle yeniden başladı!`;
  liveMatchData.intervalId = setInterval(runMatchTick, 600);
}

function finishMatch() {
  clearInterval(liveMatchData.intervalId);
  const commentary = document.getElementById('matchCommentary');
  
