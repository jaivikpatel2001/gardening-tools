import { routes } from "@/lib/routes";
import type { ImageAsset } from "@/types/content";

/**
 * Copy and form definition for the Contact page.
 *
 * Every contact fact is read from `config/site.ts`, which in turn comes from the
 * client's own contact page. Nothing here invents opening hours, a postcode, a
 * map pin or a response time, because none of those have been supplied.
 *
 * The enquiry form delivers through FormSubmit, a hosted forwarding service, to
 * the address in NEXT_PUBLIC_FORMSUBMIT_EMAIL. When that variable is unset the
 * form says delivery is not connected and hands the visitor the phone, email
 * and WhatsApp routes instead. See `components/forms/EnquiryForm.tsx`.
 *
 * The map is an embed, requested in review. It is worth knowing what that
 * costs: an embedded map is a third-party frame and its cookies on every visit
 * to this page, where the link it replaced was neither. It is lazy-loaded so it
 * does not run until the visitor scrolls to it, and the address above it stays
 * the authority.
 *
 * House style: no em dashes in any visitor-facing string (see CLAUDE.md).
 */

export const contactHero = {
  eyebrow: "Contact",
  heading: "Tell Us What You Are Growing",
  body: "Call the counter, send an email or fill in the enquiry form. Whichever you choose, it helps to say what you are growing, where you are growing it and who will be doing the work.",
  image: {
    src: "/images/service-tool-selection.webp",
    alt: "Two people examining a selection of gardening tools together at a workbench",
  } satisfies ImageAsset,
};

export const enquiryReasons = [
  {
    title: "Choosing a product",
    body: "Say what you are growing, your soil and the hours you put in. We will narrow the options down rather than list them.",
  },
  {
    title: "Bulk and institutional supply",
    body: "Landscapers, societies, campuses, resorts and nurseries. Send the site and the season and we will specify the kit.",
  },
  {
    title: "Spares and servicing",
    body: "Blades, springs, chains, seals, nozzles, handles and sharpening, including for machines bought years ago.",
  },
  {
    title: "Anything else in gardening",
    body: "The odds and ends nobody else stocks are usually the reason people call. Ask.",
  },
] as const;

export const locationSection = {
  eyebrow: "Visit us",
  heading: "The Counter in Satellite, Ahmedabad",
  body: "Silicon Valley is on Shivranjani Cross Road in Satellite, on the way between Shivranjani and Jodhpur Cross Roads. Call before you travel with a large order so the stock is out and ready.",
  /**
   * The map is searched for by address rather than pinned to a hard-coded
   * place ID, which could not be verified from what the client has supplied.
   */
  mapLinkLabel: "Open in Google Maps",
  /** Accessible name for the embedded map frame. */
  mapTitle: "Map showing Shree Khodiyar Garden Tools in Satellite, Ahmedabad",
  hoursNote:
    "Opening hours are not published yet. Call the counter before visiting and we will tell you when to come.",
};

/**
 * The enquiry form fields.
 *
 * Data driven so the form component stays layout and behaviour only, and so a
 * future backend can validate against the same list. `name`, `phone` and
 * `message` are the minimum a useful gardening enquiry needs.
 */
export const enquiryFields = [
  {
    name: "name",
    label: "Your name",
    type: "text",
    autoComplete: "name",
    required: true,
    placeholder: "Meera Nair",
  },
  {
    name: "phone",
    label: "Phone",
    type: "tel",
    autoComplete: "tel",
    required: true,
    placeholder: "+91 98XXXXXXXX",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    autoComplete: "email",
    required: false,
    placeholder: "you@example.in",
  },
  {
    name: "city",
    label: "City",
    type: "text",
    autoComplete: "address-level2",
    required: false,
    placeholder: "Ahmedabad",
  },
] as const;

export const enquiryForm = {
  eyebrow: "Enquiry",
  heading: "Send an Enquiry",
  body: "Tell us about the garden and we will come back with options, not a catalogue.",
  interestLabel: "What is this about",
  interestPlaceholder: "Select a topic",
  messageLabel: "Your message",
  messagePlaceholder:
    "For example: a 600 square foot society lawn, currently cut by hand, looking at a roller mower before the monsoon.",
  submitLabel: "Send Enquiry",
  sendingLabel: "Sending",
  /** Shown only after the enquiry has actually reached the delivery service. */
  successTitle: "Enquiry sent",
  successNotice:
    "Thank you. Your enquiry is with the counter and we will come back to you shortly. For anything urgent, please call.",
  /** The submission left the browser but the service refused it. */
  errorNotice:
    "The enquiry could not be sent just now. Please try again, or use email, phone or WhatsApp and we will pick it up straight away.",
  /**
   * Shown in place of a success message when delivery is not configured, so
   * the form never claims an enquiry has been sent when it has not.
   */
  unavailableNotice:
    "Online submission is not connected yet. Please send this enquiry by phone, email or WhatsApp and we will pick it up straight away.",
  fallbackAction: "Open in your email app",
  consentNote:
    "We use your details only to answer your enquiry. Enquiries reach us by email through FormSubmit, a form delivery service.",
  interests: [
    "Choosing a product",
    "Bulk or institutional supply",
    "Spares and servicing",
    "Garden setup advice",
    "Something else",
  ] as const,
};

export const contactCta = {
  eyebrow: "Meanwhile",
  heading: "Browse the Range First",
  body: "It is easier to talk about a lawn mower once you know which type you are asking about.",
  primaryCta: { label: "Explore Our Products", href: routes.products },
  secondaryCta: { label: "About Jiva Greens", href: routes.about },
};
