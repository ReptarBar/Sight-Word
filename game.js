// Princess Sloane sight-word game logic
const baseMarqueeText = 'PRINCESS SLOANE';
const quickMarqueeCycle = ['Sloane ❤️ Dad', 'Sloane ❤️ Mom'];
let currentMarqueeText = baseMarqueeText;
const lettersContainer = document.getElementById('letters');
const wordChoices = document.getElementById('word-choices');
const emojiDisplay = document.getElementById('emoji-display');
const emojiHint = document.getElementById('emoji-hint');
const streakEl = document.getElementById('streak');
const accuracyEl = document.getElementById('accuracy');
const starsEl = document.getElementById('stars');
const modeLabel = document.getElementById('mode-label');
const sparklesLayer = document.getElementById('sparkles');
const confettiLayer = document.getElementById('confetti-layer');
const celebration = document.getElementById('celebration');
const celebrationTitle = document.getElementById('celebration-title');
const celebrationMessage = document.getElementById('celebration-message');
const celebrationClose = document.getElementById('close-celebration');
const audioToggle = document.querySelector('.audio-toggle');
const modeButtons = [...document.querySelectorAll('.mode-button')];

// Built-in bank of at least 100 sight words with emoji cues
const words = [
  { word: 'a', emoji: '🧚', hint: 'a tiny helper word' },
  { word: 'and', emoji: '➕', hint: 'connects ideas' },
  { word: 'away', emoji: '↔️', hint: 'move away' },
  { word: 'big', emoji: '🧸', hint: 'big and huggable' },
  { word: 'blue', emoji: '🔵', hint: 'color blue' },
  { word: 'can', emoji: '🛠️', hint: 'you can do it' },
  { word: 'come', emoji: '👋', hint: 'come over' },
  { word: 'down', emoji: '⬇️', hint: 'down you go' },
  { word: 'find', emoji: '🔍', hint: 'find it' },
  { word: 'funny', emoji: '😂', hint: 'something silly' },
  { word: 'go', emoji: '🏃', hint: 'ready, go!' },
  { word: 'help', emoji: '🆘', hint: 'helping hand' },
  { word: 'here', emoji: '📍', hint: 'right here' },
  { word: 'in', emoji: '📦', hint: 'inside the box' },
  { word: 'is', emoji: '✅', hint: 'is true' },
  { word: 'it', emoji: '📌', hint: 'it is this' },
  { word: 'jump', emoji: '🤸', hint: 'jump high' },
  { word: 'little', emoji: '🐞', hint: 'little ladybug' },
  { word: 'look', emoji: '👀', hint: 'look close' },
  { word: 'make', emoji: '🧱', hint: 'make and build' },
  { word: 'me', emoji: '🙋', hint: 'me, me, me!' },
  { word: 'my', emoji: '🧸', hint: 'my teddy' },
  { word: 'not', emoji: '🚫', hint: 'not allowed' },
  { word: 'one', emoji: '1️⃣', hint: 'number one' },
  { word: 'play', emoji: '🎈', hint: 'time to play' },
  { word: 'red', emoji: '🔴', hint: 'color red' },
  { word: 'run', emoji: '🏃‍♀️', hint: 'run fast' },
  { word: 'said', emoji: '💬', hint: 'someone said' },
  { word: 'see', emoji: '👓', hint: 'see clearly' },
  { word: 'the', emoji: '👑', hint: 'the royal word' },
  { word: 'three', emoji: '3️⃣', hint: 'number three' },
  { word: 'to', emoji: '➡️', hint: 'to the right' },
  { word: 'two', emoji: '2️⃣', hint: 'number two' },
  { word: 'up', emoji: '⬆️', hint: 'up you go' },
  { word: 'we', emoji: '🤝', hint: 'we together' },
  { word: 'where', emoji: '❓', hint: 'where is it?' },
  { word: 'yellow', emoji: '💛', hint: 'sunny yellow' },
  { word: 'you', emoji: '🫵', hint: 'yes, you' },
  { word: 'all', emoji: '✨', hint: 'all together' },
  { word: 'am', emoji: '😊', hint: 'I am happy' },
  { word: 'are', emoji: '🤗', hint: 'you are hugged' },
  { word: 'at', emoji: '📍', hint: 'at this spot' },
  { word: 'ate', emoji: '🍽️', hint: 'ate lunch' },
  { word: 'be', emoji: '🐝', hint: 'be kind' },
  { word: 'black', emoji: '⚫', hint: 'color black' },
  { word: 'brown', emoji: '🟤', hint: 'color brown' },
  { word: 'but', emoji: '⚖️', hint: 'but wait' },
  { word: 'came', emoji: '🚪', hint: 'you came in' },
  { word: 'did', emoji: '🏅', hint: 'you did it' },
  { word: 'do', emoji: '🛠️', hint: 'do the thing' },
  { word: 'eat', emoji: '🍎', hint: 'eat a snack' },
  { word: 'four', emoji: '4️⃣', hint: 'number four' },
  { word: 'get', emoji: '🎁', hint: 'get a gift' },
  { word: 'good', emoji: '👍', hint: 'good job' },
  { word: 'have', emoji: '🎒', hint: 'have a backpack' },
  { word: 'he', emoji: '🧒', hint: 'he is smiling' },
  { word: 'into', emoji: '➡️📦', hint: 'go into' },
  { word: 'like', emoji: '❤️', hint: 'I like it' },
  { word: 'must', emoji: '📜', hint: 'must do' },
  { word: 'new', emoji: '🌟', hint: 'brand new' },
  { word: 'no', emoji: '🙅', hint: 'no, thanks' },
  { word: 'now', emoji: '⏰', hint: 'right now' },
  { word: 'on', emoji: '🔛', hint: 'on switch' },
  { word: 'our', emoji: '🏠', hint: 'our home' },
  { word: 'out', emoji: '🚪➡️', hint: 'go out' },
  { word: 'please', emoji: '🙏', hint: 'say please' },
  { word: 'pretty', emoji: '🌸', hint: 'pretty flower' },
  { word: 'ran', emoji: '🏃‍♂️💨', hint: 'ran quickly' },
  { word: 'ride', emoji: '🚲', hint: 'ride the bike' },
  { word: 'saw', emoji: '👁️', hint: 'I saw it' },
  { word: 'say', emoji: '🗣️', hint: 'say the word' },
  { word: 'she', emoji: '👧', hint: 'she smiles' },
  { word: 'so', emoji: '⭐', hint: 'so bright' },
  { word: 'soon', emoji: '⏳', hint: 'see you soon' },
  { word: 'that', emoji: '👉', hint: 'that one' },
  { word: 'there', emoji: '📍✨', hint: 'over there' },
  { word: 'they', emoji: '👫', hint: 'they are friends' },
  { word: 'this', emoji: '☝️', hint: 'this one' },
  { word: 'too', emoji: '➕1', hint: 'me too' },
  { word: 'under', emoji: '📦⬇️', hint: 'under the box' },
  { word: 'want', emoji: '💭', hint: 'I want it' },
  { word: 'was', emoji: '📖', hint: 'it was in the story' },
  { word: 'well', emoji: '💧', hint: 'water well' },
  { word: 'went', emoji: '🚌', hint: 'we went' },
  { word: 'what', emoji: '❔', hint: 'what is it?' },
  { word: 'white', emoji: '⚪', hint: 'color white' },
  { word: 'who', emoji: '🕵️', hint: 'who is there?' },
  { word: 'will', emoji: '🌈', hint: 'will do' },
  { word: 'with', emoji: '👭', hint: 'with a friend' },
  { word: 'yes', emoji: '🙆', hint: 'yes indeed' },
  { word: 'your', emoji: '🪞', hint: 'your reflection' },
  { word: 'after', emoji: '⏭️', hint: 'after this' },
  { word: 'again', emoji: '🔁', hint: 'again please' },
  { word: 'an', emoji: '🔠', hint: 'an apple' },
  { word: 'any', emoji: '🪄', hint: 'any one' },
  { word: 'as', emoji: '🎭', hint: 'as a star' },
  { word: 'ask', emoji: '❓➡️', hint: 'ask kindly' },
  { word: 'by', emoji: '➡️🚪', hint: 'stop by' },
  { word: 'could', emoji: '💡', hint: 'could be' },
  { word: 'every', emoji: '🌍', hint: 'everywhere' },
  { word: 'fly', emoji: '🦋', hint: 'fly high' },
  { word: 'from', emoji: '📦➡️', hint: 'from here' },
  { word: 'give', emoji: '🎁➡️', hint: 'give a gift' },
  { word: 'had', emoji: '📦✔️', hint: 'had it before' },
  { word: 'him', emoji: '🧒👉', hint: 'for him' },
  { word: 'his', emoji: '🧢', hint: 'his hat' },
  { word: 'just', emoji: '⏱️', hint: 'just now' },
  { word: 'let', emoji: '✅➡️', hint: 'let it happen' },
  { word: 'live', emoji: '🏡', hint: 'live here' },
  { word: 'may', emoji: '🌷', hint: 'may I?' },
  { word: 'of', emoji: '🧮', hint: 'part of' },
  { word: 'old', emoji: '🧓', hint: 'old and wise' },
  { word: 'once', emoji: '📜✨', hint: 'once upon' },
  { word: 'open', emoji: '📖', hint: 'open book' },
  { word: 'over', emoji: '🌈⬆️', hint: 'over the top' },
  { word: 'put', emoji: '📥', hint: 'put it in' },
  { word: 'round', emoji: '⚪', hint: 'round shape' },
  { word: 'some', emoji: '🫂', hint: 'some friends' },
  { word: 'stop', emoji: '🛑', hint: 'stop sign' },
  { word: 'take', emoji: '🤲', hint: 'take it' },
  { word: 'thank', emoji: '🤍', hint: 'thank you' },
  { word: 'them', emoji: '👨‍👩‍👧', hint: 'wave to them' },
  { word: 'then', emoji: '⏭️', hint: 'then after' },
  { word: 'think', emoji: '🤔', hint: 'think about it' },
  { word: 'walk', emoji: '🚶‍♀️', hint: 'walk gently' },
  { word: 'warm', emoji: '🔥', hint: 'warm blanket' },
  { word: 'wash', emoji: '🫧', hint: 'wash hands' },
  { word: 'why', emoji: '❓💡', hint: 'why is that?' }
];

