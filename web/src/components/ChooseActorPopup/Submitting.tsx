import { useEffect, useState } from "react";
import config from "../../data/Json/config.json";

export default function Submitting({
  ActorId,
  Character,
}: {
  ActorId: number;
  Character: string;
}) {

  const [actorName, setActorName] = useState("Actor name");

  useEffect(() => {
    fetch(`${config.server_url}/film/${ActorId}`).then(res => {
      return res.json();
    }).then((res) => {
      setActorName(res?.id);
    })
  });

  
  return (
    <>
      <div className="actor-image">
        <img alt="Actor"></img>
      </div>

      <div className="text-forms">
        <div>
          <p className="actor-name">{actorName}</p>
          <input placeholder="Enter the character's name" value={Character}/>
        </div>
      </div>
    </>
  );
}
