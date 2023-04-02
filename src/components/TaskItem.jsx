import { useContext } from 'react'
import { Button, Flex, Box, Text } from '@chakra-ui/react'
import { TaskContext } from '../context/TaskContext'

export default function TaskItem({ task, i }) {
    const { removeTask } = useContext(TaskContext)

    const isEveryOther = () => i % 2 === 0 ? true : false

    return (
        <Box bg={isEveryOther() ? "blue.400" : "blackAlpha.100"} p="10px" borderRadius="5px" >
            <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                <Flex flexDirection="column">
                    <Text fontSize="20px" color={isEveryOther() ? "white" : "black"}>{task.name}</Text>
                </Flex>
                <Button bg="none" color="white" _hover={{ bg: "red" }} onClick={() => removeTask(task.id)}>&#10005;</Button>
            </Flex >
        </Box>
    )
}
