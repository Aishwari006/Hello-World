import { useState, useEffect, useCallback } from "react";

export type BadgeId =
  | "password-master"
  | "id-expert"
  | "phishing-detector"
  | "scam-aware"
  | "deepfake-spotter"
  | "guardian";

const STORAGE_KEY = "guardian-path-badges";
const DEFAULT_EARNED: BadgeId[] = [];

/* ================= STORAGE ================= */

function loadEarned(): Set<BadgeId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return new Set<BadgeId>(DEFAULT_EARNED);
    }
    return new Set(JSON.parse(raw) as BadgeId[]);
  } catch {
    return new Set<BadgeId>();
  }
}

function saveEarned(earned: Set<BadgeId>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...earned]));
}

/* ================= HOOK ================= */

export function useBadges() {
  const [earned, setEarned] = useState<Set<BadgeId>>(loadEarned);

  const unlockBadge = useCallback((id: BadgeId) => {
    setEarned((prev) => {
      if (prev.has(id)) return prev;

      const next = new Set(prev);
      next.add(id);

      // Auto unlock guardian
      const MODULE_IDS: BadgeId[] = [
        "password-master",
        "id-expert",
        "phishing-detector",
        "scam-aware",
        "deepfake-spotter",
      ];

      if (MODULE_IDS.every((mid) => next.has(mid))) {
        next.add("guardian");
      }

      saveEarned(next);
      return next;
    });
  }, []);

  const isEarned = useCallback(
    (id: BadgeId) => earned.has(id),
    [earned]
  );

  return { earned, unlockBadge, isEarned };
}

/* ================= ROUTES ================= */

// ✅ ONLY exact routes here
export const ROUTE_TO_BADGE: Record<string, BadgeId> = {
  "/sandbox/module1": "password-master",
  "/sandbox/module2": "id-expert",
  "/red-flag-detector": "phishing-detector",
  "/deepfake-lab": "deepfake-spotter",
};

/* ================= DYNAMIC MATCH ================= */

function getBadgeFromPath(path: string): BadgeId | null {
  // ✅ Exact match first
  if (ROUTE_TO_BADGE[path]) {
    return ROUTE_TO_BADGE[path];
  }

  // ✅ Partial match (IMPORTANT for your case)
  if (path.includes("/ai-scam-simulator")) {
    return "scam-aware";
  }

  return null;
}

/* ================= AUTO HOOK ================= */

export function useUnlockOnMount() {
  const { unlockBadge } = useBadges();

  useEffect(() => {
    const path = window.location.pathname;
    const badge = getBadgeFromPath(path);

    if (badge) {
      unlockBadge(badge);
    }
  }, [unlockBadge]);
}