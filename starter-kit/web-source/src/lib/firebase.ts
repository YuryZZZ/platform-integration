/**
 * Firebase Integration
 * ─────────────────────────────────────────────────────────────
 * Centralized Firebase client initialization and utilities.
 */

// Simulation of Firebase setup for the template
export const db = {
  collection: (name: string) => ({
    add: async (data: any) => {
      console.log(`[Firestore] Adding to ${name}:`, data);
      return { id: 'mock_doc_id' };
    },
    doc: (id: string) => ({
      get: async () => ({ exists: true, data: () => ({}) }),
      set: async (data: any) => console.log(`[Firestore] Setting ${name}/${id}:`, data),
    }),
  }),
};

export const auth = {};
export const storage = {};
