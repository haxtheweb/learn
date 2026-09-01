This question type allows the user to complete a sentance by answering in context of other written material. Input fields are visualized directly in the paragraph and they are be modified easily via a simple convention:

*   \[answer\] - single match only
*   \[answer~or~other~optional~answer\] - single written answer, but multiple possible correct answers
*   \[correct|incorrect|another\] - Select field, first answer is correct but rest become options; these are randomized to the user

Example
-------

<fill-in-the-blanks question="Complete this sentence" statement="[hax] is really [good~great] at authoring [content|kittens] !" max-attempts="0" typeof="oer:Assessment" resource="#7e3d48c1-4f3b-74aa-973b-6fbb3f880b8d" prefix="oer:http://oerschema.org/ schema:http://schema.org/ dc:http://purl.org/dc/terms/ foaf:http://xmlns.com/foaf/0.1/ cc:http://creativecommons.org/ns# bib:http://bib.schema.org" quiz-name="default"><input type="checkbox" value="undefined"><input type="checkbox" value="undefined"><input type="checkbox" value="undefined"></fill-in-the-blanks>

Developer
---------

*   [npm install @haxtheweb/fill-in-the-blanks --save](https://npmjs.com/package/@haxtheweb/fill-in-the-blanks)
*   [Source on Github](https://github.com/haxtheweb/webcomponents/tree/master/elements/fill-in-the-blanks)
*   [Codepen example from CDN](https://codepen.io/btopro/pen/GRbjXjR)