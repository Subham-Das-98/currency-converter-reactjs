import React from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  countryCode = "usd",
  countryCodeOptions = [],
  currencyCountryMap = {},
  onCountryCodeChange,
  amountInputDisabled = false,
  countryCodeSelectOptionDisabled = false,
  onSelectOpenHandler,
  onSelectCloseHandler,
}) {
  return (
    <>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
        name="currency-form"
      >
        <div className="bg-gray-700 w-full max-w-96 mx-auto rounded-lg px-3 py-3">
          <div className="flex justify-between">
            <div className="cursor-pointer">
              <label htmlFor="form-amount-input">{label.toUpperCase()}</label>
            </div>
            <div>Currency Type</div>
          </div>

          <div className="flex justify-between mt-3.5">
            <input
              type="number"
              min={1}
              className={
                "outline-none w-1/2 rounded-md px-2 py-1.5 bg-gray-800"
              }
              id="form-amount-input"
              placeholder="Amount"
              value={amount}
              onChange={(e) => {
                onAmountChange && onAmountChange(Number(e.target.value));
              }}
              disabled={amountInputDisabled}
            />
            <select
              className="outline-none cursor-pointer px-4 py-1.5 rounded-md bg-gray-800 select"
              value={countryCode}
              onChange={(e) =>
                onCountryCodeChange && onCountryCodeChange(e.target.value)
              }
              onPointerUp={(e) => {
                onSelectOpenHandler && onSelectOpenHandler(e);
              }}
              onPointerOut={(e) => {
                e.preventDefault()
                onSelectCloseHandler && onSelectCloseHandler(e);
              }}
              disabled={countryCodeSelectOptionDisabled}
            >
              {countryCodeOptions.map((code) => (
                <option
                  className="option"
                  key={code}
                  value={code}
                  data-full-text={`${
                    currencyCountryMap[code]
                  }(${code.toUpperCase()})`}
                >
                  {code.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>
    </>
  );
}

export default InputBox;
