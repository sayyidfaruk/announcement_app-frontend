import React, { useState } from "react";
import { TextField, IconButton, InputAdornment, Box } from "@mui/material";
import { VisibilityOutlined, VisibilityOffOutlined, Replay } from '@mui/icons-material';

function PasswordField({ password, setPassword, isEditing = false, isAdd = false, handleSetDefaultPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="dense"
                size='small'
                placeholder="Masukkan Password"
                value={password}
                onChange={isAdd ? setPassword : (e) => setPassword(e.target.value)}
                required={!isEditing}
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        sx: {
                            borderRadius: "15px",
                        }
                    }
                }}
            />
            {isAdd && (
                <IconButton 
                    onClick={handleSetDefaultPassword} 
                    sx={{ 
                        borderRadius: '15px', 
                        border: '1px solid', 
                        borderColor: '#E0E0E0',
                        marginTop: '8px',
                        marginBottom: '4px'
                    }}
                >
                    <Replay fontSize="inherit" />
                </IconButton>
            )}
        </Box>
    );
}

export default PasswordField;
