import { createElement } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import qs from 'query-string';

import NDCCountryFullComponent from './ndc-country-full-component';
import actions from './ndc-country-full-actions';
import { getCountry } from './ndc-country-full-selectors';

export { default as component } from './ndc-country-full-component';
export { initialState } from './ndc-country-full-reducers';
export { default as reducers } from './ndc-country-full-reducers';
export { default as actions } from './ndc-country-full-actions';

const mapStateToProps = (state, { match }) => {
  const countryData = {
    countries: state.countries.data,
    iso: match.params.iso
  };
  return {
    loading: state.countryNDCFull.loading,
    loaded: state.countryNDCFull.loaded,
    country: getCountry(countryData),
    content: state.countryNDCFull.data[match.params.iso]
  };
};

const NDCCountryFullContainer = props => {
  const {
    loading,
    loaded,
    location,
    match,
    history,
    fetchCountryNDCFull
  } = props;
  const { iso } = match.params;
  if (iso && !loading && !loaded) {
    fetchCountryNDCFull(iso);
  }

  const onSearchChange = query => {
    const search = qs.parse(location.search);
    const newSearch = { ...search, search: query };

    history.replace({
      pathname: location.pathname,
      search: qs.stringify(newSearch)
    });
  };

  return createElement(NDCCountryFullComponent, {
    ...props,
    onSearchChange
  });
};

export default withRouter(
  connect(mapStateToProps, actions)(NDCCountryFullContainer)
);