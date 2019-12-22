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
        <!-- left-side-->
        <div class="col-12 col-md-6">
          <div v-if="lastMatch.home && lastMatch.away" class="row align-items-center">
            <div class="col-4 pl-1 pr-1">
              <div
                v-if="lastMatch.home.logo && lastMatch.home.logo._id"
                class="lastMatch-logo"
              >
                <img
                  :src="
                    storageDir +
                    lastMatch.home.logo.path +
                    '/' +
                    lastMatch.home.logo.filename
                  "
                  class="img-fluid"
                >
              </div>
              <div class="lastMatch-team">
                {{ lastMatch.home.title }}
              </div>
            </div>
            <div class="col-4 pl-1 pr-1">
              <div class="vL-inline-title">
                SON MAÇ
              </div>
              <div class="last-match-score row align-items-center justify-content-center">
                <span class="col-4 pl-0 pr-0 score-number text-right">
                  {{ lastMatch.result.home || '0' }}
                </span>
                <span class="col-auto pl-1 pr-1 score-dash">-</span>
                <span class="col-4 pl-0 pr-0 score-number text-left">
                  {{ lastMatch.result.away || '0' }}
                </span>
              </div>
              <a
                v-if="
                  lastMatch.liveLogo &&
                    lastMatch.liveLogo._id"
                :href="lastMatch.liveUrl"
                target="_blank"
                class="live-url"
              >
                <img
                  :src="
                    storageDir +
                    lastMatch.liveLogo.path +
                    '/' +
                    lastMatch.liveLogo.filename
                  "
                  class="live-icon"
                >
              </a>
            </div>
            <div class="col-4 pl-1 pr-1">
              <div
                v-if="lastMatch.away.logo && lastMatch.away.logo._id"
                class="lastMatch-logo"
              >
                <img
                  :src="
                    storageDir +
                    lastMatch.away.logo.path +
                    '/' +
                    lastMatch.away.logo.filename
                  "
                  class="img-fluid"
                >
              </div>
              <div class="lastMatch-team">
                {{ lastMatch.away.title }}
              </div>
            </div>
            <div class="col-12 border-top mt-1" />
            <div class="col-auto lastMatch-sets-title pl-1 pr-1">
              SETLER :
            </div>
            <div class="col-auto pl-1">
              <span
                v-for="(l, index) in lastMatch.result.sets"
                :key="index"
                class="ls-item"
              >
                {{ l }}
                {{ index + 1 == lastMatch.result.sets.length ? '' : ' / ' }}
              </span>
            </div>
          </div>

          <div v-if="nextMatch.home && nextMatch.away" class="row align-items-center mt-4">
            <div class="col-4 pl-1 pr-1">
              <div
                v-if="nextMatch.home.logo && nextMatch.home.logo._id"
                class="lastMatch-logo"
              >
                <img
                  :src="
                    storageDir +
                    nextMatch.home.logo.path +
                    '/' +
                    nextMatch.home.logo.filename
                  "
                  class="img-fluid"
                >
              </div>
              <div class="lastMatch-team">
                {{ nextMatch.home.title }}
              </div>
            </div>
            <div class="col-4 pl-0 pr-0">
              <div class="vL-inline-title">
                GELECEK MAÇ
              </div>
              <div class="mt-4 text-center nextMatch-info">
                <span>
                  {{ nextMatch.date }}
                </span>
                <span>
                  SAAT: {{ nextMatch.hour }}
                </span>
                <br>
                <br>
                <span>
                  {{ nextMatch.place }}
                </span>
                <span>
                  {{ nextMatch.city }}
                </span>
              </div>
            </div>
            <div class="col-4 pl-1 pr-1">
              <div
                v-if="nextMatch.away.logo && nextMatch.away.logo._id"
                class="lastMatch-logo"
              >
                <img
                  :src="
                    storageDir +
                    nextMatch.away.logo.path +
                    '/' +
                    nextMatch.away.logo.filename
                  "
                  class="img-fluid"
                >
              </div>
              <div class="lastMatch-team">
                {{ nextMatch.away.title }}
              </div>
            </div>
          </div>
        </div>
        <!-- right side -->
        <div class="col-12 col-md-6 point-list">
          <div class="vL-inline-title">
            PUAN DURUMU
          </div>
          <b-table
            ref="voleybolLigTable"
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
          label: 'S'
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
          label: 'P'
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
        const tableId = this.$refs.voleybolLigTable.localId_
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
.nextMatch-info {
  font-size: .5em;
  font-weight: 500;
}
.point-list {
  border-left: 2px solid #054e97;
}
.vL-inline-title {
  font-size: .8em;
  text-decoration: underline;
  text-align: center;
}
.lastMatch-logo {
  padding: 5px;
}
.lastMatch-team {
  font-size: .6em;
  text-align: center;
  font-weight: 600;
  margin-top: 5px;
}
.last-match-score {
  margin-top: 10px;
  margin-bottom: 10px;
  .score-number {
    font-size: 1.5em;
    font-weight: 600;
  }
  .score-dash {
    font-size: 1.5em;
    text-align: center;
    font-weight: 600;
  }
}
.ls-title {
  font-size: .5em;
  text-align: center;
}
.lastMatch-sets-title {
  font-size: .7em;
  background: #CFD8DC;
}
.ls-item {
  font-size: .7em;
}
.live-url {
  display: block;
  text-align: center;
}
.live-icon {
  width: 60px;
  text-align: center;
}
</style>
