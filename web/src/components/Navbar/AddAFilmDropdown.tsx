import './style.scss';


//FIXME naming
export default function AddFilmDropdown(): JSX.Element {
  return (<span className="addToDb"><a href="/add">Add</a></span>)
}
/*    <span className="trigger" onClick={() => {
      const dropdownBody = (document.querySelector('div.add-film-dropdown > ul.body') as HTMLDivElement);
      if (dropdownBody.className.match(`showed`)) {
        const classNames = dropdownBody.className.split(' ');

        dropdownBody.className = classNames.slice(0, classNames.indexOf('showed')).join(' ');
        return;
      };
      dropdownBody.className += ' showed';
    }}>Add</span>
*/