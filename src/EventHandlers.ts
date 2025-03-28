import {
  Web3Domains,  
  Web3Domain,
} from "generated";

Web3Domains.Transfer.handler(async ({ event, context }) => {
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
});

Web3Domains.NewURI.handler(async ({ event, context }) => {
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
});


