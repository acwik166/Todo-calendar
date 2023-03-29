import { useContext } from 'react'
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react'
import { TaskContext } from '../context/TaskContext'

export default function Tasks() {
    const { tasks, addTask, getTasks } = useContext(TaskContext)
    console.log(tasks)

    const handleAdd = () => {
        addTask('elo', new Date(), false)
        getTasks(new Date())
    }

    return (
        <Box p="10px" borderRadius="3px">
            <Flex flexDirection="column">
                <Flex flexDirection="column">
                    <Text fontWeight="bold" color="blackAlpha.600">9 Wednesday</Text>
                    <Heading as="h5" mb="10px">Tasks</Heading>
                </Flex>
                <Flex>
                    <Box>
                        {tasks?.map(task => <Text key={task.name}>{task.name}</Text>)}
                    </Box>
                </Flex>
                <Button fontSize="30px" onClick={handleAdd}>&#43;</Button>
            </Flex>
        </Box>
    )
}
