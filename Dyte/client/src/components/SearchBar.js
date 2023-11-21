import * as React from 'react';
import "../styles/search.css"

export default function DatePickerValue({ fromdate, todate, setFromdate, setTodate }) {
  const handleclick = () => {
    setFromdate(document.getElementById("fromdate").value)
    setTodate(document.getElementById("todate").value)
  }

  return (
    <div>
      <input placeholder="From Date" class="inputdate" name="text" type="text" id="fromdate" />
      <input placeholder="To Date" class="inputdate" name="text" type="text" id="todate" />
      <button class="btni" onClick={handleclick}>
  Watch
</button>


    </div>
  );
}