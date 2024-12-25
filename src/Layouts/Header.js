import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { fetchProductCategories } from '../Services/Apicall';
import '../Styles/Header.scss'
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryType } from '../Slice/Slice';

export default function Header() {
    const [accountMenuAnchorEl, setAccountMenuAnchorEl] = useState(null);
    const [shoppingMenuAnchorEl, setShoppingMenuAnchorEl] = useState(null);
    const [categories, setCategories] = useState([])
    const accountMenuOpen = Boolean(accountMenuAnchorEl);
    const shoppingMenuOpen = Boolean(shoppingMenuAnchorEl);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userData, logoutremove } = useAuth();
    const { categoryType } = useSelector((state) => state.category)

    const handleAccountMenuClick = (event) => {
        setAccountMenuAnchorEl(event.currentTarget);
    };

    const handleAccountMenuClose = () => {
        setAccountMenuAnchorEl(null);
    };

    const handleShoppingMenuClick = (event) => {
        setShoppingMenuAnchorEl(event.currentTarget);
    };

    const handleShoppingMenuClose = () => {
        setShoppingMenuAnchorEl(null);
    };

    const handleLogout = () => {
        logoutremove();
        navigate('/');
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const result = await fetchProductCategories();
                setCategories(result)
                dispatch(setCategoryType(result[0]));
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

        fetchCategories();
    }, [dispatch]);
    const handleclick = (item) => {
        dispatch(setCategoryType(item));
        handleShoppingMenuClose()
    }

    function formatLastLogin(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US');
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, 
        });

        return `${formattedDate} ${formattedTime}`; 
    }

    return (
        <div className='sticky-top bg-light'>
            <div className='d-flex justify-content-between align-items-center px-3'>
                <div>SD ShoppingKart</div>
                <div className='d-flex justify-content-between align-items-center px-3'>
                    <IconButton
                        className='header-hover'
                        onClick={handleShoppingMenuClick}
                        size="small"
                        sx={{
                            ml: 2,
                            transition: 'none',
                            '&:hover': {
                                transform: 'none',
                            }
                        }}
                        aria-controls={shoppingMenuOpen ? 'shopping-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={shoppingMenuOpen ? 'true' : undefined}
                    >
                        Categories
                    </IconButton>

                    <IconButton
                        onClick={handleAccountMenuClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={accountMenuOpen ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={accountMenuOpen ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>
                            {userData?.data?.charAt(0).toUpperCase()}
                        </Avatar>
                    </IconButton>
                </div>
            </div>

            <Menu
                anchorEl={shoppingMenuAnchorEl}
                id="shopping-menu"
                open={shoppingMenuOpen}
                onClose={handleShoppingMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className='px-4'>
                    {
                        categories.map((item, index) => {
                            return <div key={index}
                                onClick={(e) => { handleclick(item) }}
                                className={`my-2 cursor ${categoryType?.name === item?.name ? "selected" : ""}`}>{item?.name}</div>
                        })
                    }
                </div>
            </Menu>

            <Menu
                anchorEl={accountMenuAnchorEl}
                id="account-menu"
                open={accountMenuOpen}
                onClose={handleAccountMenuClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <div className='px-5 '>
                    <div className='d-flex justify-content-center my-4'>
                        <Avatar sx={{ width: 56, height: 56 }}>
                            {userData?.data?.charAt(0).toUpperCase()}
                        </Avatar>
                    </div>
                    <div className='my-2 fs-4 text-center primary' style={{ textTransform: "capitalize" }}>{userData?.data}</div>
                    <div className='my-2  text-center ' style={{ textTransform: "capitalize" }}>Last Login: <span style={{ fontSize: "12px" }}>{formatLastLogin(userData?.date)}</span></div>
                    <div
                        className='my-4 cursor d-flex align-items-center justify-content-start '
                        onClick={handleLogout}
                    >
                        <span className="material-symbols-outlined me-2">logout</span>
                        <span>Logout</span>
                    </div>
                </div>
            </Menu>
            <hr />
        </div>
    );
}
