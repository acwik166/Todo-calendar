import { useState, useContext, useEffect } from 'react'
import { Flex, Box, Heading, Text, Button, SimpleGrid, Grid, GridItem } from '@chakra-ui/react'
import { getDaysInMonth, startOfMonth, getDay, format, addMonths, subMonths } from 'date-fns'
import { TaskContext } from '../context/TaskContext'

export default function Calendar() {
    const { getTasks, setCurrentPageDate, currentPageDate } = useContext(TaskContext)

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const dayItemStyles = {
        bg: "blue.400",
        borderRadius: "50px",
        py: "5px",
        color: "white"
    }

    const [startOfMonthDate, setStartOfMonthDate] = useState(startOfMonth(new Date()))
    const [daysInMonth, setDaysInMonth] = useState(getDaysInMonth(new Date()))
    const [date, setDate] = useState(new Date())
    const [prefixDays, setPrefixDays] = useState(getDay(startOfMonthDate))
    const [activeDay, setActiveDay] = useState()
    const monthDaysArr = Array.from({ length: daysInMonth - 1 }, (_, i) => i + 2)

    useEffect(() => {
        setCurrentPageDate(new Date(date.getFullYear(), date.getMonth(), activeDay ? activeDay : 1))
    }, [activeDay, date])

    const getNthMonth = (direction) => () => {
        const startNthMonthDate = direction === 'next' ? startOfMonth(addMonths(startOfMonthDate, 1)) : startOfMonth(subMonths(startOfMonthDate, 1))
        const daysInNthMonth = getDaysInMonth(startNthMonthDate)
        setStartOfMonthDate(startNthMonthDate)
        setDaysInMonth(daysInNthMonth)
        setDate(prev => direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1))
        setPrefixDays(getDay(startNthMonthDate))
    }

    const isToday = (day) => {
        if (day == Number(format(new Date(), 'd')) && startOfMonthDate.getMonth() == new Date().getMonth()) {
            return true
        }
        return false
    }

    const handleActive = (day) => () => {
        if (activeDay === day) {
            setActiveDay(null)
            return
        }
        setActiveDay(day)
        getTasks(new Date(date.getFullYear(), date.getMonth(), day))
    }

    return (
        <Flex bg="white" height="600px">
            <Box p="10px" borderRadius="3px">
                <Flex justifyContent="space-between" mb="10px" alignItems="center">
                    <Button fontSize="30px" pb="5px" onClick={getNthMonth('prev')}>&laquo;</Button>
                    <Flex flexDirection="column">
                        <Text fontWeight="bold" color="blackAlpha.600">{format(date, 'Y')}</Text>
                        <Heading as="h5" mb="10px">{format(date, 'LLLL')} {activeDay}</Heading>
                    </Flex>
                    <Button fontSize="30px" pb="5px" onClick={getNthMonth('next')}>&raquo;</Button>
                </Flex>
                <SimpleGrid columns={7} gap="10" fontWeight="bold" mb="10px">
                    {daysOfWeek.map((day, i) => <Text key={day}>{day}</Text>)}
                </SimpleGrid>
                <Grid templateColumns="repeat(7, 1fr)" gap="10">
                    <GridItem colStart={prefixDays + 1} sx={activeDay === 1 ? dayItemStyles : ''} userSelect="none" fontWeight={() => isToday(1) ? "bold" : ''} color={() => isToday(1) ? "blue.400" : ''} cursor="pointer" onClick={handleActive(1)} py="5px" textAlign="center">1</GridItem>
                    {monthDaysArr.map((day, i) => <GridItem key={day} sx={activeDay === day ? dayItemStyles : ''} userSelect="none" fontWeight={() => isToday(day) ? "bold" : ''} color={() => isToday(day) ? "blue.400" : ''} cursor="pointer" onClick={handleActive(day)} py="5px" textAlign="center">{day}</GridItem>)}
                </Grid>
            </Box >
        </Flex >
    )
}
