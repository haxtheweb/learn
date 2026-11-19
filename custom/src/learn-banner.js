/**
 * `learn-banner`: the band that says "this is Learn". Its color, glyph, name
 * and sentence are the network's own record for Learn (hax-network.js), so the
 * banner and the network bar always agree. The Future Traveler on it is drawn
 * the way the chosen period would have drawn him.
 */
import { html, css } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { HAX_NETWORK, haxNetworkGlyph, HaxNetworkGlyphStyles } from "@haxtheweb/hax-network-bar/lib/hax-network.js";
import { futureTraveler, HaxFutureTravelerStyles, HAX_TRAVELER_ERAS } from "@haxtheweb/hax-network-bar/lib/hax-future-traveler.js";
import "./learn-era-switcher.js";
import { LearnEraMixin, LEARN_ERA_SKINS } from "./learn-era.js";

export class LearnBanner extends LearnEraMixin(DDD) {
  static get tag() {
    return "learn-banner";
  }
  static get properties() {
    return {
      ...super.properties,
      heading: { type: String },
      home: { type: Boolean, reflect: true },
      /** the page above this one, and its address */
      crumb: { type: String },
      crumbHref: { type: String, attribute: "crumb-href" },
    };
  }
  constructor() {
    super();
    this.heading = "";
    this.home = false;
    this.crumb = "";
    this.crumbHref = "";
  }
  static get styles() {
    return [
      super.styles,
      HaxNetworkGlyphStyles,
      HaxFutureTravelerStyles,
      css`
        :host {
          display: block;
          background-color: var(--ddd-theme-default-skyBlue, #009cde);
          color: #1c1c1c;
          border-bottom: 10px solid #1c1c1c;
          font-family: var(--learn-era-font, var(--ddd-font-primary, sans-serif));
        }
        .inner {
          box-sizing: border-box;
          max-width: var(--hax-marketing-measure, 1200px);
          margin: 0 auto;
          padding: var(--ddd-spacing-6, 24px) var(--hax-marketing-gutter, 24px);
        }
        .top {
          display: flex;
          flex-wrap: wrap;
          align-items: flex-end;
          justify-content: space-between;
          gap: var(--ddd-spacing-4, 16px);
        }
        .prop {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: var(--ddd-spacing-3, 12px);
          margin: 0;
          max-width: 46ch;
          font-size: 18px;
          font-weight: var(--ddd-font-weight-bold, 700);
          line-height: 1.3;
          color: #1c1c1c;
        }
        .chip {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-2, 8px);
          padding: var(--ddd-spacing-1, 4px) var(--ddd-spacing-3, 12px);
          border-radius: 999px;
          background-color: #1c1c1c;
          color: #ffffff;
          font-size: 20px;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          --glyph-size: 28px;
          --glyph-accent: var(--ddd-theme-default-skyBlue, #009cde);
        }
        .main {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--ddd-spacing-6, 24px);
          margin-top: var(--ddd-spacing-6, 24px);
        }
        .crumb {
          margin: 0 0 var(--ddd-spacing-1, 4px);
          font-size: 18px;
          font-weight: var(--ddd-font-weight-bold, 700);
          color: #1c1c1c;
        }
        .crumb a {
          display: inline-block;
          min-height: 24px;
          line-height: 24px;
          padding: var(--ddd-spacing-1, 4px) 0;
          color: #1c1c1c;
        }
        .crumb a:focus-visible {
          outline: 3px solid #1c1c1c;
          outline-offset: 2px;
        }
        h1 {
          margin: 0;
          font-family: var(--learn-era-heading, var(--ddd-font-heading, var(--ddd-font-primary, sans-serif)));
          font-size: clamp(32px, 6vw, 64px);
          line-height: 1.05;
          color: #1c1c1c;
        }
        /* the traveler is on a screen: Learn is the TV in the network bar */
        .screen {
          flex: none;
          padding: var(--ddd-spacing-3, 12px);
          border: 6px solid #1c1c1c;
          border-radius: 22px;
          background-color: #101014;
          box-shadow: 6px 6px 0 #1c1c1c;
          --future-traveler-size: 96px;
        }
        :host([home]) .screen {
          --future-traveler-size: 168px;
        }
        @media (max-width: 640px) {
          .screen,
          :host([home]) .screen {
            --future-traveler-size: 72px;
          }
        }
      `,
    ];
  }
  render() {
    const learn = HAX_NETWORK.properties.learn;
    const skin = LEARN_ERA_SKINS[this.era] || LEARN_ERA_SKINS.today;
    const drawn = HAX_TRAVELER_ERAS.find((e) => e.id === skin.traveler) || HAX_TRAVELER_ERAS[0];
    return html`
      <div class="inner">
        <div class="top">
          <p class="prop"><span class="chip">${haxNetworkGlyph("learn")}${learn.label}</span>${learn.purpose}</p>
          <learn-era-switcher></learn-era-switcher>
        </div>
        <div class="main">
          <div>
            ${this.crumb ? html`<p class="crumb"><a href="${this.crumbHref}">${this.crumb}</a> /</p>` : ""}
            <h1>${this.heading}</h1>
          </div>
          <div class="screen ft-host" role="img" aria-label="The Future Traveler, drawn in the style of: ${drawn.label}">
            ${futureTraveler(skin.traveler)}
          </div>
        </div>
      </div>
    `;
  }
}
globalThis.customElements.define(LearnBanner.tag, LearnBanner);
