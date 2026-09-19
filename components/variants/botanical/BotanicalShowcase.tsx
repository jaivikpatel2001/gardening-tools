import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { GardenScene } from "@/components/variants/botanical/GardenScene";
import { botanicalScene } from "@/data/variants/botanical";

/** Server binding for the marked garden scene. */
export function BotanicalShowcase() {
  const { eyebrow, heading, body, hint, image, markers } = botanicalScene;

  return (
    <section aria-labelledby="botanical-showcase" className="bg-surface-soft py-20 lg:py-28">
      <Container>
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id="botanical-showcase" className="mt-5 text-display-md text-ink">
              {heading}
            </h2>
          </div>
          <p className="max-w-sm text-body-md text-body md:pb-1">{body}</p>
        </Reveal>

        <Reveal className="mt-12 lg:mt-14" distance={24}>
          <GardenScene image={image} markers={markers} hint={hint} />
        </Reveal>
      </Container>
    </section>
  );
}
