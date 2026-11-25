This page consolidates HAX release notes into one ongoing section fed by future releases. For per-repo detail, follow the release feeds listed under [Tracking releases](#tracking-releases).

Tracking releases
-----------------

*   [webcomponents releases](https://github.com/haxtheweb/webcomponents/releases) for elements, themes, and DDD updates.
*   [create CLI releases](https://github.com/haxtheweb/create/releases) for authoring workflow and scaffolding changes.
*   [haxcms-nodejs releases](https://github.com/haxtheweb/haxcms-nodejs/releases) and [haxcms-php releases](https://github.com/haxtheweb/haxcms-php/releases) for backend and endpoint updates.

Suggested upgrade workflow
--------------------------

1.  Review release notes for breaking changes and dependency expectations.
2.  Apply updates in a staging site and test your most-used authoring and import paths.
3.  Run Reports-based checks (especially link checks) after upgrades.
4.  Publish once page rendering, media, and navigation all validate.

HAX 26.8.0
----------

HAX 26.8.0 is the first release shipped under the calendar versioning scheme — the **.8.** marks the August 2026 ship month, not a feature count. It covers roughly three months of work (May 13 → August 13, 2026) since [26.0.0](https://github.com/haxtheweb/webcomponents/releases/tag/v26.0.0), with the PHP and NodeJS backends converged onto a single on-premises v1 REST API, a stronger document and media pipeline, two new themes, and a cleanup pass that cut thousands of legacy lines.

### Release at a glance

*   **Issues closed this cycle:** 236 (vs. 166 opened — closing 1.4× faster than incoming)
*   **Open backlog:** 191 → 121, a reduction of 70 issues (−37%) while the release was being built
*   **Commits across the four core repos:** 688
*   **Files touched:** 9,514
*   **Net source change:** +94,838 lines — and webcomponents alone shrank net −8,127
*   **New contributors:** Alyssa F ([kazmyriad](https://github.com/kazmyriad)) and Winston ([winstonwumbo](https://github.com/winstonwumbo)) — first commits this cycle
*   **Release QA:** the release QA tracker is closed — [#2918](https://github.com/haxtheweb/issues/issues/2918) — signaling the QA pass is complete ahead of tagging.

### What's new in 26.8.0

#### On-premises API migration

HAX moved off open-api.hax.cloud entirely. Document conversion, the file list, and site operations now run locally, and both backends converged on a v1 REST API — PHP routes refactored to mirror NodeJS, haxcms-php implementing the new v1 surface, with legacy blox, v0, and screenshot endpoints removed.

Issues: [#2903](https://github.com/haxtheweb/issues/issues/2903), [#2852](https://github.com/haxtheweb/issues/issues/2852), [#2856](https://github.com/haxtheweb/issues/issues/2856), [#2857](https://github.com/haxtheweb/issues/issues/2857), [#2867](https://github.com/haxtheweb/issues/issues/2867), [#2825](https://github.com/haxtheweb/issues/issues/2825), [#2833](https://github.com/haxtheweb/issues/issues/2833), [#2828](https://github.com/haxtheweb/issues/issues/2828), [#2860](https://github.com/haxtheweb/issues/issues/2860)

#### Import, export, and document conversion

Docx import reliability and hierarchy dialog improvements, no more double-encoded ampersands in titles, outline-from-file presentation, EPUB page export, PDF download review, direct embedding from the file admin panel, and CLI skeleton import/export with a better site-creation skeleton selector.

Issues: [#2794](https://github.com/haxtheweb/issues/issues/2794), [#2915](https://github.com/haxtheweb/issues/issues/2915), [#2916](https://github.com/haxtheweb/issues/issues/2916), [#2922](https://github.com/haxtheweb/issues/issues/2922), [#2924](https://github.com/haxtheweb/issues/issues/2924), [#2925](https://github.com/haxtheweb/issues/issues/2925), [#2937](https://github.com/haxtheweb/issues/issues/2937), [#2902](https://github.com/haxtheweb/issues/issues/2902), [#2798](https://github.com/haxtheweb/issues/issues/2798), [#2799](https://github.com/haxtheweb/issues/issues/2799), [#2921](https://github.com/haxtheweb/issues/issues/2921)

#### Media and image handling

media-playlist and image-gallery blocks folded in, MP3 and MP4 UX improvements, transcript-gap detection for videos, in-place image rotation that reflects changes instantly, and a JPEG quality setting.

Issues: [#2893](https://github.com/haxtheweb/issues/issues/2893), [#2901](https://github.com/haxtheweb/issues/issues/2901), [#2800](https://github.com/haxtheweb/issues/issues/2800), [#2815](https://github.com/haxtheweb/issues/issues/2815), [#2836](https://github.com/haxtheweb/issues/issues/2836), [#2816](https://github.com/haxtheweb/issues/issues/2816)

#### Themes and design system

Two new themes — a twenty-six (2015-inspired) theme and a link-tree theme — plus palette-default respect, a system-level style guide, site-level block management, normalized .3s/.6s transitions, and a unified user menu across app-hax and hax sites.

Issues: [#2823](https://github.com/haxtheweb/issues/issues/2823), [#2822](https://github.com/haxtheweb/issues/issues/2822), [#2796](https://github.com/haxtheweb/issues/issues/2796), [#2846](https://github.com/haxtheweb/issues/issues/2846), [#2844](https://github.com/haxtheweb/issues/issues/2844), [#2917](https://github.com/haxtheweb/issues/issues/2917), [#2905](https://github.com/haxtheweb/issues/issues/2905)

#### Performance and security cleanup

Removed legacy polyfills, Polymer references, wiredjs, and the shoelace carousel (replaced in-house); CLS fixes, a Chrome first-load hang fix, a lighthouse audit pass, cache-expiration review, .well-known and SECURITY.txt rollout, and VERSION.txt access removed for hardening.

Issues: [#2875](https://github.com/haxtheweb/issues/issues/2875), [#2882](https://github.com/haxtheweb/issues/issues/2882), [#2890](https://github.com/haxtheweb/issues/issues/2890), [#2895](https://github.com/haxtheweb/issues/issues/2895), [#2897](https://github.com/haxtheweb/issues/issues/2897), [#2909](https://github.com/haxtheweb/issues/issues/2909), [#2850](https://github.com/haxtheweb/issues/issues/2850), [#2840](https://github.com/haxtheweb/issues/issues/2840), [#2878](https://github.com/haxtheweb/issues/issues/2878), [#2859](https://github.com/haxtheweb/issues/issues/2859), [#2839](https://github.com/haxtheweb/issues/issues/2839), [#2838](https://github.com/haxtheweb/issues/issues/2838), [#2866](https://github.com/haxtheweb/issues/issues/2866), [#2864](https://github.com/haxtheweb/issues/issues/2864)

#### Developer experience and Skills

The Skills framework was incorporated into PRAW (and split intentionally between PRAW and create), an OpenStax-to-HAX plugin for Claude, a tutorial-producing skill, an audio skill bridge, NodeJS live-reload with local assets, custom ports, JSON CLI output, and project scorecards for every core repo.

Issues: [#2832](https://github.com/haxtheweb/issues/issues/2832), [#2908](https://github.com/haxtheweb/issues/issues/2908), [#2932](https://github.com/haxtheweb/issues/issues/2932), [#2911](https://github.com/haxtheweb/issues/issues/2911), [#2943](https://github.com/haxtheweb/issues/issues/2943), [#2931](https://github.com/haxtheweb/issues/issues/2931), [#2855](https://github.com/haxtheweb/issues/issues/2855), [#2847](https://github.com/haxtheweb/issues/issues/2847), [#2812](https://github.com/haxtheweb/issues/issues/2812), [#2948](https://github.com/haxtheweb/issues/issues/2948), [#2808](https://github.com/haxtheweb/issues/issues/2808), [#2809](https://github.com/haxtheweb/issues/issues/2809), [#2810](https://github.com/haxtheweb/issues/issues/2810), [#2811](https://github.com/haxtheweb/issues/issues/2811)

#### Reports and revision history

The reports dashboard was redesigned as table-based information, and revision history now accounts for the .json variant of each item.

Issues: [#2829](https://github.com/haxtheweb/issues/issues/2829), [#2830](https://github.com/haxtheweb/issues/issues/2830), [#2827](https://github.com/haxtheweb/issues/issues/2827)

#### Publishing resilience

Windows PowerShell publish-to-surge/netlify/vercel fix, symlink-publish errors, undefined-domain and custom-theme publishing hardening, and server-port respect.

Issues: [#2862](https://github.com/haxtheweb/issues/issues/2862), [#2870](https://github.com/haxtheweb/issues/issues/2870), [#2868](https://github.com/haxtheweb/issues/issues/2868), [#2874](https://github.com/haxtheweb/issues/issues/2874), [#2873](https://github.com/haxtheweb/issues/issues/2873)

### Community pillars reflected this cycle

HAX development is evaluated against seven [community pillars](https://haxtheweb.org/pillars). Here is how the 26.8.0 work maps onto them:

*   **Accessible:** WCAG 2.0 AA components, a11y-media-player transcript support, and video transcript-gap detection so uncaptioned media gets surfaced.
*   **Efficient:** webcomponents shrank net 8,127 lines through polyfill, Polymer, and wiredjs removal; CLS fixes and lazy loading keep it fast.
*   **Free and Open:** The on-premises API migration keeps content and calls on your own infrastructure, and OpenStax-to-HAX import extends the 5Rs of OER.
*   **Extensible:** The Skills framework and an app-store editor make HAX stretch further without forking.
*   **Platform Agnostic:** PHP and NodeJS backends converged on one v1 REST API, and publish-to-surge, netlify, and vercel reach anywhere.
*   **Remixable:** Skeleton import/export, docx and EPUB pipelines, and semantic content structures make sites portable and re-mixable.
*   **Sustainable:** Less data and lower battery use from the net code reduction, web standards over heavy libraries, and inclusive community governance.

### Contributors

*   [Bryan Ollendyke (btopro)](https://github.com/btopro) — lead; 204 commits in webcomponents this cycle
*   [Alyssa F (kazmyriad)](https://github.com/kazmyriad) — new contributor — first commits this cycle
*   [Winston (winstonwumbo)](https://github.com/winstonwumbo) — new contributor — first commits this cycle
*   [GitHub Copilot SWE agent](https://github.com/features/copilot) — AI-assisted commits (copilot-swe-agent bot)

### In progress — what's next

These issues are open and not yet shipped; they are the likely candidates for the next cycle: [#2910](https://github.com/haxtheweb/issues/issues/2910), [#2923](https://github.com/haxtheweb/issues/issues/2923), [#2912](https://github.com/haxtheweb/issues/issues/2912), [#2945](https://github.com/haxtheweb/issues/issues/2945), [#2947](https://github.com/haxtheweb/issues/issues/2947), [#2936](https://github.com/haxtheweb/issues/issues/2936), [#2955](https://github.com/haxtheweb/issues/issues/2955), [#2951](https://github.com/haxtheweb/issues/issues/2951), [#2952](https://github.com/haxtheweb/issues/issues/2952), [#2953](https://github.com/haxtheweb/issues/issues/2953), [#2928](https://github.com/haxtheweb/issues/issues/2928), [#2845](https://github.com/haxtheweb/issues/issues/2845), [#2818](https://github.com/haxtheweb/issues/issues/2818), [#2814](https://github.com/haxtheweb/issues/issues/2814), [#2933](https://github.com/haxtheweb/issues/issues/2933), [#2956](https://github.com/haxtheweb/issues/issues/2956), [#2957](https://github.com/haxtheweb/issues/issues/2957), [#2958](https://github.com/haxtheweb/issues/issues/2958).

Tutorial Details
----------------

*   [Video Tutorial Link (YouTube)](https://www.youtube.com/watch?v=0GqsJ83-gQk) - [transcript](files/release-notes/transcript.vtt)
*   Issue analytics: [unified issue queue](https://github.com/haxtheweb/issues) (snapshot all\_issues\_20260813\_165905.json, 2,952 issues)
*   Code scope: git history since [v26.0.0](https://github.com/haxtheweb/webcomponents/releases/tag/v26.0.0) across webcomponents, create, haxcms-php, and haxcms-nodejs
*   Community pillars: [haxtheweb.org/pillars](https://haxtheweb.org/pillars)
*   Last updated: August 13, 2026
*   HAXcms version: 26.8.0