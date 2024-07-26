'use client'
import React from "react";
import '../../globals.css';
import '../../../../public/rickAndMortyTitleImage.png';

export default function Character({params: {id}}){
    const charactersApiUrl = `https://rickandmortyapi.com/api/character`;
    let [charactersData, setCharactersData] = React.useState([]);
    const [episode, setEpisode] = React.useState([]);
    const [isFirstEffectDone, setIsFirstEffectDone] = React.useState(false);
    const [origin, setOrigin] = React.useState("")
    const [location, setLocation] = React.useState("")
    React.useEffect(function(){
        fetch(charactersApiUrl)
        .then(res => res.json())
        .then(data => setCharactersData(data.results))
    },[])
    React.useEffect(function(){
        fetch(charactersApiUrl + "/" + id)
        .then(res => res.json())
        .then(data => 
            {
                setEpisode(data.episode)
                setIsFirstEffectDone(true);
            })
    },[])
    let character =  charactersData.filter(data => data.id == id);
    React.useEffect(() => {
        if (isFirstEffectDone) {
                character.map(ch=>{
                    fetch(ch.origin.url)
                    .then(res => res.json())
                    .then(data => setOrigin(data.id))
                    .catch(error => console.error("Errore nel recupero dei dati del residente:", error))
                    console.log(origin)
                })
        }
    }, [isFirstEffectDone, episode]);
    character =  charactersData.filter(data => data.id == id);
    React.useEffect(() => {
        if (isFirstEffectDone) {
                character.map(ch=>{
                    fetch(ch.location.url)
                    .then(res => res.json())
                    .then(data => setLocation(data.id))
                    .catch(error => console.error("Errore nel recupero dei dati del residente:", error))
                })
        }
    }, [isFirstEffectDone, episode]);
    character =  charactersData.filter(data => data.id == id);
    React.useEffect(() => {
        if (isFirstEffectDone) {
            character.forEach(ch=>{
                fetch(ch.episode)
                .then(res => res.json())
                .then(data => setEpisode(data.id))
                .catch(error => console.error("Errore nel recupero dei dati del residente:", error))
            })
        }
    }, [isFirstEffectDone, location]);
    React.useEffect(() => {
        if (isFirstEffectDone) {
            const fetchResidents = async () => {
                const residentsData = await Promise.all(character.episode.map(el =>
                    fetch(el)
                        .then(res => res.json())
                        .catch(error => console.error("Errore nel recupero dei dati del residente:", error))
                ));
                setEpisode(residentsData);
            };
            fetchResidents();
        }
    }, [isFirstEffectDone, location]);
    character =  charactersData.filter(data => data.id == id);
    // episode.forEach(epis => console.log(epis));
    console.log(charactersData)
    console.log(character[0])
    console.log(origin)
    console.log(location)
    console.log(episode)
    let o=0;
    return (
        <>
         <div className='divHeaderButtons'>
            <img src='../rickAndMortyTitleImage.png' id='immagineTitolo'/>
            <a className='headerButtons' href='../../'>Home</a>
            <a className='headerButtons' href='../../characters'>Characters</a>
            <a className='headerButtons'href='../episodes'>Episodes</a>
            <a className='headerButtons' href='../locations'>Locations</a>
        </div>
        <div id='charactersInfoId'>
            {character.map(char =>(
                <div id='singleCharacterInfoId'>
                    <img src={char.image} id="imageSingleId"/>
                    <p id='characterInfoId'>
                       Name: {char.name} <br/>
                       Status: {char.status} <br/>
                       Gender: {char.gender} <br/>
                       Species: {char.species} <br/>
                       Origin:<a href={`../../locations/${origin}`}> {char.origin.name} </a><br/>
                       Location: <a href={`../../locations/${location}`}>{char.location.name}</a> <br/>
                       <p id="episodesLinkId">
                        Episodes:
                            {episode.map((epis, index) => {
                                <div key={index}>
                                    <a href={`../../episode/${episode}`} className="characterDetailsLink">"{episode}"</a>
                                </div>
                            })}
                        </p>
                    </p>
                </div>
            ))}
        </div>
        </>
    )
}
