export default function SelectingCharacter({ActorId}: {ActorId: number, Character?: string}) {
  return <>
    <div className="actor-image">
      <img alt="Actor" ></img>
    </div>
   
    <div className="text-forms">
      <span className="actor-name">ff</span>
      <br/>
      <input placeholder="Enter the character's name"/>
    </div>
  </>;
}
