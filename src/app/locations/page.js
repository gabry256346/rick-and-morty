'use client'
import React, { useEffect, useState } from 'react';
import '../globals.css'; // Adjust the path if necessary
import Location from './[id]/page';
import '../../../public/rickAndMortyTitleImage.png';

export default function locations() {
    const locationsApiUrl = "https://rickandmortyapi.com/api/location";
    const [locationsData, setlocationsData] = useState([]); // Array to hold the fetched data

    useEffect(() => { 
        // Fetch data once when the component mounts
        fetch(locationsApiUrl)
            .then(res => res.json())
            .then(data => {setlocationsData(data.results);})
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <>
        <div className='divHeaderButtons'>
            <img src='./rickAndMortyTitleImage.png' id='immagineTitolo'/>
            <a className='headerButtons' href='../../'>Home</a>
            <a className='headerButtons' href='../characters'>Characters</a>
            <a className='headerButtons'href='../episodes'>Episodes</a>
            <a className='headerButtons' href=''>Locations</a>
        </div>
        <div id='locationsInfo'>
            {locationsData.map(location => 
            <div id='singlelocationInfo' key={location.id}>
                <li >
                    Name: {location.name} <br/>
                </li>
                <p >
                    - Type: {location.type} <br/>
                    - <a className='locationDetailsLink' href={`locations/${location.id}`}>View more details</a>
                    <hr className='row'/>
                </p>
            </div>
                
            )}
        </div>
        </>
    );
}
