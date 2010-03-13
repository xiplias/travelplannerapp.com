var location_manager;
$(document).ready(function() {
  // Google Maps
  map = new GMap2(document.getElementById("map"));
  map.setCenter(new GLatLng(51.520832, -0.140133), 2);
  map.setUIToDefault();
  
  var location_manager = $(map).add_location_manager();
});

uki([
  { view: 'Box', rect: '0 0 1000 31', anchors: 'left top right', background: 'theme(panel)', childViews: [
    { view: 'Button', rect: '5 4 100 23', anchors: 'top left', id: "back_to_overview", visible: true, text: "Load Map"},
    { view: 'Button', rect: '890 4 100 23', anchors: 'top right', id: "wide_mode", visible: true, text: "Wide Mode"},
    { view: 'Button', rect: '765 4 120 23', anchors: 'top right', id: "horisontal_mode", visible: true, text: "Horisontal Mode"}
  ]},
  { view: 'SplitPane', rect: '0 31 1000 600', anchors: 'left top right bottom', id: 'second',
      handlePosition: 279, leftMin: 200, leftMax: 200, rightMin: 200, handleWidth: 1,
      leftPane: { background: '#D0D7E2', childViews: [
        { view: 'TextField', rect: '10 10 260 25', anchors: 'left top right', placeholder: 'Add Location', id: "lm_search" },
        { view: 'ScrollPane', rect: '0 35 279 565', anchors: 'top left right bottom', id: 'left_panel' }
      ]},
      rightChildViews: [
        { view: 'ScrollPane', rect: '0 0 720 600', anchors: 'top left right bottom',
             scrollableH: true, scrollableV: true, name: 'pane_2', id: "map"
        }
          /*{ view: 'SplitPane', rect: '720 600', anchors: 'left top right bottom', handlePosition: 593,
              topChildViews: { view: 'ScrollPane', rect: '0 0 593 600', anchors: 'top left right bottom',
                   scrollableH: true, scrollableV: true, name: 'pane_2', id: "map"
              },
              bottomPane: { background: '#FFF', childViews: [
                  { view: 'Box', rect: '0 0 120 40', anchors: 'top right left bottom', background: 'cssBox(background:#EDF3FE;border-bottom:1px solid #999)' },
                  { view: 'ScrollPane', rect: '0 0 120 600', anchors: 'top left right bottom',
                       scrollableH: true, name: 'pane_2', id: "text"
                  },
              ]}
          }
          /*{ view: 'VerticalSplitPane', rect: '720 600', anchors: 'left top right bottom', handlePosition: 320,
              topChildViews: { view: 'ScrollPane', rect: '0 0 720 320', anchors: 'top left right bottom',
                   scrollableH: true, scrollableV: true, name: 'pane_2', id: "map"
              },
              bottomPane: { background: '#FFF', childViews: [
                  { view: 'Box', rect: '0 0 720 40', anchors: 'top right left', background: 'cssBox(background:#EDF3FE;border-bottom:1px solid #999)' },
                  { view: 'ScrollPane', rect: '0 0 720 273', anchors: 'top left right bottom',
                       scrollableH: true, name: 'pane_2', id: "text"
                  },
              ]}
          }*/
      ]
  }
]).attachTo( window, '1000 631', {minSize: '631 0'} );

uki('#back_to_overview').click(function() {
  alert("test");
});