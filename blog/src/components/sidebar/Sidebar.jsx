/* eslint-disable array-callback-return */
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./sidebar.css";
import axios from "axios";
import { Context } from "../../context/Context";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //Importamos el componente para poder utilizar los iconos
import { faUser, faAt , faClipboardList } from '@fortawesome/free-solid-svg-icons'; //El icono o iconos a utilizar

const Sidebar = () => {
  const [cats, setCats] = useState([]);
  const { user } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const PF = "https://blog-in-serv.herokuapp.com/images/";


  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("https://blog-in-serv.herokuapp.com/api/categories");
      setCats(res.data);
    };
    getCats();
    const fetchPosts = async () => {
      const res = await axios.get("https://blog-in-serv.herokuapp.com/api/posts")
      setPosts(res.data);
    }
    fetchPosts();
  },[])


  let userPosts = []
  if(user){
  posts.map(post => {
    if (post.username === user.username) {
        userPosts.push(post)
    }else{

    }
  });
}

    return (
      <div className="sidebar">
        {user?.username && (
        <div className="sidebarItem">
          <span className="sidebarTitle">Usuario</span>
          <div className="settingsImg">
            <img
              className="fotoSidebar"
              src = {PF+user.profilePic}
              alt=""
            />
            <ul className="list">
              <li className="listItem">
              <p className="p"><FontAwesomeIcon icon={faUser} className="icon"/>{user.username}</p>
              </li>
              <li className="listItem">
              <p className="p"><FontAwesomeIcon icon={faAt} className="icon"/>{user.email}</p>
              </li>
              <li className="listItem">
              <p className="p"><FontAwesomeIcon icon={faClipboardList} className="icon"/>Posts: {userPosts.length}</p>
              </li>
            </ul>
          </div>
        </div>)}
        <div className="sidebarItem">
          <span className="sidebarTitle">Categorias</span>
          <ul className="sidebarList">
            {cats.map((c) =>(
            <li className="sidebarListItem">
              <Link className="link" to={`/?cat=${c.name}`}>
                {c.name}
              </Link>
            </li>
            ))}
          </ul>
        </div>
        <div className="sidebarItem">
          <span className="sidebarTitle">Redes Sociales</span>
          <div className="sidebarSocial">
            <a href="https://es-es.facebook.com/" target="_blank" rel="noreferrer">
              <i className="topIcon fab fa-facebook-square"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              <i className="topIcon fab fa-instagram-square"></i>
            </a>
            <a href="https://www.pinterest.es/" target="_blank" rel="noreferrer">
              <i className="topIcon fab fa-pinterest-square"></i>
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <i className="topIcon fab fa-twitter-square"></i>
            </a>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;
