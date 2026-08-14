function launchGameExperience() {
  // Tarayıcıyı tam ekrana al (Google sekmeleri ve adres çubuğu gizlenir)
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen().catch(() => {});
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  }

  // Ekranı yatay moda sabitlemeye çalış
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('landscape').catch(() => {});
  }

  // Başlangıç ekranını kapat ve kayıt/giriş ekranını ya da oyun ekranını aç
  document.getElementById('startLockScreen').style.display = 'none';

  if (userData && userData.managerName) {
    initGameSession();
  } else {
    document.getElementById('authModal').style.display = 'flex';
  }
}