// Sight-word focused prompts with simple, related decoys
const sightWordDeck = [
  { word: 'box', emoji: '📦', options: ['box', 'fox', 'ox', 'hat'] },
  { word: 'sun', emoji: '☀️', options: ['sun', 'son', 'run'] },
  { word: 'hat', emoji: '🎩', options: ['hat', 'cat', 'bat', 'hut'] },
  { word: 'cake', emoji: '🎂', options: ['cake', 'lake', 'make', 'bake'] },
  { word: 'car', emoji: '🚗', options: ['car', 'jar', 'far'] },
  { word: 'dog', emoji: '🐶', options: ['dog', 'log', 'fog', 'dig'] },
  { word: 'tree', emoji: '🌳', options: ['tree', 'three', 'free', 'bee'] },
  { word: 'book', emoji: '📚', options: ['book', 'cook', 'look', 'took'] },
  { word: 'star', emoji: '⭐', options: ['star', 'scar', 'stir'] },
  { word: 'boat', emoji: '⛵', options: ['boat', 'goat', 'coat'] }
];

// Game state
let settings = { audioEnabled: true, fontSize: 'medium', caseStyle: 'lower' };
let stats = { correct: 0, total: 0, streak: 0, bestStreak: 0, stars: 0 };
let daily = { date: new Date().toISOString().slice(0, 10), correct: 0, total: 0, stars: 0 };
let currentMode = 'sight';
let roundsPlayed = 0;
let targetWord = null;
let marqueeProgress = 0;
let quickMarqueeLevel = 0;

