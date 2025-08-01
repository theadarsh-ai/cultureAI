export default function EmojiTest() {
  const testEmojis = {
    drums: '🥁',
    sax: '🎷', 
    dance: '💃',
    star: '🌟',
    music: '🎼',
    palm: '🌴'
  };

  return (
    <div className="p-4">
      <h3>Emoji Test</h3>
      <div className="flex gap-4">
        {Object.entries(testEmojis).map(([key, emoji]) => (
          <div key={key} className="text-3xl p-2 border">
            {emoji}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <p>Direct emojis: 🥁 🎷 💃 🌟 🎼 🌴</p>
      </div>
    </div>
  );
}