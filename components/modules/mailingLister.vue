<template>
  <div class="d-block w-100 mailingList text-center">
    <h6 class="text-white">
      Yeniliklerden Haberdar Olun
    </h6>
    <div v-if="error" class="alert alert-danger">
      {{ error }}
    </div>

    <div v-if="success" class="alert alert-success">
      {{ success }}
    </div>
    <div class="form-group">
      <input v-model="userMail" type="mail" placeholder="Mail Adresiniz">
      <button v-on:click="addEmail()">
        <i class="fas fa-check" />
        Kayıt Ol
      </button>
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
      userMail: '',
      error: false,
      success: false
    }
  },
  methods: {
    async addEmail () {
      this.error = false
      this.success = false
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      if (re.test(this.userMail)) {
        const { status } = await this.$store.dispatch('send', {
          path: 'app/module/newsletter',
          data: {
            moduleId: this.data._id,
            email: this.userMail
          }
        })
        if (status === 'added') {
          this.success = 'Teşekkürler! Bültenimize kayıt oldunuz.'
          this.userMail = ''
        } else {
          this.error = status
        }
      } else {
        this.error = 'Mail adresinizi kontrol edin.'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mailingList {
  .form-group {
    position: relative;
    input {
      width: 100%;
      border-radius: 12px;
      padding: 10px;
      outline: none !important;
      border: none !important;
      font-size: .8em;
      height: 45px;
    }
    button {
      position: absolute;
      right: 0;
      height: 45px;
      border: none;
      outline: none;
      padding: 0 1em;
      background: #87bb36;
      color: #fff;
      font-size: .8em;
      border-radius: 12px;
      transition: all .3s;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
      &:hover {
        transition: all .3s;
        box-shadow: 0 0.125rem 1.25rem rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
