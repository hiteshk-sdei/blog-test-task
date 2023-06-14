import React from 'react';
import {CircularProgress, Box} from '@mui/material';

const NoRecordFound = ({loading, colSpan}) => {
    return(
            <Box colSpan={colSpan} align='center'>
                {loading ? <CircularProgress size={22}/> : 'No record found'}
            </Box>
    )
}
export default NoRecordFound;