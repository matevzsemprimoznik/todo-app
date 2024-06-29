import { create } from 'zustand';

type EventListener = (key: string) => void;
interface EventStore {
  events: Record<string, any>;
  listeners: Record<string, EventListener[]>;
  revalidate: (key: string) => void;
  addRevalidationListener: (key: string, listener: EventListener) => void;
  updateRevalidationListener: (key: string, listener: EventListener) => void;
}

const useRevalidate = create<EventStore>((set) => ({
  events: {},
  listeners: {},

  revalidate: (key) =>
    set((state) => {
      const eventListeners = state.listeners[key] || [];
      eventListeners.forEach((listener) => listener(state.events[key]));
      return state;
    }),

  addRevalidationListener: (key, listener) =>
    set((state) => {
      const eventListeners = state.listeners[key] || [];
      return { listeners: { ...state.listeners, [key]: [...eventListeners, listener] } };
    }),

  updateRevalidationListener: (key, listener) =>
    set((state) => {
      const eventListeners = state.listeners[key] || [];
      return { listeners: { ...state.listeners, [key]: [...eventListeners, listener] } };
    })
}));

export default useRevalidate;
