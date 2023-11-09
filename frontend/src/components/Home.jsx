import { Typography, AppBar, Container, Toolbar, Grid, Paper, Box, TextField } from "@mui/material";
import React from "react";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginActions } from "../store/storelogin";
import { Button } from "@mui/material";
import { useEffect, useState } from 'react'
import AdbIcon from '@mui/icons-material/Adb'
import { TableCell, TableBody, TableRow, TableContainer, Table, TableHead } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.login)
    const [tableData, setTableData] = useState([])
    const [item, setItem] = useState({ nombre: '', marca: '', tipo: '', precio: '' })

    const isLoggedin = userData.isAutenticated
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        } else {
            handleGetItem()
        }
       
    }, [isLoggedin, navigate])

    const logout = (e) => {
        e.preventDefault()
        dispatch(loginActions.logout())
        navigate('/')
    }

    const handleSaveItem = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    /*
                    se puede hacer con if response.data.nombre == undefinded
                    */
                    if (response < 0) {
                        alert('Error al guardar datos')
                    } else {
                        alert('Datos guardados con éxito')
                    }

                }
            })
    }
    const handleGetItem = (e) => {
        
        fetch(`http://localhost:3030/getItems`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    if (Object.keys(response.data).length === 0) {
                        alert('Error al buscar datos')
                    } else {
                        setTableData(response.data)  
                    }

                }
            })
    }

    const handleDeleteItem = (id) => {
        fetch(`http://localhost:3030/deleteItem?id=${id}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    if (response < 0) {
                        alert('Error al borrar datos')
                    } else {
                        alert('Datos borrados exitosos')
                    }

                }
            })
    }

    console.log(userData)
    return <>
        <AppBar position='static'>
            <Container>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={2} md={2} lg={2}>
                            {/*AdbIcon es un componente de la librería '@mui/icons-material/Adb' Elige uno diferente*/}
                            <AdbIcon />
                            <Typography sx={{ display: 'inline' }}>Hola, {userData.userName}</Typography>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            {/*El componente <Link> es de la librería: react-router-dom*/}
                            {/*Sirve para ir a una página.*/}
                            <Link to='/home'>Inicio</Link>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <Link to=''>Informe</Link>
                        </Grid>
                        <Grid item xs={1} md={1} lg={1}>
                            <Link to=''>Ayuda</Link>
                        </Grid>
                        <Grid item xs={9} md={9} lg={9} />
                        <Grid item xs={1} md={1} lg={1}>
                            <Button variant='contained' onClick={logout}>Salir</Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </Container>
        </AppBar >

        <Paper>
            <Box component='form' autoComplete='off' onSubmit={handleSaveItem}>
                <br />
                <Grid container alignItems={'center'}>
                    <Grid item xs={2} md={2} />
                    <Grid item xs={3} md={3}>
                        <TextField
                            label='Nombre'
                            required
                            value={item.nombre}
                            /*Cuando el usuario escriba algo en el TextField nombre, se irá almacenando en el 
                           atributo nombre del objeto item*/
                            onChange={(event) => setItem({ ...item, nombre: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={2} md={2} />
                    <Grid item xs={3} md={3}>
                        <TextField
                            label='Marca'
                            required
                            value={item.marca}
                            /*Cuando el usuario escriba algo en el TextField nombre, se irá almacenando en el 
                           atributo nombre del objeto item*/
                            onChange={(event) => setItem({ ...item, marca: event.target.value })}
                        />
                    </Grid>
                    <Box width="100%" />
                    <br></br>
                    <Grid item xs={2} md={2} />
                    <Grid item xs={3} md={3}>
                        <TextField
                            label='Tipo'
                            required
                            value={item.tipo}
                            /*Cuando el usuario escriba algo en el TextField nombre, se irá almacenando en el 
                           atributo nombre del objeto item*/
                            onChange={(event) => setItem({ ...item, tipo: event.target.value })}
                        />
                    </Grid>
                    <Grid item xs={2} md={2} />
                    <Grid item xs={3} md={3}>
                        <TextField
                            label='Precio'
                            required
                            value={item.precio}
                            /*Cuando el usuario escriba algo en el TextField nombre, se irá almacenando en el 
                           atributo nombre del objeto item*/
                            onChange={(event) => setItem({ ...item, precio: event.target.value })}
                        />
                    </Grid>
                    <Box width="100%" />
                    <br />
                    {/*AÑADIR LOS DEMÁS ELEMENTOS DEL FORMULARIO: los TextField y el Button
                //El Button debe de ser de type='submit' porque es un formulario*/}
                    <Grid item xs={4} md={4} />
                    <Grid item xs={2} md={2} >
                        <Button size="large" variant='outlined' type='submit' >Insertar</Button>
                    </Grid>
                    <Grid item xs={1} md={1} />
                    <Grid item xs={2} md={2} >
                        <Button size="large" variant='outlined' onClick={handleGetItem} >Buscar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>

        <TableContainer>
            <Table aria-label='tabla cosas'>
                <TableHead>
                    <TableRow>
                        <TableCell>Borracion</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Marca</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Precio</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id} >
                            <TableCell>
                                <Button onClick={() => handleDeleteItem(row.id)}>
                                    <DeleteForeverIcon/>
                                </Button>
                            </TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell >{row.marca}</TableCell>
                            <TableCell >{row.tipo}</TableCell>
                            <TableCell >{row.precio}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
}
export default Home;