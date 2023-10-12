import { useEffect, useState } from 'react';
import './style.scss';
import { Title } from 'Pages/Search/TitleItem/Title.interface';
import { Link } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { ApproveListItem } from './ApproveListItem';

export function Approval() {
  const [titles, setTitles] = useState<Array<Title & { page: string, post_date: Date}>>([]);
  

  useEffect(() => {
    
  }, []);

  return <> 
  <div className='body'> 
    <ul className='titles-to-approve'>
      {titles.map(title => <li><ApproveListItem {...{...title, isAccepted: true}}/></li>)}
    </ul>
  </div>
    <Footer />
    <Navbar />
  </>;
}
