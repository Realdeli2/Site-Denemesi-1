// Oyun Verileri ve Durum Yönetimi
let userData = JSON.parse(localStorage.getItem('pelitlibag_user')) || null;
let squad = JSON.parse(localStorage.getItem('pelitlibag_squad')) || generateDefaultSquad();
let leagueTable = JSON.parse(localStorage.getItem('pelitlibag_league')) || generateDefaultLeague();
let matchHistory = JSON.parse(localStorage.getItem('pelitlibag_history')) || [];

function generateDefaultSquad() {
  return [
    { id: 1, name: "Ömür Faik Köse", pos: "ST", rating: 88, pace: 89, shooting: 87, passing: 84, dribbling: 86, defending: 45, physical: 82 },
    { id: 2, name: "Ahmet Yılmaz", pos: "CAM", rating: 82, pace: 80, shooting: 78, passing: 85, dribbling: 83, defending: 50, physical: 70 },
    { id: 3, name: "Mehmet Demir", pos: "CB", rating: 80, pace: 75, shooting: 40, passing: 68, dribbling: 65, defending: 85, physical: 86 },
    { id: 4, name: "Can Çelik", pos: "RB", rating: 79, pace: 84, shooting: 55, passing: 72, dribbling: 76, defending: 78, physical: 77 },
    { id: 5, name: "Berkay Şahin", pos: "GK", rating: 81, diving: 82, handling: 80, kicking: 79, reflexes: 83, speed: 50, positioning: 81 }
  ];
}

function generateDefaultLeague() {
  return [
    { rank: 1, name: "Pelitlibağ FK", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 2, name: "Pamukkalespor", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 3, name: "Denizli İdman Yurdu", played: 0, won: 0, drawn: 0, lost: 0, points: 0 },
    { rank: 4, name: "Sarayköy 1926", played: 0, won: 0, drawn: 0, lost: 0, points: 0 }
  ];
}

// Oyunu Başlatma / Profil Oluşturma
function createAccount() {
  const managerName = document.getElementById('managerNameInput').value.trim() || "Ömür Faik Köse";
  const teamName = document.getElementById('teamNameInput').value.trim() || "Pelitlibağ FK";

  userData = { managerName, teamName, coins: 600 };
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

// Puan Durumu Tablosu
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

// Paket Açma Mekaniği
function openPlayerPack() {
  if (!userData || userData.coins < 100) {
    alert("Yeterli Coin'iniz yok!");
    return;
  }
  userData.coins -= 100;
  document.getElementById('displayCoins').innerText = userData.coins;
  localStorage.setItem('pelitlibag_user', JSON.stringify(userData));

  const firstNames = ["Kerem", "Emre", "Arda", "Yusuf", "Burak", "Ozan", "Umut"];
  const lastNames = ["Demir", "Kaya", "Çelik", "Şahin", "Yıldız", "Aydın", "Öztürk"];
  const positions = ["ST", "CAM", "CB", "RB", "GK"];
  
  const randomName = firstNames[Math.floor(Math.random() * firstNames.length)] + " " + lastNames[Math.floor(Math.random() * lastNames.length)];
  const randomPos = positions[Math.floor(Math.random() * positions.length)];
  const randomRating = Math.floor(Math.random() * 10) + 78;

  const newPlayer = {
    id: squad.length + 1,
    name: randomName,
    pos: randomPos,
    rating: randomRating,
    pace: Math.floor(Math.random() * 15) + 75,
    shooting: Math.floor(Math.random() * 15) + 70,
    passing: Math.floor(Math.random() * 15) + 70,
    defending: Math.floor(Math.random() * 15) + 60,
    physical: Math.floor(Math.random() * 15) + 70
  };

  squad.push(newPlayer);
  localStorage.setItem('pelitlibag_squad', JSON.stringify(squad));
  renderSquad();

  const resContainer = document.getElementById('packResultContainer');
  resContainer.innerHTML = `
    <div class="fc-card" style="border-color: #ffd700; transform: scale(1.05);">
      <div style="color: #ffd700; font-weight: bold; font-size: 0.85rem; margin-bottom: 5px;">🎉 YENİ TRANSFER!</div>
      <div style="font-size: 0.8rem; background: var(--accent-color); color: #000; padding: 2px 6px; border-radius: 4px; font-weight: bold; display:inline-block;">${newPlayer.pos}</div>
      <div class="rating-box">${newPlayer.rating}</div>
      <div class="player-name">${newPlayer.name}</div>
    </div>
  `;
}

// Maç Simülasyonu
function startMatch() {
  const modal = document.getElementById('matchModal');
  modal.style.display = 'flex';
  
  let minute = 0;
  let homeGoals = 0;
  let awayGoals = 0;
  
  document.getElementById('homeTeamName').innerText = userData ? userData.teamName : "Pelitlibağ FK";
  document.getElementById('homeGoals').innerText = homeGoals;
  document.getElementById('awayGoals').innerText = awayGoals;
  document.getElementById('closeMatchBtn').style.display = 'none';

  const commentary = document.getElementById('matchCommentary');
  commentary.innerText = "Maç hakemin düdüğüyle başladı!";

  const interval = setInterval(() => {
    minute += 15;
    if (minute > 90) minute = 90;
    
    document.getElementById('matchMinute').innerText = minute + "'";

    if (Math.random() > 0.5) {
      if (Math.random() > 0.4) {
        homeGoals++;
        commentary.innerText = `Dakika ${minute}: GOOOLL! Pelitlibağ FK skoru değiştirdi!`;
      } else {
        awayGoals++;
        commentary.innerText = `Dakika ${minute}: Rakip takım gol buldu.`;
      }
    } else {
      commentary.innerText = `Dakika ${minute}: Orta saha mücadelesi devam ediyor...`;
    }

    document.getElementById('homeGoals').innerText = homeGoals;
    document.getElementById('awayGoals').innerText = awayGoals;

    if (minute >= 90) {
      clearInterval(interval);
      commentary.innerText = `Maç Sonucu: Pelitlibağ FK ${homeGoals} - ${awayGoals} Rakip FK`;
      document.getElementById('closeMatchBtn').style.display = 'block';
      updateLeagueStats(homeGoals, awayGoals);
    }
  }, 1000);
}

function updateLeagueStats(hg, ag) {
  let team = leagueTable.find(t => t.name === (userData ? userData.teamName : "Pelitlibağ FK"));
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
                                                        
