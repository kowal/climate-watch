import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import cx from 'classnames';
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography
} from 'react-simple-maps';
import { Motion, spring } from 'react-motion';
import Button from 'components/button';

import styles from './map-styles.scss';

class Map extends PureComponent {
  render() {
    const { zoom, center } = this.props;
    const { className } = this.props;
    const {
      paths,
      cache,
      zoomEnable,
      dragEnable,
      tooltipId,
      handleZoomIn,
      handleZoomOut,
      onCountryClick,
      onCountryEnter,
      onCountryLeave,
      computedStyles
    } = this.props;
    return (
      <div className={cx(styles.wrapper, className)}>
        {zoomEnable &&
          <div className={styles.actions}>
            <Button onClick={handleZoomIn}>+</Button>
            <Button disabled={zoom === 1} onClick={handleZoomOut}>
              -
            </Button>
          </div>}
        <Motion
          defaultStyle={{
            z: 1,
            x: 0,
            y: 20
          }}
          style={{
            z: spring(zoom, { stiffness: 240, damping: 30 }),
            x: spring(center[0], { stiffness: 240, damping: 30 }),
            y: spring(center[1], { stiffness: 240, damping: 30 })
          }}
        >
          {({ z, x, y }) =>
            (<ComposableMap
              projection="robinson"
              style={{
                width: '100%'
              }}
            >
              <ZoomableGroup
                center={[x, y]}
                zoom={z}
                disablePanning={!dragEnable}
              >
                <Geographies
                  geographyPaths={paths}
                  disableOptimization={!cache}
                >
                  {(geographies, projection) =>
                    geographies.map(geography => {
                      if (geography) {
                        let commonProps = {
                          key: geography.id,
                          geography,
                          projection,
                          onClick: onCountryClick,
                          onMouseEnter: onCountryEnter,
                          onMouseLeave: onCountryLeave,
                          style: computedStyles(geography)
                        };
                        if (tooltipId) {
                          commonProps = {
                            ...commonProps,
                            'data-tip': '',
                            'data-for': tooltipId
                          };
                        }
                        return <Geography {...commonProps} />;
                      }
                      return null;
                    })}
                </Geographies>
              </ZoomableGroup>
            </ComposableMap>)}
        </Motion>
      </div>
    );
  }
}

Map.propTypes = {
  center: Proptypes.array.isRequired,
  zoom: Proptypes.number.isRequired,
  zoomEnable: Proptypes.bool,
  dragEnable: Proptypes.bool,
  cache: Proptypes.bool,
  className: Proptypes.string,
  paths: Proptypes.array.isRequired,
  tooltipId: Proptypes.string,
  handleZoomIn: Proptypes.func.isRequired,
  handleZoomOut: Proptypes.func.isRequired,
  onCountryEnter: Proptypes.func,
  onCountryClick: Proptypes.func,
  onCountryMove: Proptypes.func,
  onCountryLeave: Proptypes.func,
  computedStyles: Proptypes.func.isRequired
};

Map.defaultProps = {
  center: [0, 20],
  zoom: 1,
  zoomEnable: false,
  dragEnable: true,
  cache: true,
  paths: [],
  tooltipId: '',
  onCountryClick: () => {},
  onCountryEnter: () => {},
  onCountryMove: () => {},
  onCountryLeave: () => {},
  // gets the geography data to handle styles individually
  // eslint-disable-next-line
  computedStyles: geography => ({
    default: {
      fill: '#ECEFF1',
      stroke: '#607D8B',
      strokeWidth: 0.75,
      outline: 'none'
    },
    hover: {
      fill: '#302463',
      stroke: '#607D8B',
      strokeWidth: 0.75,
      outline: 'none'
    },
    pressed: {
      fill: '#FF5722',
      stroke: '#607D8B',
      strokeWidth: 1,
      outline: 'none'
    }
  })
};

export default Map;
