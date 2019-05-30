import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import {connect} from "react-redux";
import {getActiveMapObj, getOffersCoordinatesData} from '../../reducer/data/selectors';

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
    return (
      <section className="cities__map map" id="map"/>
    );
  }

  _initMap() {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = this.props.activeMapObj.zoom;
    const center = this.props.activeMapObj.coordinates;

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

    this.props.offersCoordinatesData.forEach((coordinates) => {
      leaflet.marker(coordinates, {icon}).addTo(this.map);
    });
  }
}

Map.propTypes = {
  offersCoordinatesData: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  activeMapObj: PropTypes.shape({
    coordinates: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired,
  })
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  offersCoordinatesData: getOffersCoordinatesData(state),
  activeMapObj: getActiveMapObj(state),
});

export {Map};
export default connect(mapStateToProps)(Map);
