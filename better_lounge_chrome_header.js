chrome.storage.sync.get(["autocollapse", "fast_quote", "resize_offset"], actually_do_things);

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
    fast_quote = false;
  }

  if (configuration && configuration.resize_offset != undefined) {
    resize_offset = configuration.resize_offset;
  }
  else {
    resize_offset = 0;
  }

  cleanUpLinks();
  buildFormattingButtons();

  if (fast_quote)
    fixQuoteLinksJQ();

  collapsibleZiggies();

  if (autocollapse > 0)
    collapseZiggies(autocollapse);

  if (resize_offset) {
    console.log("resizing text by " + resize_offset);
    resizeText(resize_offset);
  }
}

