import { useContext } from 'react'
import { Flex, Box, Heading, Text } from '@chakra-ui/react'
import { format } from 'date-fns'
import { TaskContext } from '../context/TaskContext'

import TaskItem from './TaskItem'
import AddTaskModal from './AddTaskModal'

export default function Tasks() {
    const { currentPageDate, tasks } = useContext(TaskContext)
    console.log(tasks)

    return (
        <Box p="10px" borderRadius="3px" bg="white" minWidth="400px" maxHeight="600px">
            <Flex flexDirection="column">
                <Flex flexDirection="column" mb="10px">
                    <Text fontWeight="bold" color="blackAlpha.600">{currentPageDate ? format(currentPageDate, 'MMMM d') : ''}</Text>
                    <Heading as="h5" mb="10px">Tasks</Heading>
                </Flex>
                <Flex flexDirection="column" gap="3" mb="10px" height="450px" overflowY="auto">
                    {tasks === null || tasks == '' ? <Text>No tasks for that day, create one</Text> : tasks?.map((task, i) => <TaskItem key={i} task={task} i={i} />)}
                </Flex>
                <AddTaskModal date={currentPageDate} />
            </Flex>
        </Box>
    )
}
