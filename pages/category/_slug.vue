<template>
  <div class="row mx-0 content-wrapper">
    <div v-if="category && category._id" class="container">
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
              <li>
                <span>
                  <i class="fas fa-angle-right" />
                </span>
                <nuxt-link :to="'/category/' + category.slugs[appData.settings.defaultLang]">
                  {{ category.titles[appData.settings.defaultLang] }}
                </nuxt-link>
              </li>
            </ul>
          </div>

          <div
            v-for="c in content"
            :key="c._id"
            class="row page-category-item py-2 mb-2 border-bottom"
          >
            <div class="col-12 col-md-5 col-lg-4 mb-4 mb-mb-0 pr-md-1 item-image">
              <nuxt-link
                :to="{
                  name: 'content-slug',
                  params: {
                    slug: c.content[appData.settings.defaultLang].slug,
                    content: c,
                    categoryPath
                  }
                }
                "
              >
                <img
                  v-if="c.modules.cover.length"
                  :data-src="storageDir + c.modules.cover[0].path + '/' + c.modules.cover[0].filename"
                  src="/placeholder.jpg"
                  class="img-fluid lazyload shadow"
                >
                <img
                  v-else
                  src="/placeholder.jpg"
                  class="img-fluid shadow"
                >
              </nuxt-link>
            </div>
            <div class="col-12 col-md-7 col-lg-8">
              <h2 class="item-title">
                <nuxt-link
                  :to="{
                    name: 'content-slug',
                    params: {
                      slug: c.content[appData.settings.defaultLang].slug,
                      content: c,
                      categoryPath
                    }
                  }
                  "
                >
                  {{ c.content[appData.settings.defaultLang].title }}
                </nuxt-link>
              </h2>
              <div class="cs-metas">
                <span v-if="c.settings.authorInfo === true" class="cs-author">
                  <i class="fas fa-user" />
                  {{ c.author.title }}
                </span>
                <span class="cs-date">
                  <i class="fas fa-clock" />
                  {{ $moment(c.updatedAt).from() }}
                </span>
              </div>

              <p class="item-content">
                {{ c.content[appData.settings.defaultLang].content.replace(stringRegex, '').substr(0, 200) + '...' }}
              </p>
              <nuxt-link
                :to="{
                  name: 'content-slug',
                  params: {
                    slug: c.content[appData.settings.defaultLang].slug,
                    content: c,
                    categoryPath
                  }
                }
                "
                class="float-right read-more"
              >
                Devamını Oku <i class="fas fa-angle-right" />
              </nuxt-link>
            </div>
          </div>

          <div class="w-100 paging text-center">
            <nuxt-link v-if="currentPage > 1" :to="'?page=' + (currentPage - 1)">
              <i class="fas fa-angle-left" />
              Önceki Sayfa
            </nuxt-link>

            <nuxt-link v-if="nextPage" :to="'?page=' + nextPage">
              Sonraki Sayfa
              <i class="fas fa-angle-right" />
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  scrollToTop: true,
  loading: false,
  layout: 'category',
  watchQuery: ['page'],
  // Key for <NuxtChild> (transitions)
  key: to => to.fullPath,
  // Called to know which transition to apply
  transition (to, from) {
    if (!from) { return 'slide-left' }
    return +to.query.page < +from.query.page ? 'slide-right' : 'slide-left'
  },
  async asyncData ({ store, app, params, query, error }) {
    const currentPage = query.page || 1
    const pageLimit = 15
    const { category, content, categoryPath, totalContent } = await app.$axios.$get(
      'page/link',
      { params:
        {
          slug: params.slug,
          page: currentPage,
          limit: pageLimit
        }
      }
    )
    store.commit('setModules', [])

    return {
      stringRegex: /(<([^>]+)>)/ig,
      categoryPath,
      content,
      category,
      totalContent,
      currentPage,
      nextPage: pageLimit * currentPage < totalContent ? parseInt(currentPage) + 1 : false
    }
  }
}
</script>

<style lang="scss" scoped>
.paging {
  a {
    display: inline-block;
    font-size: 12px;
    padding: 4px 9px;
    border: 1px solid blue;
    color: blue;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s;
    &:hover {
      background: blue;
      color: #fff;
      transition: all 0.3s;
    }
  }
}
.page-category-item {
  .item-image img {
    border-radius: 12px;
  }
  .cs-metas {
    font-size: 12px;
    span {
      margin-right: 10px;
      color: #5d5d5d;
      i {
        margin-right: 3px;
      }
    }
  }
  .item-title {
    font-size: 1.4rem;
    color: #1e4794;
  }
  .item-content {
    margin-top: 10px;
  }
  .read-more {
    font-size: 12px;
    padding: 4px 9px;
    border: 1px solid blue;
    color: blue;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s;
    &:hover {
      background: blue;
      color: #fff;
      transition: all 0.3s;
    }
  }
}
</style>
