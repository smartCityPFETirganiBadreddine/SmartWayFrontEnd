import { Box, Button, ButtonGroup, Flex, HStack, IconButton, Input, SkeletonText, Text } from '@chakra-ui/react';

import { useJsApiLoader, GoogleMap } from '@react-google-maps/api';
import { Grid, Skeleton } from '@mui/material';

const center = {
    lat: 30.427755,
    lng: -9.598107
};
function Maps() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    if (!isLoaded) {
        return <Skeleton />;
    }
    return (
        <Flex position="relative" flexDirection="column" alignItems="center" bgColor="blue.200" bgPos="bottom" h="70vh" w="70vw">
            <Box position="absolute" left={0} top={0} h="100%" w="100%">
                {/* Google maps*/}
                <GoogleMap center={center} zoom={13} mapContainerStyle={{ width: '100%', height: '100%' }}></GoogleMap>
            </Box>
        </Flex>
    );
}

export default Maps;
