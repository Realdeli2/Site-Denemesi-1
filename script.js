// Oyun Verileri ve Durum Yönetimi
let userData = JSON.parse(localStorage.getItem('pelitlibag_user')) || null;
let squad = JSON.parse(localStorage.getItem('pelitlibag_squad')) || []; // İlk başta boş kadro
let leagueTable = JSON.parse(localStorage.getItem('pelitlibag_league')) || generateDefaultLeague();
let matchHistory = JSON.parse(localStorage.getItem('pelitlibag_history')) || [];

function generateDefaultLeague() {
  return [
    { rank: 1, name: "Pelitlibağ FK", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 2, name: "Pamukkalespor", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 3, name: "Denizli İdman Yurdu", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 4, name: "Sarayköy 1926", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 5, name: "Arkadaş FK (1)", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 6, name: "Arkadaş FK (2)", played: 0, won: 0, drawn: 0, lost: 0, points: 0 }
  ];
}

// Oyunu Başlatma / Profil Oluşturma
function createAccount() {
  const managerName = document.getElementById('managerNameInput').value.trim() || "Ömür Faik Köse";
  const teamName = document.getElementById('teamNameInput').value.trim() || "Pelitlibağ FK";

  userData = { managerName, teamName, coins: 600, lastMatchDate: null };
  localStorage.setItem('pelitlibag_user', JSON.stringify(userData));

  document.getElementById('authModal').style.display = 'none';
  document.getElementById('gameContainer').style.display = 'flex';
  
  initGameSession();
}

function initGameSession() {
  document.getElementById('gameContainer').style.display = 'flex';
  if (userData) {
    document.getElementById('displayTeamName').innerText = userData.teamName.toUpperCase();
    document.getElementById('displayManager').innerText = "Menajer: " + userData.managerName;
    document.getElementById('displayCoins').innerText = userData.coins;
  }
  renderSquad();
  renderLineupSetup();
  renderTraining();
  renderLeagueTable();
  setupTabs();
}

