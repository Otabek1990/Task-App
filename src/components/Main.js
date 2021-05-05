import React,{useState} from 'react'
import './main.css';
import axios from 'axios';
import TableComponent from './Table';

function Main() {
     var qs = require('qs');

     const [userName, setUserName] = useState('')
     const [password, setPassword] = useState('')
     const [subdomain, setSubdomain] = useState('')
     const [products, setProducts] = useState([])



     //---------------------------------
     const changeUserName=(e)=>{
         e.preventDefault()
         setUserName(e.target.value)

        }
        //-------------------------
     const changePassword=(e)=>{
         e.preventDefault()
         setPassword(e.target.value)
        }
        //------------------
     const changeSubdomen=(e)=>{
         e.preventDefault()
         setSubdomain(e.target.value)
        }


        //-----------------------
        const onSub = () => {
            
            const data = qs.stringify({
            '_username': userName,
            '_password': password,
            '_subdomain': subdomain 
            });
            const config = {
            method: 'post',
            url: 'https://face.ox-sys.com/security/auth_check',
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data : data
            };

            axios(config)
            .then(responce=> {
            const datas=responce.data
             localStorage.setItem("token",datas.token)           
            })
            .catch(function (error) {
            console.log(error);
            });
            
        }
        //---------------------
        const TOKEN=localStorage.getItem("token")
        //------------------------------------

        const getInfos= async(e)=>{
            e.preventDefault()
            const config1 = {
                method: 'get',
                url: 'https://face.ox-sys.com/variations',
                headers: { 
                    'Authorization': `Bearer ${TOKEN}`

                  }
              };
              
              await axios(config1)
              .then(function (res) {
                setProducts(res.data.items)
              })
              .catch(function (error) {
                console.log(error);
              });
              
        }
        //-------------------------------
    return (
        <div className="container">
            <form>
                <div className="inputs">
                <label>Username:</label>
                <input
                value={userName}
                onChange={changeUserName}
                 type="text"/>
                </div>
                
                <div className="inputs">         
                       <label>Password: </label>
                <input 
                 value={password}
                 onChange={changePassword}
                type="text"/>
                </div>
                
                <div className="inputs">
                 <label>Subdomen:</label>
                <input 
                 value={subdomain}
                 onChange={changeSubdomen}
                type="text" />
                </div>

                <button type={"button"} onClick={onSub}>Login</button>
                <button onClick={getInfos} >Get Infos from API</button>
                
            </form>
                  <TableComponent products={products}/>
                  </div>
            
    )
}

export default Main;