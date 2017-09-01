import { Element as PolymerElement } from '../../@polymer/polymer/polymer-element.js';

export class LeafletTileLayer extends PolymerElement {
  static get properties() {
    return {
      leaflet: {
        type: Object
      },
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
    this.leaflet.tileLayer(this.url, {
      minZoom: this.minZoom,
      maxZoom: this.maxZoom,
      attribution: this.attribution
    }).addTo(this.map);
  }
}

customElements.define('leaflet-tile-layer', LeafletTileLayer);
