import { GridItem } from '@chakra-ui/react'
import React from 'react'


export default function Day({ day, colstart = false }) {
    return (
        <GridItem colStart={colstart ? colstart : ''}>{day}</GridItem>
    )
}
