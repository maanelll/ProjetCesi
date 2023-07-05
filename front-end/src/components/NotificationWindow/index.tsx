import { ArrowBack, ArrowForward, Notifications } from '@mui/icons-material';
import { Box, Divider, IconButton, Popover, Typography } from '@mui/material';
import axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import AuthContext from '../../config/authContext';
import { INotification } from '../../types';
import { Button } from '@mui/base';

const NotificationWindow = () => {

    const { token, loggedUser } = useContext(AuthContext);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [notificationAnchor, setNotificationAnchor] = useState<Element | (() => Element) | null>(null);
    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [notificationsPerPage, setNotificationsPerPage] = useState(3);

    const indexOfLastNotification = currentPage * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);

    const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
    
    useEffect(() => {
  if (loggedUser && loggedUser.id) {
    fetchNotifications();
  }
}, [loggedUser]);

const fetchNotifications = async () => {
    try {
      const response = await axios.get<INotification[]>(`http://localhost:8000/api/notification/user/${loggedUser?.id}`, config);
      setNotifications(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
    const handleNotificationClick = (event: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
        if (event) {
            setNotificationOpen(true);
            setNotificationAnchor(event.currentTarget);
  }
    };

    const handleNotificationClose = () => {
        setNotificationOpen(false);
        setNotificationAnchor(null);
    };
    // Calculate the total number of pages
    const totalPages = Math.ceil(notifications.length / notificationsPerPage);

    // Handle page navigation
    const goToPage = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
};

    return (

        <Box>
        <IconButton
            color="primary"
            sx={{ marginTop: '12px', fontSize: '2rem' }}
            onClick={handleNotificationClick}
        >
            <Notifications />
        </IconButton>
        <Popover
            open={notificationOpen}
            anchorEl={notificationAnchor}
            onClose={handleNotificationClose}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
            }}
            sx={{
            width: 600,
            marginTop: 0,
            marginLeft: 0,
            }}
        >
            <Box sx={{ p: 2 }}>
            {currentNotifications.map((notification,index) => (
                <Box key={notification.id} sx={{ mb: 2 }}>
                <Typography variant="h6">{notification.title}</Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    {notification.message}
                </Typography>
                <Typography variant="body2">
                    date de notification: {notification.notification_date}
                </Typography>
                {index !== notifications.length - 1 && <Divider/>}
                </Box>
            ))}
            </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "1rem"
                }}>
                <IconButton
                    disabled={currentPage === 1}
                    onClick={() => goToPage(currentPage - 1)}
                    sx={{minWidth: "unset"}}
                >
                    <ArrowBack />
                </IconButton>

                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <Button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    color={currentPage === index + 1 ? "primary" : "default"}
                    >
                    {index + 1}
                    </Button>
                ))}

                {/* Next Page Button */}
                <IconButton
                    disabled={currentPage === totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                    sx={{minWidth: "unset"}}
                >
                    <ArrowForward />
                </IconButton>
            </Box>
        </Popover>
        </Box>
    );
};

export default NotificationWindow;