"use client";

import { useSyncExternalStore } from "react";

export type CartItem = {
  id: string;
  slug: string;
  name: string;
  variant: string;
  price: number;
  qty: number;
};

type Snapshot = { items: CartItem[]; ready: boolean };

const STORAGE_KEY = "sraw.cart.v1";
const SERVER_SNAPSHOT: Snapshot = { items: [], ready: false };

let snapshot: Snapshot = SERVER_SNAPSHOT;
let hydrated = false;
const listeners = new Set<() => void>();

function commit(items: CartItem[]) {
  snapshot = { items, ready: true };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // storage may be unavailable (private mode, quota)
  }
  for (const listener of listeners) listener();
}

function hydrate() {
  if (hydrated) return;
  hydrated = true;
  let items: CartItem[] = [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) items = JSON.parse(raw) as CartItem[];
  } catch {
    items = [];
  }
  snapshot = { items, ready: true };
}

function subscribe(listener: () => void) {
  hydrate();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return snapshot;
}

function getServerSnapshot() {
  return SERVER_SNAPSHOT;
}

export function addItem(item: Omit<CartItem, "id" | "qty">, qty = 1) {
  const id = `${item.slug}--${item.variant}`;
  const existing = snapshot.items.find((i) => i.id === id);
  commit(
    existing
      ? snapshot.items.map((i) =>
          i.id === id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i,
        )
      : [...snapshot.items, { ...item, id, qty }],
  );
}

export function setItemQty(id: string, qty: number) {
  commit(
    qty <= 0
      ? snapshot.items.filter((i) => i.id !== id)
      : snapshot.items.map((i) =>
          i.id === id ? { ...i, qty: Math.min(qty, 99) } : i,
        ),
  );
}

export function removeItem(id: string) {
  commit(snapshot.items.filter((i) => i.id !== id));
}

export function clearCart() {
  commit([]);
}

export function useCart() {
  const { items, ready } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  return {
    items,
    ready,
    count: items.reduce((sum, i) => sum + i.qty, 0),
    subtotal: items.reduce((sum, i) => sum + i.qty * i.price, 0),
    add: addItem,
    setQty: setItemQty,
    remove: removeItem,
    clear: clearCart,
  };
}
