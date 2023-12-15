var fromLonLat = ol.proj.fromLonLat;
var pos = fromLonLat([-0.1961, 52.07769]);

/**
 * Create an overlay to anchor the popup to the map.
 */
// var popup = new ol.Overlay({
//   element: document.getElementById("popup"),
// });
// map.addOverlay(popup);

// var wmsSource_ne = new ol.source.TileWMS({
//   url: "http://localhost:8080/geoserver/ne/wms",
//   params: {
//     LAYERS:
//       "ne:world, ne:populated_places, ne:disputed_areas, ne:countries, ne:coastlines",
//   },
//   serverType: "geoserver",
//   crossOrigin: "anonymous",
// });
// var wmsSource_topp = new ol.source.TileWMS({
//   url: 'http://localhost:8080/geoserver/topp/wms',
//   params: {'LAYERS': 'topp:tasmania_state_boundaries, topp:tasmania_roads, topp:states'},
//   serverType: 'geoserver',
//   crossOrigin: 'anonymous'
// })

var wmsSource_ne = new ol.source.TileWMS({
  url: "http://localhost:8080/geoserver/macro_provinces/wms", //http://localhost:8080/geoserver/macro_provinces/wms
  params: {
    LAYERS:
      "macro_provinces:ang thong, macro_provinces:kalasin"
  },
  serverType: "geoserver",
  crossOrigin: "anonymous",
});

var map = new ol.Map({
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
    new ol.layer.Tile({
      source: wmsSource_ne,
    }),
    // ,
    // new ol.layer.Tile({
    //   source: wmsSource_topp
    // })
  ],
  // overlays: [overlay],
  target: "gis",
  view: new ol.View({
    center: [11162111.639999239, 1613246.5336352359], //EPSG:3857
    zoom: 6.5284,
    projecttion: "EPSG:3857",
  }),
});

// var marker = new ol.Overlay({
//   position: pos,
//   positioning: 'center-center',
//   element: document.getElementById('marker'),
//   stopEvent: false,
//   });
//   map.addOverlay(marker);

  // var vienna = new ol.Overlay({
  // position: pos,
  // element: document.getElementById('vienna'),
  // });
  // map.addOverlay(vienna);

map.on("singleclick", function (evt) {
  var element = popup.getElement();
  var coordinate = evt.coordinate;
  var hdms = toStringHDMS(toLonLat(coordinate));

  $(element).popover("dispose");
  popup.setPosition(coordinate);
  $(element).popover({
    container: element,
    placement: "top",
    animation: false,
    html: true,
    content: "<p>The location you clicked was:</p><code>" + hdms + "</code>",
  });
  $(element).popover("show");
});

function clickfunction(e) {
  console.log(e);
}

function addclick() {
  map.on("click", clickfunction);
}

function removeclick() {
  map.un("click", clickfunction);
}
