import AuthProvider from "./auth/AuthProvider";
import AppRouter from "./routers/AppRouter";
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import axios from "axios";

//  Conf socket
const socket = io.connect("https://blog-in-serv.herokuapp.com/api");
function App() {

  const [visitas, setVisitas] = useState(0)


  socket.on("count", data => {
    setVisitas(data.count)
  })
  	const enviarVisitas = async () => {

		const newvisitas = {
			total: visitas,
      totalDia: visitas
		};
		try {
      await axios.put("https://blog-in-serv.herokuapp.com/api/visitas/62adf849f4f9c09381c80068",newvisitas);

		} catch (err) { console.log(err) }
	};
  enviarVisitas();

  return (
    <div>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App;
