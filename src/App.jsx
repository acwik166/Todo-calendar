import React from 'react'
import { Flex } from '@chakra-ui/react'

import { TaskProvider } from './context/TaskContext'

import Calendar from './components/Calendar'
import Tasks from './components/Tasks'

function App() {
  return (
    <TaskProvider>
      <Flex>
        <Calendar />
        <Tasks />
      </Flex>
    </TaskProvider>
  )
}

export default App
