import { Button, Paper, Grid, Tooltip } from "@mui/material";
import TopBar from "./Topbar";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InformeColeccion from "./InformeColeccion";
import InformeUsuarios from "./InformeUsuarios";

function Informes(){
    const [botonClicked, setBotonClicked] = useState(false)
    const [botonClickedU, setBotonClickedU] = useState(false)
    const navigate = useNavigate()
    const [datosBaseDatos,setDatos] = useState([])
    const [datosUsers,setUsers] = useState([])
    const userData = useSelector(state => state.login)

    const isLoggedin = userData.isAutenticated

    const handleGetItem = () => {
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log(response)
                    setDatos(response.data)
                }
            })
    }
    const handleGetUsers = () => {
        fetch(`http://localhost:3030/getUsers`)
        .then(response => response.json())
        .then(response => {
            if (response) {
               setUsers(response.data)  
            }
        })
    }
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        } else {
            handleGetItem()
            handleGetUsers()
            console.log(datosBaseDatos)
        }
       
    }, [isLoggedin, navigate])
    

    const handleClick= (e) => {
        setBotonClicked((prev) => !prev);
    }
    const handleClickUsuarios= (e) => {
        setBotonClickedU((prev) => !prev);
    }
    


    return<>
        <TopBar/>
        <Paper style={{marginTop:"10px"}}>
            <Grid container>
                <Grid item xs={3.5} md={3.5} lg={3.5}/>
                <Grid item xs={3} md={3} lg={3}>
                    <Tooltip title="Mostrar tabla informe" arrow placement="bottom">
                        <Button variant="contained" onClick={handleClick}>Informe Coleccion</Button>
                    </Tooltip>
                </Grid> 
                <Grid item xs={3} md={3} lg={3}>
                    <Tooltip title="Mostrar tabla informe" arrow placement="bottom">
                        <Button variant="contained" onClick={handleClickUsuarios}>Informe Usuarios</Button>
                    </Tooltip>
                </Grid> 
            </Grid>
        </Paper>
        {botonClicked? <InformeColeccion datos={datosBaseDatos}/>:null}
        {botonClickedU? <InformeUsuarios datos={datosUsers}/>:null}
    </>


}export default Informes;