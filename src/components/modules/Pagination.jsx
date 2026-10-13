import React from 'react'
import styles from './Pagination.module.css'

function Pagination({pageNumber,setPageNumber}) {

    const nextHandler=()=>
    {
        if(pageNumber===10)return;
        setPageNumber(pageNumber=>pageNumber+1)
    }

    const previousHandler=()=>
    {
        if(pageNumber===1)return;
        setPageNumber(pageNumber=>pageNumber-1)
    }

  return (
    <div className={styles.pagination}>
        <button onClick={previousHandler} className={pageNumber===1?styles.disabled:null}>Pervious</button>
        <p className={pageNumber===1?styles.selected:null}>1</p>
        <p className={pageNumber===2?styles.selected:null}>2</p>
        <span>...</span>
        {pageNumber>2 &&pageNumber<9 &&<><p className={styles.selected}>{pageNumber}  </p><span>...</span></>}
        <p className={pageNumber===9?styles.selected:null}>9</p>
        <p className={pageNumber===10?styles.selected:null}>10</p>
         <button onClick={nextHandler} className={pageNumber===10?styles.disabled:null}>Next</button>
    </div>
  )
}

export default Pagination