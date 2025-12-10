// Background script sets sensible defaults and keeps shared storage helpers.
const DEFAULT_SETTINGS = {
  audioEnabled: true,
  fontSize: 'medium',
  caseStyle: 'lower'
};

async function ensureDefaults() {
  const { settings, stats, daily } = await browser.storage.local.get({ settings: null, stats: null, daily: null, marqueeProgress: 0 });

  if (!settings) {
    await browser.storage.local.set({ settings: DEFAULT_SETTINGS });
  }

  if (!stats) {
    await browser.storage.local.set({
      stats: {
        correct: 0,
        total: 0,
        streak: 0,
        bestStreak: 0,
        stars: 0
      }
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  if (!daily || daily.date !== today) {
    await browser.storage.local.set({ daily: { date: today, correct: 0, total: 0, stars: 0 } });
  }

  if (typeof (await browser.storage.local.get('marqueeProgress')).marqueeProgress !== 'number') {
    await browser.storage.local.set({ marqueeProgress: 0 });
  }
}

browser.runtime.onInstalled.addListener(() => {
  ensureDefaults();
});

browser.runtime.onStartup.addListener(() => {
  ensureDefaults();
});
