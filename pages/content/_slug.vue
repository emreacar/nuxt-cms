<template>
  <div class="row mx-0 content-wrapper">
    <div v-if="content && content._id" class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-11 col-md-10 col-lg-9">
          <div class="w-100">
            <ul class="b-crumb">
              <li>
                <nuxt-link to="/anasayfa">
                  <i class="fas fa-home" />
                </nuxt-link>
              </li>
              <li v-for="(c,index) in categoryPath" :key="index">
                <span>
                  <i class="fas fa-angle-right" />
                </span>
                {{ c.titles[appData.settings.defaultLang] }}
              </li>
              <li v-if="content.category && content.category._id">
                <span>
                  <i class="fas fa-angle-right" />
                </span>
                <nuxt-link :to="'/category/' + content.category.slugs[appData.settings.defaultLang]">
                  {{ content.category.titles[appData.settings.defaultLang] }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="cs-buttons float-right">
            <span>
              PAYLAŞ
            </span>
            <button
              v-on:click="shareThis('facebook')"
              class="fb-item"
            >
              <i class="fab fa-facebook-f" />
            </button>

            <button
              v-on:click="shareThis('twitter')"
              class="tw-item"
            >
              <i class="fab fa-twitter" />
            </button>

            <button
              v-on:click="shareThis('whatsapp')"
              class="wp-item"
            >
              <i class="fab fa-whatsapp" />
            </button>

            <button
              v-on:click="shareThis('email')"
              class="env-item"
            >
              <i class="fas fa-envelope" />
            </button>
          </div>
          <img
            v-if="content.modules.cover.length"
            :data-src="storageDir + content.modules.cover[0].path + '/' + content.modules.cover[0].filename"
            src="/placeholder.jpg"
            class="content-image lazyload shadow my-2"
          >
          <h1 class="h2 c-title">
            {{ content.content[appData.settings.defaultLang].title }}
          </h1>
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

          <div v-html="content.content[appData.settings.defaultLang].content" class="c-description ql-editor ql-content" />

          <div v-if="content.modules.gallery && content.modules.gallery.length" class="row border-top mx-0 my-2 pt-4">
            <div class="pl-2 col-12 mb-4">
              <h4 class="gallery-title">
                İçerik Galerisi
              </h4>
            </div>

            <div
              v-for="(img,index) in content.modules.gallery"
              :key="index"
              v-on:click="showGalleryImage(index)"
              class="col-6 col-md-3 mb-4 px-2 gallery-item position-relative"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  layout: 'content',
  async asyncData ({ store, app, params, error }) {
    let apiContent = params.content || {}
    let categoryPath = params.categoryPath || []
    if (!params.content) {
      const fromApi = await app.$axios
        .$get('page/link', { params: { slug: params.slug } })

      apiContent = fromApi.content ? fromApi.content[0] : {}
      categoryPath = fromApi.categoryPath || []
    }

    return {
      content: apiContent,
      currentImage: 0,
      categoryPath
    }
  },
  methods: {
    showGalleryImage (galleryIndex) {
      this.currentImage = galleryIndex
      this.$bvModal.show('ImageViewer')
    }
  },
  head () {
    const stripRegex = /(<([^>]+)>)/ig
    const headData = this.content
      ? {
        title: this.content.content[this.appData.settings.defaultLang].title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.content.content[this.appData.settings.defaultLang].content.replace(stripRegex, '').substr(0, 150)
          }
        ]
      }
      : {}
    return headData
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
