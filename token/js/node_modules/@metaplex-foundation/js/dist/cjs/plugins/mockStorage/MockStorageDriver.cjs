'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.cjs');
var SdkError = require('../../errors/SdkError.cjs');
var BigNumber = require('../../types/BigNumber.cjs');
var Amount = require('../../types/Amount.cjs');

const DEFAULT_BASE_URL = 'https://mockstorage.example.com/';
const DEFAULT_COST_PER_BYTE = 1;
class MockStorageDriver {
  constructor(options) {
    var _options$baseUrl;

    _rollupPluginBabelHelpers.defineProperty(this, "cache", {});

    this.baseUrl = (_options$baseUrl = options === null || options === void 0 ? void 0 : options.baseUrl) !== null && _options$baseUrl !== void 0 ? _options$baseUrl : DEFAULT_BASE_URL;
    this.costPerByte = BigNumber.toBigNumber((options === null || options === void 0 ? void 0 : options.costPerByte) != null ? options === null || options === void 0 ? void 0 : options.costPerByte : DEFAULT_COST_PER_BYTE);
  }

  async getUploadPrice(bytes) {
    return Amount.lamports(this.costPerByte.muln(bytes));
  }

  async upload(file) {
    const uri = `${this.baseUrl}${file.uniqueName}`;
    this.cache[uri] = file;
    return uri;
  }

  async download(uri) {
    const file = this.cache[uri];

    if (!file) {
      throw new SdkError.AssetNotFoundError(uri);
    }

    return file;
  }

}

exports.MockStorageDriver = MockStorageDriver;
//# sourceMappingURL=MockStorageDriver.cjs.map
