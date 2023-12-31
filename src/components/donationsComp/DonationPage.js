import React from 'react';
import NavBar from '../NavBar.js';
import DropSearch from './DropSearch.js';
import { charityContent } from "../../data/waterCharities.js";
import { DonationCardList } from './DonationCardList.js';
import { useState } from "react";

export default function DonationPage(props) {
  const [focus, setFocus] = useState('');
  const [beneficiaries, setBeneficiaries] = useState('');
  const [minIndex, setMinIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(25);
  let total = 0;

  function scrollToTop() {
    const splashContainer = document.querySelector('.splash');
    splashContainer.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  function getWordCount(str) {
    return str.split(' ')
      .filter(function(n) { return n != '' })
      .length;
  }

  function cardMethod(name, focus, approach, key) {
    return (
      <DonationCardList
        title={name}
        field1={focus}
        field2={approach}
        key={key}
      />
    );
  }

  const cards = charityContent.map(item => {
    let statement = item['Mission Statement'];
    if (getWordCount(statement) > 5) {
      let statementList = statement.split(" ");
      statement = '' + statementList[0] + ' ' + statementList[1] + ' ' + statementList[2] + ' ' + statementList[3] + ' ' + statementList[4] + '...';
    }

    if (focus === '' && beneficiaries === '') { //default
      return cardMethod(item.Name, item.Focus, item.Approach, item.Name);
    } else { //not default
      if (focus !== '' && beneficiaries !== '') { //filter by both
        if (item.Focus === focus && item.Beneficiary === beneficiaries) {
          return cardMethod(item.Name, item.Focus, item.Approach, item.Name);
        }
      } else if (focus === '') { //filter beneficiaries only
        if (item.Beneficiary === beneficiaries) {
          return cardMethod(item.Name, item.Focus, item.Approach, item.Name);
        }
      } else { //filter focuses only
        if (item.Focus === focus) {
          return cardMethod(item.Name, item.Focus, item.Approach, item.Name);
        }
      }
    }
  })

  const updatedCards = cards.filter(function (item) {
      return item !== undefined;
  });
  total = updatedCards.length;
  if (total < maxIndex) {
    setMaxIndex(total);
  }

  function forward() {
    if (!((minIndex+25) > maxIndex)) {
      setMinIndex(maxIndex);
    }
    if ((maxIndex+25) > total) {
      setMaxIndex(total)
    } else {
      setMaxIndex(maxIndex + 25);
    }
    if(maxIndex != total) {
      scrollToTop();
    }
  }

  function backward() {
    if (!((minIndex-25) < 0)) {
      setMaxIndex(minIndex);
      setMinIndex(minIndex-25);
    }
    if(minIndex != 0) {
      scrollToTop();
    }
  }

  return (
    <div className="background-page">
      <NavBar />
      <header className="page-title">
        <h1 className="page-header">Donation Page</h1>
        <p className="page-desc">Find your next donation contribution!</p>
      </header>
      <main>
        <div className="dropdown-title">
            <p>Filter donations!</p>
        </div>
        <div className="donation-dropdown-menus">
          <DropSearch setFocus={setFocus} type='focuses' setMin={setMinIndex} setMax={setMaxIndex} />
          <DropSearch setBeneficiaries={setBeneficiaries} type='beneficiaries' setMin={setMinIndex} setMax={setMaxIndex} />
        </div>
        
        <div className="card-list">
          {updatedCards.slice(minIndex, maxIndex)}
        </div>
        <div className="card-cycle">
          <p className="displaying-cards">Displaying cards {minIndex + 1} to {maxIndex} of {updatedCards.length}</p>
          <button className="btn btn-primary" id="previous-button" onClick={backward}>Previous 25</button>
          <button className="btn btn-primary" id="next-button" onClick={forward} >Next 25</button>
        </div>

      </main>
    </div>
  )
}