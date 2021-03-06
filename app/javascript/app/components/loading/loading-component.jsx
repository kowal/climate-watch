import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './loading-styles.scss';

class Loading extends PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={cx(styles.container, this.props.className)}>
        <div className={styles.loader}>
          <span className={styles.loaderTrack} />
          <span className={styles.loaderLight} />
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  className: PropTypes.string
};

export default Loading;
