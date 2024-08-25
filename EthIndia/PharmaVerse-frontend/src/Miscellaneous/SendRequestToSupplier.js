import React, { useState, useEffect } from 'react'
import { useContext } from "react";
import { ContractContext } from "../Context/ContractContext";
import { AuthContext } from "../Context/AuthContext";
import CONSTANTS from '../Utils/Constants';


const SendRequestToSupplier = ({ }) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [quantityInputs, setQuantityInputs] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const { Services, rawMaterials } = useContext(ContractContext);
  const { account } = useContext(AuthContext);


  // useEffect(() => {
  //   //get medicine data from blockchain
  //   async function getMedicineData() {
  //     try{
  //       const response = await Services.get_all_rawMaterials();
  //       console.log(response);
  //       setmeds(response.data);
  //     }
  //     catch(error){
  //       console.log(error);
  //     }
  //   }
  //   getMedicineData();
  // }, []);

  const handleRowSelect = (name) => {
    if (selectedRows.includes(name)) {
      setSelectedRows(selectedRows.filter(row => row !== name));
      setQuantityInputs({ ...quantityInputs, [name]: undefined });
    } else {
      setSelectedRows([...selectedRows, name]);
      setQuantityInputs({ ...quantityInputs, [name]: 1 }); // Initialize quantity to 1
    }
  };

  const handleQuantityChange = (name, value) => {
    setQuantityInputs({ ...quantityInputs, [name]: value });
  };

  const handleCreateButtonClick = async () => {
    // Check if entered quantity exceeds given quantity
    // const selectedData = meds.filter(item => selectedRows.includes(item.name));

    const selectedData = rawMaterials.filter(item => selectedRows.includes(item.name));
    // console.log("Selected data iisssssssssssssssss:", JSON.stringify(selectedData));


    const selectedMedicineDetails = selectedData.map(item => {
      const enteredQuantity = quantityInputs[item.name] || 0;
      return {
        name: item.name,
        medpic: item.ipfs_hash,
        meddesc: item.description,
        quantity: enteredQuantity,
        materialId: item.materialId,
      };
    });

    console.log("Selected data issssssssssss:", JSON.stringify(selectedMedicineDetails));
    const matids = selectedMedicineDetails.map(item => item.materialId);
    const quantities = selectedMedicineDetails.map(item => item.quantity);


    const response = await Services.request_raw_material_package(matids, quantities, "desc hardcoded",
      "transporterid",
      "supplierid",
      "inspectorid");

    if (response.status) {
      alert("req sent")
    } else {
      alert("req failed")
    }

  };

  return (
    <div>
      <div class="searchBox">

        <input class="searchInput" type="text" name="" placeholder="Search something"
          value={searchValue} // Bind the value to the searchValue state
          onChange={(e) => setSearchValue(e.target.value)} />
        <button class="searchButton" href="#">



          <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
            <g clip-path="url(#clip0_2_17)">
              <g filter="url(#filter0_d_2_17)">
                <path d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" shape-rendering="crispEdges"></path>
              </g>
            </g>
            <defs>
              <filter id="filter0_d_2_17" x="-0.418549" y="3.70435" width="29.7139" height="29.7139" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"></feColorMatrix>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2_17"></feBlend>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2_17" result="shape"></feBlend>
              </filter>
              <clipPath id="clip0_2_17">
                <rect width="28.0702" height="28.0702" fill="white" transform="translate(0.403503 0.526367)"></rect>
              </clipPath>
            </defs>
          </svg>


        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Raw Material Name</th>
            <th>Raw Material Picture</th>
            <th>Raw Material Description</th>

            <th>Enter Quantity</th>
          </tr>
        </thead>
        <tbody>
          {/* {meds.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())) */}
          {rawMaterials.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase())).map(item => (
            <tr key={item.name}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(item.name)}
                  onChange={() => handleRowSelect(item.name)}
                />
              </td>
              <td>{item.name}</td>
              <td><img src={`${CONSTANTS.IPFSURL}/${item.ipfs_hash}`} height={100} width={100} /></td>
              <td>{item.description}</td>
              <td>
                <input
                  type="number"
                  value={quantityInputs[item.name] || ''}
                  onChange={(e) => handleQuantityChange(item.name, parseInt(e.target.value))}
                  disabled={!selectedRows.includes(item.name)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='button-container'>
        <button className='button0' onClick={handleCreateButtonClick}><p>Send Request</p></button>
      </div>
    </div>
  );
}

export default SendRequestToSupplier
