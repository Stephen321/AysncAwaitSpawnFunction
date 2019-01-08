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

function callNext(gen, resolveFinal, t) {
  if (t.done === true) {
    resolveFinal(t.value);
  }
  else {
    t.value.then(result => {
      t = gen.next(result);
      callNext(gen, resolveFinal, t);
    });
  }
}

function spawn(gen) {
  var resolveFinal;
  var newPromise = new Promise((resolve) => {resolveFinal = resolve;});
  var t = gen.next();
  callNext(gen, resolveFinal, t);
  return newPromise;
}
spawn(getStockPrice("test")).then(price => console.log(price));
