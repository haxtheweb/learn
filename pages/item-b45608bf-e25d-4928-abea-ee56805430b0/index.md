Stuck? HAX is a community project and there are a few fast ways to get help. If you hit a bug or have a feature request, the issue queue is the canonical place to report it.

Get help
--------

*   Post issues here: [HAX issue queue on GitHub](https://github.com/haxtheweb/issues/issues)
*   Chat with the [community on Discord](https://discord.gg/EKYJAjqGhf)

If you are already using HAX, clicking Merlin and typing "_issues_" can also shortcut you to submitting an issue report.

Common questions
----------------

<a11y-collapse heading-button="" accordion=""><a11y-collapse-panel expanded=""><h3 slot="heading">Where is my content stored?</h3><div slot="content"><p>HAXcms stores pages as plain HTML files in <code>pages/</code> and the site outline in <code>site.json</code> (JSON Outline Schema). Media lives in <code>files/</code>. Because it's all files, you can version, move, and host them anywhere.</p></div></a11y-collapse-panel><a11y-collapse-panel><h3 slot="heading">Can I move a site to a different host?</h3><div slot="content"><p>Yes. A HAX site is portable. You can publish via Surge, Netlify, Vercel, GitHub Pages, or any static host, and the <code>hax</code> CLI can rsync a site to a remote directory.</p></div></a11y-collapse-panel><a11y-collapse-panel><h3 slot="heading">How do I bring in content from Word or a spreadsheet?</h3><div slot="content"><p>Use the import paths in <a href="import-content">Import Content</a>: DOCX and XLSX import are built in, plus HAX-to-HAX, Notion, ELMS:LN, and generic HTML import via the <code>hax</code> CLI.</p></div></a11y-collapse-panel><a11y-collapse-panel><h3 slot="heading">Something looks broken — how do I report it?</h3><div slot="content"><p>File it in the <a href="https://github.com/haxtheweb/issues/issues">issue queue</a> with steps to reproduce. For quick questions, ask in <a href="https://discord.gg/EKYJAjqGhf">Discord</a>.</p></div></a11y-collapse-panel></a11y-collapse>

For deeper reference while you troubleshoot, browse the [Tutorial Library](tutorial-library) or the [Block Reference](block-reference).