chrome.extension.sendRequest({method: "get_configuration"}, actually_do_things);

function actually_do_things(response){
  cleanUpLinks();
  buildFormattingButtons();

  if (response.configuration.fast_quote != "false")
    fixQuoteLinksJQ();

  collapsibleZiggies();
  var autocollapse = parseInt(response.configuration.autocollapse);

  if (autocollapse != NaN && autocollapse > 0)
    collapseZiggies(autocollapse);

  
}

