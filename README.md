## Envio Indexer

*Please refer to the [documentation website](https://docs.envio.dev) for a thorough guide on all [Envio](https://envio.dev) indexer features*

### Run

```bash
pnpm dev
```

Visit http://localhost:8080 to see the GraphQL Playground, local password is `testing`.

### Generate files from `config.yaml` or `schema.graphql`

```bash
pnpm codegen
```

### Pre-requisites

- [Node.js (use v18 or newer)](https://nodejs.org/en/download/current)
- [pnpm (use v8 or newer)](https://pnpm.io/installation)
- [Docker desktop](https://www.docker.com/products/docker-desktop/)

### Example queries

#### Get address for a domain
```graphql
query DomainByNameQuery {
  Web3Domain(where: {name: {_eq: "hello.xdc"}}) {
    id
    name
    owner
  }
}
```

#### Get all domains owned by an address
```graphql
query DomainByOwnerQuery {
  Web3Domain(where: {owner: {_eq: "0x0D29025FA6a82772B5a2ceeD27fb8F447e846901"}}) {
    id
    name
    owner
  }
}
```