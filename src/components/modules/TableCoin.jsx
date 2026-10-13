import React, { useState } from "react";
import ChartUp from '../../assets/chart-up.svg'
import ChartDown from '../../assets/chart-down.svg'
import styles from './TableCoin.module.css'
import  { RotatingLines } from "react-loader-spinner";
import { getChart } from "../../../services/cryptoApi";

function TableCoin({ coins,currency,isLoading,setChart }) {
  return (
    <div className={styles.container}>
        {isLoading?<RotatingLines strokeColor="#3874ff" strokeWidth="2"/>:( <table className={styles.table}>
      <thead>
        <tr>
          <th>Coin</th>
          <th>Name</th>
          <th>Price</th>
          <th>24h</th>
          <th>TotalVolume</th>
          <th> </th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin) => (
          <TableRow coin={coin} currency={currency} key={coin.id} setChart={setChart} />
        ))}
      </tbody>
    </table>)}
    
   </div>
  );
}

export default TableCoin;

const TableRow = ({ coin,currency,setChart}) => {


  
  const {
    image,
    symbol,
    name,
    total_volume,
    market_cap_change_percentage_24h: price_change,
    current_price,
    id
  } = coin;

  const showChart=async(id)=>
  {
    try
    {
     const res= await fetch(getChart(id));
     const json = await res.json();
     setChart({...json,coin});
    }

    catch(err)
    {
     console.log(err)
    }
  }

  return (
    <tr>
      <td>
        <div className={styles.symbol} onClick={()=>showChart(id)}>
          <img src={image} alt={name} />
          <span>{symbol}</span>
        </div>
      </td>
      <td>{name}</td>
      <td>
        {currency === "usd" && "$"}
        {current_price}
      </td>
      <td className={price_change>0?styles.success:styles.error}>{price_change}%</td>
      <td >{total_volume}</td>
      <td><img src={price_change>0?ChartUp:ChartDown}/></td>
      <td></td>
    </tr>
  );
};
