import { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

const App = () => {

  const dispatch = useDispatch()
  const pikoSelector = useSelector((state: any)=> state.pikoset)
    useEffect(() =>{
      const fetchData1 = async () => {
        fetch(`${pikoSelector.api}/api/pikoset`)
          .then((response) => response.json())
          .then((data) => {
            dispatch({type:"PIKOSET", payload: data})
          })
          .catch((error) => console.error("error:", error));
      };

      const fetchData2 = async () => {
        fetch(`${pikoSelector.api}/api/user/whoami`, { credentials: 'include'})
          .then((response) => response.json())
          .then((data) => {
            dispatch({type: "WHOAMI", payload: data})
          })
          
          .catch((error) => console.error("error:", error));
    }
    fetchData1();
    Promise.all([fetchData2()])
    }, [])

    return (
            <Routes>
                {AppRoutes.map((route, index) => {
                    const { element, ...rest } = route;
                    return <Route key={index} {...rest} element={element}/>;
                })}
            </Routes>
    );
}

export default App;