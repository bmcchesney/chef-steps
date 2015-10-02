var dataSet = [];

function removeDups(emails) {
  if (emails === null || emails.length === 0)
    return [];

  var lookup = {};
  var set = [];

  for (var i = 0; i < emails.length; i++) {
    if (!lookup[emails[i]]) {
      lookup[emails[i]] = true;
      set.push(emails);
    }
  }

  return set;
}

removeDups(dataSet);