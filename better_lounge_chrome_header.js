chrome.storage.sync.get(["autocollapse", "fast_quote"], actually_do_things);

function actually_do_things(configuration){

  cleanUpLinks();
  buildFormattingButtons();

  if (configuration) {
    console.log("configuration seems to be defined.");
  }
  else {
    console.log("configuration seems undefined.");
    var configuration = new Array();
    configuration.fast_quote = true;
    configuration.autocollapse = 4;
  }

  if (configuration.fast_quote)
    fixQuoteLinksJQ();

  collapsibleZiggies();

  if (configuration.autocollapse > 0)
    collapseZiggies(configuration.autocollapse);

  
}

