import { useNavigate } from 'react-router';
import'./Header.scss';

import profile from './profile.png'
import { useSelector } from 'react-redux';
//<img className='userAvatar' src={(whoami.avatar !="")? `${pikoset.cdn}/${whoami.avatar}` : profile}/>
function Header() {
  const navigate = useNavigate()

  const whoami = useSelector((state:any) => state.whoami)
  const pikoset = useSelector((state:any) => state.pikoset)  
  
  return (
      <div className="piko-menu">
        <div className='piko-options'>

          <button className='piko-option-container' id='button1' onClick={ () => {navigate("/profile")}}>
            <img className='userAvatar' src={(whoami.avatar !="")? `${pikoset.cdn}/${whoami.avatar}` : profile}/>
            <a className='username'>{whoami.nickname ? whoami.nickname : "profile" } </a>
          </button>

        </div>
      </div>
  );
}

export default Header;
