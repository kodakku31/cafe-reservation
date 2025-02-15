import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Button, Input, Text, Card, Icon } from '@rneui/themed';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function App() {
  const [formData, setFormData] = useState({
    name: '',
    date: new Date(),
    time: new Date(),
    people: '2',
    phone: '',
    note: ''
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/reservations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          date: formData.date.toISOString().split('T')[0],
          time: formData.time.toTimeString().split(' ')[0].substring(0, 5),
          people: parseInt(formData.people),
          phone: formData.phone,
          note: formData.note
        }),
      });

      if (response.ok) {
        alert('予約が完了しました！');
        setFormData({
          name: '',
          date: new Date(),
          time: new Date(),
          people: '2',
          phone: '',
          note: ''
        });
      } else {
        alert('予約に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      alert('エラーが発生しました。インターネット接続を確認してください。');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Card.Title h4>カフェ予約</Card.Title>
        <Card.Divider />

        <Input
          label="お名前"
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="山田 太郎"
          leftIcon={<Icon name="person" type="material" />}
        />

        <Button
          title={formData.date.toLocaleDateString()}
          onPress={() => setShowDatePicker(true)}
          icon={<Icon name="calendar" type="material" color="white" />}
          buttonStyle={styles.dateButton}
        />

        {showDatePicker && (
          <DateTimePicker
            value={formData.date}
            mode="date"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setFormData({ ...formData, date: selectedDate });
              }
            }}
          />
        )}

        <Button
          title={formData.time.toLocaleTimeString()}
          onPress={() => setShowTimePicker(true)}
          icon={<Icon name="access-time" type="material" color="white" />}
          buttonStyle={styles.dateButton}
        />

        {showTimePicker && (
          <DateTimePicker
            value={formData.time}
            mode="time"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) {
                setFormData({ ...formData, time: selectedTime });
              }
            }}
          />
        )}

        <Input
          label="人数"
          value={formData.people}
          onChangeText={(text) => setFormData({ ...formData, people: text })}
          keyboardType="number-pad"
          leftIcon={<Icon name="people" type="material" />}
        />

        <Input
          label="電話番号"
          value={formData.phone}
          onChangeText={(text) => setFormData({ ...formData, phone: text })}
          keyboardType="phone-pad"
          leftIcon={<Icon name="phone" type="material" />}
        />

        <Input
          label="備考"
          value={formData.note}
          onChangeText={(text) => setFormData({ ...formData, note: text })}
          multiline
          numberOfLines={3}
          leftIcon={<Icon name="note" type="material" />}
        />

        <Button
          title="予約する"
          onPress={handleSubmit}
          raised
          buttonStyle={styles.submitButton}
        />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dateButton: {
    marginVertical: 10,
    backgroundColor: '#2089dc',
  },
  submitButton: {
    backgroundColor: '#2ecc71',
    padding: 15,
    marginTop: 10,
  },
});
