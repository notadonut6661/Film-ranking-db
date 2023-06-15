import { useEffect, useState, useRef } from "react";
import config from "../../data/Json/config.json";
import saveCurrentActorToLocalStorage from "./saveCurrentActorToLocalStorage";
import { PopupStages } from "../../data/PopupStages.enum";
import getActorLocalStorageName from "./getActorLocalStorageName";

export default function SelectingCharacter({ PopupId }: { PopupId: number;  }) {
  const { ActorId, Character: InitialCharacter } = JSON.parse(
    localStorage.getItem(getActorLocalStorageName(PopupId)) || ""
  );
  const [actorName, setActorName] = useState("Actor name");
  const [Character, setCharacter] = useState(InitialCharacter);

  const characterNameForm = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    fetch(`${config.server_url}/film/${ActorId}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setActorName(res?.id);
      });

    characterNameForm.current?.addEventListener("change", () => {
      saveCurrentActorToLocalStorage(PopupStages.SelectingCharacter, PopupId, {
        ActorId,
        Character: characterNameForm.current?.value,
      });
    });
  });

  return (
    <>
      <div className="actor-image">
        <img alt="Actor" />
      </div>

      <div className="text-forms">
        <div>
          <p className="actor-name">{actorName}</p>
          <input
            placeholder="Enter the character's name"
            value={Character}
            onChange={event => setCharacter(event.target.value)}
          
            className="character-name"
            ref={characterNameForm}
          />
        </div>
      </div>
    </>
  );
}
