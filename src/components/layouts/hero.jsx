import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero({ heroData, scheduleDateCount }) {
  const [timeLeft, setTimeLeft] = useState({
    Days: 0,
    Hours: 0,
    Minutes: 0,
    Seconds: 0,
  });
  const [formattedDate, setFormattedDate] = useState(
    new Date("2024-12-31T23:59:59").toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    })
  );

  let target = new Date("2024-12-31T23:59:59").getTime();

  useEffect(() => {
    if (scheduleDateCount && scheduleDateCount[0]) {
      target = new Date(scheduleDateCount[0].eventday).getTime();
      setFormattedDate(
        new Date(scheduleDateCount[0].eventday).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        })
      );
    }
  }, [scheduleDateCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      const Days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const Hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const Minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const Seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ Days, Hours, Minutes, Seconds });

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ Days: 0, Hours: 0, Minutes: 0, Seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center w-full min-h-screen text-center bg-center bg-cover"
      style={{ backgroundImage: `url(${heroData[0].image_url})` }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(67,73,131,0.70)_10%,rgba(62,97,146,0.70)_30%,rgba(53,135,168,0.70)_52%,rgba(51,166,177,0.70)_75%,rgba(51,166,177,0.70)_89%)]"></div>
      <div className="container relative z-10 flex flex-col items-center justify-center px-4 text-center md:px-6">
        <div className="space-y-4 lg:mx-10">
          <h1 className="text-4xl font-bold text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {heroData[0].title}
          </h1>
          <p className="text-primary-foreground/80 md:text-xl">
            {heroData[0].city}, {formattedDate}
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center px-4 py-2 space-x-2 font-medium rounded-md bg-primary/10 text-primary-foreground"
            >
              <span className="text-3xl font-bold sm:text-3xl md:text-4xl">
                {value}
              </span>
              <span className="text-md">{key}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row mt-8">
          <Link
            href="/schedule"
            className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-blue-950 text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Event Schedule Details
          </Link>
        </div>
      </div>
    </section>
  );
}
