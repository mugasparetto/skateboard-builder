import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc, Content } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

interface SearchParams {
  wheel?: string;
  deck?: string;
  truck?: string;
  bolt?: string;
}

export type DemoContext = {
  defaultBolt: Content.BoardBuilderDocumentDataMetalsItem;
  defaultDeck: Content.BoardBuilderDocumentDataDecksItem;
  defaultTruck: Content.BoardBuilderDocumentDataMetalsItem;
  defaultWheel: Content.BoardBuilderDocumentDataWheelsItem;
};

export default async function Page(props: {
  searchParams: Promise<SearchParams>;
}) {
  const client = createClient();
  const page = await client.getSingle("demo").catch(() => notFound());
  const searchParams = await props.searchParams;
  const builderSettings = await client.getSingle("board_builder");
  const { wheels, decks, metals } = builderSettings.data;

  const defaultWheel =
    wheels.find((wheel) => wheel.uid === searchParams.wheel) ?? wheels[0];
  const defaultDeck =
    decks.find((deck) => deck.uid === searchParams.deck) ?? decks[0];
  const defaultTruck =
    metals.find((metal) => metal.uid === searchParams.truck) ?? metals[0];
  const defaultBolt =
    metals.find((metal) => metal.uid === searchParams.bolt) ?? metals[0];

  return (
    <SliceZone
      slices={page.data.slices}
      components={components}
      context={
        {
          defaultBolt,
          defaultDeck,
          defaultTruck,
          defaultWheel,
        } as unknown as DemoContext
      }
    />
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("demo").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
