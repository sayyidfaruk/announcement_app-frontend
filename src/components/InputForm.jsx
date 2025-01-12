import { Box, FormLabel, TextField } from '@mui/material'
import React from 'react'

export default function InputForm({ name, placeholder, value, setValue, required = true, ...rest }) {
    return (
        <Box>
            <FormLabel htmlFor={name} sx={{ color: 'black' }}>{placeholder}</FormLabel>
            <TextField
                id={name}
                name={name}
                variant="outlined"
                fullWidth
                margin="dense"
                size='small'
                placeholder={`Masukkan ${placeholder}`}
                value={value}
                onChange={setValue}
                required={required}
                slotProps={{
                    input: {
                        sx: {
                            borderRadius: '15px',
                        },
                    },
                }}
                {...rest}
            />
        </Box>
    )
}
