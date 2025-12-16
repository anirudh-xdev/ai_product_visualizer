export function Logo() {
  return (
    <svg
      width="512"
      height="512"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <polygon
        points="256 40 420 136 420 328 256 424 92 328 92 136"
        stroke="#D46CFF"
        stroke-width="18"
        fill="none"
      />

      <polygon
        points="256 92 376 160 376 304 256 372 136 304 136 160"
        stroke="#39D6FF"
        stroke-width="16"
        fill="none"
      />

      <line
        x1="256"
        y1="92"
        x2="256"
        y2="372"
        stroke="#39D6FF"
        stroke-width="10"
      />
      <line
        x1="136"
        y1="160"
        x2="376"
        y2="304"
        stroke="#39D6FF"
        stroke-width="10"
      />
      <line
        x1="376"
        y1="160"
        x2="136"
        y2="304"
        stroke="#39D6FF"
        stroke-width="10"
      />
      <circle cx="256" cy="92" r="12" fill="#39D6FF" />
      <circle cx="376" cy="160" r="12" fill="#39D6FF" />
      <circle cx="376" cy="304" r="12" fill="#39D6FF" />
      <circle cx="256" cy="372" r="12" fill="#39D6FF" />
      <circle cx="136" cy="304" r="12" fill="#39D6FF" />
      <circle cx="136" cy="160" r="12" fill="#39D6FF" />

      <polygon
        points="256 180 304 208 304 264 256 292 208 264 208 208"
        fill="#1F2937"
        stroke="#9AE6FF"
        stroke-width="8"
      />
    </svg>
  );
}
