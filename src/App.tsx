import { useMemo, useState } from 'react';

type Character = {
  id: string;
  name: string;
  title: string;
  color: string;
  accent: string;
  mood: string;
  bio: string;
  voiceHint: string;
  location: { x: number; y: number };
  lines: string[];
};

const characters: Character[] = [
  {
    id: 'bloom',
    name: 'Bloom',
    title: 'Sunbeam Scout',
    color: '#ffd166',
    accent: '#ff9f43',
    mood: 'Joyful',
    bio: 'A bright little explorer who turns every puddle into a disco and every hallway into a party.',
    voiceHint: 'Warm, cheerful, playful',
    location: { x: 14, y: 22 },
    lines: [
      'Hiya, adventurer! The sky is sparkling and the town is ready for a grand adventure!',
      'Let’s bounce to the lantern plaza and find the funniest thing in town.',
      'I can tell you’re here for a good time. I love a brave friend with a silly idea!',
      'My favorite game is chasing the giggling cloud sprites through the garden maze.',
    ],
  },
  {
    id: 'tink',
    name: 'Tink',
    title: 'Pocket Inventor',
    color: '#7ae582',
    accent: '#00b4d8',
    mood: 'Curious',
    bio: 'A tinkerer with a backpack full of gears, candy magnets, and tiny magical machines.',
    voiceHint: 'Eager, quick, techy',
    location: { x: 42, y: 16 },
    lines: [
      'Ah! I’ve been tuning the town’s moon valve. If you help, I’ll show you the secret launch chute!',
      'Every invention starts with a curious question and a tiny bit of chaos.',
      'I built a snack-powered drone once. It only exploded in glitter, and honestly it was a success.',
      'Want to hear the secret recipe for rainbow boots? It involves sparks, velvet, and a lot of courage.',
    ],
  },
  {
    id: 'mira',
    name: 'Mira',
    title: 'Lantern Singer',
    color: '#ff7eb6',
    accent: '#ffb3c1',
    mood: 'Dreamy',
    bio: 'A velvet-voiced performer who can turn a crowded square into a glowing celebration.',
    voiceHint: 'Smooth, melodic, gentle',
    location: { x: 67, y: 34 },
    lines: [
      'The night hums differently when someone is listening. Tell me what song you want to hear.',
      'A good song can wake the sleepy lanterns and make the whole town laugh.',
      'I taught the river to hum in harmony once. It was a very dramatic evening.',
      'If you need courage, let the music do half the work for you.',
    ],
  },
  {
    id: 'bruno',
    name: 'Bruno',
    title: 'Storm Knight',
    color: '#80bfff',
    accent: '#90e0ef',
    mood: 'Brave',
    bio: 'A gentle giant with a thunder gift and a heart even bigger than his boots.',
    voiceHint: 'Bold, calm, confident',
    location: { x: 78, y: 58 },
    lines: [
      'A knight’s best magic is listening before swinging. What’s your plan, friend?',
      'I can hold the line all day, but the real heroes are the ones who make others feel safe.',
      'The storm doesn’t frighten me. I just prefer to dance with it instead of running from it.',
      'If the road gets rough, I’ll walk beside you and make the path brighter.',
    ],
  },
  {
    id: 'nori',
    name: 'Nori',
    title: 'Moonling Whisperer',
    color: '#b197fc',
    accent: '#cdb4db',
    mood: 'Mischievous',
    bio: 'An elusive charm expert who knows every hidden path, secret joke, and moonlit shortcut.',
    voiceHint: 'Whispery, sly, amused',
    location: { x: 35, y: 64 },
    lines: [
      'Psst. The best adventures begin when no one is looking. Want a secret route?',
      'A little mystery is good for the soul. It keeps the town from getting too boring.',
      'I once traded a moon pie for a dragon’s map. It was worth it. Mostly.',
      'If you’re feeling nervous, laugh first. It always unsettles the shadows.',
    ],
  },
  {
    id: 'pogo',
    name: 'Pogo',
    title: 'Mossy Guide',
    color: '#a0d468',
    accent: '#2ec4b6',
    mood: 'Grounded',
    bio: 'A giant mossy explorer who reads weather, trails, and vibes better than anybody in Pindrop.',
    voiceHint: 'Deep, mellow, friendly',
    location: { x: 58, y: 76 },
    lines: [
      'Step softly. The forest can hear your thoughts. It prefers friendly ones.',
      'You don’t need to rush a good path. The right step usually finds you when you’re ready.',
      'I know every trail in town. Some of them are hidden in the laughter of the birds.',
      'If the world feels too loud, follow the wind for a while. It will help you remember your name.',
    ],
  },
];

const starterMessages = [
  'Welcome to Pindrop! The town is buzzing with friendly faces and adventure. Pick a character and start the fun.',
  'This world is full of tiny surprises. Ask a resident about a quest, a song, or a secret shortcut.',
  'A little chaos is part of the magic here. Try talking to someone and see what they say back.',
];

const pickReply = (character: Character, playerText: string) => {
  const lower = playerText.toLowerCase();

  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return `${character.name} beams. “${character.lines[0]}”`;
  }

  if (lower.includes('quest') || lower.includes('adventure') || lower.includes('mission')) {
    return `${character.name} leans in. “Let’s make something delightful happen. Follow the glow, trust the music, and the town will guide you!”`;
  }

  if (lower.includes('song') || lower.includes('music') || lower.includes('dance')) {
    return `${character.name} laughs. “Then we dance through the lantern square! The best stories always start with a rhythm.”`;
  }

  if (lower.includes('secret') || lower.includes('hidden') || lower.includes('shortcut')) {
    return `${character.name} whispers. “The secret path is the one that feels like a joke and turns into a treasure.”`;
  }

  if (lower.includes('friend') || lower.includes('help')) {
    return `${character.name} nods proudly. “I’ll always help a brave visitor. Let’s make this town unforgettable together.”`;
  }

  const randomLine = character.lines[Math.floor(Math.random() * character.lines.length)];
  return `${character.name} says, “${randomLine}”`;
};

