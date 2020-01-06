<template>
  <div class="row mx-0">
    <div class="col-12 g-module-header yF-header mb-2 py-2 shadow-lg">
      <b-dropdown id="dropdown-1" :text="data.settings.categories[currentTeamIndex].title" size="sm" variant="none text-white">
        <b-dropdown-item
          v-for="(team,index) in data.settings.categories"
          :key="index"
          v-on:click="changeTeam(index)"
        >
          {{ team.title }}
        </b-dropdown-item>
      </b-dropdown>
    </div>
    <transition name="fade">
      <div v-if="membersTeamIndex > -1" class="col-12">
        <members
          :template="data.settings.template"
          :members="data.settings.categories[membersTeamIndex].teams"
        />
      </div>
    </transition>
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
  },
  data () {
    return {
      currentTeamIndex: 0,
      membersTeamIndex: 0
    }
  },
  methods: {
    changeTeam (newIndex) {
      this.currentTeamIndex = newIndex
      this.membersTeamIndex = -1

      /** animation fix */
      setTimeout(() => {
        this.membersTeamIndex = newIndex
      }, 500)
    }
  }
}
</script>
