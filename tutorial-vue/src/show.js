// 操作 DOM 元素，把 content 显示到网页上
function show(content) {
  // 使用全局变量TEACHER
  content += 'Her teacher is:' + TEACHER;
  window.document.getElementById('app').innerText = content;
}

export { show };