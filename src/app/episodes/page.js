'use client'
import React, { useEffect, useState } from 'react';
import '../globals.css'; // Adjust the path if necessary
import Episode from './[id]/page';
import '../../../public/rickAndMortyTitleImage.png';

export default function episodes() {
    const episodesApiUrl = "https://rickandmortyapi.com/api/episode";
    const [episodesData, setepisodesData] = useState([]); // Array to hold the fetched data

    useEffect(() => { 
        // Fetch data once when the component mounts
        fetch(episodesApiUrl)
            .then(res => res.json())
            .then(data => {setepisodesData(data.results);})
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    let numberOfCharacters = 0;
    
    return (
        <>
        <div className='divHeaderButtons'>
            <img src='./rickAndMortyTitleImage.png' id='immagineTitolo'/>
            <a className='headerButtons' href='../../'>Home</a>
            <a className='headerButtons' href='../characters'>Characters</a>
            <a className='headerButtons'href=''>Episodes</a>
            <a className='headerButtons' href='../locations'>Locations</a>
        </div>
        <div id='locationsInfo'>
            {episodesData.map(ep => 
            <div id='singlelocationInfo' key={ep.id}>
                <li >
                    Name: {ep.name} <br/>
                </li>
                <script>
                    {numberOfCharacters = 0}
                    {ep.characters.map(char=>
                        numberOfCharacters += 1
                    )}
                </script>
                
                <p >
                    - N° of episode: {ep.episode} <br/>
                    - Characters in this episode: {numberOfCharacters} <br/>
                    - <a className='episodeDetailsLink' href={`episodes/${ep.id}`}>View more details</a>
                    <hr className='row'/>
                </p>
            </div>
                
            )}
        </div>
        </>
    );
}
