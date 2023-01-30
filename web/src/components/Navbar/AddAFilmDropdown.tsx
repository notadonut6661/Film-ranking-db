import './style.scss';


//FIXME 
export default function AddFilmDropdown(): JSX.Element {
  return (<div className="add-film-dropdown">
    <span className="trigger" onClick={() => {
      const dropdownBody = (document.querySelector('div.add-film-dropdown > ul.body') as HTMLDivElement);
      if (dropdownBody.className.match(`showed`)) {
        const classNames = dropdownBody.className.split(' ');

        dropdownBody.className = classNames.slice(0, classNames.indexOf('showed')).join(' ');
        return;
      };
      dropdownBody.className += ' showed';
    }}>Add</span>
    <ul className="body">
      <li>Film</li>
      <li>Series</li>
      <li>Other</li>
    </ul>
  </div>)
}