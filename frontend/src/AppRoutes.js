import Home from './pages/home/Home'
import Auth from './pages/auth/Auth'
import Profile from './pages/profile/Profile'
import P from './pages/p/P'
import Chats from './pages/chats/Chats'

const AppRoutes = [
{
  index: true,
  element: <Profile />
},
{
    path: "home",
    element: <Home />
},
{
    path: "auth",
    element: <Auth />
},
{
    path: "profile",
    element: <Profile />
},
{
    path: "p/:username",
    element: <P />
},
{
    path: "Chats",
    element: <Chats />
}

];

export default AppRoutes;