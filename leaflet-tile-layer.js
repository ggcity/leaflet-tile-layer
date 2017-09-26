import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';

import { TileLayer } from '../../leaflet/src/layer/tile/TileLayer.js';
import { TileLayerWMS } from '../../leaflet/src/layer/tile/TileLayer.WMS.js';

export class LeafletTileLayer extends PolymerElement {
  static get properties() {
    return {
      map: {
        type: Object,
        observer: '_mapSet'
      },
      base: Boolean,
      url: {
        type: String,
        value: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        observer: '_urlChanged',
        reflectToAttribute: true
      },
      format: {
        type: String,
        observer: '_formatChanged',
        reflectToAttribute: true
      },
      layers: {
        type: String,
        observer: '_layersChanged'
      },
      minZoom: Number,
      maxZoom: Number,
      attribution: String
    }
  }

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
  }

  _urlChanged () {
    console.log('url changed', this.url);
    if (this.leafletLayer) this.leafletLayer.setUrl(this.url);
  }

  _layersChanged () {
    console.log('layers changed', this.layers);
    if (this.leafletLayer && this.leafletLayer instanceof TileLayerWMS) this.leafletLayer.setParams({ layers: this.layers });
  }

  _formatChanged () {
    console.log('format changed', this.format);

    if (this.leafletLayer && this.map) {
      this.leafletLayer.removeFrom(this.map);
    }

    let options = {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      attribution: this.attribution
    };

    switch (this.format) {
      case 'XYZ':
        this.leafletLayer = new TileLayer(this.url, options);
        break;
      case 'WMS':
        this.leafletLayer = new TileLayerWMS(this.url, Object.assign(options, {
          layers: this.layers,
          format: 'image/png',
          transparent: false,
          hints: 'quality'
        }));
        break;
      default:
        console.error('Invalid leaflet-tile-layer format: ', this.format);
        return;
    }

    if (this.map) this.leafletLayer.addTo(this.map);
    else console.log('map not yet set');
  }

  _mapSet() {
    console.log('map set');
    if (this.leafletLayer && !this.map.hasLayer(this.leafletLayer)) {
      console.log('no layer yet, adding');
      this.leafletLayer.addTo(this.map);
    } else {
      console.log('layer object not set / layer exists, skipping');
    }
  }
}

customElements.define('leaflet-tile-layer', LeafletTileLayer);
