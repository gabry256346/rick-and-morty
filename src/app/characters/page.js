'use client'
import React, { useEffect, useState } from 'react';
import '../globals.css'; // Adjust the path if necessary
import Character from './[id]/page';
import '../../../public/rickAndMortyTitleImage.png';


export default function Characters() {
    const charactersApiUrl = "https://rickandmortyapi.com/api/character";
    const [charactersData, setCharactersData] = useState([]); // Array to hold the fetched data
    const [searchValue, setSearchValue] = useState("");
    const [filteredData, setFilteredData] = useState([]); // Array to hold the filtered data

    useEffect(() => { 
        // Fetch data once when the component mounts
        fetch(charactersApiUrl)
            .then(res => res.json())
            .then(data => {
                setCharactersData(data.results);
                setFilteredData(data.results); // Initialize filteredData with all characters
            })
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        // Update filteredData whenever searchValue changes
        if (searchValue === "") {
            setFilteredData(charactersData);
        } else {
            const filtered = charactersData.filter(character =>
                character.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredData(filtered); // Update filteredData with filtered characters
        }
    }, [searchValue, charactersData]);
    
  
    return (
        <>
            <div className='divHeaderButtons'>
                <img src='./rickAndMortyTitleImage.png' id='immagineTitolo'/>
                <a className='headerButtons' href='../../'>Home</a>
                <a className='headerButtons' href=''>Characters</a>
                <a className='headerButtons'href='../episodes'>Episodes</a>
                <a className='headerButtons' href='../locations'>Locations</a>
            </div>
            <div id='charactersInfo'>
                <input
                    type="text"
                    placeholder='Cerca Personaggio'
                    id='characterSearch'
                    value={searchValue}
                    onChange={(e) => { setSearchValue(e.target.value) }}
                />
                {filteredData.map(character => 
                    <div id='singleCharacterInfo' key={character.id}>
                        <img src={character.image} className='charactersImage' alt={character.name} />
                        <p id='characterInfo'>
                            Name: {character.name} <br />
                            Status: {character.status} <br />
                            Gender: {character.gender} <br />
                            <a className='characterDetailsLink' href={`characters/${character.id}`}>View more details</a>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
