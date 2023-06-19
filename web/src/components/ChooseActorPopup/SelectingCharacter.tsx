import { useEffect, useState, useRef } from "react";
import config from "../../data/Json/config.json";
import saveCurrentActorToLocalStorage from "./saveCurrentActorToLocalStorage";
import { PopupStages } from "../../data/PopupStages.enum";
import getActorLocalStorageName from "./getActorLocalStorageName";

interface SelectingCharacterProps {
  PopupId: number;
  SetCharacterState: React.Dispatch<React.SetStateAction<string>>;
}

export default function SelectingCharacter({
  PopupId,
  SetCharacterState,
}: SelectingCharacterProps) {
  const { ActorId, Character: InitialCharacter } = JSON.parse(
    localStorage.getItem(getActorLocalStorageName(PopupId)) || "{}"
  );
  const [actorName, setActorName] = useState("Actor name");
  const [Character, setCharacter] = useState(InitialCharacter);
  console.log(`http://${config.server_url}/actorPhoto/${ActorId}`);


  const characterNameForm = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // setActorName(localStorage.getItem(getActorLocalStorageName())?.id);
    console.log(ActorId);
    
    characterNameForm.current?.addEventListener("change", () => {
      saveCurrentActorToLocalStorage(PopupStages.SelectingCharacter, PopupId, {
        ActorId,
        Character: characterNameForm.current?.value,
      });
      SetCharacterState(ActorId);
    });
  });

  return (
    <>
      <div className="actor-image">
        <img alt="Actor" src={`${config.server_url}/actorPhoto/${ActorId}`}/>
      </div>

      <div className="text-forms">
        <div>
          <p className="actor-name">{actorName}</p>
          <input
            placeholder="Enter the character's name"
            value={Character}
            onChange={(event) => setCharacter(event.target.value)}
            className="character-name"
            ref={characterNameForm}
          />
        </div>
      </div>
    </>
  );
}
