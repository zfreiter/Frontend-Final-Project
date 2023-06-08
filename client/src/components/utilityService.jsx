export const groupStocks = (own, group) => {
  const getStocks = [];
  own.map((stock) => {
    getStocks.push(stock.name);
  });
  group.map((stock) => {
    stock.map((stock) => {
      getStocks.push(stock.name);
    });
  });
  return getStocks;
};

export const createStockStr = (stocks) => {
  let stocksStr = '';
  stocks.map((stock) => {
    stocksStr += stock + ',';
  });

  return stocksStr.slice(0, -1);
};

export const getCurrentValue = (currentStockInfo, data) => {
  let stocks = [];
  if (currentStockInfo) {
    stocks = currentStockInfo.filter((stock) => {
      return data.find((stocktwo) => {
        return stock.symbol === stocktwo.name;
      });
    });
  }
  return stocks;
};
