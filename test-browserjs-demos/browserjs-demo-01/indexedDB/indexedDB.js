function openDB( dbName, version = 1 ) {
  return new Promise((resolve, reject) => {
    // 兼容浏览器
    let indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    
    // 打开数据库，如果没有回自动创建
    let request = indexedDB.open(dbName, version);

    let db;
    // 打开成功的回调
    request.onsuccess = function (e) {
      db = e.target.result;
      resolve(db);
    };

    // 打开失败的回调
    request.onerror = function (e) {
      console.log('打开IndexedDB失败');
      reject(e);
    };

    // 数据库有更新时候回调
    request.onupgradeneeded = function (e) {
      db = e.target.result;

      // 创建存储库
      var objectStore = db.createObjectStore('students', {
        keyPath: 'uuid',  // 这是主键
        autoIncrement: true  // 实现自增
      });

      // 创建索引   在后面查询数据的时间可以依据索引来查询
      // 基于自己需要进行创建
      objectStore.createIndex('uuid','uuid', {
        unique: true
      });
      objectStore.createIndex('name', 'name', {
        unique: false
      });
      objectStore.createIndex('age', 'age', {
        unique: false
      });
    }

  })
}

function addData( db, storeName, data ) {
  
  var request = db.transaction([storeName], 'readwrite')
    .objectStore(storeName)
    .add(data);

  request.onsuccess = function (e) {
    console.log('数据写入成功');
  }
  
  request.onerror = function (e) {
    console.log('数据写入失败');
  }
}

/**
 * 
 * @param {object} db 数据库实例
 * @param {string} storeName 仓库名称
 * @param {string} key 主键值
 * @returns 
 */
function getDataByKey( db, storeName, key ) {
  return new Promise((resolve, reject) => {
    var request = db.transaction([storeName],'readwrite')
     .objectStore(storeName)
     .get(key);  // 通过主键获取数据

    request.onsuccess = function (e) {
      if(request.result) {
        resolve(request.result);
      } else {
        reject('没有找到数据');
      }
    } 
    request.onerror = function (e) {
      console.log('数据读取失败');
      reject(e);
    }
  })
}