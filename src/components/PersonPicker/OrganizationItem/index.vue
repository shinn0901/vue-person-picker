<template>
  <van-cell
    clickable
    :title="itemData[keys['organization']['name']]"
    :label="itemData[keys['organization']['description']]"
    :is-link="true"
    :center="true"
    @click="click"
  />
</template>

<script>
import VanCell from 'vant/lib/cell';
import 'vant/lib/cell/style';
export default {
  name: 'OrganizationItem',
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  inject: ['keys'],
  methods: {
    click () {
      let parent = this
      while (parent.name !== 'PersonPicker' && parent.$parent) {
        parent.$emit('organization-update', this.itemData)
        parent = parent.$parent
      }
    }
  },
  components: {
    VanCell
  }
}
</script>

<style>
</style>
