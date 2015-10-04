### Coding challenge for ChefSteps

I created a heroku hosted node js application that provides a route for solving the challenge.  The api handles a JSON array of values and returns the set in the original order with all duplicates removed.  The implementation is provided in `common.js`, with a simple function that holds a hash of the unique values in the dataset while iterating through the original array and only keeping unique values.  Its worth pointing out that this would remove any duplicate value types and nothing is specifically implemented for validating emails.  A simple regex could be used to ensure that the input values are valid emails.  There is limited error handling and an empty array is returned if those conditions are not met.

Usage:

POST https://chef-steps-challenge.herokuapp.com/remove-duplicates

```
[
  "foobar@barfoo.com",
  ...
]
```

Baseline test cases:

- `null`
- `[]`
- `"testing"`
- An array of emails containing ~50% duplicates based off of the dataset included in `emails.json`.

When run locally the function executes within the given time constraints, however running through the hosted version with a large dataset will not, based on network latency and the size of the payload being sent.  More on this in the next section where we'll talk a little bit about much larger datasets.

### Handling large data sets

When considering very large datasets (1m+ items), I first thought about some real usages for this functionality.  Based on the size of the data set it quickly becomes impossible to store the dataset in memory on a single machine.  We can handle 1m items on a normal modern architecture, but then we also have to consider where our inputs come from and what our outputs would look like.

```
100k items @ 255 characters -> 255 KB
1m items @ 255 characters -> 255 MB
1b items @ 255 characters -> 255 GB
```

We certainly wouldn't want to pass in a 255 MB HTTP request, and so I think we want to really consider what our inputs/outputs and storage would be for datasets this large.  The goal is to hold a unique set of values, so streaming or batching values against a persistant storage implementation seems like a solid solution.  For outputs we could provide some query functionality against this store.  This could support the ability to batch results so the consumer could process datasets in smaller parts, or possibly in a distributed manner.

For the dataset sizes mentioned, a traditional RDS system would work, using a PK to guarantee uniqeness. Currently I've been working with Cassandra and all writes are "upsert", which would handle our uniqueness requirement and allow for much larger scaleability.  Querying the data set would be more complicated, but we'd have to have the requirements for how the data is used to decide what is needed.
