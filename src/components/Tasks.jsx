import { useContext } from 'react'
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react'
import { TaskContext } from '../context/TaskContext'

import TaskItem from './TaskItem'

export default function Tasks() {
    const { tasks, addTask, getTasks } = useContext(TaskContext)
    console.log(tasks)

    const handleAdd = () => {
        addTask('elo', new Date(), false)
        getTasks(new Date())
    }

    return (
        <Box p="10px" borderRadius="3px" bg="white" minWidth="400px">
            <Flex flexDirection="column">
                <Flex flexDirection="column">
                    <Text fontWeight="bold" color="blackAlpha.600">9 Wednesday</Text>
                    <Heading as="h5" mb="10px">Tasks</Heading>
                </Flex>
                <Flex flexDirection="column" gap="5">
                    {tasks == null ? <Text>No tasks for that day, create one</Text> : tasks?.map((task, i) => <TaskItem key={i} task={task} i={i} />)}
                </Flex>
                <Button fontSize="30px" onClick={handleAdd}>&#43;</Button>
            </Flex>
        </Box>
    )
}
