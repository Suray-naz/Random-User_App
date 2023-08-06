import { Fragment, useState} from "react";
import "./App.css";
import "./components/Button";
import Button from "./components/Button";
import axios from "axios";


const App =()=> {

const [userData, setUserData]=useState([]);
const [loading, setLoading]=useState(false);
const [activeUser, setActiveUser]=useState(false);
const [activeLink, setActiveLink]=useState(0);

const onClickHandler=()=>{
  setLoading(true);
  axios.get("https://randomuser.me/api/")
  .then((response)=>{
    console.log(response.data.results);
    setUserData(response.data.results);
  }).catch((error)=>{
    console.log(error);
    setLoading(true);
  }).finally(()=>{
    setLoading(false);
    setActiveUser(true);
  })

}

const icons=[
  "fa-solid fa-users fa-3x",
  "fas fa-envelope fa-3x",
  "fas fa-calendar-alt fa-3x",
  "fas fa-map-marker fa-3x",
  "fas fa-phone fa-3x",
  "fas fa-lock fa-3x",
];

const PhraseGenerator=({user})=>{
  const phrases=[
    `Hi, my name is ${user.name.first} ${user.name.last}`,
    `My email adress is: ${user.email}`,
    `I was born on ${user.dob.date.slice(0,10)}`,
    `I'm from ${user.location.country}`,
    `My phone number is: ${user.phone}`,
    `My password is: ${user.login.password}`,
  ];



  return <h1>{phrases[activeLink]}</h1>
}


const activeLinkHandler=(index)=>{
  setActiveLink(index);
}


const style={
  color:"brown",
}



  return (
    <div className="App">
      <h1 className="header">Random User App</h1>
      
      
    {loading ? (<h1>Loading....</h1>) : (<div className="app__user">
      {userData.map((user)=>{
        return (
          <Fragment key={user.cell}>
            <img src={user.picture.large} alt="#"/>
            <PhraseGenerator user={user}/>
            <div className="app__icons">
              {icons.map((icon, index,)=>{
                return(
                  <i className={icon} 
                  key={index} 
                  onMouseEnter={()=> activeLinkHandler(index)}
                  style={style}
                  ></i>
                )
              })}
            </div>
          </Fragment>
        )
      })}
      <Button isActive={activeUser} clicked={onClickHandler}/>

    </div>)}
    <div className="footer">
      
        <a href="https://github.com/Suray-naz/Suray-naz" className="brand"><h1>Suray</h1></a>
        <img className="img-footer" src="https://ass2-react.vercel.app/static/media/design.9f215bcea6123805b94a251910d286f5.svg" alt="" />
      <span>Copyright FC</span>
      
    </div>

      

    </div>
  );
}

export default App;
