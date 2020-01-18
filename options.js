// Saves options to localStorage.
function save_options() {
  configuration = new Array();
  var autocollapse_area = document.getElementById("autocollapse");
  var resize_offset_area = document.getElementById("resize_offset");

  configuration.fast_quote = document.getElementById("fast_quote").checked;
  chrome.storage.sync.set(
    {"autocollapse": autocollapse_area.value,
     "fast_quote": document.getElementById("fast_quote").checked,
     "resize_offset": resize_offset_area.value}, confirm_save);
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
  chrome.storage.sync.get(["autocollapse", "fast_quote", "resize_offset"], keep_restoring_options);
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
  if (configuration && configuration.resize_offset != undefined) {
    resize_offset = configuration.resize_offset;
  }
  else {
    resize_offset = 0;
  }

  var autocollapse_area = document.getElementById("autocollapse");
  autocollapse_area.value = autocollapse;

  document.getElementById("fast_quote").checked = fast_quote;

  var resize_offset_area = document.getElementById("resize_offset");
  resize_offset_area.value = resize_offset;
}

function string_to_bool(string){
  return (string.toLowerCase().charAt(0) == "t" );
}

document.addEventListener('DOMContentLoaded', restore_options);
