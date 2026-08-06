import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CheckIn, GlimmerStore, ProfileItem, ProfileSuggestion } from "@/types";
import { loadStore, saveStore, resetStore, seedEchoData, suggestionToProfile } from "@/lib/storage";

interface GlimmerContextValue {
  store: GlimmerStore;
  addCheckIn: (c: CheckIn) => void;
  resetDemo: () => void;
  acceptSuggestion: (id: string) => void;
  rejectSuggestion: (id: string) => void;
  addManualProfileItem: (item: Omit<ProfileItem, "id" | "confirmedAt">) => void;
  hasSuggestion: (id: string) => boolean;
}

const GlimmerContext = createContext<GlimmerContextValue | null>(null);

export function GlimmerProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<GlimmerStore>(() => {
    const s = loadStore();
    if (!s.seeded) {
      const seeded: GlimmerStore = { ...s, checkIns: seedEchoData(), seeded: true };
      saveStore(seeded);
      return seeded;
    }
    return s;
  });

  useEffect(() => {
    saveStore(store);
  }, [store]);

  const addCheckIn = useCallback((c: CheckIn) => {
    setStore((prev) => ({ ...prev, checkIns: [...prev.checkIns, c] }));
  }, []);

  const resetDemo = useCallback(() => {
    const fresh = resetStore();
    const seeded: GlimmerStore = { ...fresh, checkIns: seedEchoData(), seeded: true };
    saveStore(seeded);
    setStore(seeded);
  }, []);

  const upsertSuggestion = useCallback((suggestion: ProfileSuggestion) => {
    setStore((prev) => {
      const exists = prev.suggestions.some((s) => s.id === suggestion.id);
      const suggestions = exists
        ? prev.suggestions.map((s) => (s.id === suggestion.id ? suggestion : s))
        : [...prev.suggestions, suggestion];
      return { ...prev, suggestions };
    });
  }, []);

  const acceptSuggestion = useCallback(
    (id: string) => {
      setStore((prev) => {
        const target = prev.suggestions.find((s) => s.id === id);
        if (!target) return prev;
        const updated: ProfileSuggestion = { ...target, status: "accepted" };
        const suggestions = prev.suggestions.map((s) => (s.id === id ? updated : s));
        const already = prev.profile.some((p) => p.id === `profile-${id}`);
        const profile = already
          ? prev.profile
          : [...prev.profile, suggestionToProfile(target)];
        return { ...prev, suggestions, profile };
      });
    },
    []
  );

  const rejectSuggestion = useCallback((id: string) => {
    upsertSuggestion({
      ...(store.suggestions.find((s) => s.id === id) as ProfileSuggestion),
      status: "rejected",
    });
  }, [store.suggestions, upsertSuggestion]);

  const addManualProfileItem = useCallback((item: Omit<ProfileItem, "id" | "confirmedAt">) => {
    setStore((prev) => ({
      ...prev,
      profile: [
        ...prev.profile,
        { ...item, id: `manual-${Date.now()}`, confirmedAt: Date.now() },
      ],
    }));
  }, []);

  const hasSuggestion = useCallback(
    (id: string) => store.suggestions.some((s) => s.id === id),
    [store.suggestions]
  );

  const value = useMemo<GlimmerContextValue>(
    () => ({ store, addCheckIn, resetDemo, acceptSuggestion, rejectSuggestion, addManualProfileItem, hasSuggestion }),
    [store, addCheckIn, resetDemo, acceptSuggestion, rejectSuggestion, addManualProfileItem, hasSuggestion]
  );

  return <GlimmerContext.Provider value={value}>{children}</GlimmerContext.Provider>;
}

export function useGlimmerStore() {
  const ctx = useContext(GlimmerContext);
  if (!ctx) throw new Error("useGlimmerStore must be used within GlimmerProvider");
  return ctx;
}
