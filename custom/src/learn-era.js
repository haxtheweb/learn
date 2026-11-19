/**
 * Learn HAX eras: one site, six time periods. The era is page state kept on
 * <html data-learn-era>; every Learn element reflects it as its `era` attribute.
 */
import { css } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";

export const LEARN_ERAS = [
  { id: "1800s", label: "1800s", medium: "Book", tagline: "A practical treatise on the making of web pages" },
  { id: "1940s", label: "1940s", medium: "Radio", tagline: "On the air: the Learn HAX hour" },
  { id: "1980s", label: "1980s", medium: "VHS", tagline: "Be kind, rewind: Learn HAX on tape" },
  { id: "1990s", label: "1990s", medium: "DVD", tagline: "Now on disc, with special features" },
  { id: "2000s", label: "2000s", medium: "Web 2.0", tagline: "Learn HAX (beta): tag it, embed it, share it" },
  { id: "today", label: "Today", medium: "Web", tagline: "Tutorials for using and building HAX" },
];
const KEY = "learn-hax-era";
const valid = (id) => LEARN_ERAS.some((e) => e.id === id);

export function getLearnEra() {
  const set = globalThis.document.documentElement.getAttribute("data-learn-era");
  if (valid(set)) return set;
  let saved = null;
  try {
    saved = globalThis.localStorage.getItem(KEY);
  } catch (e) {}
  return valid(saved) ? saved : "1980s";
}

export function setLearnEra(id) {
  if (!valid(id)) return;
  globalThis.document.documentElement.setAttribute("data-learn-era", id);
  try {
    globalThis.localStorage.setItem(KEY, id);
  } catch (e) {}
  globalThis.dispatchEvent(new CustomEvent("learn-era-changed", { detail: { era: id } }));
}

/** Mixin: keeps a reflected `era` attribute in step with the page */
export const LearnEraMixin = (SuperClass) =>
  class extends SuperClass {
    static get properties() {
      return { ...super.properties, era: { type: String, reflect: true } };
    }
    constructor() {
      super();
      this.era = getLearnEra();
      this.__eraChanged = (e) => {
        this.era = e.detail.era;
      };
    }
    connectedCallback() {
      super.connectedCallback();
      this.era = getLearnEra();
      globalThis.addEventListener("learn-era-changed", this.__eraChanged);
    }
    disconnectedCallback() {
      globalThis.removeEventListener("learn-era-changed", this.__eraChanged);
      super.disconnectedCallback();
    }
    get eraInfo() {
      return LEARN_ERAS.find((e) => e.id === this.era) || LEARN_ERAS[5];
    }
  };

/**
 * What an era changes on the theme. Learn keeps its own color (the network's
 * Learn blue) in every period; an era brings its accent, its type, and the way
 * that period would have drawn the Future Traveler (an era id from
 * hax-network-bar/lib/hax-future-traveler.js).
 */
export const LEARN_ERA_SKINS = {
  "1800s": { accent: "#5a2d1a", second: "#2f4a3a", traveler: "steam", font: 'Georgia, "Times New Roman", serif', heading: 'Georgia, "Times New Roman", serif' },
  "1940s": { accent: "#3d2b1f", second: "#6b3d12", traveler: "wartime", font: '"Courier New", Courier, monospace', heading: 'Georgia, "Times New Roman", serif' },
  "1980s": { accent: "#3b1d8f", second: "#c2185b", traveler: "neon", font: '"Trebuchet MS", Arial, sans-serif', heading: 'Impact, "Arial Narrow Bold", "Arial Black", sans-serif' },
  "1990s": { accent: "#0b3d91", second: "#6a1b9a", traveler: "web", font: "Arial, Helvetica, sans-serif", heading: '"Times New Roman", Times, serif' },
  "2000s": { accent: "#10202c", second: "#c2410c", traveler: "flash", font: '"Lucida Grande", Tahoma, Verdana, sans-serif', heading: '"Trebuchet MS", "Lucida Grande", Tahoma, sans-serif' },
  today: { traveler: "now" },
};

/** Era tokens for the Learn elements: the page's surface and ink, the era's type and edges. */
export const learnEraStyles = css`
  :host {
    --learn-bg: light-dark(var(--ddd-theme-default-white, #ffffff), var(--ddd-theme-default-coalyGray, #262626));
    --learn-ink: light-dark(#111111, #ffffff);
    --learn-surface: light-dark(#f2f2f4, #363636);
    --learn-accent: light-dark(#0b4a8a, #9ccaff);
    --learn-font: var(--ddd-font-primary, sans-serif);
    --learn-head-font: var(--ddd-font-heading, var(--ddd-font-primary, sans-serif));
    --learn-radius: var(--ddd-radius-sm, 4px);
    --learn-border: 2px solid var(--learn-ink);
  }
  :host([era="1800s"]) {
    --learn-accent: light-dark(#7a2e1d, #e0b074);
    --learn-font: Georgia, "Times New Roman", serif;
    --learn-head-font: Georgia, "Times New Roman", serif;
    --learn-radius: 0;
    --learn-border: 3px double var(--learn-ink);
  }
  :host([era="1940s"]) {
    --learn-accent: light-dark(#6b3d12, #f0b45a);
    --learn-font: "Courier New", Courier, monospace;
    --learn-head-font: Georgia, "Times New Roman", serif;
    --learn-radius: 14px;
    --learn-border: 2px solid var(--learn-ink);
  }
  :host([era="1980s"]) {
    --learn-accent: light-dark(#8f1257, #ff7ab3);
    --learn-font: "Trebuchet MS", Arial, sans-serif;
    --learn-head-font: Impact, "Arial Narrow Bold", "Arial Black", sans-serif;
    --learn-radius: 2px;
    --learn-border: 2px solid light-dark(#3b1d8f, #5cf2e0);
  }
  :host([era="1990s"]) {
    --learn-accent: light-dark(#0b3d91, #8fc1ff);
    --learn-font: Arial, Helvetica, sans-serif;
    --learn-head-font: "Times New Roman", Times, serif;
    --learn-radius: 6px;
    --learn-border: 2px solid var(--learn-accent);
  }
  :host([era="2000s"]) {
    --learn-accent: light-dark(#0a5c99, #7fd0ff);
    --learn-font: "Lucida Grande", Tahoma, Verdana, sans-serif;
    --learn-head-font: "Trebuchet MS", "Lucida Grande", Tahoma, sans-serif;
    --learn-radius: 14px;
    --learn-border: 1px solid var(--learn-accent);
  }
`;
