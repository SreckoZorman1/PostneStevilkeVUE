<template>
  <div>
    <div class="dashboard-page">
      <h1 class="page-title mt-2">
        Welcome,
        {{
          currentUser && currentUser.firstName ? currentUser.firstName : 'User'
        }}
      </h1>
      <v-container fluid>
        <v-row class="mt-8 mb-3">
          <v-col lg="3" sm="6" md="4" cols="12">
            <a href="#/admin/users" class="text-decoration-none">
              <v-card class="">
                <v-card-title class="d-flex flex-nowrap pa-5 pb-3">
                  <p class="text-truncate">Users</p>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="pa-5 pt-0">
                  <v-row class="d-flex">
                    <v-col cols="9" class="d-flex align-center">
                      <v-icon color="primary" class="mr-3"
                        >mdi-information</v-icon
                      >
                      <p class="text-h5 text-truncate mb-0">Users:</p>
                    </v-col>
                    <v-col cols="3"
                      ><span class="text-h3" v-text="users"></span
                    ></v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </a>
          </v-col>

          <v-col lg="3" sm="6" md="4" cols="12">
            <a href="#/admin/drzave" class="text-decoration-none">
              <v-card class="">
                <v-card-title class="d-flex flex-nowrap pa-5 pb-3">
                  <p class="text-truncate">Drzave</p>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="pa-5 pt-0">
                  <v-row class="d-flex">
                    <v-col cols="9" class="d-flex align-center">
                      <v-icon color="primary" class="mr-3"
                        >mdi-information</v-icon
                      >
                      <p class="text-h5 text-truncate mb-0">Drzave:</p>
                    </v-col>
                    <v-col cols="3"
                      ><span class="text-h3" v-text="drzave"></span
                    ></v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </a>
          </v-col>

          <v-col lg="3" sm="6" md="4" cols="12">
            <a href="#/admin/osebe" class="text-decoration-none">
              <v-card class="">
                <v-card-title class="d-flex flex-nowrap pa-5 pb-3">
                  <p class="text-truncate">Osebe</p>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="pa-5 pt-0">
                  <v-row class="d-flex">
                    <v-col cols="9" class="d-flex align-center">
                      <v-icon color="primary" class="mr-3"
                        >mdi-information</v-icon
                      >
                      <p class="text-h5 text-truncate mb-0">Osebe:</p>
                    </v-col>
                    <v-col cols="3"
                      ><span class="text-h3" v-text="osebe"></span
                    ></v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </a>
          </v-col>

          <v-col lg="3" sm="6" md="4" cols="12">
            <a href="#/admin/postne_stevilke" class="text-decoration-none">
              <v-card class="">
                <v-card-title class="d-flex flex-nowrap pa-5 pb-3">
                  <p class="text-truncate">Postne_stevilke</p>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text class="pa-5 pt-0">
                  <v-row class="d-flex">
                    <v-col cols="9" class="d-flex align-center">
                      <v-icon color="primary" class="mr-3"
                        >mdi-information</v-icon
                      >
                      <p class="text-h5 text-truncate mb-0">Postne_stevilke:</p>
                    </v-col>
                    <v-col cols="3"
                      ><span class="text-h3" v-text="postne_stevilke"></span
                    ></v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </a>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import { mapState } from 'vuex';

  export default {
    data() {
      return {
        users: 0,
        drzave: 0,
        osebe: 0,
        postne_stevilke: 0,
      };
    },
    created() {
      const fetchData = async () => {
        const {
          data: { count: users },
        } = await axios.get('/users/count');
        const {
          data: { count: drzave },
        } = await axios.get('/drzave/count');
        const {
          data: { count: osebe },
        } = await axios.get('/osebe/count');
        const {
          data: { count: postne_stevilke },
        } = await axios.get('/postne_stevilke/count');

        this.users = users;
        this.drzave = drzave;
        this.osebe = osebe;
        this.postne_stevilke = postne_stevilke;
      };
      fetchData();
    },
    computed: {
      ...mapState({
        currentUser: (state) => state.auth.currentUser,
      }),
    },
  };
</script>
