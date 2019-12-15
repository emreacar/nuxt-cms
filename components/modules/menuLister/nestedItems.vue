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
        ? 'mP-dropdown-'+dropdown.behavior
        : '',
      dropdown.behavior &&
        dropdown.behavior == 'grid'
        ? 'row'
        : '',
      !dropdown.behavior &&
        root !== true
        ? 'mP-dropdown-list'
        : '',
      ( root===true ? ' mP-' + (config.orientation || 'horizontal' ) : '' ),
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
      v-for="(i, index) in items"
      :key="i.version"
      :class="[
        'mP-item',
        root === true &&
          index === 0
          ? 'active'
          : '',
        dropdown.behavior && dropdown.behavior == 'grid' ? 'col-'+(i.dropdown.grid_xs || 12) + ' col-md-'+(i.dropdown.grid_md || 'auto') : '',
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
      <a
        :class="[
          'mP-link',
          ( i.textAlign ? 'text-'+i.textAlign:'text-left' )
        ]"
        :href="i.link || 'javascript:void(0);'"
        :target="i.target||'_self'"
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

      <nested-items
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
      default: () => { return '' }
    }
  }
}
</script>
