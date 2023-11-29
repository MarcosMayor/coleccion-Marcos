import { Grid, Paper, Box, TextField, Tooltip } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import TopBar from "./Topbar";
import { TableCell, TableBody, TableRow, TableContainer, Table, TableHead } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useSelector } from 'react-redux'

function Gestion() {
    const [item, setItem] = useState({ nombre: '', login: '', pass: '', rol: '' })

    const navigate = useNavigate()
    const userData = useSelector(state => state.login)

    const [tableData, setTableData] = useState([])
    const isLoggedin = userData.isAutenticated
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        } else {
            handleGetItem()
        }
       
    }, [isLoggedin, navigate])

    const handleSaveItem = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3030/insertUser?nombre=${item.nombre}&login=${item.login}&password=${item.pass}&rol=${item.rol}`)
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
                        handleGetItem()
                    }
                }
            })
        item.nombre=""
        item.login=""
        item.pass=""
        item.rol=""    
    }

    const handleGetItem = () => {
        fetch(`http://localhost:3030/getUsers`)
        .then(response => response.json())
        .then(response => {
            if (response) {
               setTableData(response.data)  
            }
        })
    }

    const handleDeleteUser = (id) => {
        fetch(`http://localhost:3030/deleteUser?id=${id}`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                   setTableData(response.data)  
                }
            })
    }



    return <>
        <TopBar />
        <Paper>
            <Box component='form' autoComplete='off' onSubmit={handleSaveItem}>
                <br />
                <Grid container alignItems={'center'}>
                    <Grid item xs={5} md={5} />
                    <Grid item xs={3} md={3}>
                        <TextField
                            label='Nombre'
                            required
                            value={item.nombre}
                            onChange={(event) => setItem({ ...item, nombre: event.target.value })}
                        />
                    </Grid>
                    <Box width="100%" />
                    <Grid item xs={5} md={5} />
                    <Grid item xs={3} md={3}>
                        <TextField
                            label='Login'
                            required
                            value={item.login}
                            onChange={(event) => setItem({ ...item, login: event.target.value })}
                        />
                    </Grid>
                    <Box width="100%" />
                    <Grid item xs={5} md={5} />
                    <Grid item xs={3} md={3}>
                        <TextField
                            label='Contraseña'
                            required
                            value={item.pass}
                            onChange={(event) => setItem({ ...item, pass: event.target.value })}
                        />
                    </Grid>
                    <Box width="100%" />
                    <Grid item xs={5} md={5} />
                    <Grid item xs={3} md={3}>
                        <TextField
                            label='Rol'
                            required
                            value={item.rol}
                            onChange={(event) => setItem({ ...item, rol: event.target.value })}
                        />
                    </Grid>
                    <Box width="100%" />
                    <Grid item xs={5.4} md={5.4} />
                    <Grid item xs={2} md={2} >
                        <Tooltip title="Insertar usuario" arrow placement="top">
                            <Button size="large" variant='contained' type='submit' >Insertar</Button>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Box>
        </Paper>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Borrar</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Login</TableCell>
                        <TableCell>Password</TableCell>
                        <TableCell>Rol</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.id} >
                            <TableCell>
                                <Tooltip title="Borrar" arrow placement="bottom">
                                    <Button onClick={() => handleDeleteUser(row.id)}>
                                        <DeleteForeverIcon/>
                                    </Button>
                                </Tooltip>   
                            </TableCell>
                            <TableCell>{row.nombre}</TableCell>
                            <TableCell >{row.login}</TableCell>
                            <TableCell >{row.password}</TableCell>
                            <TableCell >{row.rol}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>

}
export default Gestion;