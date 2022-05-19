<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">Edit Postne_stevilke</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Poštna številka</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="Poštna številka"
              v-model="postna_stevilka"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Kraj</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="Kraj" v-model="kraj"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Država</p>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="id_drzave"
              :items="optionsId_drzave.map((item) => item.label)"
              :search-input.sync="searchModelId_drzave"
              label="Država"
            >
            </v-autocomplete>
          </v-col>

          <v-col cols="12 mt-5">
            <v-btn type="submit" color="primary" :loading="loading">
              Save
            </v-btn>

            <v-btn @click="formatData" class="ml-2"> Reset </v-btn>

            <router-link :to="cancelUrl" class="text-decoration-none">
              <v-btn type="button" class="ml-2"> Cancel </v-btn>
            </router-link>
          </v-col>
        </v-row>
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
        postna_stevilka: '',

        kraj: '',

        id_drzave: '',
        searchModelId_drzave: '',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.postne_stevilkeForm.data,
        loading: (state) => state.postne_stevilkeForm.loading,

        optionsId_drzave: (state) =>
          state.postne_stevilkeForm.searchResultId_drzave,
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
        getData: 'postne_stevilkeForm/getData',

        searchId_drzave: 'postne_stevilkeForm/searchId_drzave',

        edit: 'postne_stevilkeForm/edit',
      }),
      async submitHandler() {
        const data = this.data;

        data.postna_stevilka = this.postna_stevilka;

        data.kraj = this.kraj;

        data.id_drzave = this.id_drzave;

        const id_drzaveEl = this.optionsId_drzave.filter(
          (i) => i.label === this.id_drzave,
        );
        data.id_drzave = id_drzaveEl.length ? id_drzaveEl[0].id : null;

        try {
          await this.edit({ id: this.id, data });
          this.$router.push('/admin/postne_stevilke');
        } catch (e) {
          this.showSnackbar(e);
        }
      },

      formatData() {
        this.postna_stevilka = this.data.postna_stevilka;

        this.kraj = this.data.kraj;

        this.id_drzave = dataFormatter.drzaveOneListFormatter(
          this.data.id_drzave,
        );
      },
    },
    async beforeMount() {
      try {
        await this.searchId_drzave();

        const pathArray = this.$route.fullPath.split('/');
        const id = pathArray[pathArray.length - 2];
        this.id = id;
        await this.getData(id);

        this.formatData();
      } catch (e) {
        this.showSnackbar(e);
      }
    },
    watch: {
      async searchModelId_drzave() {
        await this.searchId_drzave(this.searchModelId_drzave);
      },
    },
    components: {
      ImageUploader,
      FileUploader,
      VDatetimePicker: () =>
        import('vuetify-datetime-picker/src/components/DatetimePicker.vue'),
    },
  };
</script>
