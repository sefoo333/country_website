"use client"
import Link from "next/link"
import { createContext, useEffect, useState } from "react"
import { MdDarkMode } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { change } from "../rtk/slices/darkmode"
import { CiLight } from "react-icons/ci";


export default function Navbar() {

    let dark = useSelector((state: any) => state.dark);
    let dispatch = useDispatch()

    useEffect(() => {
        console.log(dark)
  window.onload = function () {
            if (dark === "dark") {
                document.body.style.backgroundColor = "hsl(207, 26%, 17%)";
            } else {
                document.body.style.backgroundColor = "hsl(0, 0%, 98%)";


            }
        }

    }, [dark])


    


    return (
        <nav style={dark === "white" ? { backgroundColor: "white", color: "black", boxShadow: "0px 0px 5px hsl(0, 0%, 52%)" } : { backgroundColor: "hsl(209, 23%, 22%)", color: "white", boxShadow: "0px 0px 5px hsl(209, 23%, 22%)" }}>
            <h1>Where in the World?</h1>
            <div className="dark" onClick={(a: any) => {
                dark == "dark" ? dispatch(change("white")) : dispatch(change("dark"));
                a.target.classList.toggle("ac")
            }}>
                {dark === "dark" ? (<MdDarkMode />) : (<CiLight />)}
                <span>{dark === "dark" ? "dark Mode" : "Light Mode"}</span>
            </div>
        </nav>
    )
}
