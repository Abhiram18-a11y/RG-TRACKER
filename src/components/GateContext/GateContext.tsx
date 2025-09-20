import React, { createContext, useState } from "react";
import type { ReactNode } from "react";

export interface Gate {
  id: number;
  name: string;
  location: string;
  status: "open" | "closed" | "busy" | "maintenance";
  lastUpdated: string;
}

interface GateContextType {
  gates: Gate[];
  setGates: (gates: Gate[]) => void;
  generateCityGates: (city: string) => void;
  updateGateStatus: (id: number, status: Gate["status"]) => void;
}

export const GateContext = createContext<GateContextType | undefined>(undefined);

const baseGates: Gate[] = [
  {
    id: 1,
    name: "Bhimavaram Gate 1",
    location: "Bhimavaram, Andhra Pradesh",
    status: "open",
    lastUpdated: new Date().toLocaleTimeString(),
  },
  {
    id: 2,
    name: "Machilipatnam Gate 2",
    location: "Machilipatnam, Andhra Pradesh",
    status: "closed",
    lastUpdated: new Date().toLocaleTimeString(),
  },
  {
    id: 3,
    name: "Vijayawada Central",
    location: "Vijayawada, Andhra Pradesh",
    status: "busy",
    lastUpdated: new Date().toLocaleTimeString(),
  },
];

export const GateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [gates, setGates] = useState<Gate[]>(baseGates);

  const generateCityGates = (city: string) => {
    const now = new Date().toLocaleTimeString();
    const newGates: Gate[] = [
      { id: Math.random(), name: `${city} Main Gate`, location: `${city}, India`, status: "open", lastUpdated: now },
      { id: Math.random(), name: `${city} Bypass Gate`, location: `${city}, India`, status: "closed", lastUpdated: now },
      { id: Math.random(), name: `${city} Central Gate`, location: `${city}, India`, status: "busy", lastUpdated: now },
    ];
    setGates(newGates);
  };

  const updateGateStatus = (id: number, status: Gate["status"]) => {
    setGates((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status, lastUpdated: new Date().toLocaleTimeString() } : g))
    );
  };

  return (
    <GateContext.Provider value={{ gates, setGates, generateCityGates, updateGateStatus }}>
      {children}
    </GateContext.Provider>
  );
};
