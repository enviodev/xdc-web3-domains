import assert from "assert";
import { 
  TestHelpers,
  Web3Domains_Approval
} from "generated";
const { MockDb, Web3Domains } = TestHelpers;

describe("Web3Domains contract Approval event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for Web3Domains contract Approval event
  const event = Web3Domains.Approval.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("Web3Domains_Approval is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await Web3Domains.Approval.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualWeb3DomainsApproval = mockDbUpdated.entities.Web3Domains_Approval.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedWeb3DomainsApproval: Web3Domains_Approval = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      owner: event.params.owner,
      approved: event.params.approved,
      tokenId: event.params.tokenId,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualWeb3DomainsApproval, expectedWeb3DomainsApproval, "Actual Web3DomainsApproval should be the same as the expectedWeb3DomainsApproval");
  });
});
