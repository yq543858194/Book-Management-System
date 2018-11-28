function getRandomFileName (len, ext) {
  let str = 'abcdefghijklmnopqrstuvwxyz';
  let str1 = str.split('');
  let fileName = '';
  for (let i = 0; i < len; i ++) {
    let num = Math.floor(25 * Math.random());
    fileName += str1[num];
  }
  fileName += new Date().getTime();
  return fileName + '.' + ext;
}

console.log(getRandomFileName(10,'jpg'));
