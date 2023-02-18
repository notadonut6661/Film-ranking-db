interface SettingBoxProps {
  id: string;
  label?: string;
  settings: {
    name: string;
    changeFunction?: (params: Record<string, any>) => void;
  }[];
}

export function SettingBox({
  label,
  settings,
  id,
}: SettingBoxProps): JSX.Element {
  return (
    <div className="SettingBox" id={`${id}`}>
      <span className="SettingBoxLabel">{label}</span>
      <div className="SettingBoxBody">{
        settings.map((el) => {
          return <span>{el.name}</span>;
        })
}</div>
    </div>
  );
}
