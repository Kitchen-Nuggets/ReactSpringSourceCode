import React from 'react'
import { Navigate } from 'react-router-dom';
import headerLogo from '../images/header-img.png'

function Error() 
{
    const [goBack, setGoBack] = React.useState(false);

    if (goBack) 
    {
        return <Navigate to="/" />;
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

        <header class="topnav">
            <img src={headerLogo} alt='logo'/>
        </header>

        <div class="blueheader">
            <h3>5% DISCOUNT ON ALL ESPRESSO BAR DRINKS!!! BUY NOW!</h3>
        </div>

        <h2>Unsupported web page URL.</h2>
        <a href="" onClick={() => {setGoBack(true);}}>Click on this link.</a>

        <footer class="foot">
                <p>All rights reserved 2022 @KoopeeTearia</p>
        </footer>
    </div>
    )
}

export default Error