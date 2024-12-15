```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          const message = `HTTP error! status: ${response.status}`;
          throw new Error(message);
        }
        const jsonData = await response.json();
        //Check if jsonData is an array and is not empty
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          setData(jsonData);
        } else {
          setError(new Error('API returned empty or invalid data'));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      ListEmptyComponent={<Text>No data found.</Text>}
    />
  );
};

export default MyComponent;
```