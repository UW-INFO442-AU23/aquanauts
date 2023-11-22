import React from 'react';
import SearchBar from '../SearchBar.js';
import { CardList } from '../CardList.js';
import NavBar from '../NavBar.js';
import { resourcesContent } from "../../data/filteredWaterResources.js";
import { useRef, useState } from "react";
let temp = 0;

export default function ResourcePage(props) {
  const [searchZip, setSearchZip] = useState('');

  const cards = resourcesContent.map(item => {
    temp = temp + 1;
    if (searchZip.length === 0) { //default
      return (
        <CardList
            title={item.CITY}
            field1={item.LOC_NAME}
            field2={item.ZIPCODE}
            field3={item.BASIN_NAME}
            key={temp}
        />
      )
    } else { //searching a zipcode
      if (searchZip == item.ZIPCODE) {
        return (
          <CardList
              title={item.CITY}
              field1={item.LOC_NAME}
              field2={item.ZIPCODE}
              field3={item.BASIN_NAME}
              key={temp}
          />
        )
      }
    }
  })

  return (
    <div className="background-page">
      <NavBar />
      <header>
        <h1>Resource Page</h1>
      </header>
      <main>
        <SearchBar setZipcode={setSearchZip} />
        {cards}

      </main>
    </div>
  )
}