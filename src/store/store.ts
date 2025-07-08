import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  completedDates: string[];
  createdAt: string;
}

interface HabitState {
  habits: Habit[];
  addHabit: (name: string, frequency: 'daily' | 'weekly' | 'monthly') => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const useHabitStore = create<HabitState>()(
  devtools(
    persist(
      (set) => ({
        habits: [],
        isLoading: false,
        error: null,
        addHabit: (name, frequency) =>
          set((state) => ({
            habits: [
              ...state.habits,
              {
                id: Date.now().toString(),
                name,
                frequency,
                completedDates: [],
                createdAt: new Date().toISOString(),
              },
            ],
          })),
        removeHabit: (id) =>
          set((state) => ({
            habits: state.habits.filter((habit) => habit.id !== id),
          })),
        toggleHabit: (id, date) =>
          set((state) => ({
            habits: state.habits.map((habit) =>
              habit.id === id
                ? {
                    ...habit,
                    completedDates: habit.completedDates.includes(date)
                      ? habit.completedDates.filter((d) => d !== date)
                      : [...habit.completedDates, date],
                  }
                : habit
            ),
          })),
      }),
      {
        name: 'habit-storage', // localStorage key
      }
    ),
    {
      name: 'HabitStore Devtools',
    }
  )
);
