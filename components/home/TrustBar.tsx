import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { trustItems } from "@/data/trust";

/**
 * Deep-green band immediately under the hero. Its job is the transition: it
 * closes the hero's warm canvas and opens the body of the page.
 */
export function TrustBar() {
  return (
    <Section tone="band" size="none" className="py-12 md:py-14 lg:py-16">
      <Container>
        <h2 className="sr-only">Why gardeners work with us</h2>

        <Reveal
          as="ul"
          stagger={0.08}
          className="grid grid-cols-2 gap-x-6 gap-y-9 lg:grid-cols-4 lg:gap-x-10"
        >
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-on-band"
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 font-heading text-[1.0625rem] font-bold text-on-band">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-body-sm text-on-band-muted">{item.description}</p>
              </li>
            );
          })}
        </Reveal>
      </Container>
    </Section>
  );
}
