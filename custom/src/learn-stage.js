/**
 * `learn-stage`: the tutorial of the page, delivered in the medium of the era.
 * The page is ordinary HAX content (a video-player, headings, text, pictures).
 * The theme reads it and hands it here; nothing in the page is written for an era.
 */
import { html, css } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { LearnEraMixin, setLearnEra, learnEraStyles } from "./learn-era.js";

// The stage only shows on a page with a video, so its players load then,
// not with the theme: the video player alone is ~40 KB the home page and every
// page without a video never uses (haxtheweb/issues#3431). They start loading
// in willUpdate, before the first render that needs them.
let stageMedia = null;
function loadStageMedia() {
  if (!stageMedia) {
    stageMedia = Promise.all([
      import("@haxtheweb/retro-tv/retro-tv.js"),
      import("@haxtheweb/retro-tv/lib/programs/retro-tv-title-sequence.js"),
      import("@haxtheweb/retro-tv/lib/programs/retro-tv-static.js"),
      import("@haxtheweb/video-player/video-player.js"),
    ]).catch((e) => {
      stageMedia = null;
      console.warn(e);
    });
  }
  return stageMedia;
}

export class LearnStage extends LearnEraMixin(DDD) {
  static get tag() {
    return "learn-stage";
  }
  static get properties() {
    return {
      ...super.properties,
      /** { title, video, track, chapters: [{ text, el }], gallery } */
      page: { type: Object },
      playing: { type: Boolean, reflect: true },
      chaptersOpen: { type: Boolean },
    };
  }
  constructor() {
    super();
    this.page = null;
    this.playing = false;
    this.chaptersOpen = false;
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
        :host([era="today"]),
        :host([empty]) {
          display: none;
        }
        .stage {
          border: var(--learn-border);
          border-radius: var(--learn-radius);
          background-color: var(--learn-surface);
          padding: var(--ddd-spacing-4, 16px);
        }
        h2 {
          margin: 0 0 var(--ddd-spacing-2, 8px);
          font-family: var(--learn-head-font);
          font-size: var(--ddd-font-size-m, 28px);
          line-height: 1.2;
          color: var(--learn-ink);
        }
        p {
          margin: 0 0 var(--ddd-spacing-3, 12px);
          font-size: var(--ddd-font-size-4xs, 16px);
          line-height: 1.5;
        }
        button {
          font: inherit;
          font-size: var(--ddd-font-size-4xs, 16px);
          min-height: 44px;
          padding: var(--ddd-spacing-2, 8px) var(--ddd-spacing-4, 16px);
          color: var(--learn-ink);
          background-color: var(--learn-bg);
          border: 2px solid var(--learn-ink);
          border-radius: var(--learn-radius);
          cursor: pointer;
        }
        button:focus-visible {
          outline: 3px solid var(--learn-accent);
          outline-offset: 2px;
        }
        button.go {
          background-color: var(--learn-ink);
          color: var(--learn-bg);
          font-weight: var(--ddd-font-weight-bold, 700);
        }
        ol {
          margin: var(--ddd-spacing-2, 8px) 0 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-2, 8px);
        }
        /* 1800s: a plate in a book */
        :host([era="1800s"]) .stage {
          text-align: center;
          padding: var(--ddd-spacing-8, 32px) var(--ddd-spacing-4, 16px);
        }
        :host([era="1800s"]) h2 {
          font-variant: small-caps;
          letter-spacing: 0.04em;
        }
        /* 1940s: the wireless */
        .radio {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
          gap: var(--ddd-spacing-4, 16px);
          align-items: center;
        }
        .grille {
          min-height: 150px;
          border: 2px solid var(--learn-ink);
          border-radius: 50% 50% 12px 12px;
          background-image: repeating-linear-gradient(0deg, var(--learn-ink) 0 3px, transparent 3px 12px);
        }
        .dial {
          display: block;
          padding: var(--ddd-spacing-1, 4px) var(--ddd-spacing-2, 8px);
          margin-bottom: var(--ddd-spacing-3, 12px);
          border: 2px solid var(--learn-ink);
          border-radius: 999px;
          background-color: var(--learn-bg);
          font-weight: 700;
        }
        /* 1980s: the set and the deck */
        retro-tv {
          max-width: 760px;
          margin: 0 auto var(--ddd-spacing-3, 12px);
        }
        .row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--ddd-spacing-2, 8px);
          justify-content: center;
        }
        .screenfill {
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: #000000;
        }
        .screenfill iframe {
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
        }
        /* 1990s: the disc menu, always a dark screen */
        :host([era="1990s"]) .stage {
          background-color: #0b1220;
          color: #e8eefc;
          border-color: #8fc1ff;
          min-height: 260px;
        }
        :host([era="1990s"]) h2 {
          color: #e8eefc;
          font-style: italic;
        }
        :host([era="1990s"]) button {
          display: block;
          width: 100%;
          max-width: 420px;
          text-align: left;
          background-color: #0b1220;
          color: #e8eefc;
          border-color: #8fc1ff;
        }
        :host([era="1990s"]) .menu {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-2, 8px);
        }
        :host([era="1990s"]) button.go {
          background-color: #e8eefc;
          color: #0b1220;
        }
        /* 2000s: the glossy embed */
        :host([era="2000s"]) .stage {
          border-top: 28px solid var(--learn-accent);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
        }
        @media (max-width: 500px) {
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
  willUpdate(changed) {
    if (super.willUpdate) super.willUpdate(changed);
    if (changed.has("page") || changed.has("era")) {
      this.playing = false;
      this.chaptersOpen = false;
      this.toggleAttribute("empty", !(this.page && this.page.video));
      if (this.page && this.page.video) {
        loadStageMedia();
      }
    }
  }
  // the picture alone, for the TV: no player chrome around it
  picture() {
    const id = (String(this.page.video).match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/) || [])[1];
    return id
      ? html`<iframe
          src="https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1"
          title="${this.page.title}"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowfullscreen
        ></iframe>`
      : this.player();
  }
  go(el) {
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  }
  player() {
    return html`<video-player
      source="${this.page.video}"
      track="${this.page.track || ""}"
      media-title="${this.page.title}"
    ></video-player>`;
  }
  render() {
    const p = this.page;
    if (!p || !p.video) return html``;
    switch (this.era) {
      case "1800s":
        return html`<div class="stage">
          <p>Plate I.</p>
          <h2>${p.title}</h2>
          <p>Moving pictures are promised for a later edition. In this one the lesson is set in type below, with plates.</p>
          <button type="button" id="skip-century" @click="${() => setLearnEra("1980s")}">
            Skip ahead a century to watch it
          </button>
        </div>`;
      case "1940s":
        return html`<div class="stage radio">
          <div class="grille" aria-hidden="true"></div>
          <div>
            <span class="dial">640 kc: the Learn HAX hour</span>
            <h2>${p.title}</h2>
            <p>The lesson's own sound, without the picture. The script is below.</p>
            <video-player
              audio-only
              source="${p.video}"
              track="${p.track || ""}"
              media-title="${p.title}"
            ></video-player>
          </div>
        </div>`;
      case "1980s":
        return html`<div class="stage">
          <retro-tv channel="3" controls osd-fade>
            <retro-tv-title-sequence
              channel="3"
              crawl-title="${p.title}"
              presenter="HAX"
              kicker="Learn HAX"
            ></retro-tv-title-sequence>
            <div channel="4" label="The tutorial video, ${p.title}" class="screenfill">${this.picture()}</div>
            <retro-tv-static channel="5"></retro-tv-static>
          </retro-tv>
          <div class="row">
            <button
              type="button"
              id="play-tape"
              class="go"
              @click="${() => this.shadowRoot.querySelector("retro-tv").tune(4)}"
            >
              ▶ Play the tape (CH 4)
            </button>
            <button
              type="button"
              id="rewind"
              @click="${() => {
                const tv = this.shadowRoot.querySelector("retro-tv");
                tv.tune(3);
                tv.replay();
              }}"
            >
              ◀◀ Rewind to the titles
            </button>
          </div>
        </div>`;
      case "1990s":
        return html`<div class="stage">
          <h2>${p.title}</h2>
          ${this.playing
            ? html`${this.player()}
                <p></p>
                <button type="button" id="menu" @click="${() => (this.playing = false)}">Menu</button>`
            : html`<p>Main menu. ${p.chapters.length} chapters.</p>
                <div class="menu">
                  <button type="button" id="play-disc" class="go" @click="${() => (this.playing = true)}">
                    ▶ Play tutorial
                  </button>
                  <button
                    type="button"
                    id="chapters"
                    aria-expanded="${this.chaptersOpen ? "true" : "false"}"
                    @click="${() => (this.chaptersOpen = !this.chaptersOpen)}"
                  >
                    Chapter selection
                  </button>
                  ${this.chaptersOpen
                    ? html`<ol>
                        ${p.chapters.map(
                          (c, i) =>
                            html`<li>
                              <button type="button" @click="${() => this.go(c.el)}">${i + 1}. ${c.text}</button>
                            </li>`,
                        )}
                      </ol>`
                    : ""}
                  ${p.gallery
                    ? html`<button type="button" id="gallery" @click="${() => this.go(p.gallery)}">Gallery</button>`
                    : ""}
                </div>`}
        </div>`;
      default:
        return html`<div class="stage">
          <h2>HAXTube beta: ${p.title}</h2>
          ${this.player()}
        </div>`;
    }
  }
}
globalThis.customElements.define(LearnStage.tag, LearnStage);
