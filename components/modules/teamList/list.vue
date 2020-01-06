<template>
  <div class="row mx-0">
    <div
      v-for="(team,index) in data.settings.categories"
      :key="index"
      class="col-12"
    >
      <div class="row">
        <div v-if="!team.hideTitle || team.hideTitle === 'false'" class="col-12 g-module-header yF-header my-2 py-2 shadow-lg">
          <span>{{ team.title }}</span>
        </div>
      </div>

      <members
        :template="data.settings.template"
        :members="team.teams"
      />
    </div>
  </div>
</template>

<script>
import members from '@@/components/modules/teamList/members'

export default {
  components: {
    members
  },
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  }
}
</script>
