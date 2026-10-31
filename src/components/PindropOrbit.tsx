import './pindrop.css';
import { useState } from 'react';

const roles = [
  { name: 'Astronaut', className: 'Orbital explorer', badges: ['Void', 'Focus', 'Hero'], summary: 'Drift between stars and distant worlds, reading the map of the universe by instinct.', power: 89, focus: 74, steel: 63, color: '#78d9ff' },
  { name: 'Ninja', className: 'Silent striker', badges: ['Stealth', 'Speed', 'Shadow'], summary: 'Move like a thought through the dark and strike before the room learns your name.', power: 84, focus: 91, steel: 76, color: '#6df0c8' },
  { name: 'Dragon Rider', className: 'Skybound tactician', badges: ['Air', 'Fire', 'Will'], summary: 'Command the heavens from a winged companion and force the battlefield into obedience.', power: 93, focus: 68, steel: 82, color: '#ff9d5c' },
  { name: 'Detective', className: 'Case solver', badges: ['Logic', 'Clue', 'Truth'], summary: 'Read contradictions, notice patterns, and uncover the secret hidden in plain sight.', power: 62, focus: 95, steel: 71, color: '#85c9ff' },
  { name: 'Pirate', className: 'Storm captain', badges: ['Crew', 'Risk', 'Treasure'], summary: 'Turn chaos into momentum and claim victory with a bold grin and a better plan.', power: 81, focus: 63, steel: 84, color: '#ffd166' },
  { name: 'Knight', className: 'Frontline defender', badges: ['Honor', 'Shield', 'Valor'], summary: 'Hold the line, protect the innocent, and carry the weight of a promise.', power: 88, focus: 71, steel: 92, color: '#9db5ff' },
  { name: 'Mage', className: 'Arcane scholar', badges: ['Rune', 'Wisdom', 'Spell'], summary: 'Bend reality with a whisper, a sigil, and unshaken confidence.', power: 96, focus: 81, steel: 57, color: '#b390ff' },
  { name: 'Rogue', className: 'Quick thinker', badges: ['Cunning', 'Escape', 'Grit'], summary: 'Never play fair when the edge of a plan is enough to win the room.', power: 79, focus: 88, steel: 68, color: '#96f7d2' },
  { name: 'Samurai', className: 'Disciplined blade', badges: ['Honor', 'Balance', 'Focus'], summary: 'Stand still, calm the heartbeat, and cut with absolute purpose.', power: 90, focus: 83, steel: 87, color: '#f4a261' },
  { name: 'Witch', className: 'Moonlit caster', badges: ['Hex', 'Fate', 'Trick'], summary: 'Whisper to the unseen and turn luck itself into a weapon.', power: 87, focus: 77, steel: 60, color: '#d29bff' },
  { name: 'Cyborg', className: 'Combat augment', badges: ['Steel', 'Tech', 'Reinforce'], summary: 'Merge instinct with circuitry and become faster, sharper, and merciless.', power: 86, focus: 79, steel: 94, color: '#8ecae6' },
  { name: 'Ranger', className: 'Wild pathfinder', badges: ['Nature', 'Aim', 'Trail'], summary: 'Read the land, track the hidden, and move with patient precision.', power: 75, focus: 87, steel: 78, color: '#90be6d' },
  { name: 'Spy', className: 'Information broker', badges: ['Disguise', 'Intel', 'Quiet'], summary: 'Know the secret before the room knows the problem.', power: 70, focus: 94, steel: 66, color: '#9cc9ff' },
  { name: 'Monk', className: 'Inner discipline', badges: ['Zen', 'Balance', 'Flow'], summary: 'Turn stillness into power and pain into opportunity.', power: 83, focus: 88, steel: 77, color: '#7bdff2' },
  { name: 'Bard', className: 'Storyweaver', badges: ['Voice', 'Charm', 'Verse'], summary: 'Paint emotion into reality and turn a crowd into allies.', power: 64, focus: 82, steel: 58, color: '#ffc8dd' },
  { name: 'Alchemist', className: 'Formula master', badges: ['Brew', 'Risk', 'Invent'], summary: 'Blend reaction with intuition and create solutions no one saw coming.', power: 82, focus: 86, steel: 62, color: '#9ef0d0' },
  { name: 'Architect', className: 'Vision builder', badges: ['Design', 'Scale', 'Plan'], summary: 'Take structure from concept to world-shaping masterpiece.', power: 68, focus: 90, steel: 73, color: '#a9d6e5' },
  { name: 'Pilot', className: 'Sky command', badges: ['Flight', 'Response', 'Risk'], summary: 'Handle pressure, read momentum, and leave the impossible in your wake.', power: 78, focus: 81, steel: 72, color: '#7bdff2' },
  { name: 'Mechanic', className: 'Gearwright', badges: ['Repair', 'Forge', 'Scale'], summary: 'Turn broken systems into instruments of precision and power.', power: 72, focus: 78, steel: 87, color: '#ffb703' },
  { name: 'Scribe', className: 'Knowledge keeper', badges: ['Memory', 'Insight', 'Recite'], summary: 'Archive legend, decode motive, and preserve the truth for future heroes.', power: 61, focus: 92, steel: 59, color: '#cdb4db' },
  { name: 'Explorer', className: 'Frontier scout', badges: ['Map', 'Wonder', 'Risk'], summary: 'Step into the unknown with fearless curiosity and a map you make as you go.', power: 74, focus: 86, steel: 69, color: '#8ecae6' },
  { name: 'Guardian', className: 'Duty bearer', badges: ['Shield', 'Stand', 'Protect'], summary: 'Where courage fails, your stance becomes a fortress.', power: 87, focus: 74, steel: 96, color: '#90e0ef' },
  { name: 'Prophet', className: 'Future whisperer', badges: ['Vision', 'Fate', 'Truth'], summary: 'Sense the shape of tomorrow and move before the prophecy is spoken aloud.', power: 77, focus: 94, steel: 56, color: '#d5aaff' },
  { name: 'Warlock', className: 'Dealmaker', badges: ['Pact', 'Power', 'Will'], summary: 'Trade in ambition, master forbidden insight, and command outcomes others fear.', power: 94, focus: 79, steel: 63, color: '#c77dff' },
  { name: 'Healer', className: 'Vital spark', badges: ['Restore', 'Compassion', 'Rescue'], summary: 'Stabilize chaos, save lives, and keep hope alive in the worst circumstances.', power: 69, focus: 90, steel: 67, color: '#8ef0c3' },
  { name: 'Assassin', className: 'Silent end', badges: ['Precision', 'Speed', 'Edge'], summary: 'Every move is deliberate, every strike a perfect sentence.', power: 85, focus: 92, steel: 80, color: '#ff7f50' },
  { name: 'Paladin', className: 'Beacon of law', badges: ['Justice', 'Courage', 'Valor'], summary: 'Fight with conviction, lead by example, and hold hope above fear.', power: 91, focus: 76, steel: 90, color: '#bde0fe' },
  { name: 'Trickster', className: 'Chaos agent', badges: ['Joke', 'Shift', 'Twist'], summary: 'Turn the absurd into an advantage and leave the room laughing while you win.', power: 73, focus: 85, steel: 61, color: '#ffb3c1' },
  { name: 'Sorcerer', className: 'Reality shaper', badges: ['Arcana', 'Force', 'Wild'], summary: 'Shape the impossible, compel the improbable, and dominate the moment.', power: 97, focus: 80, steel: 58, color: '#b8c0ff' },
  { name: 'Chef', className: 'Flame master', badges: ['Flavor', 'Focus', 'Warmth'], summary: 'Make momentum out of ingredients, energy, and a little daring improvisation.', power: 66, focus: 81, steel: 70, color: '#ff9f1c' },
  { name: 'Inventor', className: 'Prototype genius', badges: ['Build', 'Solve', 'Future'], summary: 'Turn imagination into tools that rewrite the battlefield.', power: 80, focus: 87, steel: 74, color: '#70d6ff' },
  { name: 'Hunter', className: 'Target seeker', badges: ['Track', 'Alert', 'Strike'], summary: 'Hunt with calm precision until the field belongs to your instincts.', power: 78, focus: 88, steel: 83, color: '#90be6d' },
  { name: 'Druid', className: 'Verdant sage', badges: ['Nature', 'Growth', 'Spirit'], summary: 'Listen to the world around you and work with its rhythm, not against it.', power: 81, focus: 84, steel: 66, color: '#7ae582' },
  { name: 'Mercenary', className: 'Contract killer', badges: ['Pay', 'Edge', 'Focus'], summary: 'Win the fight no matter the cost, because the contract always favors the prepared.', power: 83, focus: 78, steel: 88, color: '#f4a261' },
  { name: 'Scholar', className: 'Theory breaker', badges: ['Study', 'Logic', 'Insight'], summary: 'Connect missing facts into a complete picture before others finish the first sentence.', power: 67, focus: 95, steel: 64, color: '#c8d5ff' },
  { name: 'Stormcaller', className: 'Sky breaker', badges: ['Tempest', 'Charge', 'Thunder'], summary: 'Turn pressure into lightning and bring order to a storm by choice.', power: 94, focus: 75, steel: 70, color: '#78d9ff' },
  { name: 'Phantom', className: 'Fear in motion', badges: ['Veil', 'Ambush', 'Quiet'], summary: 'Fade into uncertainty and return with the answer hidden in the silence.', power: 76, focus: 90, steel: 65, color: '#d0d0ff' },
  { name: 'Beastmaster', className: 'Bonded hunter', badges: ['Wild', 'Trust', 'Bond'], summary: 'Command the field through instinct, loyalty, and total awareness of the pack.', power: 82, focus: 72, steel: 86, color: '#6fe7a3' },
  { name: 'Enchanter', className: 'Charmweaver', badges: ['Dread', 'Grace', 'Rune'], summary: 'Influence outcomes with subtlety, elegance, and impossible timing.', power: 88, focus: 86, steel: 60, color: '#b8c0ff' },
  { name: 'Warden', className: 'Boundary keeper', badges: ['Wall', 'Guard', 'Will'], summary: 'Protect the threshold, hold the line, and never let the dark through.', power: 90, focus: 72, steel: 93, color: '#a9d6e5' },
  { name: 'Seer', className: 'Vision keeper', badges: ['Premonition', 'Truth', 'Dream'], summary: 'See what others miss and guide the choices of everyone around you.', power: 71, focus: 96, steel: 57, color: '#cdb4db' },
  { name: 'Tinkerer', className: 'Mechanized mind', badges: ['Prototype', 'Adapt', 'Fix'], summary: 'Repurpose the impossible into a perfect answer hidden inside the chaos.', power: 75, focus: 87, steel: 81, color: '#90dbf4' },
  { name: 'Diplomat', className: 'Peacebroker', badges: ['Calm', 'Reason', 'Trust'], summary: 'Turn tension into cooperation and make solutions feel inevitable.', power: 64, focus: 91, steel: 68, color: '#9ad1d4' },
  { name: 'Titan', className: 'Mountain force', badges: ['Strength', 'Ground', 'Resolve'], summary: 'Stand like a mountain and carry the fight with crushing certainty.', power: 98, focus: 61, steel: 96, color: '#f4a261' },
  { name: 'Sniper', className: 'Long-range finisher', badges: ['Aim', 'Calm', 'Exact'], summary: 'Wait for the perfect angle, then end the problem before it notices you.', power: 84, focus: 90, steel: 79, color: '#a9d6e5' },
  { name: 'Smuggler', className: 'Shadow courier', badges: ['Route', 'Risk', 'Move'], summary: 'Navigate danger with nerve, speed, and a plan no one else can read.', power: 77, focus: 82, steel: 74, color: '#cdb4db' },
  { name: 'Vanguard', className: 'Breaker of fronts', badges: ['Charge', 'Lead', 'Steel'], summary: 'Open the way, absorb impact, and never ask anyone else to do what you won’t.', power: 92, focus: 70, steel: 94, color: '#ffb703' },
  { name: 'Oracle', className: 'Reality reader', badges: ['Path', 'Fate', 'Reveal'], summary: 'Speak truth into uncertainty and let the room decide whether to follow the vision.', power: 73, focus: 97, steel: 58, color: '#d4a373' },
  { name: 'Whisperer', className: 'Hidden influence', badges: ['Subtle', 'Instinct', 'Flow'], summary: 'Speak softly, shift perception, and move the room without ever raising a hand.', power: 69, focus: 94, steel: 62, color: '#c5cae9' },
  { name: 'Slayer', className: 'Final answer', badges: ['Resolve', 'Blood', 'Edge'], summary: 'When the moment calls, you become the end of the story.', power: 95, focus: 78, steel: 91, color: '#ff6b6b' },
];

