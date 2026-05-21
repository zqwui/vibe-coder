export interface HistoryItem {
  id: string;
  description: string;
  language: string;
  result: { spec: string; code: string; explain: string };
  createdAt: string;
}

const KEY = "vibecoder_history";

export function getHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveHistory(item: Omit<HistoryItem, "id" | "createdAt">) {
  const history = getHistory();
  const newItem: HistoryItem = {
    ...item,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY, JSON.stringify([newItem, ...history].slice(0, 50)));
  return newItem;
}

export function deleteHistory(id: string) {
  const history = getHistory().filter((h) => h.id !== id);
  localStorage.setItem(KEY, JSON.stringify(history));
}

export function clearHistory() {
  localStorage.removeItem(KEY);
}
