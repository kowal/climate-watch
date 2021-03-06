import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from 'components/icon';
import ShareMenu from 'components/share-menu';
import cx from 'classnames';

import download from 'assets/icons/download.svg';
import styles from './tools-nav-styles.scss';

const ToolsNav = () => (
  <div className={styles.toolsNav}>
    <NavLink
      className={cx(styles.link, styles.disabled)}
      activeClassName={styles.linkActive}
      to=""
      disabled
      title="Coming soon"
    >
      MY CW
    </NavLink>
    <a
      href="//climate-watch-dev.s3.amazonaws.com/climate-watch-download-zip/data-download.zip"
      className={styles.link}
      title="Download data"
    >
      <Icon className={styles.download} icon={download} />
    </a>
    <ShareMenu className={styles.shareButton} />
  </div>
);

export default ToolsNav;
