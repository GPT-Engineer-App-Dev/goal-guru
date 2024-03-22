import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, IconButton, HStack, Text, Checkbox, Heading, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTasks = [...tasks, { id: Date.now(), text: inputValue, isCompleted: false }];
      setTasks(newTasks);
      setInputValue("");
      toast({
        title: "Task added.",
        description: "We've added your task to the list.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const deleteTask = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const toggleComplete = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <ChakraProvider>
      <Box p={8} maxWidth="500px" mx="auto">
        <VStack spacing={4} align="stretch">
          <Heading mb={6}>Todo App</Heading>
          <HStack>
            <Input
              placeholder="Add a new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") addTask();
              }}
            />
            <IconButton icon={<FaPlus />} onClick={addTask} aria-label="Add task" />
          </HStack>
          {tasks.map((task) => (
            <HStack key={task.id} justifyContent="space-between">
              <Checkbox isChecked={task.isCompleted} onChange={() => toggleComplete(task.id)}>
                <Text as={task.isCompleted ? "del" : undefined}>{task.text}</Text>
              </Checkbox>
              <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} aria-label="Delete task" variant="ghost" />
            </HStack>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
