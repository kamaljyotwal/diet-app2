import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tracker from './components/Tracker';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Tracker />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
