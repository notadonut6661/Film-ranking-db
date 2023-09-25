import { useEffect } from 'react';
import './style.scss';

export default function Footer(): JSX.Element {
  useEffect(() => {
    console.log(window.outerHeight, 'allakh')
  })
  return (<footer>
    <ul>
      <li><a href='/films'>Films</a></li>
      <li><a href='/series'>Series</a></li>
      <li><a href='/add/film'>Add Film</a></li>
      <li><a href='/add/series'>Add Series</a></li>
    </ul>
    <ul>
      <li><a href='/support'>Get help</a></li>
      <li><a href='/support/admin/become'>Become an admin</a></li>
      <li><a href='/support/bug'>Report bug </a></li>
      <li><a href='/docs/api'>API</a></li>
    </ul>
    <ul></ul>
    <ul></ul>
  </footer>);
}
