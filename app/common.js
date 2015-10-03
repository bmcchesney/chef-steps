/*
 * This module provides common functionality for the api.
 */

/**
 * Removes the duplicate values from an array of strings.
 * @param  {Array.string} items an array of strings.
 * @return {Array.string}       an array of strings.
 */
function removeDups(items) {
  if (!Array.isArray(items))
    throw 'items must be an array';
  if (items === null || items.length === 0)
    return [];

  var lookup = {};
  var set = [];

  for (var i = 0; i < items.length; i++) {
    if (!lookup[items[i]]) {
      lookup[items[i]] = true;
      set.push(items[i]);
    }
  }

  return set;
}

exports = module.exports = {
  removeDups: removeDups
};