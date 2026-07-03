const cards = [
  {
    name: "Claude",
    from: "from-orange-500",
    to: "to-orange-700",
    tokens: "100M",
    price: "$49",
  },
  {
    name: "Gemini",
    from: "from-blue-500",
    to: "to-blue-700",
    tokens: "100M",
    price: "$39",
  },
  {
    name: "ChatGPT",
    from: "from-emerald-500",
    to: "to-emerald-700",
    tokens: "50M",
    price: "$29",
  },
  {
    name: "Groq",
    from: "from-purple-500",
    to: "to-purple-700",
    tokens: "200M",
    price: "$59",
  },
];

export function Store() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold text-white mb-4">API Token Packs</h1>
        <p className="text-neutral-400 text-lg">Pre-loaded tokens for any provider. We deliver the key to your email.</p>
      </div>

      <div className="relative flex justify-center items-start overflow-hidden" style={{ minHeight: "680px" }}>
        {cards.map((card, i) => {
          const offset = i - 1.5;
          return (
            <div
              key={card.name}
              className="absolute w-[200px]"
              style={{
                transform: `translateX(${offset * 100}px) rotate(${offset * 8}deg) translateY(${30 - Math.abs(offset) * 8}px)`,
                zIndex: 1,
              }}
            >
              <div className={`rounded-xl bg-gradient-to-b ${card.from} ${card.to} p-5 shadow-lg border border-white/10`}>
                <div className="text-center mb-4">
                  <div className="text-3xl font-black text-white tracking-tight">{card.tokens}</div>
                  <div className="text-[10px] text-white/50 uppercase tracking-widest mt-1">Tokens</div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-base font-bold text-white/90">{card.name}</div>
                </div>

                <div className="text-center text-xl font-bold text-white border-t border-white/10 pt-3">{card.price}</div>
              </div>
            </div>
          );
        })}

        <div
          className="relative rounded-2xl border border-neutral-700 bg-neutral-900 p-14 w-full max-w-xl shadow-2xl shadow-black/50"
          style={{ zIndex: 20, marginTop: 100 }}
        >
          <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-neutral-800 text-neutral-500 text-xs border border-neutral-700">
            Coming soon
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Can't find an API?</h2>
          <p className="text-neutral-400 text-base max-w-md mb-6">
            Buy a token pack — we'll send the API key straight to your email. Claude, Gemini, ChatGPT, Groq, and more.
          </p>
          <div className="flex gap-2 flex-wrap">
            <span className="text-xs px-2 py-1 rounded-md bg-neutral-800 text-neutral-400">No subscription</span>
            <span className="text-xs px-2 py-1 rounded-md bg-neutral-800 text-neutral-400">Instant delivery</span>
            <span className="text-xs px-2 py-1 rounded-md bg-neutral-800 text-neutral-400">Use any provider</span>
          </div>
        </div>
      </div>
    </div>
  );
}
