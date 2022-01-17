env_vars=$(rg '^.*(REACT_APP_[\d_\w]+).*$' client -r '$1' | cut -d: -f 2 | uniq)
echo $env_vars | xargs -I '{}' \
  jq -e '.environments[].pipeline.env.{} | type == "string"' ./infra/infra.config.json >> /dev/null
