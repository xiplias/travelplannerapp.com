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
  
  uki([
      { view: 'Box', rect: '0 0 1000 31', anchors: 'left top right', background: 'theme(panel)',
          childViews: { view: 'TextField', rect: '800 5 190 20', anchors: 'right', placeholder: 'Search' }
      },
      { view: 'SplitPane', rect: '0 30 1000 600', anchors: 'left top right bottom', 
          handlePosition: 300, autogrowLeft: false, autogrowRight: true, autogrowLeft: false, handleWidth: 1, rightMin: 400, leftMin: 150,
          leftChildViews:
              { view: 'ScrollPane', rect: '0 0 300 600', anchors: 'top left right bottom', background: '#d0d2d7', name: 'pane_1'
              },
          rightPane: {
              childViews: { view: 'ScrollPane', rect: '0 0 699 600', anchors: 'top left right bottom',
                  scrollableH: true, scrollableV: true, name: 'pane_2', id: "test",
                  childViews: { view: 'Box', rect: '10 10 480 300', anchors: 'top left', background: '#F00' }
              }
          }
      }
  ]).attachTo( window, '1000 630' );

  // uki('ScrollPane').attr('background', '#D0D7E2')
  // uki('ScrollPane').attr('background', '#0F0')
  // uki('ScrollPane')[0].dom().className = 'ScrollPane';
});

