/**
 * Learn HAX theme: made from hax-marketing-theme. It keeps that theme's
 * header, menu, remix panel and footer and replaces two parts: the title band
 * becomes the Learn band (the network's own color, glyph and sentence for
 * Learn, with the time machine on it), and a stage above the page delivers the
 * page's tutorial in the medium of the chosen period.
 */
import { css, html } from "@haxtheweb/haxcms-elements/lib/core/HAXCMSLitElementTheme.js";
import { HaxMarketingTheme } from "@haxtheweb/hax-marketing-theme/hax-marketing-theme.js";
import "./learn-banner.js";
import "./learn-stage.js";
import { LearnEraMixin, LEARN_ERA_SKINS } from "./learn-era.js";

class CustomLearnHaxTheme extends LearnEraMixin(HaxMarketingTheme) {
  static get tag() {
    return "custom-learn-hax-theme";
  }
  static get properties() {
    return {
      ...super.properties,
      hasStage: { type: Boolean, reflect: true, attribute: "has-stage" },
      _page: { type: Object },
    };
  }
  constructor() {
    super();
    this.hasStage = false;
    this._page = null;
    this.__readSoon = () => {
      clearTimeout(this.__reading);
      this.__reading = setTimeout(() => this.__readPage(), 150);
    };
  }
  connectedCallback() {
    super.connectedCallback();
    // the page arrives as this element's own children
    this.__content = new MutationObserver(this.__readSoon);
    this.__content.observe(this, { childList: true });
    this.__readSoon();
  }
  disconnectedCallback() {
    if (this.__content) this.__content.disconnect();
    clearTimeout(this.__reading);
    super.disconnectedCallback();
  }
  static get styles() {
    return [
      super.styles,
      css`
        :host([era]:not([era="today"])) :is(header, learn-banner, main, .switcher, footer) {
          --ddd-font-primary: var(--learn-era-font);
          --ddd-font-navigation: var(--learn-era-font);
          --ddd-font-heading: var(--learn-era-heading);
        }
        /* the stage carries the page's video in these periods, so the page's own copy steps aside */
        :host([has-stage]:not([era="today"])) ::slotted(video-player:first-child),
        :host([has-stage]:not([era="today"])) ::slotted(video-player:nth-child(2)) {
          display: none;
        }
        :host([era="1800s"]) ::slotted(media-image) {
          filter: grayscale(1) contrast(1.1);
        }
      `,
    ];
  }
  // the title band is the Learn band
  renderHero(parts) {
    return html`<learn-banner
      heading="${parts.active ? parts.active.title : ""}"
      ?home="${parts.isHome}"
      crumb="${parts.parent ? parts.parent.title : ""}"
      crumb-href="${parts.parent ? parts.parent.slug : ""}"
    ></learn-banner>`;
  }
  // the tutorial of the page, in the medium of the period
  renderContentTop() {
    return html`<learn-stage .page="${this._page}"></learn-stage>`;
  }
  updated(changed) {
    if (super.updated) super.updated(changed);
    if (changed.has("era")) this.__skin();
    if (changed.has("activeId")) this.__readSoon();
  }
  // Learn's own color leads in every period; a period brings its accent and type
  __skin() {
    const skin = LEARN_ERA_SKINS[this.era] || {};
    this.style.setProperty("--ddd-palette-color-1", "var(--ddd-theme-default-skyBlue)");
    this.style.setProperty("--ddd-palette-text-color-1", "#000000");
    [
      ["4", skin.accent],
      ["6", skin.second],
    ].forEach((pair) => {
      if (pair[1]) this.style.setProperty("--ddd-palette-color-" + pair[0], pair[1]);
      else this.style.removeProperty("--ddd-palette-color-" + pair[0]);
    });
    // type is handed to the theme's own regions (see styles), not to the network
    // bar, which looks the same on every site and in every period
    if (skin.font) {
      this.style.setProperty("--learn-era-font", skin.font);
      this.style.setProperty("--learn-era-heading", skin.heading);
    } else {
      this.style.removeProperty("--learn-era-font");
      this.style.removeProperty("--learn-era-heading");
    }
    this.__repaint();
  }
  // a page that opens with a video is a tutorial; hand its parts to the stage
  __readPage() {
    // HAXcms puts a page-break ahead of the page's own content
    const first = Array.from(this.children).find((el) => el.tagName !== "PAGE-BREAK");
    const video = first && first.tagName === "VIDEO-PLAYER" ? first : null;
    const active = this._all.find((i) => i.id === this.activeId);
    this._page = video
      ? {
          title: video.getAttribute("media-title") || (active ? active.title : ""),
          video: video.getAttribute("source"),
          track: video.getAttribute("track") || "",
          chapters: Array.from(this.querySelectorAll(":scope > h2")).map((el) => ({ text: el.textContent.trim(), el })),
          gallery: this.querySelector(":scope > media-image"),
        }
      : null;
    this.hasStage = !!video;
  }
}
globalThis.customElements.define(CustomLearnHaxTheme.tag, CustomLearnHaxTheme);
export { CustomLearnHaxTheme };
