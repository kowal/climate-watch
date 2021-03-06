import { createSelector } from 'reselect';
import groupBy from 'lodash/groupBy';
import toUpper from 'lodash/toUpper';
import uniqBy from 'lodash/uniqBy';

const getResultsData = state => state.results || null;
const getDocQuery = state => state.search.document || null;
const getLocation = state => state.location || null;
const getSearch = state => state.search || null;

export const getDocumentOptions = createSelector([getResultsData], results => {
  if (!results) return null;
  const groupedByDoc = groupBy(results, 'document_type');
  return Object.keys(groupedByDoc).map(d => ({
    label: toUpper(groupedByDoc[d][0].document_type),
    value: d
  }));
});

export const getDocumentSelected = createSelector(
  [getDocumentOptions, getDocQuery],
  (docs, docQuery) => {
    if (!docs) return null;
    if (!docQuery) return docs[0];
    return docs.find(d => d.value === docQuery);
  }
);

export const filterSearchResults = createSelector(
  [getResultsData, getDocumentSelected],
  (results, docSelected) => {
    if (!results) return null;
    return uniqBy(
      results.filter(d => d.document_type === docSelected.value),
      'location.iso_code3'
    );
  }
);

export const getSearchResultsSorted = createSelector(
  filterSearchResults,
  results => {
    if (!results || !results.length) return null;
    return results.sort((a, b) => {
      if (a.matches.length > b.matches.length) return -1;
      if (a.matches.length < b.matches.length) return 1;
      return 0;
    });
  }
);

export const getAnchorLinks = createSelector(
  [getDocumentOptions, getLocation, getSearch],
  (docs, location, search) =>
    docs.map(d => ({
      label: d.label,
      path: `${location.pathname}`,
      search: `?document=${d.value}&searchBy=${search.searchBy}&query=${search.query}`,
      activeQuery: {
        key: 'document',
        value: d.value
      }
    }))
);

export default {
  getSearchResultsSorted,
  getDocumentOptions,
  getDocumentSelected,
  getAnchorLinks
};
