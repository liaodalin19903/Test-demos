import { 
  Image, 
  StyleSheet, 
  Platform, 
  ScrollView,
  View,
} from 'react-native';

import { Avatar, Card,  Text } from 'react-native-paper';
import { Appbar, Button, Divider, Drawer } from 'react-native-paper';


export default function HomeScreen() {

  //@ts-ignore
  const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
  
  const handleClick = () => {
    console.log('Pressed')

  } 

  return (

    <View>
      <Appbar.Header>
        <Appbar.Content title="Home">
        </Appbar.Content>
        {/* 你可以在这里添加更多的 Appbar.Action 或其他组件 */}
      </Appbar.Header>
      
      <View>
        <View>
          <Text>Test</Text>
        </View>

        <Divider/> 

        <View>
          <Button 
            onPress={handleClick}
          >点击按钮打开左侧栏</Button>
        </View>

        <View>
          <Text>1122</Text>
          <Text>1122</Text>
          <Text>1122</Text>
          <Text>1122</Text>
          
          <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </Button>
        </View>
      </View>  
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
});
