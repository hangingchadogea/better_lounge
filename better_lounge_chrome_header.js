chrome.storage.sync.get(["autocollapse", "fast_quote"], actually_do_things);

function actually_do_things(configuration){

  if (configuration && configuration.autocollapse != undefined) {
    autocollapse = configuration.autocollapse;
  }
  else {
    autocollapse = 4;
  }
  if (configuration && configuration.fast_quote != undefined) {
    fast_quote = configuration.fast_quote;
  }
  else {
    fast_quote = true;
  }

  cleanUpLinks();
  buildFormattingButtons();

  if (fast_quote)
    fixQuoteLinksJQ();

  collapsibleZiggies();

  if (autocollapse > 0)
    collapseZiggies(autocollapse);
}

