import { useNavigate } from 'react-router';
import'./Header.scss';
import chatsIco from './chatsIco.svg'
import penIco from './penIco.svg'

import profile from './profile.png'
import { useDispatch, useSelector } from 'react-redux';
//<img className='userAvatar' src={(whoami.avatar !="")? `${pikoset.cdn}/${whoami.avatar}` : profile}/>
function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const whoami = useSelector((state:any) => state.whoami)
  const pikoset = useSelector((state:any) => state.pikoset)  
  
  return (
      <div className="piko-menu">
        <div className='piko-options'>

          <button className='piko-option-container' id='button1' onClick={ () => {navigate("/profile")}}>
            <img className='userAvatar' src={(whoami.avatar !="")? `${pikoset.cdn}/${whoami.avatar}` : profile}/>
            <a className='text'>{whoami.nickname ? whoami.nickname : "profile" } </a>
          </button>

          <button className='piko-option-container' id='button3' onClick={ () => {navigate("/chats")}}>
            <img className='icon' src={chatsIco}/>
            <a className='text'>chats </a>
          </button>

          <button className='piko-option-container' id='button2' onClick={ () => {
            const flowURL = "createPost"; 
            const flowTitle = "create post"; 
            dispatch({type:"CREATE_FLOW", payload: {flowURL,flowTitle}})
          }}>
            <img className='icon' src={penIco}/>
            <a className='text'>create post flow </a>
          </button>

        </div>
      </div>
  );
}

export default Header;
