var config = {
  '.chosen-select'           : {},
  '.chosen-select-deselect'  : { allow_single_deselect: true },
  '.chosen-select-no-single' : { disable_search_threshold: 10 },
  '.chosen-select-no-results': { no_results_text: 'Oops, nothing found!' },
  '.chosen-select-rtl'       : { rtl: true },
  '.chosen-select-width'     : { width: '95%' }
}

function instantiateChosen() {
	for (var selector in config) {
		$(selector).chosen(config[selector]);
	}
}

function resetChosenDropdowns() {
	for (var selector in config) {
		$(selector).trigger('chosen:updated');
	}
}
