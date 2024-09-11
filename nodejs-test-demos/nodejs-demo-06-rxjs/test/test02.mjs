import { from, of } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';

// 模拟获取用户列表的函数
function getUserList() {
  return of([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ]);
}

// 模拟获取用户详细信息的函数
function getUserDetails(userId) {
  return of({ id: userId, details: `Details of User ${userId}` });
}

// 使用 RxJS 操作符
const userList$ = getUserList();

const processedUserList$ = userList$.pipe(
  mergeMap(users => from(users)),
  mergeMap(user => getUserDetails(user.id).pipe(
    map(details => ({...user, details }))
  ))
);

processedUserList$.subscribe(user => {
  console.log(user);
});


