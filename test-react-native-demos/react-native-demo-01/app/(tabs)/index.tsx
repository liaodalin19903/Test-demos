import { 
  Image, 
  StyleSheet, 
  Platform, 
  ScrollView,
  View,
} from 'react-native';

import { Avatar, Card,  Text } from 'react-native-paper';

import { Button } from 'react-native-paper';

export default function HomeScreen() {

  //@ts-ignore
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  
  return (
    <View>
      <Text>1122</Text>
      <Text>1122</Text>
      <Text>1122</Text>
      <Text>1122</Text>
      
      <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
        Press me
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
});
