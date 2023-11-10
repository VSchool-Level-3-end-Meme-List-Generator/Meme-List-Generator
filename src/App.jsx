import { useState } from 'react'
import './App.css'
import React from 'react'

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
const savedMeme = memeArray.map(savedMeme => {
    const {memeUrl, topText, bottomText} = savedMeme
    return (
        <>
            
        </>
    )
})




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
      </div>
</main>
  )
}

export default App
