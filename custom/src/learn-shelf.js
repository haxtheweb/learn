/**
 * `learn-shelf`: the child pages of one page of the site, shown as the media of
 * the era: book spines, a radio program guide, VHS cases, disc cases, a
 * Web 2.0 list, or cards. It reads the site's own outline, so adding a page
 * adds a title to the shelf.
 */
import { html, css, store, autorun, toJS } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { vhsBlogCase } from "@haxtheweb/vhs-blog-theme/lib/vhs-blog-case.js";
import "@haxtheweb/vhs-blog-theme/lib/vhs-blog-cover.js";
import { LearnEraMixin, learnEraStyles } from "./learn-era.js";

export class LearnShelf extends LearnEraMixin(DDD) {
  static get tag() {
    return "learn-shelf";
  }
  static get properties() {
    return {
      ...super.properties,
      /** slug of the page whose children are on this shelf */
      source: { type: String },
      heading: { type: String },
      /** children are box sets (tracks) and not single titles */
      boxset: { type: Boolean, reflect: true },
      items: { type: Array },
    };
  }
  constructor() {
    super();
    this.source = "";
    this.heading = "";
    this.boxset = false;
    this.items = [];
  }
  connectedCallback() {
    super.connectedCallback();
    this.__stop = autorun(() => {
      const manifest = toJS(store.manifest);
      const all = manifest && manifest.items ? manifest.items : [];
      const parent = all.find((i) => i.slug === this.source);
      this.items = parent
        ? all.filter((i) => i.parent === parent.id).sort((a, b) => a.order - b.order)
        : [];
    });
  }
  disconnectedCallback() {
    if (this.__stop) this.__stop();
    super.disconnectedCallback();
  }
  updated(changed) {
    if (super.updated) super.updated(changed);
    if (changed.has("source") && this.__stop) {
      this.__stop();
      this.connectedCallback();
    }
  }
  static get haxProperties() {
    return {
      canScale: false,
      gizmo: {
        title: "Learn shelf",
        description: "Child pages of a page, shown as the media of the era",
        icon: "icons:view-carousel",
        color: "purple",
        tags: ["Content", "learn", "shelf", "listing"],
      },
      settings: {
        configure: [
          { property: "heading", title: "Heading", inputMethod: "textfield" },
          { property: "source", title: "Parent page slug", inputMethod: "textfield" },
          { property: "boxset", title: "Children are tracks", inputMethod: "boolean" },
        ],
      },
      demoSchema: [{ tag: "learn-shelf", properties: { source: "tutorials", heading: "Pick a goal" } }],
    };
  }
  static get styles() {
    return [
      super.styles,
      learnEraStyles,
      css`
        :host {
          display: block;
          margin: var(--ddd-spacing-6, 24px) 0;
          font-family: var(--learn-font);
          color: var(--learn-ink);
        }
        h2 {
          font-family: var(--learn-head-font);
          font-size: var(--ddd-font-size-m, 28px);
          margin: 0 0 var(--ddd-spacing-3, 12px);
          color: var(--learn-ink);
        }
        ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: var(--ddd-spacing-4, 16px);
        }
        a {
          display: block;
          box-sizing: border-box;
          height: 100%;
          min-height: 44px;
          padding: var(--ddd-spacing-4, 16px);
          color: var(--learn-ink);
          background-color: var(--learn-surface);
          border: var(--learn-border);
          border-radius: var(--learn-radius);
          text-decoration: none;
        }
        a:focus-visible {
          outline: 3px solid var(--learn-accent);
          outline-offset: 3px;
        }
        .title {
          display: block;
          font-family: var(--learn-head-font);
          font-size: var(--ddd-font-size-xs, 20px);
          font-weight: var(--ddd-font-weight-bold, 700);
          text-decoration: underline;
        }
        .meta {
          display: block;
          margin-top: var(--ddd-spacing-2, 8px);
          font-size: var(--ddd-font-size-4xs, 16px);
        }
        .art {
          display: none;
        }
        .empty {
          font-size: var(--ddd-font-size-4xs, 16px);
        }

        /* 1800s: spines on a plank */
        :host([era="1800s"]) ul {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: flex-end;
          gap: 6px;
          padding: 0 var(--ddd-spacing-2, 8px);
          border-bottom: 14px solid var(--learn-accent);
        }
        :host([era="1800s"]) li {
          flex: none;
        }
        :host([era="1800s"]) a {
          writing-mode: vertical-rl;
          height: 300px;
          width: 92px;
          overflow: hidden;
          padding: var(--ddd-spacing-3, 12px) var(--ddd-spacing-2, 8px);
          background-color: var(--c-bg);
          color: var(--c-ink);
          border: 2px solid var(--c-ink);
          border-radius: 3px 3px 0 0;
        }
        :host([era="1800s"][boxset]) a {
          width: 112px;
          height: 320px;
        }
        :host([era="1800s"]) .title {
          font-size: 18px;
          line-height: 1.15;
        }
        :host([era="1800s"]) .meta {
          margin: 0 var(--ddd-spacing-2, 8px) 0 0;
          font-size: 14px;
        }

        /* 1940s: tonight's program guide */
        :host([era="1940s"]) ul {
          display: block;
          border: var(--learn-border);
          border-radius: var(--learn-radius);
          background-color: var(--learn-surface);
          padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-4, 16px);
        }
        :host([era="1940s"]) a {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-2, 8px) var(--ddd-spacing-4, 16px);
          align-items: baseline;
          border: 0;
          border-bottom: 2px dotted var(--learn-ink);
          border-radius: 0;
          padding: var(--ddd-spacing-3, 12px) 0;
          background-color: transparent;
        }
        :host([era="1940s"]) li:last-child a {
          border-bottom: 0;
        }
        :host([era="1940s"]) .art {
          display: inline;
          font-weight: 700;
        }
        :host([era="1940s"]) .title {
          flex: 1 1 200px;
        }
        :host([era="1940s"]) .meta {
          margin: 0;
        }

        /* 1980s: generated VHS cases, the real vhs-blog-cover */
        :host([era="1980s"]) ul {
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: var(--ddd-spacing-6, 24px);
        }
        :host([era="1980s"]) a {
          padding: 0;
          border: 0;
          background-color: transparent;
        }
        :host([era="1980s"]) .art {
          display: block;
        }
        :host([era="1980s"]) .title {
          margin-top: var(--ddd-spacing-3, 12px);
          font-family: var(--learn-font);
          font-size: 16px;
        }
        :host([era="1980s"]) .meta {
          margin-top: 2px;
          font-size: 14px;
        }

        /* 1990s: disc cases */
        :host([era="1990s"]) ul {
          grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
          gap: var(--ddd-spacing-6, 24px);
        }
        :host([era="1990s"]) a {
          aspect-ratio: 135 / 190;
          height: auto;
          display: flex;
          flex-direction: column;
          padding: 0 0 var(--ddd-spacing-3, 12px);
          background-color: var(--c-bg);
          color: var(--c-ink);
          border: 0;
          border-left: 10px solid #101010;
          border-radius: 3px 8px 8px 3px;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.35);
          overflow: hidden;
        }
        :host([era="1990s"]) .art {
          display: block;
          background-color: #101010;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.2em;
          padding: 6px 10px;
        }
        :host([era="1990s"]) .title {
          flex: 1;
          padding: var(--ddd-spacing-4, 16px) var(--ddd-spacing-3, 12px) 0;
          font-size: 22px;
          line-height: 1.15;
        }
        :host([era="1990s"]) .meta {
          padding: 0 var(--ddd-spacing-3, 12px);
          font-size: 14px;
        }

        /* 2000s: glossy list */
        :host([era="2000s"]) ul {
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        }
        :host([era="2000s"]) a {
          box-shadow: 0 2px 0 var(--learn-accent), 0 6px 14px rgba(0, 0, 0, 0.15);
          border-top: 6px solid var(--learn-accent);
        }
        :host([era="2000s"]) .art {
          display: inline-block;
          margin-bottom: var(--ddd-spacing-2, 8px);
          padding: 2px 10px;
          border-radius: 999px;
          border: 2px solid var(--learn-ink);
          font-size: 14px;
          font-weight: 700;
        }
      `,
    ];
  }
  art(item, i) {
    switch (this.era) {
      case "1940s":
        return html`<span class="art">${7 + Math.floor(i / 2)}:${i % 2 ? "30" : "00"} PM</span>`;
      case "1980s":
        return html`<span class="art"
          ><vhs-blog-cover
            case-title="${item.title}"
            presenter="HAX"
          ></vhs-blog-cover
        ></span>`;
      case "1990s":
        return html`<span class="art" aria-hidden="true">DISC ${i + 1}</span>`;
      case "2000s":
        return html`<span class="art">beta</span>`;
      default:
        return "";
    }
  }
  render() {
    return html`
      ${this.heading ? html`<h2>${this.heading}</h2>` : ""}
      ${this.items.length === 0
        ? html`<p class="empty">Nothing on this shelf yet.</p>`
        : html`<ul>
            ${this.items.map((item, i) => {
              const c = vhsBlogCase(item.title);
              return html`<li>
                <a href="${item.slug}" style="--c-bg:${c.bg};--c-ink:${c.ink}">
                  ${this.art(item, i)}
                  <span class="title">${item.title}</span>
<span class="meta">${this.boxset ? "Path" : "Page"}</span>
                </a>
              </li>`;
            })}
          </ul>`}
    `;
  }
}
globalThis.customElements.define(LearnShelf.tag, LearnShelf);
