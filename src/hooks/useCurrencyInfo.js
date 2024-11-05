//custom hooks
import { useEffect, useState } from "react";

function useCurrencyInfo(countryCode) {
  const [data, setData] = useState({});
  const [date, setDate] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  
  useEffect(() => {
    setLoadingStatus(prev => !prev);
    const apiUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${countryCode}.json`;
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
  
  return [data, date, loadingStatus];
}

export default useCurrencyInfo;
