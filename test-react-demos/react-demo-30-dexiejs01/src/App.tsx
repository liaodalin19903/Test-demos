
import { useEffect } from 'react'
import './App.css'

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from './common/db'
import { Friend, ContactInfo } from './entities/Friend';

function App() {

  const friends = useLiveQuery(() => {
    
    console.log('toArray: ', db.friends.toArray())
    console.log('toCollection: ', db.friends.toCollection())
    console.log('toCollection.toArray: ', db.friends.toCollection().toArray())

    return db.friends.toArray()
  }, [])


  const handleClick = () => {

    const contact: ContactInfo = {
      email: '123@gmail.com',
      tel: 15982321123,
      address: {
        country: 'china',
        province: 'sichuan',
        street: 'chenghua street',
        city: 'chengdu',
        streetNo: 1321
      }
    }

    const friend: Friend = {
      name: '小明',
      age: 23,
      contact
    }

    db.friends.add(friend).then(() => {
      console.log('添加成功')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      friend count: {friends?.length}

      <button onClick={handleClick}>点击添加数据</button>
    </>
  )
}

export default App
