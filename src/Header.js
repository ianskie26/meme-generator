import React from "react"

export default function Header() {
    return (
        <nav>
            <div className="header--logo">
                <img className="troll-face" src="./images/troll-face.png" />
                <h1 className="header--title">Meme Generator</h1>
            </div>
            <p className="header--description">React Course - Project 3</p>
        </nav>
    )
}