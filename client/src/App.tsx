import styled, { createGlobalStyle } from "styled-components";
// import { DudoGame } from "../../types/dudo";
import Game from "./Game";
import axios from "axios";
import { useState } from "react";
const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}
* {
  margin: 0;
}
html, body {
  height: 100%;
  
}
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-family: monospace;
}
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
input, button, textarea, select {
  font: inherit;
}
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
#root, #__next {
  isolation: isolate;
}

`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  const [gameCode, setGameCode] = useState<string | null>(null);
  const [gameCodeInp, setGameCodeInp] = useState<string>("");
  const requestGame = async () => {
    const idResponse = await axios.get("http://localhost:4000/game");
    setGameCode(idResponse.data.id);
  };

  return (
    <Base>
      <GlobalStyle />

      <h1>Dudo</h1>
      {!gameCode && (
        <>
          <button onClick={() => requestGame()}>Start new game</button>
          <div>
            <input
              value={gameCodeInp}
              onChange={(e) => setGameCodeInp(e.target.value)}
            />
            <button onClick={() => setGameCode(gameCodeInp)}>Join game</button>
          </div>
        </>
      )}
      {gameCode && <Game id={gameCode} />}
    </Base>
  );
}

export default App;
