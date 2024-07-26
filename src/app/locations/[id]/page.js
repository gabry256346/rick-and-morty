'use client'
import React, { useEffect, useState } from 'react';
import '../../globals.css';
import '../../../../public/rickAndMortyTitleImage.png';

export default function Location({ params: { id } }) {
    const locationsApiUrl = `https://rickandmortyapi.com/api/location`;
    const [resident, setResident] = useState([]);
    const [personaggi, setPersonaggi] = useState([]);
    const [isFirstEffectDone, setIsFirstEffectDone] = useState(false);

    useEffect(() => {
        fetch(locationsApiUrl + "/" + id)
            .then(res => res.json())
            .then(data => {
                setResident(data);
                setIsFirstEffectDone(true);
            })
            .catch(error => console.error("Errore nel recupero dei dati della location:", error));
    }, []);

    useEffect(() => {
        if (isFirstEffectDone) {
            const fetchResidents = async () => {
                const residentsData = await Promise.all(resident.residents.map(el =>
                    fetch(el)
                        .then(res => res.json())
                        .catch(error => console.error("Errore nel recupero dei dati del residente:", error))
                ));
                setPersonaggi(residentsData);
            };
            fetchResidents();
        }
    }, [isFirstEffectDone, resident]);

    return (
        <>
        <div className='divHeaderButtons'>
            <img src='../rickAndMortyTitleImage.png' id='immagineTitolo'/>
            <a className='headerButtons' href='../../'>Home</a>
            <a className='headerButtons' href='../characters'>Characters</a>
            <a className='headerButtons'href='../episodes'>Episodes</a>
            <a className='headerButtons' href='../../locations'>Locations</a>
        </div>
        <div id='locationsInfo'>
            <h1>Residenti di {resident.name}:</h1>
            {personaggi.map(pers => (
                <div key={pers.id} id='singleCharacterInfo'>
                    <p>
                        Name:&nbsp;
                        <a href={`../../characters/${pers.id}`}>
                            {pers.name} <br/>
                        </a>
                        Gender: {pers.gender}
                    </p>
                </div>
            ))}
        </div>
        </>
    );
}
