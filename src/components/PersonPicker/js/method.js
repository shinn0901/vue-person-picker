// const PersonPicker = {
export const isRepeatAdd = (arr, item) => {
  for (let i = 0; i < arr.length; i++) {
    let _i = arr[i]
    if (item === _i) {
      return true
    }
  }
  return false
}

export const arrRemove = (arr, item) => {
  function deleteItem(obj, arr) {
    for (var i = 0; i < arr.length; i++) {
      var _item = arr[i]
      if (obj === _item) {
        arr.splice(i, 1)
        return
      }
    }
  }

  switch (Object.prototype.toString.call(item)) {
    case '[object Object]':
      deleteItem(item, arr)
      break
    case '[object Array]':
      for (let i = 0; i < item.length; i++) {
        const obj = item[i]
        deleteItem(obj, arr)
      }
      break
  }
}

export const getUserList = (dataList, organizationKey) => {
  let newDataList = []

  function getChildren(dataList, orgName) {
    for (let i = 0; i < dataList.length; i++) {
      let item = dataList[i]
      item.organizationName = orgName || ''
      newDataList.push(item)
      if (item.children && item.children.length > 0) {
        newDataList.concat(getChildren(item.children, item[organizationKey]))
      }
      if (item.userList && item.userList.length > 0) {
        newDataList.concat(getChildren(item.userList, item[organizationKey]))
      }
    }
  }
  getChildren(dataList)
  return newDataList
}

export const searchMatch = (val, dataList, matchKeys) => {
  if (val === '') return []
  let matchList = []
  for (let i = 0; i < dataList.length; i++) {
    const _item = dataList[i]
    for (let k = 0; k < matchKeys.length; k++) {
      const key = matchKeys[k];
      if (_item.category === 'user' && _item[key].indexOf(val) !== -1) {
        matchList.push(_item)
        break
      }
    }
  }
  return matchList
}

export const mergeByOrganization = (organizationList, organizationRelationship, userList) => {
  let root = []
  for (let i = 0; i < organizationList.length; i++) {
    const item = organizationList[i],
      id = item['PARENTID']
    item['category'] = 'organization' //给予类型赋值
    /**
     * 理清组织关系
     */
    for (let j = 0; j < organizationList.length; j++) {
      const sub = organizationList[j]
      if (item === sub) continue
      if (id === sub['DEPTID'] && id !== '') {
        if (sub.hasOwnProperty('children')) {
          if (sub['children'].indexOf(item) === -1) {
            sub['children'].push(item)
          }
        } else {
          sub['children'] = [item]
        }
        break;
      } else if (j === organizationList.length - 1) {
        root.push(item)
      }
    }
    /**
     * 理清组织和人员关系
     */
  }
  for (let k = 0; k < userList.length; k++) {
    const userItem = userList[k],
      USERID = userItem['USERID']
    userItem['category'] = 'user' //给予类型赋值
    let DEPTID = ''
    for (let l = 0; l < organizationRelationship.length; l++) {
      const relaItem = organizationRelationship[l],
        USER_RID = relaItem['USER_RID']
      if (USERID === USER_RID) {
        DEPTID = relaItem['ORG_RID']
        userItem['USERTITLE'] = relaItem['USERTITLE']
        break
      }
    }
    if (DEPTID !== '') {
      for (let m = 0; m < organizationList.length; m++) {
        const orgItem = organizationList[m]
        if (orgItem['DEPTID'] === DEPTID) {
          if (orgItem.hasOwnProperty('userList')) {
            if (orgItem['userList'].indexOf(userItem) === -1) {
              orgItem['userList'].push(userItem)
            }
          } else {
            orgItem['userList'] = [userItem]
          }
          break
        }
      }
    }
  }
  root = root.filter(item => {
    return item.hasOwnProperty('children') && item['children'].length > 0
  })

  if (root.length === 1) root = root[0]
  return root
}

const PersonPicker = {
  isRepeatAdd,
  arrRemove,
  getUserList,
  searchMatch,
  mergeByOrganization
}
export default PersonPicker