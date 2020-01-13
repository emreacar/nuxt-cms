<template>
  <div class="row mx-0">
    <div
      v-if="
        data.settings.showHeader &&
          data.settings[appData.settings.defaultLang]"
      class="col-12 g-module-header text-center mb-2 py-2 shadow-lg"
    >
      <span class="ml-2">
        {{ data.settings[appData.settings.defaultLang] }}
      </span>
    </div>

    <div class="col-12 vl-wrapper shadow">
      <div class="row">
        <div class="col-12 point-list">
          <b-table
            ref="basketbolLigTable"
            :items="teams"
            :fields="orderHeads"
            :tbody-tr-class="rowClass"
            borderless
            small
            hover
            sticky-header
            striped
            table-variant="none teamsTable"
            head-variant="none teamsHead"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      loading: true,
      teams: [],
      lastMatch: {},
      nextMatch: {},
      orderHeads: [
        {
          key: 'priority',
          label: 'Sıra'
        },
        {
          key: 'title',
          label: 'TAKIM'
        },
        {
          key: 'point_O',
          label: 'O'
        },
        {
          key: 'point_G',
          label: 'G'
        },
        {
          key: 'point_M',
          label: 'M'
        },
        {
          key: 'point_P',
          label: 'Puan'
        }
      ]
    }
  },
  mounted () {
    this.getModuleData()
  },
  methods: {
    async getModuleData () {
      const { teams, scorer } = await this.$store.dispatch('send', {
        path: 'app/module/voleybolLig',
        data: {
          moduleData: {
            _id: this.data._id,
            settings: {
              time: this.data.settings.time || 6
            }
          }
        }
      })

      const tableScrollDom = document.querySelector('.vl-wrapper div.b-table-sticky-header')
      this.teams = teams
      this.lastMatch = scorer.lastMatch
      this.nextMatch = scorer.nextMatch
      this.loading = false
      /** change scroll position to ours teams offset */
      this.$nextTick(function () {
        const tableId = this.$refs.basketbolLigTable.localId_
        const whereAreWe = document.querySelector(`table#${tableId} tr.we-here`)
        if (tableScrollDom.clientHeight < whereAreWe.offsetTop) {
          tableScrollDom.scrollTop = whereAreWe.offsetTop
        }
      })
    },
    rowClass (item, type) {
      if (!item) {
        return
      }
      if (item.title.toLowerCase() === this.data.settings.whoami) {
        return 'we-here'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.vl-wrapper {
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 12px;
  background: #d9d9d9;
  background: -moz-linear-gradient(top, rgb(217,217,217) 0%, rgb(255,255,255) 100%);
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgb(255,255,255)), color-stop(100%,rgb(255,255,255)));
  background: -webkit-linear-gradient(top, rgb(217,217,217) 0%,rgb(255,255,255) 100%);
  background: -o-linear-gradient(top, rgb(217,217,217) 0%,rgb(255,255,255) 100%);
  background: -ms-linear-gradient(top, rgb(217,217,217) 0%,rgb(255,255,255) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#d9d9d9', endColorstr='#ffffff',GradientType=0 );
  background: linear-gradient(to top, rgb(217,217,217) 0%,rgb(255,255,255) 100%);
}
.vL-inline-title {
  font-size: 1em;
  text-decoration: underline;
  text-align: center;
}
.ls-title {
  font-size: 1em;
  text-align: center;
}
.ls-item {
  font-size: 1em;
}
</style>
