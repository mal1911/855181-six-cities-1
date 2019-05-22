import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

export default class Map extends PureComponent {
  componentDidMount() {
    try {
      this._initMap();
    } catch (err) {
      //
    }
  }

  componentDidUpdate() {
    try {
      if (this.map) {
        this.map.remove();
      }
      this._initMap();
    } catch (err) {
      //
    }
  }
  render() {
    return (
      <section className="cities__map map" id="map"/>
    );
  }

  _initMap() {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;

    this.map = leaflet.map(`map`, {
      center: this.props.cityCoordinates,
      zoom,
      zoomControl: false,
      marker: true
    });
    this.map.setView(this.props.cityCoordinates, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    this.props.offersCoordinatesData.forEach((coordinates) => {
      leaflet.marker(coordinates, {icon}).addTo(this.map);
    });
  }
}

Map.propTypes = {
  offersCoordinatesData: PropTypes.arrayOf(PropTypes.array.isRequired),
  cityCoordinates: PropTypes.array.isRequired,
};


