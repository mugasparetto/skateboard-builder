import { createClient } from "@/prismicio";
import { ButtonLink } from "./components/ButtonLink";
import { Heading } from "./components/Heading";

import { BuilderControlsProvider } from "./context";
import Preview from "./Preview";
import { asImageSrc } from "@prismicio/client";
import Controls from "./Controls";
import Loading from "./Loading";

interface SearchParams {
  wheel?: string;
  deck?: string;
  truck?: string;
  bolt?: string;
}

export default async function Home(props: {
  searchParams: Promise<SearchParams>;
}) {
  const searchParams = await props.searchParams;

  const client = createClient();
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

  const wheelTextureURLs = wheels
    .map((wheel) => asImageSrc(wheel.texture))
    .filter((url): url is string => Boolean(url));

  const deckTextureURLs = decks
    .map((deck) => asImageSrc(deck.texture))
    .filter((url): url is string => Boolean(url));

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <BuilderControlsProvider
        defaultWheel={defaultWheel}
        defaultDeck={defaultDeck}
        defaultTruck={defaultTruck}
        defaultBolt={defaultBolt}
      >
        <div className="relative aspect-square shrink-0 bg-[#3a414a] lg:aspect-auto lg:grow">
          <div className="absolute inset-0">
            <Preview
              wheelTextureURLs={wheelTextureURLs}
              deckTextureURLs={deckTextureURLs}
            />
          </div>
        </div>
        <div className="grow bg-texture bg-zinc-900 text-white ~p-4/6 lg:w-96 lg:shrink-0 lg:grow-0">
          <Heading as="h1" size="sm" className="mb-6 mt-0">
            Build your board
          </Heading>

          <Controls
            wheels={wheels}
            decks={decks}
            metals={metals}
            className="mb-6"
          />

          <ButtonLink
            href={`/demo?wheel=${searchParams.wheel}&deck=${searchParams.deck}&truck=${searchParams.truck}&bolt=${searchParams.bolt}`}
            color="lime"
          >
            Take it for a spin
          </ButtonLink>
        </div>
      </BuilderControlsProvider>
      <Loading />
    </div>
  );
}
