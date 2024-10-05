

import { Box, Button, TextField } from '@mui/material';

export default function letsGetStarted() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <TextField
                variant="outlined"
                placeholder="Search..."
                sx={{ marginBottom: '20px', width: '300px' }}
            />
            <Box sx={{ display: 'flex', gap: '10px' }}>
                <Button variant="contained" color="primary">
                    Search
                </Button>
                <Button variant="contained" color="secondary">
                    Charts
                </Button>
            </Box>
        </Box>
    );
}