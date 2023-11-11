import { useState } from 'react'
import React from 'react'

export default function SavedMemesList({meme, deleteFunc, editFunc, edit, setEdit}){
    



    return (
        <>
            <div className="meme">
              <img src={meme.randomImage} className="memeImage" />
              <h2 className="meme--text top">{meme.topText}</h2>
              <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <div>
                <button onClick={deleteFunc}>Delete</button>
                <button onClick={editFunc}>Edit</button>
            </div>
        </>
    )
}