export default function PindropOrbit() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRole = roles[activeIndex] ?? roles[0];

  return (
    <div className="pindrop-root">
      <div className="scene-shell">
        <div className="hud">
          <div className="brand">
            <span className="brand-mark" />
            <span>Pindrop</span>
          </div>
          <div className="counter">
            <span>{roles.length} roles</span>
          </div>
        </div>

        <div className="scene">
          <div className="orbit" aria-label="Pindrop role orbit">
            <div className="ring r1" />
            <div className="ring r2" />
            <div className="ring r3" />
            <div className="core">
              <div className="core-label">Pindrop</div>
            </div>

            {roles.map((role, index) => {
              const angle = (index / roles.length) * Math.PI * 2;
              const radius = 240 + (index % 4) * 18;
              const isActive = index === activeIndex;
              const cardStyle = {
                ['--angle' as string]: `${angle}rad`,
                ['--radius' as string]: `${radius}px`,
                ['--size' as string]: index % 2 === 0 ? '92px' : '86px',
              };

              return (
                <button
                  key={role.name}
                  type="button"
                  className={`role-card ${isActive ? 'active' : ''}`}
                  style={cardStyle}
                  onClick={() => setActiveIndex(index)}
                >
                  <span
                    className="role-dot"
                    style={{
                      background: role.color,
                      boxShadow: `0 0 14px ${role.color}`,
                    }}
                  />
                  <span className="role-name">{role.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <aside className="panel">
        <div className="panel-top">
          <span className="eyebrow">Role selected</span>
          <span className="tiny">Live</span>
        </div>

        <div className="role-panel">
          <h1 className="role-name-large">{activeRole.name}</h1>
          <div className="classline">{activeRole.className}</div>

          <div className="badge-row">
            {activeRole.badges.map((badge) => (
              <span key={badge} className="badge">
                {badge}
              </span>
            ))}
          </div>

          <p className="summary">{activeRole.summary}</p>

          <div className="stats">
            <div className="stat">
              <span className="stat-label">Power</span>
              <span className="stat-value">{activeRole.power}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Focus</span>
              <span className="stat-value">{activeRole.focus}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Steel</span>
              <span className="stat-value">{activeRole.steel}</span>
            </div>
          </div>

          <button type="button" className="play-btn">
            Play as role
          </button>

          <div className="mini-map">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="mini" />
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
