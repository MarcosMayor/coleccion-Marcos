import { Button, Paper, Grid } from "@mui/material";
import TopBar from "./Topbar";
import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InformeColeccion from "./InformeColeccion";

function Informes(){
    const [botonClicked, setBotonClicked] = useState(false)
    const navigate = useNavigate()
    const [datosBaseDatos,setDatos] = useState([])
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
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        } else {
            handleGetItem()
            console.log(datosBaseDatos)
        }
       
    }, [isLoggedin, navigate])
    

    const handleClick= (e) => {
        setBotonClicked((prev) => !prev);
    }


    return<>
        <TopBar/>
        <Paper style={{marginTop:"10px"}}>
            <Grid container>
                <Grid item xs={4.5} md={4.5} lg={4.5}></Grid>
                <Grid item xs={3} md={3} lg={3}>
                    <Button variant="contained" onClick={handleClick}>Informe Coleccion</Button>
                </Grid> 
            </Grid>
        </Paper>
        {botonClicked? <InformeColeccion datos={datosBaseDatos}/>:null}
    </>


}export default Informes;