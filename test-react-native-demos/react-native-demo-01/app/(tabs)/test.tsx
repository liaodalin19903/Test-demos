import React from 'react'
import { View, Text } from 'react-native'
import { Appbar, Button, Divider, Drawer } from 'react-native-paper';

export default function Test() {

  const [active, setActive] = React.useState('');

  const handleClick = () => {
    console.log('Pressed')

  }

  return (
    <View>
    <Appbar.Header>
      <Appbar.Content title="Test">
      </Appbar.Content>
      {/* 你可以在这里添加更多的 Appbar.Action 或其他组件 */}
    </Appbar.Header>
      <View>
        <Text>Test</Text>
      </View>

      <Divider/> 

      <View>
        <Button 
          onPress={handleClick}
        >点击按钮打开左侧栏</Button>
      </View>

    
    </View>
    
  )
}