export default function App() {
  const [selectedId, setSelectedId] = useState('bloom');
  const [chat, setChat] = useState([
    { speaker: 'system', text: starterMessages[0] },
    { speaker: 'bloom', text: 'Hiya, adventurer! The sky is sparkling and the town is ready for a grand adventure!' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [voiceOn, setVoiceOn] = useState(true);

  const activeCharacter = useMemo(
    () => characters.find((character) => character.id === selectedId) ?? characters[0],
    [selectedId],
  );

  const speakText = (text: string) => {
    if (!voiceOn || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((voice) => /en/i.test(voice.lang)) ?? voices[0];

    utterance.voice = preferredVoice ?? null;
    utterance.rate = 1.05;
    utterance.pitch = 1.2;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleCharacterSelect = (character: Character) => {
    setSelectedId(character.id);
    const welcomeLine = `${character.name} waves hello. “${character.lines[0]}”`;

    setChat((previous) => [
      ...previous,
      { speaker: 'system', text: `You turned toward ${character.name}.` },
      { speaker: character.id, text: welcomeLine },
    ]);

    speakText(character.lines[0]);
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();

    if (!trimmed) {
      return;
    }

    const reply = pickReply(activeCharacter, trimmed);

    setChat((previous) => [
      ...previous,
      { speaker: 'you', text: trimmed },
      { speaker: activeCharacter.id, text: reply },
    ]);

    speakText(reply.replace(/^.*?“|”$/g, '').replace(/^[^\w]+/, ''));
    setInputValue('');
  };

  return (
    <div className="game-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark" />
          <div>
            <div className="eyebrow">Interactive town</div>
            <h1>Pindrop</h1>
          </div>
        </div>

        <div className="hud-stats">
          <div className="stat-pill">
            <span className="label">Town vibe</span>
            <strong>Playful</strong>
          </div>
          <div className="stat-pill">
            <span className="label">Characters</span>
            <strong>{characters.length}</strong>
          </div>
        </div>
      </header>

      <main className="game-layout">
        <section className="world-panel">
          <div className="sky-glow" />
          <div className="floating-stars" aria-hidden="true" />

          <div className="main-island">
            {characters.map((character) => {
              const isSelected = character.id === selectedId;
              const x = character.location.x;
              const y = character.location.y;

              return (
                <button
                  key={character.id}
                  type="button"
                  className={`npc ${isSelected ? 'selected' : ''}`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => handleCharacterSelect(character)}
                  aria-label={`Select ${character.name}`}
                >
                  <span className="npc-shadow" />
                  <span
                    className="npc-avatar"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, white, ${character.color} 28%, ${character.accent} 72%, #202347 100%)`,
                      boxShadow: `0 0 26px ${character.color}`,
                    }}
                  />
                  <span className="npc-name">{character.name}</span>
                </button>
              );
            })}
          </div>

          <div className="quest-card">
            <div className="quest-tag">Town quest</div>
            <h2>Collect the giggle lanterns</h2>
            <p>
              Help Pindrop light its festival path, meet its favorite characters, and chase the
              hidden moon-sparkles across the village.
            </p>
          </div>
        </section>

        <aside className="sidebar-panel">
          <div className="character-card">
            <div
              className="character-avatar"
              style={{
                background: `radial-gradient(circle at 30% 30%, white, ${activeCharacter.color} 30%, ${activeCharacter.accent} 68%, #1b1e33 100%)`,
              }}
            />

            <div className="character-header">
              <span className="eyebrow">{activeCharacter.title}</span>
              <h2>{activeCharacter.name}</h2>
              <span className="mood-badge">{activeCharacter.mood}</span>
            </div>

            <p>{activeCharacter.bio}</p>

            <div className="trait-row">
              <span>Voice</span>
              <strong>{activeCharacter.voiceHint}</strong>
            </div>

            <div className="action-row">
              <button type="button" className="primary" onClick={() => speakText(activeCharacter.lines[0])}>
                Play intro
              </button>
              <button
                type="button"
                className="secondary"
                onClick={() => setVoiceOn((previous) => !previous)}
              >
                {voiceOn ? 'Voice on' : 'Voice off'}
              </button>
            </div>
          </div>

          <div className="chat-panel">
            <div className="chat-header">
              <h3>Talk to {activeCharacter.name}</h3>
              <span className="chat-status">Live</span>
            </div>

            <div className="chat-log">
              {chat.map((entry, index) => (
                <div key={`${entry.speaker}-${index}`} className={`message ${entry.speaker}`}>
                  <span className="speaker">{entry.speaker === 'you' ? 'You' : entry.speaker === 'system' ? 'Pindrop' : activeCharacter.name}</span>
                  <p>{entry.text}</p>
                </div>
              ))}
            </div>

            <div className="composer">
              <input
                type="text"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    handleSend();
                  }
                }}
                placeholder={`Ask ${activeCharacter.name} something...`}
              />
              <button type="button" onClick={handleSend}>
                Send
              </button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
