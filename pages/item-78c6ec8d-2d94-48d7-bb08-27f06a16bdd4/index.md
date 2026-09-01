HAX is easy to move content to because it is playing flat HTML files from a simple JSON based data structure. As a result the community has been able to produce a number of atypical migration methodologies. Any system we can teach to serve data in the JSON Outline Schema format that points to HTML, can be migrated to HAX.

DOCX file to website
--------------------

We can convert .docx files to HTML and then taking the heading hierarchy, pull that in and build structure.

<stop-note title="Images can cause problems.. so remove them from doc files" accent-color="grey" icon="stopnoteicons:warning-icon" status="warning" message="<strong>While DOCX import WILL grab images and EVERYTHING IT CAN, images are not recommended for importing. This is because they get imported as base64 content (aka a data blob in the page). This can't be optimized and the only alternative would be for us to scrub images from import (which then you'd be on this page looking anyway..)</strong>"><p slot="message"><strong>While DOCX import WILL grab images and EVERYTHING IT CAN, images are not recommended for importing. This is because they get imported as base64 content (aka a data blob in the page). This can't be optimized and the only alternative would be for us to scrub images from import (which then you'd be on this page looking anyway..)</strong></p></stop-note>

#### Video showing how to use it

HAX to HAX
----------

By pointing to a public HAX site, you can import and remix HAX content in a new space. This is an OER powerhouse made possibly by the specific way HAX stores and manages data.

Notion to HAX
-------------

Notion is a great tool for managing the production process. It's a stand alone application popular about media and production teams to complete projects while generating notes and narrative around the process of producing that product. We had a faculty team using Notion to manage the production of an online course prior to deployment. Using a simple HAX import, we are able to take a Notion export and convert it to HAX.

ELMS:LN to HAX
--------------

HAX is born out of work in the ELMS: Learning Network ecosystem. The latest version of ELMS:LN effectively runs HAXcms on top of the Drupal based system and as a result can be pointed to and migrated via URL with ease. This integration primarily targets groups internal to Penn State but should work with any ELMS:LN instance.

Import checklist before you start
---------------------------------

*   Clean up heading structure first (H1, H2, H3) so the generated outline is accurate.
*   Move large media assets out of authored documents when possible; import text first, then add optimized media back into HAX.
*   Confirm links are valid and absolute before conversion if your source system uses private or relative URLs.
*   Verify attribution and licensing for content you are migrating so remix rights are clear.

Common import paths
-------------------

Most migrations can be done with either a local file export or a URL-based import. A common command-line pattern is `hax site my-site --import-site https://example.com --import-structure htmlToSite --no-i --auto --y` and then refining pages after conversion.

*   **DOCX to HAX:** best for manuscript-style content and quick hierarchy extraction.
*   **HAX to HAX:** ideal for remixing open content while preserving structure.
*   **Notion to HAX:** use export bundles and then review embeds/tables after import.
*   **ELMS:LN to HAX:** strongest path for legacy course migrations from ELMS deployments.
*   **Generic HTML to HAX:** useful when you can expose source pages publicly and walk them via URL import.

After import: quality pass
--------------------------

Always run a quick editorial pass after migration: verify heading depth, check media load behavior, and confirm that links and callouts are still meaningful in context. For larger sites, pair this with the Reports tutorial so automated link checking catches issues early.