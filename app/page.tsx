"use client"

import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

const regions = [

  "europe",
  "africa",
  "asia",
  "america",
  "oceania"

]

export default function Home() {

  let dark = useSelector((state: any) => state.dark);
  let [religion, setReligion] = useState("all")
  let [reg_on, setReg] = useState(false);
  let [data, setData]: any = useState([]);
  let [mycountry, setCountry] = useState("egypt")

  const ro = async () => {
    let res: any = ""
    if (religion === "all") {
      res = await fetch("https://restcountries.com/v3.1/all");
    } else {
      res = await fetch(`https://restcountries.com/v3.1/region/${religion}`);
    }
    // if (reg && tttt !== "") {
    //   res = await fetch(`https://restcountries.com/v3.1/name/${tttt}`);
    // } else {
    //   res = await fetch("https://restcountries.com/v3.1/all");
    // }


    let data: string | number | boolean[] = await res.json();

    setData(data)
  }
  useEffect(() => {
    ro()
  }, [religion, reg_on, mycountry])
  return (
    <>



      <div className="search_filter max-sm:flex-col" style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 98%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "hsl(207, 26%, 17%)", color: "white" }}>
        <div className="search_comp" style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 100%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "hsl(209, 23%, 22%)", color: "white" }}>
          <FaSearch style={dark === "white" ? { color: "hsl(200, 15%, 8%)" } : { color: "white" }} />
          <input type="text" placeholder="search your religion" style={dark === "white" ? { color: "hsl(200, 15%, 8%)", backgroundColor: "transparent" } : { backgroundColor: "transparent" }} onChange={(a) => {
            if (a.target.value === "") {
              setReg(false)
            } else {
              setReg(true)
              setCountry(a.target.value)
            }
          }} />
        </div>
        <div className="filter_comp max-sm:mt-6" style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 100%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "hsl(209, 23%, 22%)", color: "white" }}>
          <select onChange={(a) => setReligion(a.target.value)} name="test" style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 100%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "hsl(209, 23%, 22%)", color: "white" }}>
            <option value="all">All</option>
            {regions.map((e) => (
              <option value={e}>{e.toUpperCase()}</option>
            ))}
          </select>
        </div>
      </div>


      <div className="countries_comp px-14 grid grid-cols-4 gap-4 max-sm:grid-cols-1" style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 98%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "hsl(207, 26%, 17%)", color: "white" }}>
        {!reg_on ?
          data.filter((e: any) => e.name.common != "Israel").map((e: any) => {
            return (
              <Link href={e.name.common}>
                <div className="comp" style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 100%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "hsl(209, 23%, 22%)", color: "white" }} >
                  <div className="image" >
                    <img src={e.flags.png} className="w-full h-52 object-cover" alt="country error" />
                  </div>
                  <div className="information_country text-white mt-4 p-5" style={dark === "white" ? { color: "hsl(200, 15%, 8%)" } : { color: "white" }}>
                    <h1>{e.name.common}</h1>
                    <div className="other flex flex-col">
                      <span>Poplution: {e.population}</span>
                      <span>Region: {e.region}</span>
                      <span>Capital: {e.capital}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
          :
          data.filter((i: any) => i.name.common.toLowerCase() === mycountry).filter((ai: any) => ai.name.common != "Israel").map((e: any) => {
            return (
              <Link href={e.name.common}>
                <div className="comp" style={dark === "white" ? { backgroundColor: "hsl(0, 0%, 100%)", color: "hsl(200, 15%, 8%)" } : { backgroundColor: "hsl(209, 23%, 22%)", color: "white" }}>
                  <div className="image" >
                    <img src={e.flags.png} className="w-full h-52 object-cover" alt="country error" />
                  </div>
                  <div className="information_country mt-4 p-5" >
                    <h1>{e.name.common}</h1>
                    <div className="other flex flex-col">
                      <span>Poplution: {e.population}</span>
                      <span>Region: {e.region}</span>
                      <span>Capital: {e.capital}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })

        }

      </div>
    </>
  );
}
