<template>
  <div class="list">
    <component
      v-for="(item) in reList"
      :is="componentType(item.category)"
      :itemData="item"
      :key="item.id"
    />
  </div>
</template>

<script>
import OrganizationItem from '../OrganizationItem'
import UserItem from '../UserItem'
export default {
  name: "PersonPickerList",
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  inject: ['keys', 'pickedList'],
  computed: {
    reList () {
      return [].concat(this.list.children || [], this.list.userList || [])
    }
  },
  methods: {
    /**
   * component类型判断
   */
    componentType (val) {
      if (val === 'organization') {
        return 'OrganizationItem'
      } else if (val === 'user') {
        return 'UserItem'
      }
    },
  },
  components: {
    OrganizationItem,
    UserItem
  }
}
</script>

<style lang="scss">
.list {
  width: 100%;
}
</style>
