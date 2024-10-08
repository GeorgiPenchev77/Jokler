<template>
<div>
  <div class="tabs">
    <TabNav :tabs="['For-You-Page', 'Side-Bar', 'Create-Post']" :selected="selected" @selected="setSelected">
      <Tab :isSelected="selected === 'For-You-Page'">
        <ScrollListItem></ScrollListItem>
      </Tab>
      <Tab :isSelected="selected === 'Side-Bar'">
      </Tab>
      <Tab :isSelected="selected === 'Create-Post'">
      </Tab>
    </TabNav>
  </div>
</div>
</template>

<script>
import Tab from '@/components/Tab.vue'
import TabNav from '@/components/TabNav.vue'
import ScrollListItem from '@/components/ScrollListItem.vue'

export default {
  name: 'coursePage',
  props: ['coursePage'],
  components: { TabNav, Tab, ScrollListItem },
  data() {
    return {
      selected: 'Home'
    }
  },
  methods: {
    setSelected(Tab) {
      this.selected = Tab
    }
  }
}
</script>

<style scoped>
.tabs {
    display: flex;
    flex-direction: row;
    justify-content: center;
    cursor: pointer;
}
</style>
