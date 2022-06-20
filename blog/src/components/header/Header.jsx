import "./header.css";
import Carousel from 'nuka-carousel';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";



const Header = () => {
  const PF = "https://blog-in-serv.herokuapp.com/images/";

  const [posts,setPosts] = useState([]);
	useEffect(()=>{
		const fetchPost = async () =>{
		  const res = await axios.get("https://blog-in-serv.herokuapp.com/api/posts")
		  setPosts(res.data);
		}
		fetchPost();
	  },[])

    let post = posts.map((post) => post)
     // console.log(post)

  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleLg"> Blog<span className="corche">[</span><span className="inBlog">in</span><span className="corche">].</span> </span>
        <span className="headerTitleSm">Express Yourself</span>
      </div>
      <Carousel wrapAround={true} autoplay >
      {post.map((item) =>  (
          <Link to={`/post/${item._id}`} className="link"> {/*Redirige a la página del post con su id */}
            <img className="headerImg" src={PF + item.photo} />
          </Link>
        ))}
      </Carousel>

    </div>
  );
};

export default Header;
