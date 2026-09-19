import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImagePlate } from "@/components/ui/ImagePlate";
import { Reveal } from "@/components/ui/Reveal";
import { botanicalJourney } from "@/data/variants/botanical";
import { cn } from "@/lib/cn";

/**
 * Variant 3 solutions: a walk through five Indian gardens.
 *
 * A single line runs down the left of the section with a numbered stop on it
 * for each environment, which turns five separate panels into one journey. The
 * photograph changes sides at every stop, and the arch flips with it, so the
 * eye crosses the line each time instead of running down a column.
 */
export function GardenJourney() {
  const { eyebrow, heading, body, stops } = botanicalJourney;

  return (
    <section aria-labelledby="botanical-journey" className="bg-surface-warm py-20 lg:py-28">
      <Container>
        <Reveal className="max-w-2xl">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 id="botanical-journey" className="mt-5 text-display-md text-ink">
            {heading}
          </h2>
          <p className="mt-5 text-body-md text-body">{body}</p>
        </Reveal>

        <ol className="relative mt-14 lg:mt-20">
          {/* The path. Decorative, and hidden from assistive technology: the
              ordered list already says these are five numbered stops. */}
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[13px] top-3 w-px bg-hairline-strong sm:left-[19px]"
          />

          {stops.map((stop, index) => {
            const imageRight = index % 2 === 1;

            return (
              <li key={stop.key} className="relative pb-14 pl-12 last:pb-0 sm:pl-16 lg:pb-20">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 grid h-[27px] w-[27px] place-items-center rounded-full border border-hairline-strong bg-canvas font-heading text-[0.6875rem] font-bold text-brand sm:h-[39px] sm:w-[39px] sm:text-caption"
                >
                  {stop.index}
                </span>

                <Reveal className="grid items-center gap-8 lg:grid-cols-12 lg:gap-14" distance={26}>
                  <div
                    className={cn(
                      "lg:col-span-5",
                      imageRight ? "lg:order-2 lg:col-start-8" : "lg:col-start-1",
                    )}
                  >
                    <ImagePlate
                      image={stop.image}
                      ratio="4/3"
                      sizes="(max-width: 1127px) 88vw, 38vw"
                      radius="none"
                      className={cn(
                        "shadow-card",
                        imageRight
                          ? "rounded-xl rounded-tr-organic"
                          : "rounded-xl rounded-tl-organic",
                      )}
                    />
                  </div>

                  <div
                    className={cn(
                      "lg:col-span-6",
                      imageRight ? "lg:order-1 lg:col-start-1" : "lg:col-start-7",
                    )}
                  >
                    <h3 className="text-display-sm text-ink">{stop.title}</h3>
                    <p className="mt-4 max-w-[46ch] text-body-md text-body">{stop.body}</p>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {stop.tools.map((tool) => (
                        <li
                          key={tool}
                          className="rounded-full border border-hairline bg-canvas px-3.5 py-1.5 font-body text-caption text-ink"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
