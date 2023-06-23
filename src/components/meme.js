import React from "react";
// import memesData from "./memesData";

function Meme(){

    // const [memeImage, setMemeImage] = React.useState("https://i.imgflip.com/3lmzyx.jpg")

    const [meme,setMeme] = React.useState({
        topText:"",
        bottomText:"",
        meme:"https://i.imgflip.com/3lmzyx.jpg"
    })

    const [allMemeImages,setAllMemeImages] = React.useState([])

    React.useEffect(()=>{
        async function meme2(){
            const res = await fetch("https://api.imgflip.com/get_memes")
            const data = await res.json()
            setAllMemeImages(data.data.memes)
        }
        meme2()
    },[])

    


    function getMemeImage(){
        const randomNum = Math.floor(Math.random()*allMemeImages.length)
        const url =allMemeImages[randomNum].url
        setMeme(prevMeme => ({
            ...prevMeme,
            meme: url
        }))
    }

    function handleChange(e){
         const {name , value} = e.target
        setMeme(prev =>({
            ...prev,
            [name] : value
        }))         
    }

    return(
        <main>
            <div className="form" >
                <input type="text" placeholder="Top Text" onChange={handleChange} name="topText" value={meme.topText}/>
                <input type="text" placeholder="Bottom Text" onChange={handleChange} name="bottomText" value={meme.bottomText}/>
                <button onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme">
                <img src={meme.meme} alt="memeImg" className="memeImg"></img>
                <h2 className="meme--text topText" id="topText">{meme.topText.toUpperCase()}</h2>
                <h2 className="meme--text bottomText" id="bottomText">{meme.bottomText.toUpperCase()}</h2>
            </div>
        </main>
    )
}

export default Meme