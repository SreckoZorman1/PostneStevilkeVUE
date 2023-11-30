<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">Edit Drzave</h4>
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
  import Editor from '@tinymce/tinymce-vue';

  export default {
    data() {
      return {
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
        getData: 'drzaveForm/getData',

        edit: 'drzaveForm/edit',
      }),
      async submitHandler() {
        const data = this.data;

        data.drzava_lokalno = this.drzava_lokalno;

        data.oznaka_drzave = this.oznaka_drzave;

        data.drzava_iso = this.drzava_iso;

        data.opombe = this.opombe;

        try {
          await this.edit({ id: this.id, data });
          this.$router.push('/admin/drzave');
        } catch (e) {
          this.showSnackbar(e);
        }
      },

      formatData() {
        this.drzava_lokalno = this.data.drzava_lokalno;

        this.oznaka_drzave = this.data.oznaka_drzave;

        this.drzava_iso = this.data.drzava_iso;

        this.opombe = this.data.opombe;
      },
    },
    async beforeMount() {
      try {
        const pathArray = this.$route.fullPath.split('/');
        const id = pathArray[pathArray.length - 2];
        this.id = id;
        await this.getData(id);

        this.formatData();
      } catch (e) {
        this.showSnackbar(e);
      }
    },
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
