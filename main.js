symbols = { "test" : "TST"};
prices = { "TST" : 372.25};

function getStockSymbol(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(symbols[name]);
    }, 500);
  });
}

function getSymbolPrice(sym) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(prices[sym]);
    }, 1000);
  });
}

function* getStockPrice(name){
  var sym = yield getStockSymbol(name);
  var price = yield getSymbolPrice(sym);
  return price;
}

function spawn(gen) {
  return new Promise( (resolve) => {
    var t = gen.next();
    var callNext = function () {
      if (t.done === true) {
        resolve(t.value);
      }
      else {
        t.value.then(result => {
          t = gen.next(result);
          callNext();
        });
      }
    }
    callNext();
  });
}
spawn(getStockPrice("test")).then(price => console.log(price));
