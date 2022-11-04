/**
 * @description: 四舍五入保留d位小数
 * @param {Number} num 需要计算的数
 * @param {Number} d 默认保留2位
 * @return {Number} 四舍五入保留d位小数结果
 */
export function toFixed (num, d = 2) {
  const digit = Math.pow(10, d)
  let res = num * digit + 0.5
  res = parseInt(res, 10) / digit /100
  
  return res
}