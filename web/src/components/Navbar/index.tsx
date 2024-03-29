import { useEffect } from 'react';
import PrivateCabinetLink from './PrivateCabinetLink';
import SearchBar from './searchBar';
import './style.scss';
import { Link } from 'react-router-dom';

export default function Navbar(): JSX.Element {
  useEffect(() => {
    window.addEventListener('scroll', () => {
      (document.querySelector('.navbar-header') as HTMLElement).style.top = `${window.scrollY}px`
  });
  })
  
  return (<nav className="navbar-header">
    <div></div>
    <div className="navbar-links">
      <a href='/films'>Films</a>
      <a href='/series'>Series</a>
    </div>
    <div className="navbar-header-right">
      <span className="addToDb"><Link to="/add">Add</Link></span>
      <SearchBar/>
      <PrivateCabinetLink/>
    </div>
  </nav>)
}
