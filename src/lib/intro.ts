const INTRO_KEY = "portfolio-intro-seen";

type SessionStore = Pick<Storage, "getItem" | "setItem">;

export function shouldShowIntro(store: SessionStore, reducedMotion: boolean) {
  if (reducedMotion) return false;
  try {
    return store.getItem(INTRO_KEY) !== "true";
  } catch {
    return true;
  }
}

export function markIntroSeen(store: SessionStore) {
  try {
    store.setItem(INTRO_KEY, "true");
  } catch {
    // Storage may be unavailable in privacy-restricted contexts.
  }
}
