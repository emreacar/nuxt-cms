<template>
  <div class="row mx-0 justify-content-center contactForm py-4 shadow-sm">
    <div class="col-12 col-md-8">
      <h5>
        İletişim Formu
      </h5>
    </div>
    <div class="col-12 col-md-8">
      <div v-if="data.settings.form_NameSurname && data.settings.form_NameSurname === 'true'" class="form-group">
        <label>
          Ad Soyad
        </label>
        <input v-model="formData.form_NameSurname" type="text" placeholder="Ad Soyad" class="form-control">
      </div>

      <div v-if="data.settings.form_Mail && data.settings.form_Mail === 'true'" class="form-group">
        <label>
          E-Mail
        </label>
        <input v-model="formData.form_Mail" type="email" placeholder="isim@email.com" class="form-control">
      </div>

      <div v-if="data.settings.form_Company && data.settings.form_Company === 'true'" class="form-group">
        <label>
          Şirket
        </label>
        <input v-model="formData.form_Company" type="text" placeholder="Şirket Adınız" class="form-control">
      </div>

      <div v-if="data.settings.form_City && data.settings.form_City === 'true'" class="form-group">
        <label>
          Şehir
        </label>
        <input v-model="formData.form_City" type="text" placeholder="Yaşadığınız Şehir" class="form-control">
      </div>

      <div v-if="data.settings.form_Subject && data.settings.form_Subject === 'true'" class="form-group">
        <label>
          Konu
        </label>
        <input v-model="formData.form_Subject" type="text" placeholder="İletişim Konusu" class="form-control">
      </div>

      <div v-if="data.settings.form_Message && data.settings.form_Message === 'true'" class="form-group">
        <label>
          Mesajınız
        </label>
        <textarea v-model="formData.form_Message" placeholder="Mesajınız" class="form-control" />
      </div>
      <div class="row mb-2">
        <div class="col-7">
          <b-form-checkbox
            v-if="data.settings.form_Agreement &&
              data.settings.form_Agreement === 'true'"
            v-model="formData.form_Agreement"
            value="true"
            unchecked-value="false"
            class="d-inline-block pr-0"
          />
          <span
            v-if="data.settings.form_Agreement &&
              data.settings.form_Agreement === 'true'"
            v-on:click="$bvModal.show('agreement')"
            class="text-primary d-inline-block cursor-pointer"
            style="font-size: .7em;"
          >
            Gönderim Koşullarını Kabul Ediyorum
          </span>
        </div>
        <div class="col-5 text-right">
          <button
            v-on:click="sendForm()"
            class="btn btn-sm btn-primary d-inline-block"
          >
            <i class="fas fa-check" />
            Gönder
          </button>
        </div>
      </div>

      <div v-if="error" v-html="error" class="alert alert-danger" />
      <div v-if="success" v-html="success" class="alert alert-success" />

      <b-modal id="agreement" hide-footer title="Gönderim Koşulları">
        <div v-html="data.settings.form_AgreementText" class="ql-editor" />
      </b-modal>
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
      formData: {},
      error: false,
      success: false
    }
  },
  methods: {
    async sendForm () {
      this.error = false
      this.success = false
      // eslint-disable-next-line
      const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

      const formItems = [
        'form_NameSurname',
        'form_Mail',
        'form_Company',
        'form_City',
        'form_Subject',
        'form_Message',
        'form_Agreement'
      ]

      formItems.forEach((check) => {
        if (
          this.data.settings[check] &&
            this.data.settings[check] === 'true'
        ) {
          if (!this.formData[check] || this.formData[check].trim() === '') {
            this.error = 'Lütfen tüm alanları doldurun.'
          } else {
            if (check === 'form_Mail' && !re.test(this.formData[check])) {
              this.error = 'Lütfen mail adresinizi kontrol edin.'
            }

            if (check === 'form_Agreement' && this.formData[check] !== 'true') {
              this.error = 'Lütfen gönderim koşullarını kontrol edin.'
            }
          }
        }
      })

      if (!this.error) {
        const { status, error } = await this.$store.dispatch('send', {
          path: 'app/module/contactForm',
          data: {
            mailData: this.formData
          }
        })

        if (error && error !== '') {
          this.error = error
        }

        if (status && status === 'ok') {
          this.formData = {}
          this.success = 'Teşekkürler!<br >Mesajınız bize ulaştı. En kısa sürede cevap vereceğiz.'
        }
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.contactForm {
  background: #f7f7f7;
}
.form-group {
  margin-bottom: .3em;
  label {
    font-size: 80%;
    margin-bottom: .1em;
  }
}
</style>
