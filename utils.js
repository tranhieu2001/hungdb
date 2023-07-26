const utils = {
  takeDataByClassCar: function (type, data1, data2) {
    let data
    data = type === 'carin' ? data1 : data2
    return data
  },
}
module.exports = utils
