/**
 * `learn-arcade-cabinet`: a cabinet around a game. The game is ordinary page
 * content (a concept-map-game, concept-runner-game or concept-quest-game from
 * micro-game-base) put inside it; the cabinet names it and says what it teaches.
 */
import { html, css } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { DDD } from "@haxtheweb/d-d-d/d-d-d.js";
import { LearnEraMixin, learnEraStyles } from "./learn-era.js";

const ROOM = {
  "1800s": "Parlour amusement",
  "1940s": "Penny arcade",
  "1980s": "Arcade cabinet",
  "1990s": "Console demo kiosk",
  "2000s": "Browser game",
  today: "Concept game",
};

export class LearnArcadeCabinet extends LearnEraMixin(DDD) {
  static get tag() {
    return "learn-arcade-cabinet";
  }
  static get properties() {
    return {
      ...super.properties,
      marquee: { type: String },
      teaches: { type: String },
    };
  }
  constructor() {
    super();
    this.marquee = "";
    this.teaches = "";
  }
  static get haxProperties() {
    return {
      canScale: false,
      gizmo: {
        title: "Arcade cabinet",
        description: "A cabinet around a concept game",
        icon: "hardware:videogame-asset",
        color: "blue",
        tags: ["Instructional", "game", "learn"],
      },
      settings: {
        configure: [
          { property: "marquee", title: "Marquee", inputMethod: "textfield" },
          { property: "teaches", title: "What it teaches", inputMethod: "textfield" },
          { slot: "", title: "The game" },
        ],
      },
      demoSchema: [{ tag: "learn-arcade-cabinet", properties: { marquee: "Pillar Walk" } }],
    };
  }
  static get styles() {
    return [
      super.styles,
      learnEraStyles,
      css`
        :host {
          display: block;
          margin: var(--ddd-spacing-8, 32px) 0;
          font-family: var(--learn-font);
          color: var(--learn-ink);
        }
        .cab {
          border: var(--learn-border);
          border-radius: var(--learn-radius);
          background-color: var(--learn-surface);
          overflow: hidden;
        }
        .marquee {
          padding: var(--ddd-spacing-3, 12px) var(--ddd-spacing-4, 16px);
          background-color: var(--learn-ink);
          color: var(--learn-bg);
        }
        h2 {
          margin: 0;
          font-family: var(--learn-head-font);
          font-size: var(--ddd-font-size-m, 28px);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--learn-bg);
        }
        .room,
        .teaches {
          margin: 0;
          font-size: var(--ddd-font-size-4xs, 16px);
        }
        .teaches {
          padding: var(--ddd-spacing-3, 12px) var(--ddd-spacing-4, 16px) 0;
        }
        .screen {
          padding: var(--ddd-spacing-3, 12px);
        }
      `,
    ];
  }
  render() {
    return html`
      <div class="cab">
        <div class="marquee">
          <p class="room">${ROOM[this.era] || ROOM.today}</p>
          <h2>${this.marquee}</h2>
        </div>
        ${this.teaches ? html`<p class="teaches">${this.teaches}</p>` : ""}
        <div class="screen"><slot></slot></div>
      </div>
    `;
  }
}
globalThis.customElements.define(LearnArcadeCabinet.tag, LearnArcadeCabinet);
