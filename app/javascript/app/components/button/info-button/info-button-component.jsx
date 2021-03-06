import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from 'components/button';
import Icon from 'components/icon';
import infoIcon from 'assets/icons/info.svg';
import styles from './info-button-styles.scss';

class InfoButton extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleInfoClick, infoOpen, className, square, box } = this.props;
    return (
      <Button
        className={cx(
          styles.btnInfo,
          infoOpen ? styles.btnInfoActive : '',
          className,
          { [styles.box]: box }
        )}
        onClick={handleInfoClick}
        square={square}
      >
        <Icon icon={infoIcon} />
      </Button>
    );
  }
}

InfoButton.propTypes = {
  className: PropTypes.node,
  infoOpen: PropTypes.bool.isRequired,
  handleInfoClick: PropTypes.func.isRequired,
  square: PropTypes.bool,
  box: PropTypes.bool
};

export default InfoButton;
