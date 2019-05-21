import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';

export default class Map extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    try {
      this._initMap();
    } catch (err) {
      this.setState({error: err});
    }
  }

  render() {
    return (
      <section className="cities__map map" id="map"></section>
    );
  }

  _initMap() {
    const city = [52.38333, 4.9];

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    const map = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    map.setView(city, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    this.props.offersCoordinates.forEach((coordinates) => {
      leaflet.marker(coordinates, {icon}).addTo(map);
    });
  }
}

Map.propTypes = {
  offersCoordinates: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired
};