// Audio helpers using the Web Audio API for gentle blips
const AudioKit = (() => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const playTone = (frequency, duration = 0.18, volume = 0.08, offset = 0) => {
    if (!settings.audioEnabled) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = frequency;
    gain.gain.value = volume;
    osc.connect(gain).connect(ctx.destination);
    osc.start(now + offset);
    osc.stop(now + offset + duration);
  };

  return {
    sparkle() { playTone(760); },
    success() { playTone(520); playTone(880, 0.15, 0.06); },
    error() { playTone(220, 0.25, 0.1); },
    celebrate() {
      [620, 760, 880, 990, 1140].forEach((freq, idx) => playTone(freq, 0.16, 0.07, idx * 0.1));
    }
  };
})();

function shuffle(arr) {
  const list = [...arr];
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}

function applySettings() {
  document.documentElement.style.setProperty('--font-scale', settings.fontSize === 'small' ? 0.9 : settings.fontSize === 'big' ? 1.15 : settings.fontSize === 'xl' ? 1.3 : 1);
  audioToggle.textContent = settings.audioEnabled ? '🔈' : '🔇';
  audioToggle.setAttribute('aria-pressed', settings.audioEnabled ? 'true' : 'false');
}

function formatWord(word) {
  return settings.caseStyle === 'upper' ? word.toUpperCase() : word.toLowerCase();
}

function getPlayStyle() {
  return currentMode === 'quick' || currentMode === 'marquee' ? 'word-hunt' : currentMode;
}

function modeLabelFor(mode) {
  switch (mode) {
    case 'sight':
      return 'Sight Word';
    case 'word-hunt':
      return 'Word Hunt';
    case 'quick':
      return 'Quick 10';
    case 'marquee':
      return 'Marquee Party';
    default:
      return 'Sight Word';
  }
}