// Sekme Geçişleri
function setupTabs() {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      navBtns.forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = 'tab-' + btn.getAttribute('data-tab');
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

// Kadro Listeleme
function renderSquad() {
  const container = document.getElementById('cardContainer');
  if (!container) return;
  container.innerHTML = '';

  if (squad.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; color: #8b949e; padding: 40px;">Kadronuzda henüz oyuncu yok. Transfer Market'ten paket açarak oyuncu edinebilirsiniz!</div>`;
    return;
  }

  squad.forEach(player => {
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
    `;
    container.appendChild(card);
  });
}

// İlk 11 Kadro Kurulumu Ekranı
function renderLineupSetup() {
  const container = document.getElementById('lineupContainer');
  if (!container) return;
  container.innerHTML = '';

  if (squad.length === 0) {
    container.innerHTML = `<p style="color: #8b949e; font-size: 0.9rem;">Önce paket açarak oyuncu kadrosu oluşturun.</p>`;
    return;
  }

  squad.forEach((p, idx) => {
    const item = document.createElement('div');
    item.style.cssText = "display: flex; justify-content: space-between; align-items: center; background: #0f141d; padding: 8px 12px; border-radius: 6px; border: 1px solid var(--border-color);";
    item.innerHTML = `
      <span><b>${p.pos}</b> - ${p.name} (${p.rating})</span>
      <span style="color: var(--accent-color); font-size: 0.85rem; font-weight: bold;">İlk 11'de</span>
    `;
    container.appendChild(item);
  });
  document.getElementById('chemistryDisplay').innerText = `Takım Kimyası: ${squad.length > 0 ? squad.length * 9 : 0} / 100`;
}

// Antrenman Sekmesi İçeriği
function renderTraining() {
  const container = document.getElementById('trainingContainer');
  if (!container) return;
  container.innerHTML = `
    <div class="match-action-box" style="margin: 0; max-width: 100%;">
      <h3 style="color: var(--accent-color); margin-bottom: 10px;">⚡ Takım Antrenmanı</h3>
      <p style="font-size: 0.9rem; color: #8b949e; margin-bottom: 20px;">Oyuncularınızın performansını artırmak için günlük antrenmanları uygulayın.</p>
      <button class="btn-main" onclick="runTrainingSession()">Hızlı Antrenman Yap (50 Coin)</button>
    </div>
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

  squad.forEach(p => { p.rating += 1; });
  localStorage.setItem('pelitlibag_squad', JSON.stringify(squad));
  renderSquad();
  alert("Antrenman başarıyla tamamlandı! Tüm oyuncuların reytingleri +1 arttı.");
}

// Paket İçeriği Önizlemesi ve Animasyonlu Açılış
function openPlayerPack() {
  if (!userData || userData.coins < 100) {
    alert("Yeterli Coin'iniz yok! (Gereken: 100 Coin)");
    return;
  }
  userData.coins -= 100;
  document.getElementById('displayCoins').innerText = userData.coins;
  localStorage.setItem('pelitlibag_user', JSON.stringify(userData));

  const resContainer = document.getElementById('packResultContainer');
  resContainer.innerHTML = `<div style="text-align: center; color: var(--accent-color); padding: 20px; font-weight: bold; font-size: 1.2rem;" class="pulse-anim">🎁 Paket Açılıyor... Paket İçeriği Taranıyor...</div>`;

  setTimeout(() => {
    // İstediğin özel ilk 11 oyuncu havuzu ve orijinal reytingler
    const targetPool = [
      { name: "Ömür Faik Köse", pos: "ST", rating: 88, pace: 89, shooting: 87, passing: 84, defending: 45, physical: 82 },
      { name: "Ahmet Yılmaz", pos: "CAM", rating: 82, pace: 80, shooting: 78, passing: 85, defending: 50, physical: 70 },
      { name: "Mehmet Demir", pos: "CB", rating: 80, pace: 75, shooting: 40, passing: 68, defending: 85, physical: 86 },
      { name: "Can Çelik", pos: "RB", rating: 79, pace: 84, shooting: 55, passing: 72, defending: 78, physical: 77 },
      { name: "Berkay Şahin", pos: "GK", rating: 81, diving: 82, handling: 80, kicking: 79, reflexes: 83, speed: 50, positioning: 81 },
      { name: "Kerem Aktürkoğlu", pos: "LW", rating: 83, pace: 91, shooting: 79, passing: 76, defending: 40, physical: 65 },
      { name: "Barış Alper Yılmaz", pos: "RW", rating: 82, pace: 93, shooting: 77, passing: 74, defending: 55, physical: 84 },
      { name: "Abdülkerim Bardakcı", pos: "CB", rating: 81, pace: 71, shooting: 42, passing: 70, defending: 83, physical: 85 },
      { name: "Lucas Torreira", pos: "CDM", rating: 84, pace: 74, shooting: 68, passing: 82, defending: 85, physical: 83 },
      { name: "Dries Mertens", pos: "CF", rating: 83, pace: 78, shooting: 82, passing: 84, defending: 42, physical: 60 },
      { name: "Fernando Muslera", pos: "GK", rating: 84, diving: 84, handling: 83, kicking: 78, reflexes: 85, speed: 45, positioning: 84 }
    ];

    // Henüz çıkmamış olanlardan seçelim ya da rastgele havuzdan verelim
    const randomPlayerTemplate = targetPool[Math.floor(Math.random() * targetPool.length)];
    const newPlayer = { id: squad.length + 1, ...randomPlayerTemplate };

    squad.push(newPlayer);
    localStorage.setItem('pelitlibag_squad', JSON.stringify(squad));
    renderSquad();
    renderLineupSetup();

    resContainer.innerHTML = `
      <div class="fc-card" style="border-color: #ffd700; transform: scale(1.08); transition: 0.3s; margin: 0 auto;">
        <div style="color: #ffd700; font-weight: bold; font-size: 0.85rem; margin-bottom: 5px;">✨ PAKETTEN ÇIKAN YILDIZ!</div>
        <div style="font-size: 0.8rem; background: var(--accent-color); color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold; display:inline-block;">${newPlayer.pos}</div>
        <div class="rating-box">${newPlayer.rating}</div>
        <div class="player-name">${newPlayer.name}</div>
      </div>
    `;
  }, 1200);
}

// Günlük Tek Maç Sınırı ve 1'er Dakikalık Akış & Coin Ödülü
function startMatch() {
  const todayStr = new Date().toDateString();
  if (userData && userData.lastMatchDate === todayStr) {
    alert("Bugün oynanacak maç hakkınızı kullandınız! Günde yalnızca 1 maç yapabilirsiniz.");
    return;
  }
  if (squad.length === 0) {
    alert("Maç yapmak için önce kadronuza oyuncu transfer etmelisiniz!");
    return;
  }

  const modal = document.getElementById('matchModal');
  modal.style.display = 'flex';
  
  let minute = 0;
  let homeGoals = 0;
  let awayGoals = 0;
  
  // Arkadaş liginden rastgele bir rakip seçimi
  const opponents = leagueTable.filter(t => t.name !== userData.teamName);
  const selectedOpponent = opponents[Math.floor(Math.random() * opponents.length)].name;

  document.getElementById('homeTeamName').innerText = userData.teamName;
  document.getElementById('awayGoals').previousSibling.nodeValue = ` - `; // Rakip adını güncellemek için dinamik alan
  document.getElementById('homeGoals').innerText = homeGoals;
  document.getElementById('awayGoals').innerText = awayGoals;
  document.getElementById('closeMatchBtn').style.display = 'none';

  const commentary = document.getElementById('matchCommentary');
  commentary.innerText = `Maç Başladı: Pelitlibağ FK vs ${selectedOpponent}`;

  // 1'er dakika artan akış (1 sn = 1 dakika simülasyonu)
  const interval = setInterval(() => {
    minute += 1;
    if (minute > 90) minute = 90;
    
    document.getElementById('matchMinute').innerText = minute + "'";

    if (minute === 25 || minute === 55 || minute === 80) {
      if (Math.random() > 0.4) {
        homeGoals++;
        commentary.innerText = `Dakika ${minute}: GOOOLL! Pelitlibağ FK skoru değiştirdi!`;
      } else if (Math.random() > 0.6) {
        awayGoals++;
        commentary.innerText = `Dakika ${minute}: ${selectedOpponent} gol buldu.`;
      } else {
        commentary.innerText = `Dakika ${minute}: Mücadele orta saha mücadelesi şeklinde sürüyor.`;
      }
    }

    document.getElementById('homeGoals').innerText = homeGoals;
    document.getElementById('awayGoals').innerText = awayGoals;

    if (minute >= 90) {
      clearInterval(interval);
      commentary.innerText = `Maç Sonucu: Pelitlibağ FK ${homeGoals} - ${selectedOpponent} ${awayGoals}`;
      document.getElementById('closeMatchBtn').style.display = 'block';
      
      // Maç bittiğinde bugünkü tarihi kaydet
      userData.lastMatchDate = todayStr;
      
      // Kazanma ödülü (Coin)
      if (homeGoals > awayGoals) {
        userData.coins += 150;
        commentary.innerText += `\n🎉 Maç Kazanıldı! +150 Coin Kazandınız!`;
      } else if (homeGoals === awayGoals) {
        userData.coins += 50;
        commentary.innerText += `\n🤝 Beraberlik! +50 Coin Kazandınız.`;
      } else {
        userData.coins += 20;
        commentary.innerText += `\n💪 Mücadele için +20 Coin kazandınız.`;
      }

      document.getElementById('displayCoins').innerText = userData.coins;
      localStorage.setItem('pelitlibag_user', JSON.stringify(userData));
      updateLeagueStats(homeGoals, awayGoals);
    }
  }, 400); // Hızlı akış için süre ayarı
}

function updateLeagueStats(hg, ag) {
  let team = leagueTable.find(t => t.name === userData.teamName);
  if (team) {
    team.played += 1;
    if (hg > ag) { team.won += 1; team.points += 3; }
    else if (hg === ag) { team.drawn += 1; team.points += 1; }
    else { team.lost += 1; }
    localStorage.setItem('pelitlibag_league', JSON.stringify(leagueTable));
    renderLeagueTable();
  }
}

function closeMatchModal() {
  document.getElementById('matchModal').style.display = 'none';
}

// Puan Durumu ve Arkadaş Lig Tablosu
function renderLeagueTable() {
  const tbody = document.getElementById('leagueTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  leagueTable.sort((a, b) => b.points - a.points).forEach((team, index) => {
    team.rank = index + 1;
    const row = document.createElement('tr');
    row.style.borderBottom = '1px solid var(--border-color)';
    row.innerHTML = `
      <td style="padding: 10px; font-weight: bold; color: var(--accent-color);">${team.rank}</td>
      <td style="padding: 10px; font-weight: 600;">${team.name}</td>
      <td style="padding: 10px; text-align: center;">${team.played}</td>
      <td style="padding: 10px; text-align: center;">${team.won}</td>
      <td style="padding: 10px; text-align: center;">${team.drawn}</td>
      <td style="padding: 10px; text-align: center;">${team.lost}</td>
      <td style="padding: 10px; text-align: center; font-weight: bold; color: var(--accent-color);">${team.points}</td>
    `;
    tbody.appendChild(row);
  });
}
