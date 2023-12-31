import React, { useState } from 'react';
const focuses = ['Wastewater', 'Water Quality', 'Water Access', 'Affordability', 'Infrastructure', 'Law & Policy', 'Technology Adv', 'Hygiene', 'Public Health'];
const beneficiaries = ['Households', 'Implementing Organizations', 'Impacted Communities', 'Local & State Government', 'Unhoused Communities', 'Environment', 'Utilities', 'Schools', 'General Public', 'Federal Government', ''];

export default function DropSearch(props) {
  const [selectedValue, setSelectedValue] = useState('');
  
  let filterMessage = '';
  if (props.type === "focuses") {
    filterMessage = 'Filter by Focus';
  } else {
    filterMessage = 'Filter by Beneficiary';
  }

  function update(event) {
    props.setMin(0);
    props.setMax(25);
    if (props.type === "focuses") {
      props.setFocus(event.target.textContent);
    } else {
      props.setBeneficiaries(event.target.textContent);
    }

    setSelectedValue(event.target.textContent);
  }

  let options = [];
  if (props.type === 'focuses') {
    options = focuses.map(item => {
      return (
        <li key={item}><button className="dropdown-item" onClick={update} >{item}</button></li>
      );
    })
  } else {
    options = beneficiaries.map(item => {
      return (
        <li key={item}><button className="dropdown-item" onClick={update} >{item}</button></li>
      );
    })
  }

  const handleClear = (event) => {
    setSelectedValue('');
    props.setMin(0);
    props.setMax(25);

    if (props.type === "focuses") {
      props.setFocus('');
    } else {
      props.setBeneficiaries('');
    }
  }


  return (
    <div className="donation-dropdowns">
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
          {selectedValue || filterMessage}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {options}
        </ul>
      </div>
      <div className="dropdown-clear">
        <div className="btn btn-primary" id="clear-drowndown" onClick={handleClear}>Clear</div>
      </div>
    </div>

  )
}