function buildMarquee() {
  lettersContainer.innerHTML = '';
  currentMarqueeText.split('').forEach((char, idx) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.className = 'letter' + (char === ' ' ? ' space' : '');
    span.dataset.index = idx;
    lettersContainer.appendChild(span);
  });
}

function updateMarqueeDisplay(progressCount) {
  const letters = lettersContainer.querySelectorAll('.letter');
  const litMax = marqueeLetterCount();
  let lit = Math.min(progressCount, litMax);
  letters.forEach((letter) => {
    if (letter.classList.contains('space')) return;
    if (lit > 0) {
      letter.classList.add('lit');
      lit -= 1;
    } else {
      letter.classList.remove('lit');
    }
  });
}

function marqueeLetterCount(text = currentMarqueeText) {
  return text.replace(/\s/g, '').length;
}

function resetMarqueeProgress() {
  marqueeProgress = 0;
  updateMarqueeDisplay(marqueeProgress);
  browser.storage.local.set({ marqueeProgress });
}

function setMarqueeText(text, { resetProgress = true } = {}) {
  currentMarqueeText = text;
  buildMarquee();
  if (resetProgress) {
    resetMarqueeProgress();
  } else {
    updateMarqueeDisplay(marqueeProgress);
  }
}

async function loadState() {
  const stored = await browser.storage.local.get({ settings: null, stats: null, daily: null, marqueeProgress: 0 });
  settings = stored.settings || settings;
  stats = stored.stats || stats;
  daily = stored.daily || daily;
  marqueeProgress = Math.min(stored.marqueeProgress || 0, marqueeLetterCount());
  const today = new Date().toISOString().slice(0, 10);
  if (daily.date !== today) {
    daily = { date: today, correct: 0, total: 0, stars: 0 };
    await browser.storage.local.set({ daily });
  }
  applySettings();
  updateStatsUI();
  updateMarqueeDisplay(marqueeProgress);
}

function updateStatsUI() {
  streakEl.textContent = stats.streak;
  const accuracy = stats.total ? Math.round((stats.correct / stats.total) * 100) : 0;
  accuracyEl.textContent = `${accuracy}%`;
  starsEl.textContent = stats.stars;
}

function setMode(mode) {
  const previousMode = currentMode;
  currentMode = mode;
  roundsPlayed = 0;

  if (mode === 'quick') {
    setMarqueeText(quickMarqueeCycle[quickMarqueeLevel]);
  } else if (currentMarqueeText !== baseMarqueeText) {
    setMarqueeText(baseMarqueeText, { resetProgress: previousMode !== mode });
  }

  modeLabel.textContent = modeLabelFor(mode);
  modeButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.mode === mode));
  startRound();
}

function updateStorageStats(correct) {
  stats.total += 1;
  daily.total += 1;
  if (correct) {
    stats.correct += 1;
    daily.correct += 1;
    stats.streak += 1;
    stats.bestStreak = Math.max(stats.bestStreak, stats.streak);
    const bonus = stats.streak % 5 === 0 ? 2 : 1;
    stats.stars += bonus;
    daily.stars += bonus;
  } else {
    stats.streak = 0;
  }
  browser.storage.local.set({ stats, daily });
}

function showSparkles() {
  for (let i = 0; i < 12; i++) {
    const dot = document.createElement('div');
    dot.className = 'sparkle';
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.top = `${Math.random() * 100}%`;
    sparklesLayer.appendChild(dot);
    setTimeout(() => dot.remove(), 1000);
  }
}

function launchConfetti() {
  confettiLayer.innerHTML = '';
  const pieces = 50;
  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.top = `${Math.random() * 20}%`;
    piece.style.animationDelay = `${Math.random() * 0.3}s`;
    piece.style.background = Math.random() > 0.5 ? 'linear-gradient(135deg, #ffd766, #7cc6fe)' : undefined;
    confettiLayer.appendChild(piece);
    setTimeout(() => piece.remove(), 1800);
  }
}

function animateButton(btn, correct) {
  btn.classList.add(correct ? 'correct' : 'wrong');
  setTimeout(() => btn.classList.remove('correct', 'wrong'), 800);
}

function chooseWordHuntOptions() {
  const randomWords = shuffle(words).slice(0, 8);
  targetWord = randomWords[Math.floor(Math.random() * randomWords.length)];
  const decoyPool = shuffle(words.filter((w) => w.word !== targetWord.word));
  const desiredTotal = Math.random() > 0.5 ? 4 : 3;
  const decoysNeeded = desiredTotal - 1;
  const decoys = decoyPool.slice(0, decoysNeeded);
  return shuffle([targetWord, ...decoys]);
}

