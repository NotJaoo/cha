import { useEffect, useState } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: Date): TimeLeft {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const targetDate = new Date("2026-10-10T00:00:00");
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft(targetDate);
      setTimeLeft(remaining);
      if (
        remaining.days === 0 &&
        remaining.hours === 0 &&
        remaining.minutes === 0 &&
        remaining.seconds === 0
      ) {
        setIsOver(true);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (isOver) {
    return (
      <div className="text-center py-16">
        <p className="font-serif text-3xl italic text-primary">
          O grande dia chegou! Com muito amor, João & Laisa
        </p>
      </div>
    );
  }

  const units = [
    { value: timeLeft.days, label: "Dias" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <span className="block font-mono text-4xl md:text-6xl text-primary tabular-nums tracking-tight">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-muted-foreground mt-2 block">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}
