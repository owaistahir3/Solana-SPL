import { UnexpectedAccountError, AccountNotFoundError } from '../errors/SdkError.mjs';

function parseAccount(account, parser) {
  if ('exists' in account && !account.exists) {
    return account;
  }

  return getAccountParsingFunction(parser)(account);
}
function getAccountParsingFunction(parser) {
  function parse(account) {
    if ('exists' in account && !account.exists) {
      return account;
    }

    try {
      const data = parser.deserialize(account.data)[0];
      return { ...account,
        data
      };
    } catch (error) {
      throw new UnexpectedAccountError(account.publicKey, parser.name, error);
    }
  }

  return parse;
}
function toAccount(account, parser, solution) {
  if ('exists' in account) {
    assertAccountExists(account, parser.name, solution);
  }

  return getAccountParsingFunction(parser)(account);
}
function getAccountParsingAndAssertingFunction(parser) {
  const parse = getAccountParsingFunction(parser);
  return (unparsedAccount, solution) => {
    if ('exists' in unparsedAccount) {
      assertAccountExists(unparsedAccount, parser.name, solution);
    }

    return parse(unparsedAccount);
  };
}
function assertAccountExists(account, name, solution) {
  if (!account.exists) {
    throw new AccountNotFoundError(account.publicKey, name, solution);
  }
}

export { assertAccountExists, getAccountParsingAndAssertingFunction, getAccountParsingFunction, parseAccount, toAccount };
//# sourceMappingURL=Account.mjs.map
