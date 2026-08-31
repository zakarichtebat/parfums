// Transition fluide en vague entre la zone bleu nuit et la zone blanche.
export default function WaveDivider() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -bottom-px leading-[0]">
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="block h-[110px] w-full sm:h-[150px] lg:h-[190px]"
        aria-hidden="true"
      >
        {/* vague d'arriere-plan, plus claire */}
        <path
          fill="#ffffff"
          fillOpacity="0.12"
          d="M0,132 C160,74 300,196 470,166 C640,136 720,44 900,62 C1080,80 1180,178 1310,168 C1380,162 1420,142 1440,130 L1440,220 L0,220 Z"
        />
        {/* vague principale */}
        <path
          fill="#ffffff"
          d="M0,158 C150,104 290,214 460,186 C630,158 706,78 884,96 C1062,114 1176,196 1306,188 C1374,184 1416,168 1440,156 L1440,220 L0,220 Z"
        />
      </svg>
    </div>
  )
}
