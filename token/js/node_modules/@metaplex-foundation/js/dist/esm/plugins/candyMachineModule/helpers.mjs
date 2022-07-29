import { configLineBeet } from '@metaplex-foundation/mpl-candy-machine';
import { CONFIG_ARRAY_START, CONFIG_LINE_SIZE } from './constants.mjs';
import { toBigNumber } from '../../types/BigNumber.mjs';
import { removeEmptyChars } from '../../utils/common.mjs';

function countCandyMachineItems(rawData) {
  const number = rawData.slice(CONFIG_ARRAY_START, CONFIG_ARRAY_START + 4);
  return toBigNumber(number, 'le');
}
function parseCandyMachineItems(rawData) {
  const configLinesStart = CONFIG_ARRAY_START + 4;
  const lines = [];
  const count = countCandyMachineItems(rawData).toNumber();

  for (let i = 0; i < count; i++) {
    const [line] = configLineBeet.deserialize(rawData, configLinesStart + i * CONFIG_LINE_SIZE);
    lines.push({
      name: removeEmptyChars(line.name),
      uri: removeEmptyChars(line.uri)
    });
  }

  return lines;
}
function getCandyMachineAccountSizeFromData(data) {
  if (data.hiddenSettings != null) {
    return CONFIG_ARRAY_START;
  } else {
    const itemsAvailable = toBigNumber(data.itemsAvailable).toNumber();
    return Math.ceil(CONFIG_ARRAY_START + 4 + itemsAvailable * CONFIG_LINE_SIZE + 8 + 2 * (itemsAvailable / 8 + 1));
  }
}
const getCandyMachineUuidFromAddress = candyMachineAddress => {
  return candyMachineAddress.toBase58().slice(0, 6);
};

export { countCandyMachineItems, getCandyMachineAccountSizeFromData, getCandyMachineUuidFromAddress, parseCandyMachineItems };
//# sourceMappingURL=helpers.mjs.map
