import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import { useState, useEffect } from 'react'

export default function Home() {

    const [search, setSearch] = useState("")
    const [foodCat, setFoodCat] = useState([])
    const [foodItem, setFoodItem] = useState([])

    const load_data = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        response = await response.json()
        setFoodItem(response[0])
        setFoodCat(response[1])
    }

    useEffect(() => {
        load_data()
    }, [])

    return (
        <div>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" id='carousel'>
                        <div className='carousel-caption' style={{ zIndex: '2' }}>
                            <div className="d-flex justify-content-center">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://i.pinimg.com/564x/57/86/cd/5786cd0a71a7ad3fa2ae6519c06cad72.jpg" className='d-block w-100' style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.pinimg.com/564x/cf/8c/07/cf8c074271d6209c65ef1fa9344a16db.jpg" className='d-block w-100' style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                        <div className="carousel-item">
                            <img src="https://i.pinimg.com/564x/ee/0c/8e/ee0c8e711dbf6bad9a36caba5a82f8f0.jpg" className='d-block w-100' style={{ filter: "brightness(30%)" }} alt="..." />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                    <hr />
                                    {
                                        foodItem !== []
                                            ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                                                .map(filterItems => {
                                                    return (
                                                        <div key={filterItems._id} className='col-12 col-md-6 col-lg-4'>
                                                            <Card
                                                                food_item={filterItems}
                                                                options={filterItems.options[0]}
                                                            />
                                                        </div>
                                                    )
                                                }) : <div>No data found</div>
                                    }
                                </div>
                            )
                        }) : <div>No data found</div>
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
