<template>
  <div class="row justify-content-center">
    <div
      v-for="(member, index) in members"
      :key="index"
      class="col-12 col-md-6 col-lg-4 px-4 my-3"
    >
      <div class="row team-member mx-0 align-items-center">
        <div class="col px-0 position-relative">
          <img src="/bb-mask.png" class="img-fluid">
          <div class="member-profile-img text-center">
            <img :src="storageDir + member.path + '/' + member.filename">
          </div>
        </div>
        <div class="col pl-2 py-2">
          <div class="row h-100 mx-0">
            <div class="col-12 px-0 align-self-top">
              <span class="d-block m-title">
                {{ member.pTitle }}
              </span>
            </div>

            <div class="col-12 px-0 align-self-middle">
              <div v-if="template == 'management'" class="m-management-position">
                {{ member.pLocation }}
              </div>

              <div v-else class="row mx-0 member-info">
                <div class="col-5 px-0 font-weight-bold">
                  Mevki
                </div>
                <div class="col-7 px-0">
                  : {{ member.pLocation || '-' }}
                </div>
                <div class="w-100" />
                <div class="col-5 px-0 font-weight-bold text-nowrap">
                  D. Tarihi
                </div>
                <div class="col-7 px-0">
                  : {{ member.pBirthDay || '-' }}
                </div>
                <div class="w-100" />
                <div class="col-5 px-0 font-weight-bold text-nowrap">
                  Boy
                </div>
                <div class="col-7 px-0">
                  : {{ member.pLength || '-' }}
                </div>
                <div class="w-100" />
                <div class="col-5 px-0 font-weight-bold text-nowrap">
                  Uyruk
                </div>
                <div class="col-7 px-0">
                  : {{ member.pCountry || '-' }}
                </div>
                <div class="w-100" />
                <div class="col-5 px-0 font-weight-bold text-nowrap">
                  Milli Forma
                </div>
                <div class="col-7 px-0 font-weight-bold">
                  : {{ member.pCount || '-' }}
                </div>
                <div class="w-100" />
                <div class="col-5 px-0 font-weight-bold text-nowrap">
                  Madalyalar
                </div>
                <div class="col-7 px-0">
                  : {{ member.awards || '-' }}
                </div>
              </div>
            </div>

            <div class="col-12 px-0 align-self-end m-connections">
              <a v-if="member.instagram && member.instagram !== ''" :href="member.instagram" target="_blank">
                <i class="fab fa-instagram" />
              </a>

              <a v-if="member.twitter && member.twitter !== ''" :href="member.twitter" target="_blank">
                <i class="fab fa-twitter" />
              </a>

              <a v-if="member.facebook && member.facebook !== ''" :href="member.facebook" target="_blank">
                <i class="fab fa-facebook" />
              </a>

              <a v-if="member.linkedin && member.linkedin !== ''" :href="member.linkedin" target="_blank">
                <i class="fab fa-linkedin" />
              </a>

              <a v-if="member.envelope && member.envelope !== ''" :href="'mailto://' + member.envelope" target="_blank">
                <i class="fas fa-envelope" />
              </a>
            </div>
          </div>
        </div>
        <div class="bg-mask" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      default: () => { return [] }
    },
    template: {
      type: String,
      default: () => { return 'team' }
    }
  }
}
</script>

<style lang="scss" scoped>
.team-member {
  .bg-mask {
    position: absolute;
    z-index: -1;
    right: 30px;
    width: calc(80% - 30px);
    height: 96%;
    top: 2%;
    background: linear-gradient(0deg, #b5b5b5 0%, #ffffff 100%);
    border-radius: 15% 0 0 15%;
    box-shadow: 0px 0rem 9px 0px rgba(0, 0, 0, 0.53);
  }
  .member-info {
    font-size: 0.8rem;
    color: #3a3a3a;
  }
  .m-title {
    border-bottom: 1px solid #000;
    font-size: 0.8rem;
  }
  .m-management-position {
    font-size: 1rem;
    font-weight: 500;
    margin: 30px 35px;
    color: #3a3a3a;
    text-align: center;
  }
  .member-profile-img {
    position: absolute;
    background: #054e97;
    height: 74%;
    width: 74%;
    display: inline-block;
    overflow: hidden;
    bottom: 13%;
    left: 13%;
    border-radius: 50%;
    img {
      height: 90%;
      margin-top: 10%;
    }
  }
  .m-connections {
    text-align: left;
    a {
      color: #3a3a3a;
      font-weight: 500;
      display: inline-block;
      font-size: 1.1rem;
      margin-right: 5px;
    }
  }
}
</style>
