import { useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

function BuildingBars() {
  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
    >
      <rect x="10" y="70" width="14" height="40" rx="2" className="loader-bar" />
      <rect x="32" y="50" width="14" height="60" rx="2" className="loader-bar" style={{ animationDelay: "0.12s" }} />
      <rect x="54" y="30" width="14" height="80" rx="2" className="loader-bar" style={{ animationDelay: "0.24s" }} />
      <rect x="76" y="55" width="14" height="55" rx="2" className="loader-bar" style={{ animationDelay: "0.36s" }} />
      <rect x="98" y="40" width="14" height="70" rx="2" className="loader-bar" style={{ animationDelay: "0.48s" }} />
    </svg>
  );
}

export function PageLoader() {
  const router = useRouter();
  const isPending = router.state.status === "pending";
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isPending) {
      const timer = setTimeout(() => setShow(true), 120);
      return () => clearTimeout(timer);
    }
    setShow(false);
  }, [isPending]);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy transition-opacity duration-500 ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="text-gold">
            <BuildingBars />
          </div>
          <div className="pointer-events-none absolute inset-0">
            <svg width="120" height="120" viewBox="0 0 120 120" className="block">
              <defs>
                <linearGradient id="goldShimmer" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="40%" stopColor="oklch(0.82 0.13 80 / 0.55)" />
                  <stop offset="60%" stopColor="oklch(0.82 0.13 80 / 0.55)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <mask id="barMask">
                  <rect x="10" y="70" width="14" height="40" rx="2" fill="white" />
                  <rect x="32" y="50" width="14" height="60" rx="2" fill="white" />
                  <rect x="54" y="30" width="14" height="80" rx="2" fill="white" />
                  <rect x="76" y="55" width="14" height="55" rx="2" fill="white" />
                  <rect x="98" y="40" width="14" height="70" rx="2" fill="white" />
                </mask>
              </defs>
              <rect
                x="0"
                y="0"
                width="120"
                height="120"
                fill="url(#goldShimmer)"
                mask="url(#barMask)"
                className="shimmer-sweep"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <p
            className={`text-sm font-medium tracking-[0.25em] uppercase text-gold/90 transition-opacity duration-500 ${
              show ? "opacity-100" : "opacity-0"
            }`}
          >
            Chennai Prime Realty
          </p>
          <div className="h-1 w-40 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gold"
              style={{
                width: show ? "100%" : "0%",
                transition: show ? "width 1.4s cubic-bezier(0.22, 1, 0.36, 1)" : "width 0.2s ease-out",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
