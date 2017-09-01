import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';
import '../../@ggcity/leaflet-iife/dist/leaflet.js';

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
        value: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      },
      minZoom: Number,
      maxZoom: Number,
      attribution: String
    }
  }

  constructor() {
    super();
  }

  _mapSet() {
    L.tileLayer(this.url, {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      attribution: this.attribution
    }).addTo(this.map);
  }
}

customElements.define('leaflet-tile-layer', LeafletTileLayer);
