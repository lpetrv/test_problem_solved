<template>
  <div class="d-flex flex-row">
    <v-card outlined shaped class="flex-grow-1 mr-2">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Title</th>
              <th class="text-left">Users</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="app in apps" :key="app.name" :class="{'active':app===boxIsSelected}" @click="selectApp(app)" >
              <td>{{ app.title }}</td>
              <td>{{ app.userCount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>

    <v-card v-if="appDetails !== undefined" outlined shaped class="flex-grow-1 mr-2">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td>{{appTitle}}</td>
            </tr>
            <tr>
              <td>{{fullDescription }}</td>
            </tr>
            <tr>
              <td>Users:</td>
              <td>{{ totalUsers}}</td>
            </tr>
            <tr>
              <td>Usage:</td>
              <td>{{ usage}}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      boxIsSelected: null,
      appDetails: undefined,
      totalUsers: String,
      usage: String,
      usageLimit: Number,
      appTitle: String,
      fullDescription: String
    }

  },
  mounted() {
    this.$store.dispatch('Apps/loadApps')
  },

  computed: {

    ...mapState('Apps', ['apps'])
  },

  methods: {
    selectApp(app) {
      this.boxIsSelected = app;
      this.appTitle = app.title;
      // TODO: Show this app in the box on the right
      console.log('/api/apps/' + app.key);

      axios.get('http://localhost:5000/api/apps/'+app.key ).then( response => {
        this.appDetails = response.data;
        this.totalUsers = response.data.totalUsers + " out of " + response.data.totalUsers;
        this.usage = response.data.usage + " out of " + response.data.usageLimit;
        this.fullDescription = response.data.description;
        console.log(response);
      });

    }
  }
}
</script>

<style scoped>
tbody tr {
  cursor: pointer;
}
.active {
  baground-color: #636363;

}
.test {
  background-color: yellow;
}
</style>
