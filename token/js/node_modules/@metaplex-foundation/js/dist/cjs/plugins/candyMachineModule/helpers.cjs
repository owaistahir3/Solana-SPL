'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mplCandyMachine = require('@metaplex-foundation/mpl-candy-machine');
var constants = require('./constants.cjs');
var BigNumber = require('../../types/BigNumber.cjs');
var common = require('../../utils/common.cjs');

function countCandyMachineItems(rawData) {
  const number = rawData.slice(constants.CONFIG_ARRAY_START, constants.CONFIG_ARRAY_START + 4);
  return BigNumber.toBigNumber(number, 'le');
}
function parseCandyMachineItems(rawData) {
  const configLinesStart = constants.CONFIG_ARRAY_START + 4;
  const lines = [];
  const count = countCandyMachineItems(rawData).toNumber();

  for (let i = 0; i < count; i++) {
    const [line] = mplCandyMachine.configLineBeet.deserialize(rawData, configLinesStart + i * constants.CONFIG_LINE_SIZE);
    lines.push({
      name: common.removeEmptyChars(line.name),
      uri: common.removeEmptyChars(line.uri)
    });
  }

  return lines;
}
function getCandyMachineAccountSizeFromData(data) {
  if (data.hiddenSettings != null) {
    return constants.CONFIG_ARRAY_START;
  } else {
    const itemsAvailable = BigNumber.toBigNumber(data.itemsAvailable).toNumber();
    return Math.ceil(constants.CONFIG_ARRAY_START + 4 + itemsAvailable * constants.CONFIG_LINE_SIZE + 8 + 2 * (itemsAvailable / 8 + 1));
  }
}
const getCandyMachineUuidFromAddress = candyMachineAddress => {
  return candyMachineAddress.toBase58().slice(0, 6);
};

exports.countCandyMachineItems = countCandyMachineItems;
exports.getCandyMachineAccountSizeFromData = getCandyMachineAccountSizeFromData;
exports.getCandyMachineUuidFromAddress = getCandyMachineUuidFromAddress;
exports.parseCandyMachineItems = parseCandyMachineItems;
//# sourceMappingURL=helpers.cjs.map
