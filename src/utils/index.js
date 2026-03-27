import Cookies from 'js-cookie'
let TokenKey = 'iqap_user_token'

export function getToken() {
  
  return Cookies.get(TokenKey)
}

export function setTokenKeyName(keyName) {
  TokenKey = keyName
}


/**
* 参数处理
* @param {*} params  参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + '=';
    if (value !== null && value !== '' && typeof (value) !== 'undefined') {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== '' && typeof (value[key]) !== 'undefined') {
            const params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + '=';
            result += subPart + encodeURIComponent(value[key]) + '&';
          }
        }
      } else {
        result += part + encodeURIComponent(value) + '&';
      }
    }
  }
  return result
}
/**
 * get number of calendar week based on ISO norm
 * @param {String} date 
 */
export const getKW = (dateStr) => {
  const parts = dateStr.split('-')
  const date = new Date(parts[0], parts[1] - 1, parts[2])

  // change date to Thursday in the same week
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7)
  // Calculate the number of weeks since the beginning of the year
  return Math.ceil((((date - new Date(date.getFullYear(), 0, 1)) / 86400000) + 1) / 7)
}