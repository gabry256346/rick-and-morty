'use client'
import React, { useEffect, useState } from 'react';
import '../../globals.css';
import '../../../../public/rickAndMortyTitleImage.png';

export default function Episode({ params: { id } }) {
    const episodesApiUrl = `https://rickandmortyapi.com/api/episode`;
    const [episodes, setEpisodes] = useState([]);
    const [personaggi, setPersonaggi] = useState([]);
    const [isFirstEffectDone, setIsFirstEffectDone] = useState(false);

    useEffect(() => {
        fetch(episodesApiUrl + "/" + id)
            .then(res => res.json())
            .then(data => {
                setEpisodes(data);
                setIsFirstEffectDone(true);
            })
            .catch(error => console.error("Errore nel recupero dei dati della location:", error));
    }, []);

    useEffect(() => {
        if (isFirstEffectDone) {
            const fetchResidents = async () => {
                const residentsData = await Promise.all(episodes.characters.map(el =>
                    fetch(el)
                        .then(res => res.json())
                        .catch(error => console.error("Errore nel recupero dei dati del residente:", error))
                ));
                setPersonaggi(residentsData);
            };
            fetchResidents();
        }
    }, [isFirstEffectDone, episodes]);
    const u = episodes.created;
    let date = '';
    if (u) {
        const index = u.indexOf('T');
        date = u.substring(0, index);
    }
    return (
        <>
        <div className='divHeaderButtons'>
            <img src='../rickAndMortyTitleImage.png' id='immagineTitolo'/>
            <a className='headerButtons' href='../../'>Home</a>
            <a className='headerButtons' href='../characters'>Characters</a>
            <a className='headerButtons'href='../../episodes'>Episodes</a>
            <a className='headerButtons' href='../locations'>Locations</a>
        </div>
        <div id='locationsInfo'>
            <h1>- Personaggi presenti in questa puntata ("{episodes.name}"): </h1>
            {personaggi.map(pers => (
                <div key={pers.id} id='singleCharacterInfo'>
                    <a href={`../../characters/${pers.id}`}>
                        {pers.name}<br />
                    </a>
                </div>
            ))}
            <p>
                - First time on tv: {date}
            </p>
        </div>
        </>
    );
}
