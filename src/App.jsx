import React, { useState, useEffect } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import InputBox from "./components/InputBox";
import Loading from "./components/Loading";

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCountryCode, setFromCountryCode] = useState("usd");
  const [toCountryCode, setToCountryCode] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(1);
  const [data, date, loadingStatus] = useCurrencyInfo(fromCountryCode);

  function convertCurrency() {
    if (amount && data[toCountryCode]) {
      setConvertedAmount((amount * data[toCountryCode]).toFixed(2));
    }
  }

  function dateFormatter(date) {
    if (!date) return;

    const monthAbbreviations = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    date = date.split("-").reverse().join("-");
    let mIndex = date.slice(3, 5);
    let month = monthAbbreviations[mIndex - 1];
    month = month.charAt(0).toUpperCase() + month.slice(1);
    date = date.replace(/-\d\d-/, `-${month}-`);

    return date;
  }

  function swap(e) {
    setFromCountryCode(toCountryCode);
    setToCountryCode(fromCountryCode);
  }

  useEffect(() => {
    convertCurrency();
  }, [data, amount, fromCountryCode, toCountryCode]);

  return (
    <>
      <div className="h-dvh grid place-content-center w-max mx-auto px-1">
        <div className="relative">
          <div className="company">
            <h1 className="uppercase text-center">currency converter </h1>
            <h2 className="text-xs text-center">
              (as of: {dateFormatter(date)})
            </h2>
          </div>

          <div className="mt-2 mb-6 md:mb-0">
            <InputBox
              label="from"
              amount={amount}
              onAmountChange={(amount) => setAmount(amount)}
              countryCode={fromCountryCode}
              countryCodeOptions={Object.keys(data)}
              onCountryCodeChange={(code) => setFromCountryCode(code)}
            />
          </div>

          <div
            className="relative md:absolute md:top-1/2 md:-right-9 md:translate-y-1.5 w-max cursor-pointer mx-auto"
            onClick={swap}
          >
            <span className="relative text-2xl text-gray-500 py-3 pl-1.5 bg-gray-800 rounded-tl-md rounded-bl-md hover:text-emerald-500">
              &#8643;
            </span>
            <span className="relative text-2xl text-gray-500 py-3 pr-1.5 bg-gray-800 rounded-tr-md rounded-br-md hover:text-amber-500">
              &#8638;
            </span>
          </div>

          <div className="mt-6 md:mt-2">
            <InputBox
              label="to"
              amount={convertedAmount}
              onAmountChange={(amount) => setConvertedAmount(amount)}
              countryCode={toCountryCode}
              countryCodeOptions={Object.keys(data)}
              onCountryCodeChange={(code) => setToCountryCode(code)}
              amountInputDisabled
            />
          </div>

          <div className="relative w-96 mx-auto">
            <div className="absolute -top-8 right-[52%]">
              {loadingStatus && <Loading />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
