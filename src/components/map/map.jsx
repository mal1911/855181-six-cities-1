import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {locationType} from "../../prop-types";
import leaflet from 'leaflet';
import {connect} from "react-redux";
import {getActiveMapLocation} from '../../reducer/offers-data/selectors';
import "./map.css";

class Map extends Component {
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
      <section className={`${this.props.className} map`} id="map"/>
    );
  }

  _initMap() {
    const locationToArray = (location) => [location.latitude, location.longitude];

    const icon = leaflet.icon({
      iconUrl: `/img/pin.svg`,
      iconSize: [30, 30]
    });

    const activeIcon = leaflet.icon({
      iconUrl: `/img/pin-active.svg`,
      iconSize: [45, 45]
    });

    const zoom = this.props.activeMapLocation.zoom;
    const center = locationToArray(this.props.activeMapLocation);

    this.map = leaflet.map(`map`, {
      center,
      zoom,
      zoomControl: false,
      marker: true
    });
    this.map.setView(center, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    this.props.offersLocationsData.forEach((offerMapObj) => {
      leaflet.marker(locationToArray(offerMapObj.location), offerMapObj.isActive ? {icon: activeIcon} : {icon}).addTo(this.map);
    });
  }
}

Map.propTypes = {
  activeMapLocation: locationType,
  className: PropTypes.string.isRequired,
  offersLocationsData: PropTypes.arrayOf(PropTypes.shape({
    location: locationType.isRequired,
    isActive: PropTypes.bool
  })),
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeMapLocation: getActiveMapLocation(state),
});

export {Map};

export default connect(mapStateToProps)(Map);
