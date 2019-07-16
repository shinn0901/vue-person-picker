<template>
  <van-popup v-model="value" position="bottom" class="popup-person-picker">
    <div class="person-picker">
      <div class="header van-hairline--bottom">
        <div class="search-bar">
          <van-search
            placeholder="请输入人员姓名"
            @search="searchBar_Submit"
            @cancel="searchBar_Cancel"
            :show-action="searchBar.focus"
            @focus="searchBar_Focus"
            v-model="searchBar.value"
          />
        </div>
        <div class="button-area">
          <van-button
            type="default"
            size="small"
            :disabled="!history.root"
            @click="renderHistoryBack"
          >返回</van-button>
          <!-- <van-button type="info" size="small">{{ isAllSelected || true ? "反选" : "全选" }}</van-button> -->
          <!-- v-if="!isSingleSelect" -->
          <!-- :disabled="!hasPersonOption" -->
          <!-- @click.native="AllSelected" -->
        </div>
      </div>
      <div
        :class="(pickList.length > 0 ? 'picked-list-show ' :'' ) + 'person-list'"
        v-if="!searchBar.focus"
      >
        <transition :name="transitionName" class="a12312312">
          <person-picker-list
            :list="personsData"
            @organization-update="organizationUpdate"
            @user-update="userUpdate"
            :key="generateId()"
            v-show="!searchBar.focus"
          />
        </transition>
      </div>
      <div
        :class="(pickList.length > 0 ? 'picked-list-show ' :'' ) + 'person-list'"
        v-if="searchBar.focus"
      >
        <user-item
          v-for="(item) in searchBar.matchList"
          :itemData="item"
          @user-update="userUpdate"
          :key="item.id"
        ></user-item>
      </div>
      <div class="footer van-hairline--top">
        <div class="picked-list van-hairline--bottom" v-show="pickList.length">
          <span class="picked-item" v-for="(item) in pickList" :key="item.id">
            <b>{{item[keys['user']['name']]}}</b>
            <van-icon name="cross" @click="userUpdate(false,item)" />
          </span>
        </div>
        <div class="button-list">
          <van-row type="flex" justify="center" :gutter="20">
            <van-col span="16">
              <van-button
                style="width:100%;"
                size="normal"
                @click="cancel"
                round
                type="default"
                text="取消"
              />
            </van-col>
            <van-col span="16">
              <van-button
                style="width:100%;"
                size="normal"
                :disabled="!pickList.length"
                @click="picked"
                round
                type="info"
                text="确定"
              />
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import VanButton from 'vant/lib/button';
import 'vant/lib/button/style';
import VanPopup from 'vant/lib/popup';
import 'vant/lib/popup/style';
import VanSearch from 'vant/lib/search';
import 'vant/lib/search/style';
import VanRow from 'vant/lib/row';
import 'vant/lib/row/style';
import VanCol from 'vant/lib/col';
import 'vant/lib/col/style';
import VanIcon from 'vant/lib/icon';
import 'vant/lib/icon/style';

import PersonPickerList from './List'
import UserItem from './UserItem'
import __methods from './js/method'
export default {
  name: 'PersonPicker',
  props: {
    value: {
      type: Boolean,
      default () {
        return false
      }
    },
    person: {
      type: Object,
      required: true
    },
    keys: {
      type: Object,
      default () {
        return {
          organization: {
            name: 'name',
            description: 'description'
          },
          user: {
            name: 'name',
            description: 'description',
            match: ['name', 'description']
          }
        }
      }
    },
    pickedData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  provide () {
    return {
      pickedList: this.pickList,
      keys: this.keys
    }
  },
  data () {
    return {
      searchBar: {
        focus: false,
        value: '',
        matchList: []
      },
      personsData: null,
      defaultpersonsData: undefined,
      defaultPersonsList: [],
      history: {
        root: 0,
        data: []
      },
      pickList: [].concat(this.pickedData),
      transitionName: ''
    }
  },
  created () {
    this.personsData = this.defaultpersonsData = this.person
    this.defaultPersonsList = __methods.getUserList(this.defaultpersonsData['children'], this.keys['organization']['name'])
  },
  methods: {
    searchBar_Focus () {
      this.transitionName = ''
      this.searchBar.focus = true
    },
    searchBar_Submit () {
      this.searchBar.matchList = __methods.searchMatch(this.searchBar.value, this.defaultPersonsList, this.keys.user.match)
    },
    searchBar_Cancel () {
      this.transitionName = ''
      this.searchBar.focus = false
    },
    /**
     * 返回事件方法
     */
    renderHistoryBack () {
      this.transitionName = 'person-picker-slide-right'
      this.history.data.splice(--this.history.root, 1)
      if (this.history.root === 0) {
        this.personsData = this.defaultpersonsData
      } else {
        this.personsData = this.history.data[this.history.root - 1]
      }
    },
    /**
     * 数据更新
     */
    organizationUpdate (data) {
      this.transitionName = 'person-picker-slide-left'
      this.history.data.push(data)
      this.history.root++
      this.personsData = data
    },
    /**
     * 选人更新
     */
    userUpdate (checked, data) {
      this.transitionName = ''
      if (checked) { // add
        if (!__methods.isRepeatAdd(this.pickList, data)) {
          this.pickList.unshift(data)
        }
      } else { // remove
        __methods.arrRemove(this.pickList, data)
      }
    },
    /**
     * 取消选人
     */
    cancel () {
      this.$emit('cancel')
      this.$emit('input', false)
    },
    /**
     * 选人完毕
     */
    picked () {
      this.$emit('picked', this.pickList)
      this.$emit('input', false)
    },
    generateId () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    }
  },
  components: {
    PersonPickerList,
    UserItem,
    VanButton,
    VanPopup,
    VanSearch,
    VanRow,
    VanCol,
    VanIcon
  },
  watch: {
    value (newValue) {
      if (newValue) {
        this.transitionName = ''
      }
    }
  }
}
</script>

<style lang="scss">
.person-picker-slide-right-enter-active,
.person-picker-slide-right-leave-active,
.person-picker-slide-left-enter-active,
.person-picker-slide-left-leave-active {
  will-change: transform;
  transition: all 350ms;
  position: absolute;
}

.person-picker-slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.person-picker-slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.person-picker-slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.person-picker-slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.popup-person-picker {
  text-align: left;
  width: 100%;
  height: 100%;
  .person-picker {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .header {
      height: 94px;
      .search-bar {
        height: 54px;
      }
      .button-area {
        padding: 0 16px 12px;
        height: 42px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
      }
    }
    .person-list {
      height: calc(100% - 164px);
      overflow: hidden;
      overflow-y: auto;
      &.picked-list-show {
        height: calc(100% - 214px);
      }
    }
    .footer {
      background-color: #fff;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
      .button-list {
        padding: 12px 10px;
      }
      .picked-list {
        overflow-x: auto;
        padding: 10px 8px;
        white-space: nowrap;
        span {
          display: inline-block;
          font-size: 13px;
          line-height: 2;
          background-color: #efefef;
          color: #454545;
          border: 1px solid #c1c1c1;
          border-radius: 4px;
          padding: 0 3px;
          margin-left: 6px;
          &:first-child {
            margin-left: 0;
          }
          * {
            font-weight: normal;
            vertical-align: middle;
          }
          b {
            margin-right: 3px;
          }
        }
      }
    }
  }
}
</style>
