# Princess Sloane Sight Words

A cozy Thunderbird MailExtension mini-game that helps kindergartener Sloane practice sight words under a glowing marquee. Players match emoji clues to big, friendly word buttons to light up **PRINCESS SLOANE** letter by letter.

## Install in Thunderbird
1. Open Thunderbird and go to **Add-ons and Themes**.
2. Use the gear menu to choose **Install Add-on From File…**.
3. Pick the downloaded folder or a packaged zip of this project (ensure the root contains `manifest.json`).
4. Pin the Princess Sloane button to your toolbar, then click it to open the game popup.

## Game Modes
- **Practice** – Endless cozy rounds to build confidence.
- **Quick 10** – Ten prompts with a gentle wrap-up screen.
- **Marquee Party** – Play until every letter in "PRINCESS SLOANE" glows, then celebrate.

Progress (streaks, accuracy, stars, and marquee lights) is saved locally so Sloane’s wins persist between sessions.

## Options & Accessibility
Open the add-on’s **Options** page to:
- Toggle gentle audio feedback.
- Pick a font size: Small, Medium, or Extra Big.
- Switch between lowercase or UPPERCASE word buttons.
- Check “Today’s Progress” at a glance.

Buttons are large, high contrast, and keyboard/ARIA friendly. Colors avoid flashing; sounds are soft with a mute toggle saved to storage.

## Customize the Sight-Word List
The built-in bank lives in [`game.js`](./game.js) inside the `words` array. Each entry includes a `word`, `emoji`, and short `hint` string. To customize:
1. Edit or add objects in the `words` array (keep at least 100 entries for variety).
2. Reload the add-on in Thunderbird to apply changes.

## Adjusting Difficulty Over Time
- Start with **lowercase** and **Medium** font. Increase to **Extra Big** if Sloane prefers extra clarity during game-time excitement.
- Switch to **UPPERCASE** once lowercase recognition is strong to practice print awareness.
- Use **Quick 10** for short focus sessions; graduate to **Marquee Party** for longer play and celebration of endurance.
- Add trickier sight words (while keeping emoji clues friendly) to the `words` array as Sloane progresses.

## Project Structure
```
manifest.json   # Thunderbird MailExtension manifest
background.js   # Initializes default settings and daily tracking
icons/          # Add-on icons
game.html/css/js# The playable popup experience
options.html/css/js # Settings and daily progress view
README.md       # This guide
LICENSE
```

Enjoy the show—Princess Sloane’s marquee is waiting to light up! ✨
