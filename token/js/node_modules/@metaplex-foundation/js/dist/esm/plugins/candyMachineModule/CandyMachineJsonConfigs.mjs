import { EndSettingType, WhitelistMintMode } from '@metaplex-foundation/mpl-candy-machine';
import { sol } from '../../types/Amount.mjs';
import { toPublicKey } from '../../types/PublicKey.mjs';
import { toBigNumber } from '../../types/BigNumber.mjs';
import { toOptionDateTime, toDateTime } from '../../types/DateTime.mjs';

const toCandyMachineConfigsFromJson = config => {
  var _config$creators, _config$symbol, _config$maxEditionSup;

  const configCreators = (_config$creators = config.creators) !== null && _config$creators !== void 0 ? _config$creators : [{
    address: config.solTreasuryAccount,
    verified: false,
    share: 100
  }];
  return {
    wallet: config.splToken && config.splTokenAccount ? toPublicKey(config.splTokenAccount) : toPublicKey(config.solTreasuryAccount),
    tokenMint: config.splToken && config.splTokenAccount ? toPublicKey(config.splToken) : null,
    price: sol(config.price),
    symbol: (_config$symbol = config.symbol) !== null && _config$symbol !== void 0 ? _config$symbol : '',
    sellerFeeBasisPoints: config.sellerFeeBasisPoints,
    maxEditionSupply: toBigNumber((_config$maxEditionSup = config.maxEditionSupply) !== null && _config$maxEditionSup !== void 0 ? _config$maxEditionSup : 0),
    isMutable: !config.noMutable,
    retainAuthority: !config.noRetainAuthority,
    goLiveDate: toOptionDateTime(config.goLiveDate),
    itemsAvailable: toBigNumber(config.number),
    endSettings: config.endSettings ? config.endSettings.endSettingType === 'date' ? {
      endSettingType: EndSettingType.Date,
      date: toDateTime(config.endSettings.value)
    } : {
      endSettingType: EndSettingType.Amount,
      number: toBigNumber(config.endSettings.value)
    } : null,
    hiddenSettings: config.hiddenSettings ? { ...config.hiddenSettings,
      hash: Buffer.from(config.hiddenSettings.hash, 'utf8').toJSON().data
    } : null,
    whitelistMintSettings: config.whitelistMintSettings ? { ...config.whitelistMintSettings,
      mode: config.whitelistMintSettings.mode === 'burnEveryTime' ? WhitelistMintMode.BurnEveryTime : WhitelistMintMode.NeverBurn,
      mint: toPublicKey(config.whitelistMintSettings.mint),
      discountPrice: sol(config.whitelistMintSettings.discountPrice)
    } : null,
    gatekeeper: config.gatekeeper ? { ...config.gatekeeper,
      network: toPublicKey(config.gatekeeper.gatekeeperNetwork)
    } : null,
    creators: configCreators.map(creatorConfig => ({ ...creatorConfig,
      address: toPublicKey(creatorConfig.address)
    }))
  };
};

export { toCandyMachineConfigsFromJson };
//# sourceMappingURL=CandyMachineJsonConfigs.mjs.map
