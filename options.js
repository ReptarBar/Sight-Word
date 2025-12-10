const audioBox = document.getElementById('audio');
const fontSelect = document.getElementById('font-size');
const caseSelect = document.getElementById('case-style');
const todayCorrect = document.getElementById('today-correct');
const todayTotal = document.getElementById('today-total');
const todayProgress = document.getElementById('today-progress');
const todayStars = document.getElementById('today-stars');

async function load() {
  const { settings, daily } = await browser.storage.local.get({ settings: { audioEnabled: true, fontSize: 'medium', caseStyle: 'lower' }, daily: null });
  audioBox.checked = settings.audioEnabled;
  fontSelect.value = settings.fontSize;
  caseSelect.value = settings.caseStyle;

  const today = new Date().toISOString().slice(0, 10);
  const dayStats = daily && daily.date === today ? daily : { correct: 0, total: 0, stars: 0 };
  todayCorrect.textContent = dayStats.correct;
  todayTotal.textContent = dayStats.total;
  todayStars.textContent = dayStats.stars;
  const percent = dayStats.total ? Math.round((dayStats.correct / dayStats.total) * 100) : 0;
  todayProgress.value = percent;
  todayProgress.setAttribute('aria-valuenow', percent);
}

async function saveSettings() {
  const settings = {
    audioEnabled: audioBox.checked,
    fontSize: fontSelect.value,
    caseStyle: caseSelect.value
  };
  await browser.storage.local.set({ settings });
}

audioBox.addEventListener('change', saveSettings);
fontSelect.addEventListener('change', saveSettings);
caseSelect.addEventListener('change', saveSettings);

document.addEventListener('DOMContentLoaded', load);
