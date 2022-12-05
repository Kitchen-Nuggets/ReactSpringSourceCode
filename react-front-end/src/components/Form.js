import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import React, { useEffect, useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
/* import CloseIcon from '@mui/icons-material/Close'; */

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const label = { inputProps: { 'aria-label': 'Checkbox demo' }};

const Form = (props) =>
{
    const [orderItem, setorderItem] = useState('');
    const [orderPrice, setOrderPrice] = useState('');

    const [orderItemR, setOrderItemR] = useState(false);
    const [orderPriceR, setOrderPriceR] = useState(false);

    const [isChecked, setIsChecked] = useState(false);
    const [withDiscount, setWithDiscount] = useState(false);

    //Error Messages
    const [openMessage, setOpenMessage] = useState(false);
    const [openInvalidPrice, setOpenInvalidPrice] = useState(false);
    const [openZeroPrice, setOpenZeroPrice] = useState(false);
    const [webServiceAdd, setWebServiceAdd] = useState(false);

    useEffect(() => 
    {
        console.log("useEffect from Form.js: ");
        if (props.order !== undefined)
        {
            /* setIsUpdating(true); */

            setorderItem(props.order.orderName);
            setOrderPrice(props.order.price);
        }
    }, [props.student])

    useEffect(() => {
        fetch("http://localhost:9090/koopeeteariaAPI/api/discount")
        .then((res) => res.json())
        .then((json) => {
            json = isChecked;
        })
    })

    const addItem = (e) =>
    {
        setorderItem(e.target.value);
    };

    const addPrice = (e) =>
    {
        setOrderPrice(e.target.value);
    };

    const boxChecked = (e) =>
    {
        if(e.target.checked)
        {
            setWithDiscount(true)
        }
        else
        {
            setWithDiscount(false)
        }
    }

    function AddOrder()
    {
        let validPrice = /^\d+(\.\d+)*$/;

        if (orderItem.length !== 0 && orderPrice.length !== 0 && orderPrice.match(validPrice) && orderPrice != 0)
        {
            fetch("http://localhost:9090/koopeeteariaAPI/api/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    orderName:orderItem, 
                    price:orderPrice,
                    discounted: withDiscount
                    })
                }).then(response => {
                    props.ReloadTable();
                    props.refreshTotalBill();
                    setWithDiscount(withDiscount);
                    setorderItem("");
                    setOrderPrice("");
                    setWithDiscount(false);

                    setOpenMessage(true);

                    setTimeout(() => 
                    {
                        setOpenMessage(false);
                    }, 4000);
                }).catch(err => {
                    setWebServiceAdd(true);

                    setTimeout(() => 
                    {
                        setWebServiceAdd(false);
                    }, 5000);
                }) 
        }

        if (orderPrice == 0)
        {
            setOpenZeroPrice(true);

            setTimeout(() => 
            {
                setOpenZeroPrice(false);
            }, 4000);
        }
        else
        {
            setOpenZeroPrice(false);
        }

        if (orderItem.length == 0)
        {
            setOrderItemR(true);
        }
        else
        {
            setOrderItemR(false);
        }

        if (orderPrice.length === 0)
        {
            setOrderPriceR(true);
        }
        else if (!orderPrice.match(validPrice))
        {
            setOrderPriceR(false);
            setOpenInvalidPrice(true);

            setTimeout(() => 
            {
                setOpenInvalidPrice(false);
            }, 4000);
        }
        else
        {
            setOrderPriceR(false);
        }
    }

    function ClearFields()
    {
        setorderItem('');
        setOrderPrice('');

        setOpenMessage(false);
        setOpenInvalidPrice(false);

        setOrderItemR(false);
        setOrderPriceR(false);

        setWebServiceAdd(false);
    }

  return (
    <div>
        <div class="formdiv">
            <form>
            <Collapse in={openMessage}>
                <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenMessage(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', width: '730px'}}
                    >
                    Item Added!
                </Alert>
            </Collapse>

            <Collapse in={openInvalidPrice}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenInvalidPrice(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', width: '730px'}}
                    >
                    Please put a valid price format. You can only put dots and numbers!
                </Alert>
            </Collapse>

            <Collapse in={openZeroPrice}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpenZeroPrice(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', width: '730px'}}
                    >
                    Price cannot be a zero.
                </Alert>
            </Collapse>

            <Collapse in={webServiceAdd}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setWebServiceAdd(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', width: '730px'}}
                    >
                    Unable to add an order. Something went wrong.
                </Alert>
            </Collapse>

                <Container>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <StyledTableCell align="left">Order Item</StyledTableCell>
                                <StyledTableCell align="left">Price</StyledTableCell>
                                <StyledTableCell align="left">On 5% Promo?</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </TableHead>

                            <TableBody>
                                <StyledTableRow>
                                    <StyledTableCell align="left">
                                        {orderItemR
                                        ? <TextField label="Name" variant="filled" required value={orderItem} onChange={addItem} helperText="Please input the name of the drink." error></TextField>
                                        : <TextField label="Name" variant="filled" id="ordName" required value={orderItem} onChange={addItem}></TextField>
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {orderPriceR
                                        ? <TextField label="Price" variant="filled" required value={orderPrice} onChange={addPrice} helperText="Please put a price." error></TextField>
                                        : <TextField label="Price" variant="filled" required id="ordPrice" value={orderPrice} onChange={addPrice}></TextField>
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Checkbox value={isChecked} onChange={boxChecked} id="ordDiscounted" checked={withDiscount}/>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Stack direction="row" spacing={5}>
                                            <Button color="success" variant="contained" id="addOrderBtn" onClick={() => {AddOrder()}}>
                                                PLACE ORDER
                                            </Button>
                                            <Button  variant="contained" onClick={() => {ClearFields()}}>CLEAR</Button>
                                        </Stack>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </form>
        </div>
    </div>
  )
}

export default Form