function formatDateToBeijingMs(date) {
  // 如果没有传入date参数，则获取当前时间
  if (!date) {
      date = new Date();
  }
  // 将日期转换为北京时间，考虑时区偏移
  const beijingDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

  const year = beijingDate.getFullYear();
  // 月份从0开始，所以要加1
  let month = (beijingDate.getMonth() + 1).toString().padStart(2, '0');
  let day = beijingDate.getDate().toString().padStart(2, '0');
  let hours = beijingDate.getHours().toString().padStart(2, '0');
  let minutes = beijingDate.getMinutes().toString().padStart(2, '0');
  let seconds = beijingDate.getSeconds().toString().padStart(2, '0');
  // getMilliseconds获取毫秒数
  let milliseconds = beijingDate.getMilliseconds().toString().padStart(3, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
}

// 使用示例
console.log(formatDateToBeijingMs(new Date()));