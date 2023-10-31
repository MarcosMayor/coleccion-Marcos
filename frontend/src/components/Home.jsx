import { Typography } from "@mui/material";
import React from "react";
import { useSelector } from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginActions } from "../store/storelogin";
import { Button } from "@mui/material";
import { useEffect } from 'react'



function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector(state => state.login)

    const isLoggedin = userData.isAutenticated
    useEffect(() => {
        if (!isLoggedin) {
            navigate('/')
        }
    }, [isLoggedin, navigate])

    const logout = (e) => {
        dispatch(loginActions.logout())
        navigate('/')
    }

    console.log(userData)
    return <>
        <Typography align='center' variant='h1' color='green'>Entro {userData.userName} con rol {userData.userRol}</Typography>
        <Button onClick={logout}>Salir</Button>
    </>
}
export default Home;