export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Chỉ cho phép các type phổ biến
    'type-enum': [
      2,
      'always',
      [
        'feat','fix','docs','style','refactor','perf','test',
        'build','ci','chore','revert'
      ]
    ],
    // Scope gợi ý cho dự án Laravel (không bắt buộc liệt kê đầy đủ)
    'scope-enum': [
      1,
      'always',
      ['app','api','auth','blade','config','db','docker','deps','docs','queue','tests','ui','vite','ci']
    ],
  }
};
