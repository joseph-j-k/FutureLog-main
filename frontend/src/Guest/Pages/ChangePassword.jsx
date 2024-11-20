import { Box, Button, Card, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import './UserStyle.css'
import axios from "axios";

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [error, setError] = useState('');

    const Uid = sessionStorage.getItem('uId');

    const fetchPassword = async () => {
        try {
            if (!Uid) {
                setError('User ID not found');
                return;
            }
            const response = await axios.get(`http://localhost:5000/User/${Uid}`);
            const data = response.data.user;
            setCurrentPassword(data.password);
        } catch (error) {
            console.error("Error fetching password:", error);
            setError('Failed to fetch password');
        }
    }

    const updatePassword = async () => {
        try {
            if (!Uid) {
                setError('User ID not found');
                return;
            }
            if (newPassword === rePassword) {
                const response = await axios.put(`http://localhost:5000/updateChangePasswordUser/${Uid}`, {
                    password: newPassword
                });
                console.log("Password updated:", response.data);
                await fetchPassword();
            } else {
                setError('Re-entered password does not match');
            }
        } catch (error) {
            console.error("Error updating password:", error);
            setError('Failed to update password');
        }
    }

    useEffect(() => {
        fetchPassword();
    }, []);

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Card sx={{ p: 5, backgroundColor: 'aliceblue', width: 300, height: 500, mt: 5, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant='h4' textAlign={'center'} sx={{ p: 2 }} className='dancing-script'>Change Password</Typography>
                <Stack>
                    <TextField id="standard-basic" label="Old Password" variant="outlined" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
                </Stack>
                <Stack>
                    <TextField id="standard-basic" label="New Password" variant="outlined" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                </Stack>
                <Stack>
                    <TextField id="standard-basic" label="Re-Enter New Password" variant="outlined" value={rePassword} onChange={(event) => setRePassword(event.target.value)} />
                </Stack>
                {error && <Typography color="error">{error}</Typography>}
                <Stack direction='column' >
                    <Button variant="contained" fullWidth onClick={updatePassword}>Save</Button>
                </Stack>
            </Card>
        </Box>
    );
}

export default ChangePassword;
