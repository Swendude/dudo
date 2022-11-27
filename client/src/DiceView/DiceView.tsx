import { PlayerDice } from "../../../types/dudo";
import styled from "styled-components";

const Row = styled.div`
  border: solid 1px #fff;
  display: flex;
  gap: 1rem;
`;

const Dice = styled.div`
  width: 4rem;
  aspect-ratio: 1;
  border: solid 1px #000;
  border-radius: 5px;
  display: grid;
  place-items: center;
  font-size: 1rem;
`;

const DiceView = ({ dice }: { dice: PlayerDice }) => {
  return (
    <Row>
      {dice.map((d) => (
        <Dice>
          <p>{d || "❓"}</p>
        </Dice>
      ))}
    </Row>
  );
};

export default DiceView;
