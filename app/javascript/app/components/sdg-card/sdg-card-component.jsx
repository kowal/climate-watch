import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Icon from 'components/icon';

import styles from './sdg-card-styles.scss';

class SDGCard extends PureComponent {
  render() {
    const {
      sdgData,
      indicators,
      square,
      tooltipId,
      setTooltipData,
      className,
      activeSector,
      icons
    } = this.props;
    const cardStyle = cx(styles.card, square ? styles.square : null, className);
    return (
      <div className={cardStyle}>
        <h4 className={styles.title}>{`${indicators
          ? sdgData.id
          : ''} ${sdgData.title}`}</h4>
        <div className={styles.dots}>
          {indicators &&
            sdgData &&
            sdgData.targets.map(target => (
              <span
                key={target.targetKey}
                data-for={tooltipId}
                data-tip
                onMouseEnter={() => setTooltipData(target)}
                className={cx(
                  styles.dot,
                  activeSector &&
                  (!target.sectors ||
                    target.sectors.indexOf(parseInt(activeSector.value, 10)) ===
                      -1)
                    ? styles.small
                    : ''
                )}
                style={{
                  backgroundColor: target.sectors ? sdgData.colour : ''
                }}
              />
            ))}
        </div>
        {!indicators && <div className={styles.number}>{sdgData.id}</div>}
        <Icon icon={icons[`sdg${sdgData.id}`]} className={styles.icon} />
      </div>
    );
  }
}

SDGCard.propTypes = {
  icons: PropTypes.object.isRequired,
  sdgData: PropTypes.object,
  indicators: PropTypes.bool,
  square: PropTypes.bool,
  tooltipId: PropTypes.string,
  setTooltipData: PropTypes.func,
  className: PropTypes.string,
  activeSector: PropTypes.object
};

export default SDGCard;
