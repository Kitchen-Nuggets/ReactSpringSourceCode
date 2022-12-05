import React, { useState } from 'react'
import OrderList from './OrderList'
import headerLogo from '../images/header-img.png'
import menu from '../images/menu.png'
import Form from './Form';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';

function Main() 
{
    const [order, setOrder] = useState();
    const [orders, setOrders] = useState();

    const [discountedBill, setDiscountedBill] = useState([]);

    //Error Message
    const [updateError, setUpdateError] = useState(false);

    function UpdateOrder(id)
    {
        let updateIdLink = `http://localhost:9090/koopeeteariaAPI/api/orderId/${id}`;

        fetch(updateIdLink)
        .then((res) => res.json())
        .then((json) => {
            console.log("Main.js:")
            /* console.log(order) */

            if (updateIdLink !== `http://localhost:9090/koopeeteariaAPI/api/orderId/${id}`)
            {
                setUpdateError(true);
            }

            setTimeout(() => 
            {
                setUpdateError(false);
            }, 4000);

            setOrder(json);
        });
    }

    function ReloadTable()
    {
        let orderListLink = "http://localhost:9090/koopeeteariaAPI/api/orderList";
        fetch(orderListLink)
        .then((res) => res.json())
        .then((json) => {
            setOrders(json);
        })
    }

    function refreshTotalBill()
    {
        fetch("http://localhost:9090/koopeeteariaAPI/api/discountedBill")
        .then((res) => res.json())
        .then((json) => {
            setDiscountedBill(json);
            console.log(json)
        });
    }

    return (
        <div>
            <style>
            {`
            body {
                margin: 0;
                font-family: Arial, Helvetica, sans-serif;
                }
                
                .topnav {
                overflow: hidden;
                background-color: black;
                }

                .topnav img {
                    float: left;
                    height: 60px;
                }

                .blueheader
                {
                    overflow: hidden;
                    background-color: #00008B;
                    height: 40px;
                }

                .blueheader h3 {
                    margin-top: 10px;
                    color: white;
                }

                .foot
                {
                    position: fixed;
                    bottom: 0;
                    width: 100%;
                    height: 35px;  
                    background: black;
                }

                .foot p
                {
                    color: white;
                    margin: 10px;
                    font-size: 10px;
                }

                .menu img {
                    float: left;
                    height: 550px;
                    margin-top: 10px;
                    margin-left: 30px;
                }

                .main {
                    position: absolute;
                    margin-top: 230px;
                    margin-left: 500px;
                    padding-bottom: 80px;
                }

                .main h3 {
                    color: black;
                    padding-bottom: -50px;
                    float: left;
                    margin-bottom: 10px;
                }

                .main p {
                    color: black;
                    padding-bottom: -50px;
                    position: absolute;
                }

                .formdiv {
                    position: absolute;
                    margin-top: 10px;
                    margin-left: 500px;
                }

                .centerErrorUpdate
                {
                    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                @media only screen and (max-width: 550px)
                {
                    .blueheader h3 {
                        margin-top: 10px;
                        margin-left: 5px;
                        margin-right: 5px;
                        color: white;
                        font-size: 10px;
                    }

                    .menu img{
                        display: block;
                        margin-left: 5%;
                        margin-right: 5%;
                    }

                    .main {
                        display: block;
                        margin-left: auto;
                        margin-right: auto;
                        margin-bottom: 50px;
                        width: 50%;
                    }
                }
            `}
            </style>

            <Collapse in={updateError} >
                <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setUpdateError(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ 
                        mb: 2, 
                        width: '100%', 
                        zIndex:1,
                        position: "absolute",
                        marginTop: "100px"
                    }}
                    >
                    Unable to update an order. Something went wrong.
                </Alert>
            </Collapse>

            <header class="topnav">
                <img src={headerLogo} alt='logo'/>
            </header>

            <div class="blueheader">
                <h3>5% DISCOUNT ON ALL ESPRESSO BAR DRINKS!!! BUY NOW!</h3>
            </div>

            <div class="menu">
                <img src={menu} alt="menu"/>
            </div>

            <Form order={order} ReloadTable={ReloadTable} refreshTotalBill={refreshTotalBill} />
            <OrderList orders={orders} UpdateOrder={UpdateOrder} order={order} ReloadTable={ReloadTable} refreshTotalBill={refreshTotalBill}/>

            <footer class="foot">
                <p>All rights reserved 2022 @KoopeeTearia</p>
            </footer>
        </div>
    )
}

export default Main