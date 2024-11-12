//custom hooks
import { useEffect, useState } from "react";

function useCurrencyInfo(countryCode) {
  const [data, setData] = useState({});
  const [date, setDate] = useState("");
  const [currencyCountryMap, setCurrencyCountryMap] = useState({});
  const [loadingStatus, setLoadingStatus] = useState(false);
  const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${countryCode}.json`;
  const apiUrlAllCountry = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";

  useEffect(() => {
    fetch(apiUrlAllCountry)
    .then(res => res.json())
    .then(data => setCurrencyCountryMap(data));
  }, [])
  
  //fetch country specific data
  useEffect(() => {
    setLoadingStatus(prev => !prev);
    fetch(apiUrl)
    .then((res) => res.json())
    .then((resData) => {
      setData(resData[countryCode])
      setDate(resData["date"])
      setLoadingStatus(prev => !prev);
      })
      .catch(()=> {
        setDate("yyyy-mm-dd");
        setData({"n/a": -1});
      });
  }, [countryCode]);
  
  return [data, date, currencyCountryMap, loadingStatus];
}

export default useCurrencyInfo;
