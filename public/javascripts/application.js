$(document).ready(function(){     
  // Focus
  $("input.focus:first").focus();
  
  // Ajax settings modification for rails
  $("body").bind("ajaxSend", function(elm, xhr, s) {
    // Set right accept for rails
    xhr.setRequestHeader("Accept", "text/javascript");

    // Inserts auth_token if present
    if (s.type == "GET") { return; }
    if (s.data && s.data.match(new RegExp("\\b" + window._auth_token_name + "="))) return;
      if (s.data) {
      s.data = s.data + "&";
    } else {
      s.data = "";
      // if there was no data, $ didn't set the content-type
      xhr.setRequestHeader("Content-Type", s.contentType);
    }
    s.data = s.data + encodeURIComponent(window._auth_token_name)+ "=" + encodeURIComponent(window._auth_token);
  });
});

