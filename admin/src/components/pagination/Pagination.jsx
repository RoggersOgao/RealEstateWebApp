import React from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import "./pagination.scss"
function Pagination({dataList, itemsPerPage, currentPage, setCurrentPage, maxPageLimit, minPageLimit
    ,setMaxPageLimit,
    setMinPageLimit,
    setPageLimits,
    pageLimits
}) {

    

    // storing the pages in a list
    const pages = [] 


    for (let i=1; i<= Math.ceil(dataList.length/itemsPerPage); i++){
        pages.push(i)
    }

    const handlePageNumberClick = (event) => {
        setCurrentPage(Number(event.target.value))
    }

    // render how many pages there will be
    const renderPageNumbers = pages.map(number => {

        
            return (
                <div key={number}>
                {number <= maxPageLimit && number >= minPageLimit ? (
                <li 
                // key={number} 
                className={currentPage === number ? "paginationNumbers activePageColor" : "paginationNumbers" } onClick={handlePageNumberClick} 
                value={number}
                
                >
                    {number}
                </li>
                ): null}
                </div>
            )
        
    })


    // handle previous

    const handlePrev = () => {
        setCurrentPage(currentPage - 1)

        if((currentPage-1) %pageLimits===0){
            setMaxPageLimit(maxPageLimit - pageLimits)
            setMinPageLimit(minPageLimit - pageLimits)
        }
    }

    // handle Next

    const handleNext = () => {
        setCurrentPage(currentPage + 1)
        if(currentPage+1 > maxPageLimit){
            setMaxPageLimit(maxPageLimit + pageLimits)
            setMinPageLimit(minPageLimit + pageLimits)
        }
    }

    //handle dots

    let pageIncrements = null;
    if(pages.length > maxPageLimit){
        pageIncrements = <li className="paginationNumbers" onClick={handleNext}>&hellip;</li>
    }

    let pageDecrements = null;

    if(minPageLimit < 1){
        pageDecrements = <li className="paginationNumbers" onClick={handlePrev}> &hellip;</li>
    }
    if(minPageLimit > 5){
        pageDecrements = <li className="paginationNumbers" onClick={handlePrev}> &hellip;</li>
    }

  return (
    <div className="pagination">
        <ul className="pageNumbersUL">
            <li className='paginationNumbers'>
                <button
                onClick={handlePrev}
                disabled={currentPage === pages[0] ? true: false}
                >
                    <FaAngleLeft />
                </button> 
            </li>
            {pageDecrements}
        {renderPageNumbers}
        {pageIncrements}
        <li className='paginationNumbers'> 
                <button
                onClick={handleNext}
                disabled={currentPage === pages[pages.length -1] ? true: false}
                >
                    <FaAngleRight />
                </button>
            </li>
        </ul>
    </div>
  )
}

export default Pagination