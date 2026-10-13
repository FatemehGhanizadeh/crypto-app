import React, { useEffect, useState } from "react";
import { getCoins } from "../../../services/cryptoApi";
import TableCoin from "../modules/TableCoin";
import Pagination from "../modules/Pagination";
import Search from "../modules/Search";
import Chart from '../modules/Chart'

function HomePage() {
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading,setIsLoading]=useState(true);
  const [chart,setChart]=useState(null);
 

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(getCoins(currency, pageNumber));
        const json = await res.json();
        setCoins(json);
        setIsLoading(false)
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchCoins();
  }, [currency, pageNumber]);

  return (
    <>
      <Search currency={currency} setCurrency={setCurrency}/>
      <TableCoin coins={coins} currency={currency} isLoading={isLoading}  setChart={setChart}/>
      <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber}/>
      {!!chart&&<Chart chart={chart} setChart={setChart}/>}
    </>
  );
}

export default HomePage;
