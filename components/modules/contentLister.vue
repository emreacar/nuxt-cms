<template>
  <div class="row mx-0 page-category justify-content-center">
    <div
      v-if="data.settings.showTitle && data.settings[appData.settings.defaultLang]"
      class="col-12 g-module-header yF-header mb-2 py-2 shadow-lg"
    >
      <span v-if="data.settings.icon" class="module-header-icon mr-2">
        <i :class="data.settings.icon" />
      </span>
      <span>
        {{ data.settings[appData.settings.defaultLang] }}
      </span>
    </div>

    <div v-for="(content, pi) in data.content" :key="pi" class="col-12 my-2">
      <div class="row">
        <div class="col-12 col-md-5 col-lg-4">
          <img
            v-if="content.modules.cover.length"
            :data-src="storageDir + content.modules.cover[0].path + '/' + content.modules.cover[0].filename"
            src="/placeholder.jpg"
            class="content-image lazyload shadow my-2"
          >
          <img
            v-else
            src="/placeholder.jpg"
            class="content-image shadow my-2"
          >

          <div v-if="content.modules.gallery && content.modules.gallery.length" class="row border-top mx-0 my-2 pt-4">
            <div
              v-for="(img,index) in content.modules.gallery"
              :key="index"
              v-on:click="showGalleryImage(index)"
              class="col-6 col-md-4 mb-4 px-2 gallery-item position-relative"
            >
              <img
                :data-src="
                  storageDir +
                  img.path +
                  '/' +
                  img.filename
                "
                :alt="
                  img.titles &&
                  img.titles[appData.settings.defaultLang]
                  ? img.titles[appData.settings.defaultLang]
                  : ''
                "
                src="/placeholder.jpg"
                class="img-fluid shadow-sm lazyload"
              >
              <div class="zoom-icon">
                <i class="fas fa-search-plus" />
              </div>
            </div>

            <b-modal
              id="ImageViewer"
              body-bg-variant="dark px-0 py-0 d-contents text-center i-modal"
              centered
              hide-header
              hide-footer
            >
              <div v-if="currentImage !== -1" class="w-100">
                <img
                  :src="
                    storageDir +
                    content.modules.gallery[currentImage].path +
                    '/' +
                    content.modules.gallery[currentImage].filename"
                  class="img-fluid text-center"
                >
              </div>
              <div v-if="content.modules.gallery[currentImage].languages.indexOf(appData.settings.defaultLang) > -1" class="image-captions">
                <h5
                  v-if="
                    content.modules.gallery[currentImage].titles &&
                      content.modules.gallery[currentImage].titles[appData.settings.defaultLang]
                  "
                >
                  {{ content.modules.gallery[currentImage].titles[appData.settings.defaultLang] }}
                </h5>
                <p
                  v-if="
                    content.modules.gallery[currentImage].descriptions &&
                      content.modules.gallery[currentImage].descriptions[appData.settings.defaultLang]
                  "
                >
                  {{ content.modules.gallery[currentImage].descriptions[appData.settings.defaultLang] }}
                </p>
              </div>
              <div v-if="content.modules.gallery.length" class="i-pager">
                <button v-if="currentImage > 0" v-on:click="--currentImage" class="prev shadow">
                  <i class="fas fa-angle-left" />
                </button>

                <button v-if="currentImage + 1 < content.modules.gallery.length" v-on:click="++currentImage" class="next shadow">
                  <i class="fas fa-angle-right" />
                </button>
              </div>
            </b-modal>
          </div>
        </div>

        <div class="col-12 col-md-7 col-lg-8 border-bottom pb-2">
          <div class="cs-metas">
            <span v-if="content.settings.authorInfo === true" class="cs-author">
              <i class="fas fa-user" />
              {{ content.author.title }}
            </span>
            <span class="cs-date">
              <i class="fas fa-clock" />
              {{ $moment(content.updatedAt).from() }}
            </span>
          </div>
          <h1 class="h2 c-title">
            {{ content.content[appData.settings.defaultLang].title }}
          </h1>
          <div v-html="content.content[appData.settings.defaultLang].content" class="c-description ql-editor ql-content" />
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
      currentImage: 0
    }
  },
  methods: {
    showGalleryImage (galleryIndex) {
      this.currentImage = galleryIndex
      this.$bvModal.show('ImageViewer')
    }
  }
}
</script>

<style lang="scss" scoped>
.i-modal {
  position: relative;
  .image-captions {
    position: absolute;
    bottom: 15px;
    left: 15px;
    z-index: 12;
    width: 90%;
    text-align: left;
    h5, p {
      margin: 0;
      color: #fff;
      text-shadow: 0px 1px 3px #000;
      font-weight: 400;
    }
  }
  .i-pager {
    position: absolute;
    top: 50%;
    left: 0;
    padding: 15px;
    margin-top: -30px;
    width: 100%;

    button {
      background: #ffffff;
      color: #004e97;
      font-weight: 400;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      line-height: 25px;
      margin: 0;
      padding: 0;
      text-align: center;
      outline: none;
      transition: all 0.3s;
      &.next {
        float: right;
      }

      &.prev {
        float: left;
      }

      &:hover {
        background: #004e97;
        color: #fff;
        transition: all 0.3s;
      }
    }
  }
}
.gallery-item {
  .zoom-icon {
    position: absolute;
    font-size: 2.3rem;
    color: #fff;
    text-align: center;
    z-index: 2;
    top: 50%;
    margin-top: -1.6rem;
    width: 100%;
    text-shadow: 1px 1px 20px #2d2d2d;
    opacity:0;
    transition: .4s;
  }
  &:hover {
    .zoom-icon {
      opacity: 1;
      transition: .4s;
    }
  }
  img {
    border-radius: 16px;
  }
}
.cs-metas {
  font-size: .8rem;
  color: #bfbfbf;
  display: inline-block;
  span {
    margin-right: 6px;
  }
}
.content-image {
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
}
.cs-buttons {
  font-size: .8rem;
  display: inline-block;
  span {
    font-weight: 600;
    display: inline-block;
    margin-right: 6px;
    padding: 4px;
    color: #1d4895;
  }
  button {
    outline: none !important;
    background: transparent;
    border: none !important;
    font-size: 1.1rem;
    &.fb-item {
      background-color: #4267B2;
      color: #fff;
    }
    &.tw-item {
      background-color: #1DA1F2;
      color: #fff;
    }
    &.env-item {
      background-color: #F77737;
      color: #fff;
    }
    &.wp-item {
      background-color: #25D366;
      color: #fff;
    }
  }
}
</style>
