curl --silent -X POST \
-o /dev/null \
-H "Content-Type: application/json" \
-d '{"query": "{ __typename }"}' \
localhost:6969/graphql || exit 1
