import { useNavigate } from 'react-router';
import'./Header.scss';

import profile from './profile.png'
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate()

  const whoami = useSelector((state:any) => state.whoami)
  const pikoset = useSelector((state:any) => state.pikoset)  

  return (
      <header className="piko-header">
        <div className='piko-header-options'>
        <div className='piko-header-logo' />
        <div className='piko-header-buttons'>
        <div className='piko-header-button' id='button1'/>
        <div className='piko-header-button' id='button2'/>
        <div className='piko-header-button' id='button3'/>
        <button className='piko-header-button' id='button4' onClick={()=> navigate('/profile')}>
          <img className='userAvatar' src={(whoami.avatar !="")? `${pikoset.cdn}/${whoami.avatar}` : profile}/>

           </button>
        </div>
        </div>
      </header>
  );
}

export default Header;
