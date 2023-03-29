import { useState } from 'react'
import { GridItem } from '@chakra-ui/react'

export default function Day({ day, colstart = false, isToday = false }) {
    const [active, setActive] = useState(false)

    const dayItemStyles = {
        bg: "blue.400",
        borderRadius: "3px",
        py: "5px",
        color: "white"
    }

    const handleClick = () => {
        setActive(prev => !prev)
    }

    return (
        <GridItem sx={active ? dayItemStyles : ''} fontWeight={isToday ? "bold" : ''} color={isToday ? "blue.400" : ''} py="5px" textAlign="center" cursor="pointer" onClick={handleClick} colStart={colstart ? colstart : ''}>{day}</GridItem>
    )
}
