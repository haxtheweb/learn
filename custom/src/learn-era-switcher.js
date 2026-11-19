/**
 * `learn-era-switcher`: the time period the site is shown in, as one joined
 * toggle. It sits on the Learn band, so its colors are the band's own.
 */
import { html, css } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { LEARN_ERAS, LearnEraMixin, setLearnEra } from "./learn-era.js";

export class LearnEraSwitcher extends LearnEraMixin(DDD) {
  static get tag() {
    return "learn-era-switcher";
  }
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation, sans-serif);
          color: #1c1c1c;
        }
        .label {
          margin: 0 0 var(--ddd-spacing-1, 4px);
          font-size: 14px;
          font-weight: var(--ddd-font-weight-bold, 700);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #1c1c1c;
        }
        .eras {
          display: inline-flex;
          flex-wrap: wrap;
          border: 3px solid #1c1c1c;
          border-radius: 12px;
          overflow: hidden;
          background-color: #1c1c1c;
          gap: 2px;
        }
        button {
          font: inherit;
          min-height: 48px;
          min-width: 64px;
          padding: var(--ddd-spacing-1, 4px) var(--ddd-spacing-3, 12px);
          color: #1c1c1c;
          background-color: #ffffff;
          border: 0;
          border-radius: 0;
          cursor: pointer;
          line-height: 1.15;
          flex: 1 1 auto;
        }
        .when {
          display: block;
          font-size: 16px;
          font-weight: var(--ddd-font-weight-bold, 700);
        }
        .how {
          display: block;
          font-size: 14px;
        }
        button[aria-pressed="true"] {
          background-color: #1c1c1c;
          color: #ffffff;
        }
        button[aria-pressed="true"] .when {
          text-decoration: underline;
        }
        button:focus-visible {
          outline: 3px solid #ffffff;
          outline-offset: -6px;
        }
        button[aria-pressed="true"]:focus-visible {
          outline-color: #ffffff;
        }
        button:not([aria-pressed="true"]):focus-visible {
          outline-color: #1c1c1c;
        }
      `,
    ];
  }
  render() {
    return html`
      <p class="label" id="l">Time machine: pick a period</p>
      <div class="eras" role="group" aria-labelledby="l">
        ${LEARN_ERAS.map(
          (e) => html`<button
            type="button"
            id="era-${e.id}"
            aria-pressed="${this.era === e.id ? "true" : "false"}"
            @click="${() => setLearnEra(e.id)}"
          >
            <span class="when">${this.era === e.id ? "✓ " : ""}${e.label}</span>
            <span class="how">${e.medium}</span>
          </button>`,
        )}
      </div>
    `;
  }
}
globalThis.customElements.define(LearnEraSwitcher.tag, LearnEraSwitcher);
