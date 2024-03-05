import EditProfile from '../../flow/editProfile/editProfile'
import CreatePost from '../../flow/createPost/createPost'
import WatchImage from '../../flow/watchImage/watchImage'
const FlowRoutes = [
{
    route: "editProfile",
  element: <EditProfile />
}, 
{
  route: "createPost",
  element: <CreatePost />
}, 
{
  route: "watchImage",
  element: <WatchImage />
}

];

export default FlowRoutes;