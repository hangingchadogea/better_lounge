// Saves options to localStorage.
function save_options() {
  configuration = new Array();
  var text_area = document.getElementById("autocollapse");

  configuration.fast_quote = document.getElementById("fast_quote").checked;
  chrome.storage.sync.set(
    {"autocollapse": text_area.value,
     "fast_quote": document.getElementById("fast_quote").checked}, confirm_save);
}

function confirm_save() {
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
}
// Restores select box state to saved value from localStorage.
function restore_options() {
  document.querySelector('#save').addEventListener('click', save_options);
  chrome.storage.sync.get(["autocollapse", "fast_quote"], keep_restoring_options);
}

function keep_restoring_options(configuration){
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

  var text_area = document.getElementById("autocollapse");
  text_area.value = autocollapse;

  document.getElementById("fast_quote").checked = fast_quote;
}

function string_to_bool(string){
  return (string.toLowerCase().charAt(0) == "t" );
}

document.addEventListener('DOMContentLoaded', restore_options);
