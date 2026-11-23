**Single source of truth:** [issues/CONTRIBUTING.md on GitHub](https://github.com/haxtheweb/issues/blob/master/CONTRIBUTING.md). This page is the readable version of that guide.

What is HAX
-----------

HAX (Headless Authoring eXperience) is an authoring experience that enables rapid creation of fast, static, file-backed websites. It seeks to be the smallest possible back-end CMS to make the HAX editor work and be able to build websites with it. Leveraging JSON Outline Schema, HAX authors multiple pages and writes them onto the file system, so a slim server layer is only needed for basic authentication, saving files, and placing them in version control.

Get all the details at [haxtheweb.org](https://haxtheweb.org/).

The ecosystem at a glance
-------------------------

HAX is an ecosystem of many repos. The core three below are what you clone to get started; the rest are listed so you know what's out there.

*   **haxcms-nodejs** — the Node.js backend for HAXcms (content management + APIs). Usually the fastest way to see HAX running.
*   **webcomponents** — the heart of HAX: a monorepo of 250+ LitElement web components, themes, and the DDD design system. This is where most component work happens.
*   **create** (`@haxtheweb/create`) — the `hax` CLI for scaffolding web components and HAXsites and managing the dev workflow.
*   **haxcms-php** _(optional)_ — the PHP backend for HAXcms; same capabilities, different stack (PHP 8.3+ / Apache). For those who prefer the PHP stack.
*   **docs** — the official documentation site (a HAXcms site itself), at [haxtheweb.org](https://haxtheweb.org/).
*   **issues** — the unified issue queue for the entire ecosystem, plus the canonical onboarding guide.
*   **hax11ty**, **json-outline-schema**, **hax-schema** — supporting repos (11ty integration, content schema, HAX property schema).

Prerequisites
-------------

*   **OS**: macOS or Linux need nothing special. **Windows** developers should use **WSL 2 with Ubuntu** (open WSL in the Microsoft Store and select Install/Update, or run `wsl --update` in PowerShell).
*   **Git** and a **GitHub account** (you'll fork repos and open pull requests).
*   **Node.js 22 or higher**. We recommend **fnm** as a cross-platform Node version manager (`fnm install --lts --use`). nvm works too.
*   **npm** (ships with Node) and **yarn** (`npm install -g yarn`) — the webcomponents monorepo uses yarn; the other repos use npm.
*   **Windows extra**: enable **Developer Mode** (Windows Settings → For developers → Developer Mode) so symlinks work without running as Administrator. The webcomponents monorepo uses symlinks to emulate a live HAXsite locally.

haxcms-nodejs
-------------

The Node.js backend for HAXcms. Usually the quickest way to get HAX running locally.

**Fork and clone** (replace `YOUR_USERNAME`):

**Install and start:**

Visit http://localhost:3000 (it usually opens automatically). You should see the HAXcms interface load. That confirms the backend is running.

webcomponents
-------------

The monorepo of 250+ LitElement web components, themes, and the DDD design system. This is where most component contributions happen.

**Fork and clone:**

**Install (uses yarn, from repo root):**

**Start the dev server:**

Open http://localhost:8000/elements/haxcms-elements/demo/ — you should see the HAX development interface. To work on a single component, open another terminal and run `cd elements/<ELEMENTNAME> && yarn run dev`, which watches and rebuilds that element while the dev server is still running.

For monorepo-specific detail (build commands, Lerna, DDD audits, testing, troubleshooting, theme development), see the [webcomponents/CONTRIBUTING.md](https://github.com/haxtheweb/webcomponents/blob/master/CONTRIBUTING.md).

create
------

The `hax` CLI for scaffolding web components and HAXsites.

**Fork and clone:**

**Install:**

**Get the `hax` command globally** so it's available everywhere:

**Verify:** run `hax start` — you should see the interactive CLI (ASCII art via Clack) that scaffolds components and HAXsites. To work on the CLI source itself: `npm run build && node ./dist/create.js`.

<a11y-collapse heading-button=""><h3 slot="heading">haxcms-php (optional alternative backend)</h3><div slot="content"><p>The PHP backend for HAXcms — same capabilities as the Node.js version, different stack. Skip this unless you want to run the PHP backend.</p><p><strong>Fork and clone:</strong></p><code-sample copy-clipboard-button=""><template>cd ~/Documents/git/haxtheweb
git clone https://github.com/YOUR_USERNAME/haxcms-php.git
cd haxcms-php
git remote add upstream https://github.com/haxtheweb/haxcms-php.git</template></code-sample><p><strong>Prerequisites (one of two paths):</strong></p><p><em>Native PHP:</em></p><ul><li>PHP 8.3 or higher with the <code>curl</code>, <code>zip</code>, <code>gd</code>, and <code>xml</code> modules installed</li><li>Apache 2.4</li></ul><p><em>Container-based (recommended for most):</em></p><ul><li>A container runtime — <a href="https://docs.docker.com/get-started/get-docker/">Docker</a>, <a href="https://ddev.readthedocs.io/">DDEV</a>, <a href="https://docksal.io/">docksal</a>, <a href="https://docs.devwithlando.io/">lando</a>, or <a href="https://www.vagrantup.com/">vagrant</a></li></ul><p><strong>Quick install (script):</strong></p><code-sample copy-clipboard-button=""><template>curl -fsSL https://raw.githubusercontent.com/haxtheweb/haxcms-php/master/scripts/haxcmsme.sh -o haxcmsme.sh &amp;&amp; sh haxcmsme.sh</template></code-sample><p><strong>Container path (DDEV example):</strong></p><code-sample copy-clipboard-button=""><template>ddev start</template></code-sample><p>Open the URL DDEV prints. Log in with <code>admin</code> / <code>admin</code> to confirm the CMS is working. For other runtimes use <code>fin init</code> (docksal), <code>lando start &amp;&amp; lando magic</code> (lando), or <code>vagrant up</code> (vagrant).</p><p>For full PHP/container install instructions, see the <a href="https://github.com/haxtheweb/haxcms-php/blob/master/README.md">haxcms-php/README.md</a>.</p></div></a11y-collapse>

Where to find issues
--------------------

All HAX ecosystem bugs and features live in one unified queue:

*   **Issue queue**: [github.com/haxtheweb/issues/issues](https://github.com/haxtheweb/issues/issues)
*   New contributors: look for the **`new here`** and **`good first issue`** labels.
*   Documentation issues are often beginner-friendly.

Before starting work on an issue, comment on it saying you'd like to work on it and wait for a maintainer acknowledgment to avoid duplicate work.

Join the community
------------------

*   **Discord** (real-time help + discussion): [discord.gg/EKYJAjqGhf](https://discord.gg/EKYJAjqGhf)
*   **YouTube** (tutorials): [youtube.com/@haxtheweb](https://www.youtube.com/@haxtheweb)
*   Try HAX in the browser: [hax.cloud](https://hax.cloud)

Next steps
----------

*   **Repo-specific contributing detail** (monorepo workflow, code standards, testing, troubleshooting, PR conventions for the webcomponents monorepo): [webcomponents/CONTRIBUTING.md](https://github.com/haxtheweb/webcomponents/blob/master/CONTRIBUTING.md)
*   **Full documentation**: [haxtheweb.org](https://haxtheweb.org/)
*   **Scaffold your first component**: `hax webcomponent my-element --y`
*   **Scaffold your first HAXsite**: `hax site mysite --y`
*   **Run `hax party`** to see ways to get more involved.

Contributing conventions
------------------------

We work primarily with pull requests from forks.

*   Fork the repo you want to contribute to; open a PR pointing at the associated issue.
*   **Reference the issue** your PR resolves in the PR body (e.g. `fixes #123`). Do **not** put `@mentions` or `fixes` keywords in commit messages — put them in the PR body.
*   Write clear commit messages; squash small PRs (typos, style) into a single commit.
*   **Code style**: pure JavaScript (no TypeScript), single quotes, avoid semicolons, use `globalThis` over `window`, ES module imports. Code is auto-formatted with Prettier on commit.
*   **Web components**: use `hax webcomponent <name> --y` to create new elements (never hand-create elements — the CLI ensures uniform packaging). Adhere to the DDD design system; run `hax audit` from a component root before submitting.
*   **Testing**: run `yarn test` (webcomponents) or `npm test` per repo before opening a PR.

**Source of truth:** [issues/CONTRIBUTING.md on GitHub](https://github.com/haxtheweb/issues/blob/master/CONTRIBUTING.md).