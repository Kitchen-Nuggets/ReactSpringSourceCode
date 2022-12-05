import { Container, formControlLabelClasses } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Paper } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';

import Form from './Form';

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

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const OrderList = (props) =>
{
    const [orders, setOrders] = useState([]);

    const [regularBill, setRegularBill] = useState();
    const [discountedBill, setDiscountedBill] = useState();

    const [cafeClerk, setCafeClerk] = useState([]);

    const [isUpdating, setIsUpdating] = useState(false);

    const [updatingOrder, setUpdatingOrder] = useState('');
    const [updatingPrice, setUpdatingPrice] = useState('');
    const [updatingDiscount, setUpdatingDiscount] = useState(true);
    
    const [id, getId] = useState('');

    const [orderItemR, setOrderItemR] = useState(false);
    const [orderPriceR, setOrderPriceR] = useState(false);

    //Error Messages
    const [openInvalidPrice, setOpenInvalidPrice] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [deleteSuccess, setDeleteSuccess] = useState(false);

    const [deleteError, setDeleteError] = useState(false);
    const [webService, setWebService] = useState(false);

    useEffect(() => {
        fetch("http://localhost:9090/koopeeteariaAPI/api/orderList")
        .then((res) => res.json())
        .then((json) => {
            setOrders(json);
            console.log("JSON: " + json);
        }).catch(err => {
            setWebService(true)
        })
    }, [])

    useEffect(() => {
        fetch("http://localhost:9090/koopeeteariaAPI/api/regularBill")
        .then((res) => res.json())
        .then((json) => {
            setRegularBill(json);
            console.log("REGULAR") 
        });
    })

    useEffect(() => {
        fetch("http://localhost:9090/koopeeteariaAPI/api/discountedBill")
        .then((res) => res.json())
        .then((json) => {
            setDiscountedBill(json);
            console.log("DISCOUNTED")
        });
    })

    useEffect(() => {
        fetch("http://localhost:9090/koopeeteariaAPI/api/clerk")
        .then((res) => res.json())
        .then((json) => {
            setCafeClerk(json);
            console.log(json);
        });
    }, [])

    useEffect(() => 
    {
      //Reloads Table
      if (props.orders !== undefined)
      {
        setOrders(props.orders);
      }
    }, [props.orders])

    useEffect(() => {
        if (props.order !== undefined)
        {
            setUpdatingOrder(props.order.orderName);
            setUpdatingPrice(props.order.price);
            setUpdatingDiscount(props.order.discounted);
        }
    }, [props.order])

    function updateOrder()
    {
        setIsUpdating(true);
    }

    function cancelUpdate()
    {
        setIsUpdating(false);
    }

    function DeleteOrder(id)
    {
        fetch(`http://localhost:9090/koopeeteariaAPI/api/delete/${id}`, {                                                                             
        method: 'DELETE',
        })
        .then(res => {

            setDeleteSuccess(true);

            props.ReloadTable();

            setTimeout(() => 
                {
                    setDeleteSuccess(false);
                }, 4000);

            /* fetch("http://localhost:9090/koopeeteariaAPI/api/orderList")
            .then((res) => res.json())
            .then((json) => {
                setOrders(json);

                setTimeout(() => 
                {
                    setDeleteSuccess(false);
                }, 4000);
            }); */
        }).catch(err => {
            setDeleteError(true);

            setTimeout(() => 
            {
                setDeleteError(false);
            }, 4000);
        }) 
    }

    function ConfirmUpdate()
    {
        let validPrice = /^\d+(\.\d+)*$/;
        
        if (updatingOrder.length !== 0 && updatingPrice.length !== 0)
        {
            let updateLink = "http://localhost:9090/koopeeteariaAPI/api/update";

            fetch(updateLink, 
            {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: props.order.id,
                orderName:updatingOrder, 
                price:updatingPrice,
                discounted: updatingDiscount
                })
            }).then(response => {
                
                props.ReloadTable();
                props.refreshTotalBill();

                setUpdatingDiscount(updatingDiscount)
                getId(id);
                setUpdatingOrder("");
                setUpdatingPrice("");
                setIsUpdating(false);
                setUpdateSuccess(true);

                setTimeout(() => 
                {
                    setUpdateSuccess(false);
                }, 4000);

                /* if (!updatingPrice.match(validPrice))
                {
                    setUpdatingOrder("");
                    setUpdatingPrice("");
                    setIsUpdating(false);
                    setUpdateSuccess(false);
                    setOpenInvalidPrice(true);

                    setTimeout(() => 
                    {
                        setOpenInvalidPrice(false);
                    }, 4000);
                } */
            })
        }

        if (updatingOrder.length == 0)
        {
            setOrderItemR(true);
        }
        else
        {
            setOrderItemR(false);
        }

        if (updatingPrice.length === 0)
        {
            setOrderPriceR(true);
        }
        else
        {
            setOrderPriceR(false);
        }
    }

    const updateItemName = (e) =>
    {
        setUpdatingOrder(e.target.value);
    }

    const updateItemPrice = (e) =>
    {
        setUpdatingPrice(e.target.value);
    }

    return (
    <div>
        <div class="main">
            <Collapse in={updateSuccess}>
                <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setUpdateSuccess(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', width: '730px', marginTop:'-220px'}}
                    >
                    Item Successfully Updated!
                </Alert>
            </Collapse>

            <Collapse in={deleteSuccess}>
                <Alert
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setDeleteSuccess(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', width: '730px', marginTop:'-230px'}}
                    >
                    Item Successfully Deleted!
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
                    sx={{ mb: 2, position: 'absolute', width: '730px', marginTop:'-220px'}}
                    >
                    Please put a valid price format. You can only put dots and numbers!
                </Alert>
            </Collapse>

            <Collapse in={deleteError}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setDeleteError(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', width: '730px', marginTop:'-230px'}}
                    >
                    Unable to delete an order. Something went wrong.
                </Alert>
            </Collapse>

            <Collapse in={webService}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setWebService(false);
                        }}
                        >
                        <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2, position: 'absolute', width: '730px', marginTop:'-230px'}}
                    >
                    Cannot load details. Something went wrong.
                </Alert>
            </Collapse>

            <Container>
                <h3>Attending Clerk: {cafeClerk.name}</h3>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left">Order Item</StyledTableCell>
                                <StyledTableCell align="left">Price</StyledTableCell>
                                <StyledTableCell align="left">On 5% Promo?</StyledTableCell>
                                <StyledTableCell align="left">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {orders.map((order) => (
                                <StyledTableRow key={order.id}>
                                    <StyledTableCell align="left">{order.orderName}</StyledTableCell>
                                    <StyledTableCell align="left">{order.price}</StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Checkbox {...label} checked={order.discounted}/>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Stack direction="row" spacing={5}>
                                            <Button variant="contained" id="editOrd" onClick={() => {updateOrder(); props.UpdateOrder(order.id)}}>EDIT</Button>
                                            <Button color="error" variant="contained" id="deleteOrd" onClick={() => {DeleteOrder(order.id)}}>DELETE</Button>
                                        </Stack>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}

                            {isUpdating
                            ? 
                            <>
                                <StyledTableRow>
                                    <StyledTableCell align="left">
                                        {orderItemR
                                        ?
                                        <TextField label="Name" variant="filled" required value={updatingOrder} onChange={updateItemName} helperText="Please input the name of the drink." error/>
                                        :
                                        <TextField label="Name" variant="filled" id="updName" required value={updatingOrder} onChange={updateItemName}/>
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        {orderPriceR
                                        ?
                                        <TextField label="Price" variant="filled" required value={updatingPrice} onChange={updateItemPrice} helperText="Please put a price." error/>
                                        :
                                        <TextField label="Price" variant="filled" id="updPrice" required value={updatingPrice} onChange={updateItemPrice}/>
                                        }
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Checkbox {...label} checked={updatingDiscount} id="updDiscount" onChange={() => setUpdatingDiscount(!updatingDiscount)}/>
                                    </StyledTableCell>
                                    <StyledTableCell align="left">
                                        <Stack direction="row" spacing={5}>
                                            <Button color="success" variant="contained" id="updOrd" onClick={() => {ConfirmUpdate()}}>CONFIRM</Button>
                                            <Button color="error" variant="contained" onClick={() => {cancelUpdate()}}>CANCEL</Button>
                                        </Stack>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </>
                            : 
                            <div></div>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

                <p>Total Regular Bill: {regularBill}</p><br/>
                <p>Total Discounted Bill: {discountedBill}</p>
            </Container>
        </div>
    </div>
    )
}

export default OrderList