import React, { useEffect, useState } from "react";
import { getSearch } from "../../../services/cryptoApi";
import { RotatingLines } from "react-loader-spinner";
import styles from"./Search.module.css"

function Search({ currency, setCurrency }) {
  const [searchText, setSearchText] = useState("");
  const [searchList, setSearchList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setSearchList([]);
    const controller = new AbortController();

    if (!searchText) {
      setIsLoading(false);
      return;
    }

    const search = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(getSearch(searchText), {
          signal: controller.signal,
        });
        const json = await res.json();

        if (json.coins) {
          setSearchList(json.coins);
          setIsLoading(false);
        } else {
           alert(json.status.error_message);
        }
      } catch (err) {
        if (err.name !== "AbortError") alert(err.message);
      }
    };

    search();
    return () => controller.abort();
  }, [searchText]);

  return (
    <div className={styles.searchBox}>
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="jpy">JPY</option>
      </select>

      {(isLoading || !!searchList.length) && (
        <div className={styles.searchResult}>
          {isLoading ? (
            <RotatingLines
              width="50px"
              height="50px"
              strokeWidth="2"
              strokeColor="#3874ff"
            />
          ) : (
            <SearchList searchList={searchList} />
          )}
        </div>
      )}
    </div>
  );
}

export default Search;

const SearchList = ({ searchList }) => {
  return (
    <ul>
      {searchList.map((coin) => {
        const { name, id, thumb } = coin;
        return (
          <li key={id}>
            <img src={thumb} />
            <p>{name}</p>
          </li>
        );
      })}
    </ul>
  );
};
