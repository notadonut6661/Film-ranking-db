import { useEffect, useState } from "react";
import config from "../../data/Json/config.json";
import getActorLocalStorageName from "../../utils/getActorLocalStorageName";

export default function Submitting({ PopupId }: { PopupId: number }) {
  const { ActorId, Character } = JSON.parse(
    localStorage.getItem(getActorLocalStorageName(PopupId)) || ""
  );
  const [actorName, setActorName] = useState("Actor name");

  useEffect(() => {
    fetch(`${config.server_url}/film/${ActorId}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setActorName(res?.id);
      }).catch(() => {});
  });

  return (
    <>
      <div className="actor-image">
        <img alt="Actor" src={`${config.server_url}/actorPhoto/${ActorId}`} />
      </div>

      <div className="text-forms">
        <div>
          <p className="actor-name">{actorName}</p>
          <p>{Character}</p>
        </div>
      </div>
    </>
  );
}
