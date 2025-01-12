import { Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import React from 'react'

export default function FileUpload({value, setValue}) {
    const onDrop = (acceptedFiles) => {
        const pdfFile = acceptedFiles.find(file => file.type === 'application/pdf');

        if (pdfFile) {
            setValue(pdfFile);
        } else {
            alert('Hanya menerima file PDF');
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'application/pdf': [] },
        onDrop
    });

    return (
        <div {...getRootProps()}
            style={{
                border: '2px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                marginTop: '16px',
                borderRadius: '15px'
            }}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Typography variant="body2" color="primary">
                    Letakkan file di sini...
                </Typography>
            ) : (
                <Typography variant="body2" color="textSecondary">
                    Seret dan lepaskan file PDF di sini, atau klik untuk memilih file
                </Typography>
            )}
            {value && <Typography mt={2} variant="body2" color="textSecondary">{value.name}</Typography>}
        </div>
    )
}
