/**
 * `learn-latest`: the most recent tutorials, offered the way the period would
 * have offered them: a table of contents, a radio schedule, a TV guide, a disc
 * menu, a video list, or cards. It reads the site's own outline.
 */
import { html, css, store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import "@haxtheweb/retro-tv/retro-tv.js";
import "@haxtheweb/retro-tv/lib/programs/retro-tv-title-sequence.js";
import { LearnEraMixin, learnEraStyles } from "./learn-era.js";

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
const HEADING = {
  "1800s": "Table of contents",
  "1940s": "Tonight on the Learn HAX hour",
  "1980s": "TV guide",
  "1990s": "Scene selection",
  "2000s": "Most recent videos",
  today: "Latest tutorials",
};

export class LearnLatest extends LearnEraMixin(DDD) {
  static get tag() {
    return "learn-latest";
  }
  static get properties() {
    return {
      ...super.properties,
      /** slugs of the pages whose child pages are tutorials, comma separated */
      source: { type: String },
      /** how many to show; the TV dial has ten channels */
      count: { type: Number },
      items: { type: Array },
      channel: { type: Number },
    };
  }
  constructor() {
    super();
    this.source = "";
    this.count = 10;
    this.items = [];
    this.channel = 1;
  }
  connectedCallback() {
    super.connectedCallback();
    this.__stop = autorun(() => {
      const manifest = toJS(store.manifest);
      const all = manifest && manifest.items ? manifest.items : [];
      const found = [];
      String(this.source)
        .split(",")
        .map((slug) => slug.trim())
        .forEach((slug) => {
          const parent = all.find((i) => i.slug === slug);
          if (!parent) return;
          all
            .filter((i) => i.parent === parent.id)
            .forEach((i) => {
              // a page with no pages of its own is a tutorial
              if (!all.some((c) => c.parent === i.id)) found.push(i);
            });
        });
      const when = (i) => (i.metadata && (i.metadata.updated || i.metadata.created)) || 0;
      this.items = found.sort((a, b) => when(b) - when(a)).slice(0, Math.min(this.count, 10));
    });
  }
  disconnectedCallback() {
    if (this.__stop) this.__stop();
    super.disconnectedCallback();
  }
  static get haxProperties() {
    return {
      canScale: false,
      gizmo: {
        title: "Latest tutorials",
        description: "The most recent tutorials, in the medium of the period",
        icon: "hardware:tv",
        color: "blue",
        tags: ["Media", "learn", "tv", "listing"],
      },
      settings: {
        configure: [
          { property: "source", title: "Parent page slugs", inputMethod: "textfield" },
          { property: "count", title: "How many", inputMethod: "number" },
        ],
      },
      demoSchema: [{ tag: "learn-latest", properties: { source: "tutorial-library", count: 10 } }],
    };
  }
  static get styles() {
    return [
      super.styles,
      learnEraStyles,
      css`
        :host {
          display: block;
          margin: 0 0 var(--ddd-spacing-8, 32px);
          font-family: var(--learn-font);
          color: var(--learn-ink);
        }
        h2 {
          margin: 0 0 var(--ddd-spacing-3, 12px);
          font-family: var(--learn-head-font);
          font-size: var(--ddd-font-size-m, 28px);
          line-height: 1.2;
          color: var(--learn-ink);
        }
        ol {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-2, 8px);
        }
        a,
        button {
          display: flex;
          gap: var(--ddd-spacing-3, 12px);
          align-items: baseline;
          box-sizing: border-box;
          width: 100%;
          min-height: 44px;
          padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-3, 12px);
          font: inherit;
          font-size: var(--ddd-font-size-4xs, 16px);
          text-align: left;
          color: var(--learn-ink);
          background-color: var(--learn-surface);
          border: 2px solid var(--learn-ink);
          border-radius: var(--learn-radius);
          cursor: pointer;
        }
        a .t {
          text-decoration: underline;
        }
        a:focus-visible,
        button:focus-visible {
          outline: 3px solid var(--learn-accent);
          outline-offset: 2px;
        }
        .n {
          flex: none;
          font-weight: 700;
        }
        /* 1800s: a contents page */
        :host([era="1800s"]) .box {
          border: 3px double var(--learn-ink);
          padding: var(--ddd-spacing-6, 24px);
          background-color: var(--learn-surface);
        }
        :host([era="1800s"]) h2 {
          text-align: center;
          font-variant: small-caps;
          letter-spacing: 0.06em;
        }
        :host([era="1800s"]) a {
          border: 0;
          border-bottom: 2px dotted var(--learn-ink);
          border-radius: 0;
          background-color: transparent;
          font-size: 18px;
        }
        :host([era="1800s"]) .n {
          min-width: 3.5em;
        }
        /* 1940s: the wireless and tonight's schedule */
        .radio {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
          gap: var(--ddd-spacing-6, 24px);
          align-items: start;
          border: 2px solid var(--learn-ink);
          border-radius: 14px;
          padding: var(--ddd-spacing-4, 16px);
          background-color: var(--learn-surface);
        }
        .grille {
          min-height: 220px;
          border: 2px solid var(--learn-ink);
          border-radius: 50% 50% 12px 12px;
          background-image: repeating-linear-gradient(0deg, var(--learn-ink) 0 3px, transparent 3px 12px);
        }
        :host([era="1940s"]) a {
          background-color: var(--learn-bg);
        }
        /* 1980s: the set and the guide */
        .room {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
          gap: var(--ddd-spacing-6, 24px);
          align-items: start;
        }
        :host([era="1980s"]) h2 {
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        button[aria-pressed="true"] {
          background-color: var(--learn-ink);
          color: var(--learn-bg);
          font-weight: var(--ddd-font-weight-bold, 700);
          text-decoration: underline;
        }
        .ch {
          flex: none;
          font-family: "Courier New", Courier, monospace;
          font-weight: 700;
        }
        .now {
          margin: var(--ddd-spacing-3, 12px) 0 0;
          font-size: var(--ddd-font-size-xs, 20px);
          text-align: center;
        }
        .now a {
          display: inline-block;
          width: auto;
          color: var(--learn-bg);
          background-color: var(--learn-ink);
          font-weight: var(--ddd-font-weight-bold, 700);
        }
        /* 1990s: the disc menu, always a dark screen */
        .disc {
          padding: var(--ddd-spacing-6, 24px);
          border: 2px solid #8fc1ff;
          border-radius: 6px;
          background-color: #0b1220;
          color: #e8eefc;
        }
        .disc h2 {
          color: #e8eefc;
          font-style: italic;
        }
        .disc p {
          margin: 0 0 var(--ddd-spacing-4, 16px);
          font-size: var(--ddd-font-size-4xs, 16px);
        }
        .disc ol {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        }
        .disc a {
          color: #e8eefc;
          background-color: #0b1220;
          border-color: #8fc1ff;
        }
        .disc li:first-child a {
          background-color: #e8eefc;
          color: #0b1220;
          font-weight: 700;
        }
        .disc a:focus-visible {
          outline-color: #ffffff;
        }
        /* 2000s: the video list */
        :host([era="2000s"]) a {
          align-items: center;
          border-radius: 14px;
          border-width: 1px;
          box-shadow: 0 2px 0 var(--learn-accent);
        }
        :host([era="2000s"]) .n {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 40px;
          border-radius: 8px;
          background-color: var(--learn-ink);
          color: var(--learn-bg);
        }
        /* today: cards */
        :host([era="today"]) ol {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: var(--ddd-spacing-4, 16px);
        }
        :host([era="today"]) a {
          padding: var(--ddd-spacing-4, 16px);
          font-size: 18px;
        }
        @media (max-width: 800px) {
          .room,
          .radio {
            grid-template-columns: 1fr;
          }
          .grille {
            min-height: 80px;
          }
        }
      `,
    ];
  }
  list(number) {
    return html`<ol aria-labelledby="h">
      ${this.items.map(
        (item, i) =>
          html`<li>
            <a href="${item.slug}"><span class="n">${number(i)}</span><span class="t">${item.title}</span></a>
          </li>`,
      )}
    </ol>`;
  }
  render() {
    const heading = html`<h2 id="h">${HEADING[this.era] || HEADING.today}</h2>`;
    switch (this.era) {
      case "1800s":
        return html`<div class="box">${heading}${this.list((i) => "Chap. " + ROMAN[i])}</div>`;
      case "1940s":
        return html`<div class="radio">
          <div class="grille" aria-hidden="true"></div>
          <div>${heading}${this.list((i) => 7 + Math.floor(i / 2) + ":" + (i % 2 ? "30" : "00") + " PM")}</div>
        </div>`;
      case "1980s": {
        const on = this.items[this.channel - 1];
        return html`<div class="room">
          <div>
            <retro-tv
              channel="1"
              controls
              osd-fade
              @retro-tv-channel-changed="${(e) => (this.channel = parseInt(e.detail.channel, 10))}"
            >
              ${this.items.map(
                (item, i) =>
                  html`<retro-tv-title-sequence
                    channel="${i + 1}"
                    crawl-title="${item.title}"
                    presenter="HAX"
                    kicker="Learn HAX"
                  ></retro-tv-title-sequence>`,
              )}
            </retro-tv>
            <p class="now" role="status">
              ${on ? html`<a id="watch" href="${on.slug}">▶ Watch: ${on.title}</a>` : ""}
            </p>
          </div>
          <div>
            ${heading}
            <ol aria-labelledby="h">
              ${this.items.map(
                (item, i) =>
                  html`<li>
                    <button
                      type="button"
                      id="ch-${i + 1}"
                      aria-pressed="${this.channel === i + 1 ? "true" : "false"}"
                      @click="${() => this.shadowRoot.querySelector("retro-tv").tune(i + 1)}"
                    >
                      <span class="ch">CH ${i + 1 < 10 ? "0" : ""}${i + 1}</span
                      ><span>${this.channel === i + 1 ? "✓ " : ""}${item.title}</span>
                    </button>
                  </li>`,
              )}
            </ol>
          </div>
        </div>`;
      }
      case "1990s":
        return html`<div class="disc">
          ${heading}
          <p>Learn HAX, disc one. The newest scene is first.</p>
          ${this.list((i) => i + 1 + ".")}
        </div>`;
      case "2000s":
        return html`${heading}${this.list((i) => "▶ " + (i + 1))}`;
      default:
        return html`${heading}${this.list(() => "")}`;
    }
  }
}
globalThis.customElements.define(LearnLatest.tag, LearnLatest);
