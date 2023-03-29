import React from 'react'
import { Flex, Box, Heading, Text, Button } from '@chakra-ui/react'

function App() {
  return (
    <div>
      <Flex>
        <Box p="10px" borderRadius="3px">
          <Flex justifyContent="space-between">
            <Button fontSize="30px">&laquo;</Button>
            <Heading as="h5" mb="10px">SEP 18</Heading>
            <Button fontSize="30px">&raquo;</Button>
          </Flex>
          <Flex gap="10">
            <Text fontWeight="bold">S</Text>
            <Text fontWeight="bold">M</Text>
            <Text fontWeight="bold">T</Text>
            <Text fontWeight="bold">W</Text>
            <Text fontWeight="bold">T</Text>
            <Text fontWeight="bold">F</Text>
            <Text fontWeight="bold">S</Text>
          </Flex>
        </Box>
        <Box></Box>
      </Flex>
    </div >
  )
}

export default App
