import React, { useState } from 'react';
import { exportMovies, importMovie, login } from './helpers/apiHelper'
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { process } from "@progress/kendo-data-query";

function App() {
  const [products, setProducts] = useState([{title: 'Try the search bar above!'}])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [director, setDirector] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const [dataState, setDataState] = useState({
    take: 5,
    skip: 0,
  });
  const [dataResult, setDataResult] = useState(
    process(products, dataState)
  );

  const dataStateChange = (e) => {
    setDataState(e.dataState);
    setDataResult(process(products, e.dataState));
  };

  const updateProducts = async () => {
    await exportMovies().then((response) => {
      setProducts(response.data)
    })
  }

  const loginClick = async (e) => {
    await login(email, password).then(async data => {
       if (data !== '') {
        setLoggedIn(true)
        updateProducts()
       } else {
        console.log(loggedIn)
       }
    })
  }

  const addMovie = async (e) => {
    await importMovie(title, director)
    updateProducts()
  }

  const logoutClick = async (e) => {
    setLoggedIn(false)
    console.log(products)
  }

  return (
    <div>
      {loggedIn ? (
        <div className = {'mainContainer'}>
          <div className = {'gridContainer'}>
            <Grid
              style = {{
                height: "313px",
                width: "500px",
              }}
              data = {dataResult}
              filterable={true}
              pageable={true}
              {...dataState}
              onDataStateChange={dataStateChange}
            >
              <Column field="title" title="Title" width="280px" />
              <Column field="director" title="Director" width="200px" />
            </Grid>
            <div className={'inputContainer'}>
              <input
                  value = {title} 
                  placeholder = "Title"
                  onChange = {(e) => setTitle(e.target.value)}
              />
              <input
                  value = {director} 
                  placeholder = "Director"
                  onChange = {(e) => setDirector(e.target.value)}
              />
              <div className={'buttonContainer'}>
                <input type = "submit" value = "Add Movie" onClick = {addMovie}/>
              </div>
            </div>
          </div>
          <div className={'buttonContainer'}>
              <input type = "button" value = "Logout" onClick = {logoutClick}/>
          </div>
        </div>
      ) : (
        <div className = {'mainContainer'}>
            <div className={'inputContainer'}>
              <input
                value = {email} 
                placeholder = "Email"
                onChange = {(e) => setEmail(e.target.value)}
              />
            </div>
            <br />
            <div className={'inputContainer'}>
              <input
                value = {password}
                type = "password"
                placeholder = "Password"
                onChange = {(e) => setPassword(e.target.value)}
              />
            </div>
            <br />
            <div className={'buttonContainer'}>
              <input type = "button" value = "Login" onClick = {loginClick}/>
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
