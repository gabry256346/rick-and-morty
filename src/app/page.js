import './globals.css';
import '../../public/rickAndMortyTitleImage.png';

export default function Home() {

  return (
  <div id='homeDiv'>
    <img src='./rickAndMortyTitleImage.png' id='immagineTitolo'/>
    <div id='divHomeParagraph'>
      <p id='homeParagraph'>Hey, are you also a big fan of Rick and Morty and are you looking for a platform to get more detailed information about your favorite characters, places or episodes? Here you can find this and much more...</p>
    </div>
    <div id='divHomePagesParagraph'>
      <p className='HomePagesParagraph'>Discover all the locations</p>
      <p className='HomePagesParagraph'>Find out more about the characters</p>
      <p className='HomePagesParagraph'>Check out all the episodes</p>
    </div>
    <div id='arrowContainer'>
      <div className='arrow'></div>
      <div className='arrow'></div>
      <div className='arrow'></div>
    </div><br/>
    <div id='homeButtonContainer'>
      <a type='button' className='homeButton' id='locationsButton' href='locations'/>
      <a type='button' className='homeButton' id='charactersButton' href='characters' />
      <a type='button' className='homeButton' id='episodesButton' href='episodes'/>
    </div><br/>
  </div>
  );
}
