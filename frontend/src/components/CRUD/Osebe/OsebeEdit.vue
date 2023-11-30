<template>
  <v-card class="mt-6 py-3">
    <form @submit.prevent="submitHandler">
      <div class="px-8">
        <v-row>
          <v-col cols="12">
            <h4 class="page-title">Edit Osebe</h4>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">ime</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="ime" v-model="ime"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">priimek</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="priimek" v-model="priimek"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">emso</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="emso" v-model="emso"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">spol</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="spol" v-model="spol"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">datum_rojstva</p>
          </v-col>
          <v-col cols="9">
            <v-menu
              v-model="dateDatum_rojstva"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="datum_rojstva"
                  label="datum_rojstva"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="datum_rojstva"
                @input="dateDatum_rojstva = false"
              ></v-date-picker>
            </v-menu>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">naslov</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="naslov" v-model="naslov"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">enaslov</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="enaslov" v-model="enaslov"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">telefon</p>
          </v-col>
          <v-col cols="9">
            <v-text-field label="telefon" v-model="telefon"></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">davcna_stevilka</p>
          </v-col>
          <v-col cols="9">
            <v-text-field
              label="davcna_stevilka"
              v-model="davcna_stevilka"
            ></v-text-field>
          </v-col>

          <v-col cols="3" class="d-flex align-center">
            <p class="fs-normal greyBold--text mb-0">Poštna številka</p>
          </v-col>
          <v-col cols="9">
            <v-autocomplete
              v-model="poste_stevilke_id"
              :items="optionsPoste_stevilke_id.map((item) => item.label)"
              :search-input.sync="searchModelPoste_stevilke_id"
              label="Poštna številka"
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
  import Editor from '@tinymce/tinymce-vue';

  export default {
    data() {
      return {
        ime: '',

        priimek: '',

        emso: '',

        spol: '',

        datum_rojstva: '',
        dateDatum_rojstva: '',

        naslov: '',

        enaslov: '',

        telefon: '',

        davcna_stevilka: '',

        poste_stevilke_id: '',
        searchModelPoste_stevilke_id: '',
      };
    },
    computed: {
      ...mapState({
        data: (state) => state.osebeForm.data,
        loading: (state) => state.osebeForm.loading,

        optionsPoste_stevilke_id: (state) =>
          state.osebeForm.searchResultPoste_stevilke_id,
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
        getData: 'osebeForm/getData',

        searchPoste_stevilke_id: 'osebeForm/searchPoste_stevilke_id',

        edit: 'osebeForm/edit',
      }),
      async submitHandler() {
        const data = this.data;

        data.ime = this.ime;

        data.priimek = this.priimek;

        data.emso = this.emso;

        data.spol = this.spol;

        data.datum_rojstva = this.datum_rojstva;

        data.naslov = this.naslov;

        data.enaslov = this.enaslov;

        data.telefon = this.telefon;

        data.davcna_stevilka = this.davcna_stevilka;

        data.poste_stevilke_id = this.poste_stevilke_id;

        const poste_stevilke_idEl = this.optionsPoste_stevilke_id.filter(
          (i) => i.label === this.poste_stevilke_id,
        );
        data.poste_stevilke_id = poste_stevilke_idEl.length
          ? poste_stevilke_idEl[0].id
          : null;

        try {
          await this.edit({ id: this.id, data });
          this.$router.push('/admin/osebe');
        } catch (e) {
          this.showSnackbar(e);
        }
      },

      formatData() {
        this.ime = this.data.ime;

        this.priimek = this.data.priimek;

        this.emso = this.data.emso;

        this.spol = this.data.spol;

        this.datum_rojstva = this.data.datum_rojstva;

        this.naslov = this.data.naslov;

        this.enaslov = this.data.enaslov;

        this.telefon = this.data.telefon;

        this.davcna_stevilka = this.data.davcna_stevilka;

        this.poste_stevilke_id = dataFormatter.postne_stevilkeOneListFormatter(
          this.data.poste_stevilke_id,
        );
      },
    },
    async beforeMount() {
      try {
        await this.searchPoste_stevilke_id();

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
      async searchModelPoste_stevilke_id() {
        await this.searchPoste_stevilke_id(this.searchModelPoste_stevilke_id);
      },
    },
    components: {
      ImageUploader,
      FileUploader,
      Editor,
      VDatetimePicker: () =>
        import('vuetify-datetime-picker/src/components/DatetimePicker.vue'),
    },
  };
</script>
