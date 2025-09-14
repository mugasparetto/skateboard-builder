"use client";

import { Content } from "@prismicio/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type BuilderControlsContext = {
  selectedWheel?: Content.BoardBuilderDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardBuilderDocumentDataWheelsItem) => void;
  selectedDeck?: Content.BoardBuilderDocumentDataDecksItem;
  setDeck: (deck: Content.BoardBuilderDocumentDataDecksItem) => void;
  selectedTruck?: Content.BoardBuilderDocumentDataMetalsItem;
  setTruck: (truck: Content.BoardBuilderDocumentDataMetalsItem) => void;
  selectedBolt?: Content.BoardBuilderDocumentDataMetalsItem;
  setBolt: (bolt: Content.BoardBuilderDocumentDataMetalsItem) => void;
};

const defaultContext: BuilderControlsContext = {
  setWheel: () => {},
  setDeck: () => {},
  setTruck: () => {},
  setBolt: () => {},
};

const BuilderControlsContext = createContext(defaultContext);

type BuilderControlsProviderProps = {
  children?: ReactNode;
  defaultWheel?: Content.BoardBuilderDocumentDataWheelsItem;
  defaultDeck?: Content.BoardBuilderDocumentDataDecksItem;
  defaultTruck?: Content.BoardBuilderDocumentDataMetalsItem;
  defaultBolt?: Content.BoardBuilderDocumentDataMetalsItem;
};

export function BuilderControlsProvider({
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
  children,
}: BuilderControlsProviderProps) {
  const [selectedWheel, setWheel] = useState(defaultWheel);
  const [selectedDeck, setDeck] = useState(defaultDeck);
  const [selectedTruck, setTruck] = useState(defaultTruck);
  const [selectedBolt, setBolt] = useState(defaultBolt);

  const value = useMemo<BuilderControlsContext>(() => {
    return {
      selectedWheel,
      setWheel,
      selectedDeck,
      setDeck,
      selectedTruck,
      setTruck,
      selectedBolt,
      setBolt,
    };
  }, [selectedWheel, selectedBolt, selectedDeck, selectedTruck]);

  return (
    <BuilderControlsContext.Provider value={value}>
      {children}
    </BuilderControlsContext.Provider>
  );
}

export function useBuilderControls() {
  return useContext(BuilderControlsContext);
}
