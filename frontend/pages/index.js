import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Textarea,
  HStack,
  useColorModeValue,
  Icon,
  Divider
} from '@chakra-ui/react';
import { FaCalendar, FaClock, FaUsers, FaPhone, FaStickyNote } from 'react-icons/fa';
import axios from 'axios';
import { format } from 'date-fns';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '12:00',
    people: 2,
    phone: '',
    note: ''
  });
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await axios.get('http://localhost:8000/reservations/');
      setReservations(response.data);
    } catch (error) {
      toast({
        title: '予約の取得に失敗しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:8000/reservations/', formData);
      toast({
        title: '予約が完了しました',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setFormData({
        name: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '12:00',
        people: 2,
        phone: '',
        note: ''
      });
      fetchReservations();
    } catch (error) {
      toast({
        title: '予約に失敗しました',
        description: error.response?.data?.detail || 'エラーが発生しました',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box textAlign="center">
          <Heading as="h1" size="xl" mb={2}>カフェ予約システム</Heading>
          <Text color="gray.600">お好みの日時を選んでご予約ください</Text>
        </Box>

        <Box
          as="form"
          onSubmit={handleSubmit}
          bg={bgColor}
          p={6}
          borderRadius="lg"
          boxShadow="sm"
          border="1px"
          borderColor={borderColor}
        >
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>お名前</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="山田 太郎"
              />
            </FormControl>

            <HStack spacing={4} width="100%">
              <FormControl isRequired>
                <FormLabel>日付</FormLabel>
                <Input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={format(new Date(), 'yyyy-MM-dd')}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>時間</FormLabel>
                <Input
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleChange}
                  min="10:00"
                  max="21:00"
                />
              </FormControl>
            </HStack>

            <HStack spacing={4} width="100%">
              <FormControl isRequired>
                <FormLabel>人数</FormLabel>
                <NumberInput
                  min={1}
                  max={10}
                  value={formData.people}
                  onChange={(value) => setFormData(prev => ({ ...prev, people: parseInt(value) }))}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>電話番号</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="090-1234-5678"
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>備考</FormLabel>
              <Textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="ご要望がございましたらご記入ください"
              />
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              width="100%"
              isLoading={loading}
            >
              予約する
            </Button>
          </VStack>
        </Box>

        <Divider />

        <Box>
          <Heading as="h2" size="lg" mb={4}>予約一覧</Heading>
          <Box overflowX="auto">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>お名前</Th>
                  <Th>日付</Th>
                  <Th>時間</Th>
                  <Th>人数</Th>
                  <Th>電話番号</Th>
                  <Th>備考</Th>
                </Tr>
              </Thead>
              <Tbody>
                {reservations.map((reservation, index) => (
                  <Tr key={index}>
                    <Td>{reservation.name}</Td>
                    <Td>{reservation.date}</Td>
                    <Td>{reservation.time}</Td>
                    <Td>{reservation.people}名</Td>
                    <Td>{reservation.phone}</Td>
                    <Td>{reservation.note || '-'}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </VStack>
    </Container>
  );
}
