<template>
  <van-cell
    clickable
    :title="itemData[keys['user']['name']]"
    :label="valueCheck(itemData)"
    :center="true"
    @click="click"
  >
    <van-checkbox v-model="checked" slot="right-icon" />
  </van-cell>
</template>

<script>
import VanCell from 'vant/lib/cell';
import 'vant/lib/cell/style';
import VanCheckbox from 'vant/lib/checkbox';
import 'vant/lib/checkbox/style';
export default {
  name: 'UserItem',
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  inject: ['pickedList', 'keys'],
  data () {
    return {
      checked: this.pickedList.indexOf(this.itemData) !== -1
    }
  },
  methods: {
    click () {
      this.checked = !this.checked
    },
    valueCheck (obj) {
      let val = obj[this.keys['user']['description']]
      if (val) return val
      else return obj['organizationName']
    }
  },
  components: {
    VanCell,
    VanCheckbox
  },
  watch: {
    checked (newVal) {
      let parent = this
      while (parent.name !== 'PersonPicker' && parent.$parent) {
        parent.$emit('user-update', newVal, this.itemData)
        parent = parent.$parent
      }
    },
    pickedList () {
      this.checked = this.pickedList.indexOf(this.itemData) !== -1
    }
  }
}
</script>

<style>
</style>
