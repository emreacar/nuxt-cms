<template>
  <div class="row mx-0 position-topBar d-none d-md-flex">
    <div class="container">
      <div class="row">
        <div
          v-if="appData.settings && appData.settings.social"
          class="col-12 col-md-5 text-left"
        >
          <a
            v-for="(href, social) in appData.settings.social"
            :key="social"
            :href="href"
            target="_blank"
            class="s-item"
          >
            <i :class="['fab', 'fa-'+social]" />
          </a>
        </div>

        <div
          v-if="appData.settings && appData.settings.contacts"
          class="col-12 col-md-7 ml-auto text-right"
        >
          <div class="c-item">
            <i class="fas fa-phone-alt" />
            {{ appData.settings.contacts[0].phone }}
          </div>

          <div class="c-item">
            <i class="fas fa-paper-plane" />
            {{ appData.settings.contacts[0].email }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.position-topBar {
  font-size: 1rem;
  background: #bebebe;
  color: #3a3a3a;
    i {
      color: #3a3a3a;
    }
    a {
      text-decoration: none;
      color: inherit;
    }
    .s-item {
      margin-right: 10px;
    }
    .c-item {
      display: inline-block;
      &:first-child {
        margin-right: 20px;
      }
    }
}
</style>
