export interface AscentProps {
  /** Enables the traveling-light + breathing-endpoint animation. Off by default. */
  motion?: boolean;
  className?: string;
}

const PATH_PAST = "M 14 296 L 96 296 L 96 246 L 178 246 L 178 262 L 252 262 L 252 196 L 336 196";
const PATH_CLIMB = "M 336 196 L 336 128 L 418 128 L 418 64 L 484 64";
const PATH_FULL = `${PATH_PAST} L 336 128 L 418 128 L 418 64 L 484 64`;

/**
 * The Groundcontrol signature graphic: a step-line climbing up and to the
 * right, ending in a glowing "NOW" endpoint. With `motion`, a small light
 * travels the path every ~6s and the endpoint breathes — both disabled
 * under prefers-reduced-motion.
 */
export function Ascent({ motion = false, className = "" }: AscentProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 500 320"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ascent-dawn" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="var(--color-accent-hot)" />
            <stop offset="1" stopColor="var(--color-amber)" />
          </linearGradient>
        </defs>
        <path
          d={PATH_PAST}
          stroke="var(--foreground)"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={PATH_CLIMB}
          stroke="url(#ascent-dawn)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="96" cy="296" r="2.5" fill="var(--foreground)" fillOpacity="0.3" />
        <circle cx="178" cy="246" r="2.5" fill="var(--foreground)" fillOpacity="0.3" />
        <circle cx="252" cy="262" r="2.5" fill="var(--foreground)" fillOpacity="0.3" />
        <circle cx="336" cy="196" r="2.5" fill="var(--foreground)" fillOpacity="0.3" />
        <circle cx="418" cy="128" r="2.5" fill="var(--color-accent)" fillOpacity="0.55" />
        <circle cx="484" cy="64" r="9" fill="var(--color-accent)" fillOpacity="0.14" />
        {motion && (
          <circle
            cx="484"
            cy="64"
            r="6"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.5"
            className="motion-safe:animate-[ascent-breathe_2.6s_cubic-bezier(0.2,0.6,0.4,1)_infinite] origin-center [transform-box:fill-box]"
          />
        )}
        <circle cx="484" cy="64" r="5" fill="var(--color-accent)" />
        {motion && (
          <circle
            r="4.5"
            fill="var(--color-accent-hot)"
            style={{ offsetPath: `path('${PATH_FULL}')`, offsetRotate: "0deg" }}
            className="motion-safe:animate-[ascent-travel_6.5s_cubic-bezier(0.45,0.05,0.35,0.95)_infinite] drop-shadow-[0_0_5px_var(--color-accent-hot)]"
          />
        )}
      </svg>
    </div>
  );
}
