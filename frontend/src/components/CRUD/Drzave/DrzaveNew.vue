<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">New Drzave</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Država (SI)</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="Država (SI)"
              v-model="drzava_slo"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Država</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="Država" v-model="drzava_iso"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Oznaka (2)</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="Oznaka (2)"
              v-model="oznaka_dvomestna"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Oznaka (3)</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="Oznaka (3)"
              v-model="oznaka_tromestna"
            ></v-text-field>
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

  export default {
    data() {
      return {
        id: null,

        drzava_slo: '',

        drzava_iso: '',

        oznaka_dvomestna: '',

        oznaka_tromestna: '',
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
          drzava_slo: this.drzava_slo,

          drzava_iso: this.drzava_iso,

          oznaka_dvomestna: this.oznaka_dvomestna,

          oznaka_tromestna: this.oznaka_tromestna,
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
        this.drzava_slo = '';

        this.drzava_iso = '';

        this.oznaka_dvomestna = '';

        this.oznaka_tromestna = '';
      },
    },
    async beforeMount() {},
    watch: {},
    components: {
      ImageUploader,
      FileUploader,
      VDatetimePicker: () =>
        import('vuetify-datetime-picker/src/components/DatetimePicker.vue'),
    },
  };
</script>
