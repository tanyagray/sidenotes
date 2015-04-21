/*
Author: Tanya Gray

Sidenotes is a plugin for reveal.js which displays
speaker notes in a docked sidebar, visible to the
viewer.

Version: 0.1
 
License: MIT license (see LICENSE.md)
*/

window.Sidenotes || (window.Sidenotes = function (Reveal) {

	var defaultNote = "No additional notes :)";

	/*
	 * Load the first set of notes and watch for changes
	 */
	function init() {
		createNotes();

		Reveal.addEventListener('ready', updateSidenotes);
		Reveal.addEventListener('slidechanged', updateSidenotes);

		document.onkeypress = handleKeypress; 

		updateSidenotes();
	}

	/*
	 * Create the divs to contain the notes.
	 */
	function createNotes() {
		var sidenotes = document.createElement('div');
		sidenotes.classList.add('inline-notes');

  		document.body.appendChild(sidenotes); 

	}

	/*
	 * Copy notes to visible notes section
	 */
	function updateSidenotes() {
		var currentSlide = Reveal.getCurrentSlide();
		var speakerNotes = currentSlide.getElementsByClassName('notes')[0];
		var sidenotes = document.getElementsByClassName('inline-notes')[0];

		// notes div is undefined if 
		// no speaker notes are available
		if(speakerNotes) {
			sidenotes.innerHTML = speakerNotes.innerHTML;
			sidenotes.classList.remove('no-notes');
		} else {
			sidenotes.innerHTML = defaultNote;
			sidenotes.classList.add('no-notes');
		}
	}

	/*
	 * Handle all keypress events for the page
	 */
	function handleKeypress(keyEvent){
	  	// 13: Enter Key
	  	if(keyEvent.which == 13) {
	  		showNotes();
	  	}
	}

	/*
	 * Toggle sidenotes visibility
	 */
	function showNotes() {
		document.body.classList.toggle('with-notes');

		// blegh.
		// workaround for layout not triggering
		// on sidenotes show/hide.
		// sidenotes cover slide on some screen 
		// sizes without this.
		setTimeout(function() {
		    window.dispatchEvent( new Event('resize') );
		    console.log('resize');
		}, 700);
	}

	init();

}(Reveal));