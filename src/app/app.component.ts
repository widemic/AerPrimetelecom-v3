import { Component, OnInit, AfterViewInit } from '@angular/core';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';
import { Source } from 'webpack-sources';
import { Observable } from 'rxjs/Observable';
import { PanouComponent } from './panou/panou.component'

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import Point from 'ol/geom/Point.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj.js';
import TileJSON from 'ol/source/TileJSON.js';
import VectorSource from 'ol/source/Vector.js';
import { Icon, Style } from 'ol/style.js';

import 'ol/ol.css';
import OSM from 'ol/source/OSM';
import { componentRefresh } from '@angular/core/src/render3/instructions';


declare var ol: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  latitude = 40.423533061444374;
  longitude = -3.7045899778604507;

  map: any;

  ngOnInit() {
    this.map = new ol.Map({
      target: 'map',
      controls: ol.control.defaults({
        attributionOptions: {
          collapsible: false
        }
      }),
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([-3.7045899778604507, 40.423533061444374]),
        zoom: 13
      })
    });

    const markers = [
      { lat: 40.433533061444374, lng: -3.7145899778604507 },
      { lat: 40.4135330614443741, lng: -3.7045899778604507 }
    ];
    const features = [];

    for (let i = 0; i < markers.length; i++) {
      const m = markers[i];
      const longitude = m.lng;
      const latitude = m.lat;

      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point(ol.proj.transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857'))
      });

      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon(({
          anchor: [0.5, 1],
          src: '../assets/dot.png',
          color: 'red'
        }))
      });

      iconFeature.setStyle(iconStyle);
      features.push(iconFeature);
    }

    const vectorSource = new ol.source.Vector({
      features: features
    });

    const markerVectorLayer = new ol.layer.Vector({
      source: vectorSource,
    });

    this.map.addLayer(markerVectorLayer);
    this.map.on('click', function(evt){
console.log(evt);
    })
  }
}



// export class AppComponent implements OnInit {

//   title = 'aerv3';
//   constructor() { }

//   latitude: number = 26.1;
//   longitude: number = 44.42;

//   map: any;

//   ngOnInit() {
//     var rome = new Feature({
//       geometry: new Point(fromLonLat([12.5, 41.9]))
//     });

//     var london = new Feature({
//       geometry: new Point(fromLonLat([-0.12755, 51.507222]))
//     });

//     var madrid = new Feature({
//       geometry: new Point(fromLonLat([-3.683333, 40.4]))
//     });



//     rome.setStyle(new Style({
//       image: new Icon(/** @type {module:ol/style/Icon~Options} */({
//         color: '#8959A8',
//         crossOrigin: 'anonymous',
//         src: '../assets/dot.png'
//       }))
//     }));

//     london.setStyle(new Style({
//       image: new Icon(/** @type {module:ol/style/Icon~Options} */({
//         color: '#4271AE',
//         crossOrigin: 'anonymous',
//         src: '../assets/dot.png'
//       }))
//     }));

//     madrid.setStyle(new Style({
//       image: new Icon(/** @type {module:ol/style/Icon~Options} */({
//         color: [113, 140, 0],
//         crossOrigin: 'anonymous',
//         src: '../assets/dot.png'
//       }))
//     }));

//     var pipera = new Feature({
//       geometry: new Point(fromLonLat([26.1, 44.42]))
//     });

//     pipera.setStyle(new Style({
//       image: new Icon(/** @type {module:ol/style/Icon~Options} */({
//         color: [255, 180, 0],
//         crossOrigin: 'anonymous',
//         src: '../assets/dot.png',
//         id: '123456'
//       }))
//     }));

//     var vectorSource = new VectorSource({
//       features: [rome, london, madrid, pipera]
//     });

//     var vectorLayer = new VectorLayer({
//       source: vectorSource
//     });



//     var map = new Map({
//       layers: [new TileLayer({ source: new OSM() }), vectorLayer],
//       target: document.getElementById('map'),
//       view: new View({
//         center: fromLonLat([this.latitude, this.longitude]),
//         zoom: 12
//       })
//     });

//     var element = document.getElementById('popup');



//     map.on('click', function(evt) {
//       var feature = map.forEachFeatureAtPixel(evt.pixel,
//         function(feature) {
//           return feature;
//         });
//       if (feature) {
//        console.log(feature.getGeometry().getCoordinates());
//        console.log(feature);
//       } 

//     });






//   }



// }