import React from "react"
import domtoimage from 'dom-to-image'

export default function Meme() {

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


        function handleChange(event) {
            const {name, value} = event.target
            setMeme(prevMeme => ({
                ...prevMeme,
                [name]: value
            }))
        }

        function getMemeImage() {
            const randomNum = Math.floor(Math.random() * allMemes.length)
            const url = allMemes[randomNum].url
            setMeme(prevMeme => ({
                ...prevMeme,
                randomImage: url
            }))
        }

        function downloadImg() {
            domtoimage.toJpeg(document.getElementById("memeImg"), { quality: 0.95 })
                .then(function (dataUrl) {
                    var link = document.createElement('a')
                    link.download = "meme.jpeg"
                    link.href = dataUrl
                    link.click()
                })
        }
        
    return (
        <main>
            <div className="form">
                <input 
                    className="form--input" 
                    type="text" 
                    placeholder="Top text"
                    name="topText"
                    value={meme.topText}
                    onChange={handleChange}
                />
                <input 
                    className="form--input" 
                    type="text" 
                    placeholder="Bottom text"
                    name="bottomText"
                    value={meme.bottomText}
                    onChange={handleChange}
                />
                <button className="form--button" onClick={getMemeImage}>Get a new meme image 🖼</button>
            </div>
            <div className="meme" id="memeImg">
                <img src={meme.randomImage} id="meme--image"/>
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <div className="downloadBtn">
                <button className="form--button" onClick={downloadImg}><i style={{padding: 5}} class="fa fa-solid fa-download"></i>Download</button>
            </div>
        </main>
    )
}