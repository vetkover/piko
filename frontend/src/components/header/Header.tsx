import { useNavigate } from 'react-router';
import'./Header.scss';

import profile from './profile.png'

function Header() {
  const navigate = useNavigate()

  return (
      <header className="piko-header">
        <div className='piko-header-options'>
        <div className='piko-header-logo' />
        <div className='piko-header-buttons'>
        <div className='piko-header-button' id='button1'/>
        <div className='piko-header-button' id='button2'/>
        <div className='piko-header-button' id='button3'/>
        <button className='piko-header-button' id='button4' onClick={()=> navigate('/profile')}>
          <img className='buttonIco' src={profile}/>

           </button>
        </div>
        </div>
      </header>
  );
}

export default Header;
