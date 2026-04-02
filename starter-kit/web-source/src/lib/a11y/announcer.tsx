import React, { createContext, useContext, useState, useCallback } from 'react';

type AnnouncementPriority = 'polite' | 'assertive';

export interface Announcement {
  id: string;
  message: string;
  priority: AnnouncementPriority;
  timestamp: number;
}

interface AnnouncerContextValue {
  announce: (message: string, priority?: AnnouncementPriority) => string;
  clearAnnouncement: (id: string) => void;
}

const AnnouncerContext = createContext<AnnouncerContextValue | undefined>(undefined);

export const AnnouncerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const announce = useCallback((message: string, priority: AnnouncementPriority = 'polite') => {
    const id = `announcement-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newAnnouncement: Announcement = {
      id,
      message,
      priority,
      timestamp: Date.now(),
    };
    setAnnouncements(prev => [newAnnouncement, ...prev]);
    return id;
  }, []);

  const clearAnnouncement = useCallback((id: string) => {
    setAnnouncements(prev => prev.filter(a => a.id !== id));
  }, []);

  return (
    <AnnouncerContext.Provider value={{ announce, clearAnnouncement }}>
      {children}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {announcements
          .filter(a => a.priority === 'polite')
          .map(a => a.message)
          .join(' ')}
      </div>
      <div aria-live="assertive" aria-atomic="true" className="sr-only">
        {announcements
          .filter(a => a.priority === 'assertive')
          .map(a => a.message)
          .join(' ')}
      </div>
    </AnnouncerContext.Provider>
  );
};

export const useAnnounce = () => {
  const context = useContext(AnnouncerContext);
  if (!context) {
    throw new Error('useAnnounce must be used within AnnouncerProvider');
  }
  return context;
};
