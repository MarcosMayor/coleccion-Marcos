import { Typography, AppBar, Container, Toolbar, Grid, Paper, Box, TextField} from "@mui/material";
import React from "react";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../store/storelogin";
import { Button } from "@mui/material";
import { useEffect, useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb'



function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.login)
    const [item, setItem] = useState({ nombre: '', marca: ''})

    const isLoggedin = userData.isAutenticated
    /*useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])*/

    const logout = (e) => {
        dispatch(loginActions.logout())
        navigate('/')
    } 

    const handleSaveItem = (e) => {

    }

    console.log(userData)
    return <>
        <AppBar position='static'>
            <Container>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={12} md={12} lg={12}>
 {/*AdbIcon es un componente de la librería '@mui/icons-material/Adb' Elige uno diferente*/}
                            <AdbIcon />
                            <Typography>Hola, {userData.userName}</Typography>
                        </Grid>
                        <Grid item xs={3} md={3} lg={3}>
{/*El componente <Link> es de la librería: react-router-dom*/}
                                {/*Sirve para ir a una página.*/}
                                <Link to='/home'>Inicio</Link>
                        </Grid>
                        {/*AÑADIR TANTOS GRID ITEMS COMO SEAN NECESARIOS CON LOS LINKS
                        A LAS PÁGINAS Informes y Ayuda*/}
                        <Grid item xs={7} md={5} lg={5}>
                            <Button variant='contained' onClick={logout}>Salir</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar >

        <Paper>
            <Box component='form' autoComplete='off' onSubmit={handleSaveItem} >
                <Grid container>
                    <Grid item xs={12} md={12}>
                        <TextField
                            label='Nombre'
                            required
                            value={item.nombre}
                            /*Cuando el usuario escriba algo en el TextField nombre, se irá almacenando en el 
                           atributo nombre del objeto item*/
                            onChange={(event) => setItem({ ...item, nombre: event.target.value })}
                        >
                        </TextField>
                    </Grid>
                {/*AÑADIR LOS DEMÁS ELEMENTOS DEL FORMULARIO: los TextField y el Button
                //El Button debe de ser de type='submit' porque es un formulario*/}
                    <Button type='submit'>Aceptar</Button>
                </Grid>
            </Box>
        </Paper>

    </>
}
export default Home;