<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">New Drzave</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">drzava_lokalno</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="drzava_lokalno"
              v-model="drzava_lokalno"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">oznaka_drzave</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="oznaka_drzave"
              v-model="oznaka_drzave"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">drzava_iso</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="drzava_iso"
              v-model="drzava_iso"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">opombe</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="opombe" v-model="opombe"></v-text-field>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary" :loading="loading"> Save </v-btn>

        <v-btn @click="resetData" class="ml-2"> Reset </v-btn>

        <router-link :to="cancelUrl" class="text-decoration-none">
          <v-btn type="button" class="ml-2"> Cancel </v-btn>
        </router-link>
      </div>
    </form>
  </v-card>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import dataFormatter from '@/use/dataFormatter.js';
  import ImageUploader from '@/components/Uploaders/ImageUploader';
  import FileUploader from '@/components/Uploaders/FileUploader';
  import Editor from '@tinymce/tinymce-vue';

  export default {
    data() {
      return {
        id: null,

        drzava_lokalno: '',

        oznaka_drzave: '',

        drzava_iso: '',

        opombe: '',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.drzaveForm.data,
        loading: (state) => state.drzaveForm.loading,
      }),

      cancelUrl() {
        return (
          '/' + this.$route.fullPath.split('/').slice(1).splice(0, 2).join('/')
        );
      },
      dataFormatter() {
        return dataFormatter;
      },
    },
    methods: {
      ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
      }),
      ...mapActions({
        newHandler: 'drzaveForm/newHandler',
      }),
      async submitHandler() {
        const data = {
          drzava_lokalno: this.drzava_lokalno,

          oznaka_drzave: this.oznaka_drzave,

          drzava_iso: this.drzava_iso,

          opombe: this.opombe,
        };

        try {
          await this.newHandler({ data });
          this.$router.push('/admin/drzave');
        } catch (e) {
          console.log(e);
          this.showSnackbar(e);
        }
      },

      resetData() {
        this.drzava_lokalno = '';

        this.oznaka_drzave = '';

        this.drzava_iso = '';

        this.opombe = '';
      },
    },
    async beforeMount() {},
    watch: {},
    components: {
      ImageUploader,
      FileUploader,
      Editor,
      VDatetimePicker: () =>
        import('vuetify-datetime-picker/src/components/DatetimePicker.vue'),
    },
  };
</script>
