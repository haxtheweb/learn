You already have the words. This tutorial is about arranging them: putting content side by side in columns, setting an image beside the text, turning a row of images into a gallery, and collecting videos into a playlist. Every example on this page is the real block, so what you see here is what your page will look like.

Prerequisites
-------------

*   Access to a HAX site you can edit
*   A page with some content on it already
*   The basics of [editing a page](tutorial-library/editing-authoring/edit-a-page) and [adding blocks](tutorial-library/editing-authoring/adding-blocks)

Put content side by side with columns
-------------------------------------

Columns are the quickest way to change how a page reads. Open **Blocks**, expand **Layout**, and add a **Column layout** where you want the columns to start. Then drag the blocks you already have into its columns with their drag handle.

1.  Click **Edit**, then open **Blocks** and expand **Layout**.
2.  Drag **Column layout** into the page, or put your cursor where it should go and insert it.
3.  Drag existing paragraphs, images or other blocks into each column.
4.  Select the column layout and change **Column Layout** in its settings to change how the columns split the width.

<grid-plate layout="1-1"><div slot="col-1"><h3>2: equal width</h3><p>The default. Two columns of the same width, good for comparing two things or pairing a short explanation with an example.</p></div><div slot="col-2"><h3>Other layouts</h3><p>Wide and narrow (<code>2-1</code>), narrow and wide (<code>1-2</code>), three columns (<code>1-1-1</code>, <code>1-2-1</code> and more) and up to four equal columns.</p></div></grid-plate>

As the screen gets narrower the columns stack one above the other, so nothing gets squeezed. To keep a layout's columns side by side for longer, turn on **Disable responsive** in its settings; they still stack on the smallest screens.

Set an image beside the text
----------------------------

An image does not have to sit on its own line. Select it and open the **Spacing** section of its settings:

*   **Float Position** sets it to the **Left** or **Right** so the text wraps around it, or to the **Center**. Text wraps around it on wide screens (1440 pixels and wider); on anything narrower the image sits on its own line, so the text stays readable.
*   **Width** sizes it from 25 to 100 percent of the space it is in, from tablet width up; on a phone it fills the width.

Put the image just before the paragraph it belongs with, so the two stay together when the page reflows. In the **Configure** section, **Offset** can also make an image **wide**, reaching past the text column, or **narrow**.

Turn images into a gallery
--------------------------

When you have several images in a row, a gallery is easier to read than a long stack. Drag one image onto another image on the page and the two become an **Image gallery**. Drop more images onto the gallery to add them.

Select the gallery and choose its **Display mode**: **Grid** lines the images up as above, **Masonry** fits images of different heights together, and **Gallery** shows one image at a time with arrows to move between them.

Collect videos into a playlist
------------------------------

Several videos on one page work better as a playlist: one player with the list beside it, instead of a column of players. Search the blocks for **playlist** and add a **Media playlist**. Then open the **Page outline** and drag your video and audio blocks into it.

Rearrange as you go
-------------------

*   Move any block with its drag handle, or with move up and move down when you hover over it.
*   The **Page outline** shows every block on the page in order, which is the easiest way to move things into or out of a column layout, gallery or playlist.
*   Nothing is changed for your readers until you click **Save**.

Verification
------------

Save, then check the page as a reader would:

*   Columns, floated images and galleries look the way you meant on a wide screen.
*   Narrow the window or open the page on a phone: columns stack, images you floated sit on their own line, and nothing is cut off.
*   Every image has alternative text that says what it shows.

Related
-------

*   [Adding Blocks](tutorial-library/editing-authoring/adding-blocks)
*   [Working with Images](tutorial-library/working-with-media/working-with-images)
*   [Block Reference: Layout](block-reference/layout)