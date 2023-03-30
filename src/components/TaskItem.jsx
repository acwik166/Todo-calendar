import React from 'react'
import { Button, Flex, Box, Text, Spacer } from '@chakra-ui/react'
import { format, parseISO } from 'date-fns'

export default function TaskItem({ task, i }) {
    const isEveryOther = () => i % 2 === 0 ? true : false

    return (
        <Box bg={isEveryOther() ? "blue.400" : "blackAlpha.100"} p="10px" borderRadius="3px" >
            <Flex alignItems="center" >
                <Text fontSize="20px" fontWeight="bold">{task.name}</Text>
                <Spacer></Spacer>
                <Text fontSize="16px" color={isEveryOther() ? "white" : "black"} mr="10px">{format(parseISO(task.date), 'K:mm')}</Text>
                <Button bg="none" color="white" _hover={{ bg: "red" }} >&#10005;</Button>
            </Flex >
            <Text color={task.isCompleted ? 'green' : 'red'}>{task.isCompleted ? 'Done' : 'Not done'}</Text>
        </Box>
    )
}
