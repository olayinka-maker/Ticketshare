// File: context/TicketContext.tsx - Context for ticket state management
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types
export interface Ticket {
  id: number;
  section: string;
  row: string;
  seat: string;
}

type ActiveView = 'details' | 'transfer';

interface TicketContextType {
  tickets: Ticket[];
  selectedTickets: number[];
  activeView: ActiveView;
  toggleTicketSelection: (ticketId: number) => void;
  startTransfer: () => void;
  cancelTransfer: () => void;
}

// Create context with undefined initial value
const TicketContext = createContext<TicketContextType | undefined>(undefined);

// Props interface for the provider
interface TicketProviderProps {
  children: ReactNode;
}

export function TicketProvider({ children }: TicketProviderProps) {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 1, section: 'GA', row: 'General Admission', seat: '-' },
    { id: 2, section: 'GA', row: 'General Admission', seat: '-' },
    { id: 3, section: 'GA', row: 'General Admission', seat: '-' },
    { id: 4, section: 'GA', row: 'General Admission', seat: '-' },
  ]);
  
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [activeView, setActiveView] = useState<ActiveView>('details');
  
  const toggleTicketSelection = (ticketId: number) => {
    setSelectedTickets(prev => {
      if (prev.includes(ticketId)) {
        return prev.filter(id => id !== ticketId);
      } else {
        return [...prev, ticketId];
      }
    });
  };

  const startTransfer = () => {
    setActiveView('transfer');
  };

  const cancelTransfer = () => {
    setActiveView('details');
    setSelectedTickets([]);
  };

  return (
    <TicketContext.Provider value={{
      tickets,
      selectedTickets,
      activeView,
      toggleTicketSelection,
      startTransfer,
      cancelTransfer,
    }}>
      {children}
    </TicketContext.Provider>
  );
}

export const useTickets = (): TicketContextType => {
  const context = useContext(TicketContext);
  if (context === undefined) {
    throw new Error('useTickets must be used within a TicketProvider');
  }
  return context;
};