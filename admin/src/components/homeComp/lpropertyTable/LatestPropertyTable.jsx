import React, { useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ListingContext from "../../context/listing/ListingContext";
import "./latestPropertyTable.scss"
function LatestPropertyTable() {
  const { state } = useContext(ListingContext);

  const data = state.listingData.slice().sort();

//   getting only 8 items from the list and displaying them
  let rows = data.slice(-6).reverse();

  return (
    <div className="latestPropertyTable">
      <TableContainer component={Paper} className="list">
        <Table sx={{ minWidth: 650 }} aria-label="simple Table" className="table">
          <TableHead className="tableHeadP">
            {/*
             *
             * row
             *
             *  */}
            <TableRow>
              <TableCell className="tableCell heading">Property Name</TableCell>
              <TableCell className="tableCell heading">Location</TableCell>
              <TableCell className="tableCell heading">Price</TableCell>
              <TableCell className="tableCell heading">Posted on</TableCell>
              <TableCell className="tableCell heading">Property Size</TableCell>
              <TableCell className="tableCell heading">Status</TableCell>
            </TableRow>
          </TableHead>

{/* body section */}

<TableBody>

    {/* mapping through the list */}
    {rows.map((row)=>(
<TableRow
key={row.id}
className='tableRowC'
>

<TableCell className='tableCell'>{row.propertyName}</TableCell>
<TableCell className='tableCell'>
    {row.location}
</TableCell>
<TableCell className='tableCell'>{row.price}</TableCell>
<TableCell className='tableCell'>{row.createdAt}</TableCell>
<TableCell className='tableCell'>{row.propertySize}</TableCell>
<TableCell className='tableCell'>{row.propertyState}</TableCell>
<TableCell className='tableCell'>
    <span className={`status ${row.status}`}>{row.status}</span>
</TableCell>

</TableRow>
))}
</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default LatestPropertyTable;
