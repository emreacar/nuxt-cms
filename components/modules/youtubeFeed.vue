<template>
  <div class="row mx-0">
    <div
      v-if="
        data.settings.showHeader &&
          data.settings[appData.settings.defaultLang]"
      class="col-12 g-module-header yF-header mb-3 py-2 shadow-lg"
    >
      <span class="module-header-icon">
        <i class="fab fa-youtube" />
      </span>
      <span class="ml-2">
        {{ data.settings[appData.settings.defaultLang] }}
      </span>
    </div>

    <div class="col-12 px-0">
      <div class="row">
        <div
          v-for="(v, index) in videos"
          :key="index"
          class="col-6 col-md-3 mb-2"
        >
          <div v-on:click="playVideo(v.id.videoId)" class="h-100 yF-item">
            <div class="yF-thumb">
              <img :src="v.snippet.thumbnails.medium.url">
              <div class="play-icon">
                <i class="fab fa-youtube" />
              </div>
            </div>
            <div class="yF-meta">
              <span v-if="data.settings.showViews !== 'false'" class="mr-2">
                <i class="fas fa-eye" />
                {{ v.details.items[0].statistics.viewCount }}
              </span>
              <span v-if="data.settings.showLikes !== 'false'" class="mr-2">
                <i class="fas fa-heart" />
                {{ v.details.items[0].statistics.likeCount }}
              </span>
              <span v-if="data.settings.showComments" class="mr-2">
                <i class="fas fa-comments" />
                {{ v.details.items[0].statistics.commentCount }}
              </span>
              <span v-if="data.settings.showDate !== 'false'">
                <i class="fas fa-clock" />
                {{ $moment(v.snippet.publishedAt).from() }}
              </span>
            </div>
            <div
              v-if="data.settings.showTitle !== 'false'"
              class="yF-title"
            >
              {{ v.snippet.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- youtube player -->
    <b-modal
      ref="playerModal"
      size="lg"
      body-bg-variant="dark px-0 py-0 d-contents"
      centered
      hide-footer
      hide-header
    >
      <div v-if="playerWaiting" class="text-center text-white pt-4">
        <i class="fas fa-spin fa-spinner" /> Video Yükleniyor...
      </div>
      <youtube
        ref="youtube"
        :video-id="currentVideo"
        @ready="playerReady"
        width="100%"
      />
    </b-modal>
    <!-- youtube player -->
  </div>
</template>

<script>
import { Youtube } from 'vue-youtube'

export default {
  components: {
    Youtube
  },
  props: {
    data: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {
    return {
      loading: true,
      videos: [],
      playerWaiting: false,
      currentVideo: false
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
  mounted () {
    this.getModuleData()
  },
  methods: {
    async getModuleData () {
      const { videos } = await this.$store.dispatch('send', {
        path: 'app/module/youtubeFeed',
        data: {
          moduleData: this.data
        }
      })

      this.videos = videos
      this.loading = false
    },
    playerReady () {
      this.playerWaiting = false
      this.player.playVideo()
    },
    playVideo (videoId) {
      this.currentVideo = videoId
      this.playerWaiting = true
      this.$refs.playerModal.show()
    }
  }
}
</script>

<style lang="scss" scoped>
.yF-item {
  .yF-title {
    font-size: .9rem;
    font-weight: 500;
  }
  .yF-meta {
    font-size: .8rem;
    color: #5e6062;
  }
  .yF-thumb {
    position: relative;
    img {
      width: 100%;
    }
    .play-icon {
      position: absolute;
      font-size: 4rem;
      color: #fff;
      text-align: center;
      z-index: 2;
      top: 50%;
      margin-top: -3rem;
      width: 100%;
      text-shadow: 1px 1px 20px #2d2d2d;
      opacity:0;
      transition: .4s;
    }
  }
  &:hover {
    cursor: pointer;

    .play-icon {
      opacity: 1;
      transition: .4s;
    }
  }
}
</style>
