import { useState } from 'react'
import { Flex, Box, Heading, Text, Button, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { getDaysInMonth, startOfMonth, getDay, format, addMonths, subMonths } from 'date-fns'

import Day from './Day'

export default function Calendar() {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const [startOfMonthDate, setStartOfMonthDate] = useState(startOfMonth(new Date()))
    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(new Date()))
    const [date, setDate] = useState(new Date())
    const [prefixDays, setPrefixDays] = useState(getDay(startOfMonthDate))
    const monthDaysArr = Array.from({ length: daysInMonth - 1 }, (_, i) => i + 2)

    const getNthMonth = (direction) => () => {
        const startNthMonthDate = direction === 'next' ? startOfMonth(addMonths(startOfMonthDate, 1)) : startOfMonth(subMonths(startOfMonthDate, 1))
        const daysInNthMonth = getDaysInMonth(startNthMonthDate)
        setStartOfMonthDate(startNthMonthDate)
        setDaysInMonth(daysInNthMonth)
        setDate(prev => direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1))
        setPrefixDays(getDay(startNthMonthDate))
    }

    return (
        <Flex>
            <Box p="10px" borderRadius="3px">
                <Flex justifyContent="space-between" mb="10px" alignItems="center">
                    <Button fontSize="30px" onClick={getNthMonth('prev')}>&laquo;</Button>
                    <Flex flexDirection="column">
                        <Text fontWeight="bold" color="blackAlpha.600">{format(date, 'Y')}</Text>
                        <Heading as="h5" mb="10px">{format(date, 'LLLL d')}</Heading>
                    </Flex>
                    <Button fontSize="30px" onClick={getNthMonth('next')}>&raquo;</Button>
                </Flex>
                <SimpleGrid columns={7} gap="10" fontWeight="bold" mb="10px">
                    {daysOfWeek.map((day, i) => <Text key={day}>{day}</Text>)}
                </SimpleGrid>
                <Grid templateColumns="repeat(7, 1fr)" gap="10">
                    <Day colstart={prefixDays + 1} day={1} />
                    {monthDaysArr.map((day, i) => <Day key={day} day={day} />)}
                </Grid>
            </Box >
        </Flex >
    )
}
