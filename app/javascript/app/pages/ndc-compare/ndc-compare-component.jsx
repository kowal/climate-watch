import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import Header from 'components/header';
import Intro from 'components/intro';
import cx from 'classnames';
import Dropdown from 'components/dropdown';
import sortBy from 'lodash/sortBy';
import Sticky from 'react-stickynode';
import AnchorNav from 'components/anchor-nav';

import anchorNavRegularTheme from 'styles/themes/anchor-nav/anchor-nav-regular.scss';
import layout from 'styles/layout.scss';
import styles from './ndc-compare-styles.scss';

class NDCCountry extends PureComponent {
  render() {
    const {
      route,
      countriesOptions,
      activeCountriesOptions,
      handleDropDownChange,
      anchorLinks
    } = this.props;
    return (
      <div className={styles.wrapper}>
        <Header route={route}>
          <div className={cx(layout.content, styles.header)}>
            <div className={styles.title}>
              <Intro title="NDC Comparison" />
            </div>
          </div>
          <Sticky activeClass="sticky">
            <AnchorNav
              useRoutes
              links={anchorLinks}
              className={layout.content}
              theme={anchorNavRegularTheme}
            />
          </Sticky>
        </Header>
        <div className={styles.countrySelector}>
          <div className={cx(layout.content, styles.fourFold)}>
            <div
              className={cx(styles.selector, styles.offset, styles.separator)}
            >
              <Dropdown
                placeholder="Add a country"
                options={sortBy(countriesOptions, ['label'])}
                onValueChange={selected => handleDropDownChange(0, selected)}
                value={activeCountriesOptions[0]}
                transparent
              />
            </div>
            <div className={cx(styles.selector, styles.separator)}>
              <Dropdown
                placeholder="Add a second country"
                options={sortBy(countriesOptions, ['label'])}
                onValueChange={selected => handleDropDownChange(1, selected)}
                value={activeCountriesOptions[1]}
                transparent
              />
            </div>
            <div className={styles.selector}>
              <Dropdown
                placeholder="Add a third country"
                options={sortBy(countriesOptions, ['label'])}
                onValueChange={selected => handleDropDownChange(2, selected)}
                value={activeCountriesOptions[2]}
                transparent
              />
            </div>
          </div>
        </div>
        <div className={styles.wrapper}>{renderRoutes(route.routes)}</div>
      </div>
    );
  }
}

NDCCountry.propTypes = {
  route: PropTypes.object.isRequired,
  countriesOptions: PropTypes.array,
  activeCountriesOptions: PropTypes.array,
  handleDropDownChange: PropTypes.func,
  anchorLinks: PropTypes.array
};

export default NDCCountry;
