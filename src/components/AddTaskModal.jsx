import { useRef, useContext } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Flex
} from '@chakra-ui/react'
import { parseISO } from 'date-fns'
import { TaskContext } from '../context/TaskContext'

export default function AddTaskModal({ date }) {
    const { addTask } = useContext(TaskContext)

    const { isOpen, onOpen, onClose } = useDisclosure()

    const nameRef = useRef(null)

    const handleAdd = () => {
        if (nameRef.current.value == '') return
        addTask(nameRef.current.value, date)
        onClose()
    }

    return (
        <Flex justifyContent="center">
            <Button width="20px" borderRadius="50px" bg="blue.400" color="white" fontSize="22px" pb="3px" _hover={{ bg: "blue.300" }} onClick={onOpen}>&#43;</Button>

            <Modal
                initialFocusRef={nameRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input ref={nameRef} placeholder='Title' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleAdd}>
                            Add new task
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
