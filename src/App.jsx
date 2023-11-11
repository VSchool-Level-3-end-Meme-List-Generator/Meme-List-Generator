import { useState } from 'react'
import './App.css'
import React from 'react'
import SavedMemesList from './SavedMemesList'

function App() {
  
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg" 
})

  const [allMemes, setAllMemes] = React.useState([])

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
  }, [])

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
        ...prevMeme,
        randomImage: url
    }))
    }

function handleChange(event) {
    const {name, value} = event.target
    setMeme(prevMeme => ({
        ...prevMeme,
        [name]: value
    }))
}

const [memeArray, setMemeArray] = useState([])

function saveMeme() {
  const memeId = Date.now()
  setMemeArray((prevState) => {
    return (
    [...prevState,
    {...meme, memeId:memeId}
    ])
  })
}



const savedMemesList = memeArray.map((meme) => {
  return (
    <SavedMemesList
      key={meme.memeId}
      meme={meme}
      deleteFunc={() => deleteFunc(meme.memeId)}
      editFunc={() => editFunc(meme.memeId)}
    />
  );
});

 function deleteFunc(memeId) {
    setMemeArray(prevMemes => prevMemes.filter(meme => meme.memeId !== memeId))
 }

 const [edit, setEdit] = React.useState({
  topText: meme.topText,
  bottomText: meme.bottomText,
  randomImage: meme.randomImage,
  memeId: meme.memeId
})

 function editFunc(memeId){
    setMemeArray(prevMemes => prevMemes.map(meme => meme.memeId !== memeId ? meme : edit))
 }



  return (
    <main>
      <h1>Meme List Generator</h1>
      <div className="form">
          <input 
              type="text"
              placeholder="Top text"
              className="formInput"
              name="topText"
              value={meme.topText}
              onChange={handleChange}
          />
          <input 
              type="text"
              placeholder="Bottom text"
              className="formInput"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
          />
          <button 
              className="memeButton"
              onClick={getMemeImage}
          >
              Refresh Meme Image
          </button>
      </div>
      <div className="meme">
          <img src={meme.randomImage} className="memeImage" />
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
          <br></br>
          <button onClick={saveMeme}>Save Meme</button>
      </div>
      {savedMemesList}
</main>
  )
}

export default App
