import { AuctionsBuildersClient } from './AuctionsBuildersClient.mjs';
import { findAuctionHousePda } from './pdas.mjs';
import { createAuctionHouseOperation } from './createAuctionHouse.mjs';
import { findAuctionHouseByAddressOperation } from './findAuctionHouseByAddress.mjs';
import { updateAuctionHouseOperation } from './updateAuctionHouse.mjs';
import { AuctionHouseClient } from './AuctionHouseClient.mjs';
import { Task } from '../../utils/Task.mjs';

class AuctionsClient {
  constructor(metaplex) {
    this.metaplex = metaplex;
  }

  builders() {
    return new AuctionsBuildersClient(this.metaplex);
  }

  for(auctionHouse, auctioneerAuthority) {
    return new AuctionHouseClient(this.metaplex, auctionHouse, auctioneerAuthority);
  }

  createAuctionHouse(input) {
    return new Task(async scope => {
      const output = await this.metaplex.operations().getTask(createAuctionHouseOperation(input)).run(scope);
      scope.throwIfCanceled();
      const auctionHouse = await this.findAuctionHouseByAddress(output.auctionHouseAddress).run(scope);
      return { ...output,
        auctionHouse
      };
    });
  }

  updateAuctionHouse(auctionHouse, input) {
    return new Task(async scope => {
      const output = await this.metaplex.operations().getTask(updateAuctionHouseOperation({
        auctionHouse,
        ...input
      })).run(scope);
      scope.throwIfCanceled();
      const updatedAuctionHouse = await this.findAuctionHouseByAddress(auctionHouse.address).run(scope);
      return { ...output,
        auctionHouse: updatedAuctionHouse
      };
    });
  }

  findAuctionHouseByAddress(address, options) {
    return this.metaplex.operations().getTask(findAuctionHouseByAddressOperation({
      address,
      ...options
    }));
  }

  findAuctionHouseByCreatorAndMint(creator, treasuryMint, options) {
    return this.findAuctionHouseByAddress(findAuctionHousePda(creator, treasuryMint), options);
  }

}

export { AuctionsClient };
//# sourceMappingURL=AuctionsClient.mjs.map
