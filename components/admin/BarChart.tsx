"use client";

interface Bar {
  label: string;
  value: number;
}

export default function BarChart({ data, color = "#f59e0b" }: { data: Bar[]; color?: string }) {
  const max = Math.max(...data.map(d => d.value), 1);
  const H = 120;
  const BAR_W = 28;
  const GAP = 12;
  const W = data.length * (BAR_W + GAP) - GAP;

  return (
    <div className="overflow-x-auto">
      <svg width={W} height={H + 30} className="min-w-full">
        {data.map((d, i) => {
          const barH = Math.max(4, (d.value / max) * H);
          const x = i * (BAR_W + GAP);
          return (
            <g key={i}>
              <rect
                x={x} y={H - barH} width={BAR_W} height={barH}
                rx={4} fill={color} opacity={0.85}
              />
              <text
                x={x + BAR_W / 2} y={H + 16}
                textAnchor="middle" fontSize={10} fill="#9ca3af"
              >
                {d.label}
              </text>
              {d.value > 0 && (
                <text
                  x={x + BAR_W / 2} y={H - barH - 4}
                  textAnchor="middle" fontSize={9} fill="#6b7280"
                >
                  {d.value >= 1000 ? `${(d.value / 1000).toFixed(1)}k` : d.value}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