function chooseSightPrompt() {
  const prompt = sightWordDeck[Math.floor(Math.random() * sightWordDeck.length)];
  targetWord = { word: prompt.word, emoji: prompt.emoji };
  const options = shuffle(prompt.options).slice(0, Math.max(3, Math.min(4, prompt.options.length)));
  if (!options.includes(prompt.word)) {
    options.pop();
    options.push(prompt.word);
  }
  return shuffle(options);
}

function renderSightRound() {
  const options = chooseSightPrompt();
  emojiDisplay.textContent = targetWord.emoji;
  emojiDisplay.setAttribute('aria-label', `${targetWord.word} emoji clue`);
  emojiHint.textContent = 'Which word matches this emoji?';
  wordChoices.innerHTML = '';
  options.forEach((wordOption, idx) => {
    const btn = document.createElement('button');
    btn.className = 'word-button';
    btn.textContent = formatWord(wordOption);
    btn.setAttribute('aria-label', `Option ${idx + 1}: ${wordOption}`);
    btn.addEventListener('click', () => handleChoice(wordOption, btn));
    wordChoices.appendChild(btn);
  });
}

function renderWordHuntRound() {
  const options = chooseWordHuntOptions();
  emojiDisplay.textContent = targetWord.emoji;
  emojiDisplay.setAttribute('aria-label', `${targetWord.word} emoji clue`);
  emojiHint.innerHTML = `Match this word: <strong>${formatWord(targetWord.word)}</strong>`;
  wordChoices.innerHTML = '';
  options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'word-button';
    btn.textContent = formatWord(opt.word);
    btn.setAttribute('aria-label', `Option ${idx + 1}: ${opt.word}`);
    btn.addEventListener('click', () => handleChoice(opt.word, btn));
    wordChoices.appendChild(btn);
  });
}

function renderRound() {
  const playStyle = getPlayStyle();
  if (playStyle === 'sight') {
    renderSightRound();
  } else {
    renderWordHuntRound();
  }
}

async function handleChoice(word, button) {
  const isCorrect = word === targetWord.word;
  updateStorageStats(isCorrect);
  updateStatsUI();
  wordChoices.querySelectorAll('button').forEach((btn) => (btn.disabled = true));
  animateButton(button, isCorrect);

  if (isCorrect) {
    AudioKit.success();
    showSparkles();
    await lightNextLetter();
  } else {
    AudioKit.error();
    if (currentMode === 'quick') {
      await lightNextLetter();
    }
  }

  roundsPlayed += 1;

  setTimeout(() => {
    checkEndConditions();
  }, 550);
}

async function lightNextLetter() {
  const totalLetters = marqueeLetterCount();
  marqueeProgress = Math.min(marqueeProgress + 1, totalLetters);
  updateMarqueeDisplay(marqueeProgress);
  await browser.storage.local.set({ marqueeProgress });
}

function checkEndConditions() {
  const totalLetters = marqueeLetterCount();
  if (currentMode === 'quick' && roundsPlayed >= 10) {
    launchConfetti();
    AudioKit.celebrate();
    openCelebration('Quick 10 finished!', 'Amazing focus, Sloane! Ready for another set of 10?');
    quickMarqueeLevel = (quickMarqueeLevel + 1) % quickMarqueeCycle.length;
    setMarqueeText(quickMarqueeCycle[quickMarqueeLevel]);
    roundsPlayed = 0;
    startRound();
    return;
  }

  if ((currentMode === 'sight' || currentMode === 'marquee') && marqueeProgress >= totalLetters) {
    launchConfetti();
    AudioKit.celebrate();
    openCelebration('Marquee Party!', 'You lit PRINCESS SLOANE all the way. Take a bow!');
    resetMarqueeProgress();
    roundsPlayed = 0;
    startRound();
    return;
  }

  startRound();
}

function openCelebration(title, message) {
  celebrationTitle.textContent = title;
  celebrationMessage.textContent = message;
  celebration.classList.add('active');
  celebration.setAttribute('aria-hidden', 'false');
}

celebrationClose.addEventListener('click', () => {
  celebration.classList.remove('active');
  celebration.setAttribute('aria-hidden', 'true');
  startRound();
});

function startRound() {
  renderRound();
}

async function init() {
  buildMarquee();
  await loadState();
  setMode('sight');

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
  });

  audioToggle.addEventListener('click', async () => {
    settings.audioEnabled = !settings.audioEnabled;
    applySettings();
    await browser.storage.local.set({ settings });
  });
}

init();
