"use client"
import { IoMdArrowBack } from "react-icons/io";
import Link from "next/link";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

export default function country(props: any) {

    let [data, setData]: any = useState([]);
    let dark = useSelector((state: any) => state.dark)

    let data_country = async () => {
        const res = await fetch(`https://restcountries.com/v3.1/name/${props.params.country}?fullText=true`)
        const data = await res.json();
        setData(data)
    }

    useEffect(() => {
        data_country();
    }, [])


    let keys: any;
    let keys2: any;
    let keys3: any;
    data.forEach((e: any) => {
        [e.name.nativeName].forEach((e: string[]) => {
            keys = Object.keys(e);
        }),
            [e.languages].forEach((e: string[]) => {
                keys3 = Object.keys(e);
            }),
            [e.currencies].forEach((e: string[]) => {
                keys2 = Object.keys(e);
            })
    })

    return (
        <>

            <div className="parent px-14 " style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 98%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "rgb(32, 44, 55)", color: "white" }}>
                <div className="container ">

                    <div className="button pt-5">
                        <Link href="/" >
                            <div className="button_back w-40 p-4 mb-10 rounded-xl cursor-pointer flex items-center" style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 98%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "hsl(209, 23%, 22%)", color: "white" }}>
                                <IoMdArrowBack />
                                <span className="ml-4">Back</span>
                            </div>
                        </Link>
                    </div>
                    <div className="country_information grid grid-cols-2 mt-40 items-center max-sm:grid-cols-1" style={dark === "white" ? { color: "hsl(200, 15%, 8%)" } : { color: "white" }}>
                        {data.map((e: any) => {
                            return (
                                <>
                                    <div className="img w-1/2 max-sm:w-full mb-9">
                                        <img src={e.flags.png} alt="/" />
                                    </div>

                                    <div className="text" >
                                        <h1 className="text-2xl  mb-8">{e.name.common}</h1>
                                        <div className="more grid grid-cols-2 max-sm:grid-cols-1">
                                            <span>Native Name:{e.name.nativeName[keys[0]].common}

                                            </span>
                                            <span>Poplution: {e.population}</span>
                                            <span>Top Level Domain: {e.tld} </span>
                                            <span>Currenices: {e.currencies[keys2[0]].name}</span>
                                            <span>Region: {e.region}</span>
                                            <span className="max-sm:mt-5">Languages: {keys3.map((i: string) => (`${e.languages[i]},`))}</span>
                                            <span>Sub Region: {e.subregion}</span>
                                            <span>Capital: {e.capital}</span>

                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>

            </div >

        </>
    )
}
