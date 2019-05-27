import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from "react-redux";

class Map extends PureComponent {
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

    this.offersCoordinatesData = this.props.filteredOffersData.map((offerObj) => offerObj.coordinates);
    this.cityCoordinates = this.props.citiesData.find((cityObj) => cityObj.name === this.props.activeCity).coordinates;

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
      center: this.cityCoordinates,
      zoom,
      zoomControl: false,
      marker: true
    });
    this.map.setView(this.cityCoordinates, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    this.offersCoordinatesData.forEach((coordinates) => {
      leaflet.marker(coordinates, {icon}).addTo(this.map);
    });
  }
}

Map.propTypes = {
  activeCity: PropTypes.string.isRequired,
  filteredOffersData: PropTypes.array.isRequired,
  citiesData: PropTypes.array.isRequired,
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeCity: state.activeCity,
  filteredOffersData: state.filteredOffersData,
  citiesData: state.citiesData,
});

export {Map};
export default connect(mapStateToProps)(Map);
