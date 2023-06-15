export default function Submitting({
  ActorId,
  Character,
}: {
  ActorId: number;
  Character: string;
}) {
  return (
    <>
      <div className="actor-image">
        <img alt="Actor"></img>
      </div>

      <div className="text-forms">
        <div>
          <p className="actor-name">{ActorId}</p>
          <input placeholder="Enter the character's name" value={Character}/>
        </div>
      </div>
    </>
  );
}
