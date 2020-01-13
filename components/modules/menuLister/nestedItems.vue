<template>
  <div
    v-if="items.length"
    :class="[
      'mP-level',
      root === true &&
        position == 'headerNav'
        ? 'pos-headerNav'
        : '',
      dropdown.behavior &&
        root !== true
        ? 'shadow mP-dropdown-'+dropdown.behavior
        : '',
      dropdown.behavior &&
        dropdown.behavior == 'grid'
        ? 'row'
        : '',
      !dropdown.behavior &&
        root !== true
        ? 'mP-dropdown-list'
        : '',
      ( root===true && position !== 'footer'
        ? 'mP-' + (config.orientation || 'horizontal' )
        : root===true
          ? 'mP-vertical onFooter'
          : ''
      ),
      ( root===true ? 'mP-root' : '' ),
      ( root!==true &&
        dropdown.trigger
        ? 'trigger-'+dropdown.trigger
        : ''
      ),
      ( root!==true && !dropdown.trigger ? 'trigger-hover' : '' ),
    ]"

    :style="[
      dropdown.bgColor ? {'backgroundColor':dropdown.bgColor} : {},
      dropdown.width &&
        dropdown.widthClass !== 'auto' &&
        dropdown.behavior !== 'list'
        ? {'width':dropdown.width + (dropdown.widthClass||'px')}
        : {},
      dropdown.behavior == 'list' ? {'columnCount':dropdown.cols} : {},
      dropdown.widthClass &&
        dropdown.widthClass == '%'
        ? {'left' : 0}
        : {}
    ]"
  >
    <div
      v-for="i in items"
      :key="i.version"
      :class="[
        'mP-item',
        dropdown.behavior && dropdown.behavior == 'grid' ? 'col-'+(i.dropdown.grid_xs || 12) + ' col-md-'+(i.dropdown.grid_md || 'auto') : '',
        i.hideOnMobile && i.hideOnMobile === 'true' ? 'hideOnMobile' : ''
      ]"
    >
      <img
        v-if="
          i.showType &&
            i.image &&
            i.image !== '' &&
            i.showType == 'image'
        "
        :src="storageDir + i.image"
        class="img-fluid"
      >
      <!--i.link || 'javascript:void(0);'-->
      <nuxt-link
        v-if="['link', 'html'].indexOf(i.behavior) == -1"
        :class="[
          'mP-link',
          ( root !== true ? 'mP-subLink' : '' ),
          ( i.textAlign ? 'text-'+i.textAlign:'text-left' ),
          ( i.childrens && i.childrens.length > 0 ? 'has-childs' : '')
        ]"
        :to="
          i.behavior == 'page' && i.linkData && i.linkData._id
            ? '/' + i.linkData.slug[appData.settings.defaultLang]
          : i.behavior == 'category' && i.linkData && i.linkData._id
            ? '/category' + i.linkData.slugs[appData.settings.defaultLang]
          : i.behavior == 'content' && i.linkData && i.linkData._id
            ? '/content' + i.linkData.content[appData.settings.defaultLang].slug
          : 'javascript:void(0);'
        "
      >
        <span v-if="i.showType && i.showType == 'icon'" class="mP-icon">
          <img
            v-if="i.showType && i.image && i.image !== '' && i.showType == 'icon'"
            :src="storageDir + i.image"
            class="img-fluid"
          >
        </span>
        {{ i.name }}
      </nuxt-link>
      <a
        v-else-if="i.behavior == 'link'"
        :href="i.link"
        :target="i.target||'_self'"
        :class="[
          'mP-link',
          ( i.textAlign ? 'text-'+i.textAlign:'text-left' ),
          ( i.childrens && i.childrens.length > 0 ? 'has-childs' : '')
        ]"
      >
        <span v-if="i.showType && i.showType == 'icon'" class="mP-icon">
          <img
            v-if="i.showType && i.image && i.image !== '' && i.showType == 'icon'"
            :src="storageDir + i.image"
            class="img-fluid"
          >
        </span>
        {{ i.name }}
      </a>

      <div v-else-if="i.behavior == 'html'" v-html="i.htmlContent" class="ql-editor mb-4" />

      <nested-items
        v-if="position !== 'footer' && i.childrens.length"
        :items="i.childrens"
        :config="config"
        :root="false"
        :dropdown="i.dropdown || {}"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'NestedItems',
  props: {
    items: {
      required: true,
      type: Array
    },
    config: {
      required: true,
      type: Object
    },
    dropdown: {
      default: () => { return {} },
      type: Object
    },
    root: {
      required: true,
      type: Boolean
    },
    position: {
      type: String,
      default: () => { return 'default' }
    }
  }
}
</script>
