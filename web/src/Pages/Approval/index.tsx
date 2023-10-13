import { useEffect, useState } from 'react';
import './style.scss';
import { Title } from 'Pages/Search/TitleItem/Title.interface';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import { ApproveListItem } from './ApproveListItem';
import { useParams } from 'react-router-dom';

export function Approval() {
  const [titles, setTitles] = useState<Array<Title & { page: string, post_date: Date}>>([]);
  const { adminId } = useParams();
  
  useEffect(() => {
    fetch('').then(res => res.json()).then(json => setTitles(json));
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
