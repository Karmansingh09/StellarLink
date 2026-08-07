const transactionsData = [];

export const getTransactionsService = async (query = {}) => {
  let result = [...transactionsData];

  if (query.search) {
    const s = query.search.toLowerCase();
    result = result.filter(
      (tx) =>
        tx.txId.toLowerCase().includes(s) ||
        tx.device.toLowerCase().includes(s) ||
        tx.wallet.toLowerCase().includes(s)
    );
  }

  if (query.status && query.status !== 'all') {
    result = result.filter((tx) => tx.status.toLowerCase() === query.status.toLowerCase());
  }

  if (query.device && query.device !== 'all') {
    result = result.filter((tx) => tx.device.toLowerCase() === query.device.toLowerCase());
  }

  return result;
};
