import { indexer } from "envio";
import { Web3Domain } from "envio";

indexer.onEvent(
  { contract: "Web3Domains", event: "Transfer" },
  async ({ event, context }) => {
  const { from, to, tokenId } = event.params;  

  const web3Domain: Web3Domain | undefined = await context.Web3Domain.get(tokenId.toString());

  if (!web3Domain) {
    context.Web3Domain.set({
      id: tokenId.toString(),
      name: "tbd",
      owner: to,
    })
  } else {
    context.Web3Domain.set({
      ...web3Domain,
      owner: to,
    })
  }
}
);

indexer.onEvent(
  { contract: "Web3Domains", event: "NewURI" },
  async ({ event, context }) => {
  const { tokenId, tokenUri } = event.params;

  const web3Domain: Web3Domain | undefined = await context.Web3Domain.get(tokenId.toString());

  if (!web3Domain) {
    context.log.error("Transfer expected to happen before NewURI");
    return;
  } else {
    context.Web3Domain.set({
      ...web3Domain,
      name: tokenUri,
    })
  }
}
);

