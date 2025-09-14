import { FC } from "react";
import { asImageSrc, Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";

import { Bounded } from "@/app/components/Bounded";
import { Heading } from "@/app/components/Heading";
import { ButtonLink } from "@/app/components/ButtonLink";
import { DemoContext } from "@/app/demo/page";
import { InteractiveSkateboard } from "./interactiveSkateboard";

const DEFAULT_DECK_TEXTURE = "/skateboard/Deck.webp";
const DEFAULT_WHEEL_TEXTURE = "/skateboard/SkateWheel1.png";
const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";

/**
 * Props for `Hero`.
 */

export type HeroProps = SliceComponentProps<Content.HeroSlice, DemoContext>;

/**
 * Component for "Hero" Slices.
 */
const Hero: FC<HeroProps> = async ({ slice, context }) => {
  const deckTextureURL =
    asImageSrc(context.defaultDeck.texture) || DEFAULT_DECK_TEXTURE;
  const wheelTextureURL =
    asImageSrc(context.defaultWheel.texture) || DEFAULT_WHEEL_TEXTURE;
  const truckColor = context.defaultTruck.color || DEFAULT_TRUCK_COLOR;
  const boltColor = context.defaultBolt.color || DEFAULT_BOLT_COLOR;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-brand-pink relative h-dvh overflow-hidden text-zinc-800 bg-texture"
    >
      <div className="grid absolute inset-0 mx-auto mt-12 max-w-6xl grid-rows-[1fr,auto] place-items-end px-6 ~py-10/16">
        <Heading size="lg" className="relative max-w-2xl place-self-start">
          <PrismicText field={slice.primary.heading} />
        </Heading>
        <div className="flex relative w-full flex-col items-center justify-between ~gap-2/4 lg:flex-row">
          <div className="max-w-[45ch] font-semibold ~text-lg/xl">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <ButtonLink
            href={`/?wheel=${context.defaultWheel.uid}&deck=${context.defaultDeck.uid}&truck=${context.defaultTruck.uid}&bolt=${context.defaultBolt.uid}`}
            size="lg"
            className="z-20 mt-2 block button-cutout"
          >
            {slice.primary.button.text}
          </ButtonLink>
        </div>
      </div>

      <InteractiveSkateboard
        deckTextureURL={deckTextureURL}
        wheelTextureURL={wheelTextureURL}
        truckColor={truckColor}
        boltColor={boltColor}
      />
    </Bounded>
  );
};

export default Hero;
