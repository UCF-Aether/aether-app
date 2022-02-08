curl --silent -X POST \
-o /dev/null \
-H "Content-Type: application/json" \
-d '{"query": "{ __typename }"}' \
localhost:$PORT/graphql || exit 1
