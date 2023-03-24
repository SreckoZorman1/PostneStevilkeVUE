<template>
    <v-card class="mt-6 py-3">
       <form @submit.prevent="submitHandler">
         <div class="px-8">
           <v-row>
           <v-col cols="12">
               <h4 class="page-title">Edit Postne_stevilke</h4>
           </v-col>

           <v-col cols="3" class="d-flex align-center">
               <p class="fs-normal greyBold--text mb-0">postna_stevilka</p>
           </v-col>
           <v-col cols="9">
               <v-text-field
                 label="postna_stevilka"
                 v-model="postna_stevilka"
               ></v-text-field>
           </v-col>

           <v-col cols="3" class="d-flex align-center">
               <p class="fs-normal greyBold--text mb-0">kraj_mesto</p>
           </v-col>
           <v-col cols="9">
               <v-text-field
                 label="kraj_mesto"
                 v-model="kraj_mesto"
               ></v-text-field>
           </v-col>

           <v-col cols="3" class="d-flex align-center">
               <p class="fs-normal greyBold--text mb-0">Država</p>
           </v-col>
           <v-col cols="9">
               <v-autocomplete
                   v-model="drzave_id"
                   :items="optionsDrzave_id.map(item => item.label)"
                   :search-input.sync="searchModelDrzave_id"
                   label="Država"
               >
               </v-autocomplete>
           </v-col>

              <v-col cols="12 mt-5">
                <v-btn
                    type="submit"
                    color="primary"
                    :loading="loading"
                >
                    Save
                </v-btn>

                <v-btn @click="formatData" class="ml-2">
                    Reset
                </v-btn>

                <router-link :to="cancelUrl" class="text-decoration-none">
<v-btn
        type="button"
        class="ml-2"
>
    Cancel
</v-btn>
</router-link>
              </v-col>
            </v-row>
         </div>
      </form>
    </v-card>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import dataFormatter from '@/use/dataFormatter.js'
import ImageUploader from '@/components/Uploaders/ImageUploader'
import FileUploader from '@/components/Uploaders/FileUploader'
import Editor from '@tinymce/tinymce-vue'

export default {
    data () {
      return {

        postna_stevilka: '',

        kraj_mesto: '',

        drzave_id: '',
        searchModelDrzave_id: '',

    }
  },
  computed: {
    ...mapState({
        data: state => state.postne_stevilkeForm.data,
        loading: state => state.postne_stevilkeForm.loading,

        optionsDrzave_id: state => state.postne_stevilkeForm.searchResultDrzave_id,

    }),

    cancelUrl() {
        return '/' + this.$route.fullPath
            .split('/')
            .slice(1)
            .splice(0, 2)
            .join('/')
    },
    dataFormatter() {
        return dataFormatter
    }
   },
    methods: {
    ...mapMutations({
        showSnackbar: 'snackbar/showSnackbar',
    }),
    ...mapActions({
        getData: 'postne_stevilkeForm/getData',

        searchDrzave_id: 'postne_stevilkeForm/searchDrzave_id',

        edit: 'postne_stevilkeForm/edit'
    }),
    async submitHandler() {
        const data = this.data

        data.postna_stevilka = this.postna_stevilka

        data.kraj_mesto = this.kraj_mesto

        data.drzave_id = this.drzave_id

                const drzave_idEl = this.optionsDrzave_id.filter(i => i.label === this.drzave_id)
                data.drzave_id = drzave_idEl.length ? drzave_idEl[0].id : null

        try {
            await this.edit({id: this.id, data})
            this.$router.push('/admin/postne_stevilke')
         } catch (e) {
            this.showSnackbar(e)
        }
    },

        formatData() {

            this.postna_stevilka = this.data.postna_stevilka

            this.kraj_mesto = this.data.kraj_mesto

            this.drzave_id = dataFormatter.drzaveOneListFormatter(this.data.drzave_id)

        }
     },
    async beforeMount() {
        try {

                await this.searchDrzave_id()

            const pathArray = this.$route.fullPath.split('/')
            const id = pathArray[pathArray.length - 2]
            this.id = id
            await this.getData(id)

            this.formatData()
        } catch (e) {
            this.showSnackbar(e)
        }
    },
    watch: {

        async searchModelDrzave_id() {
            await this.searchDrzave_id(this.searchModelDrzave_id)
        },

    },
    components: {ImageUploader, FileUploader, Editor, VDatetimePicker: () => import('vuetify-datetime-picker/src/components/DatetimePicker.vue')}
}
</script>

