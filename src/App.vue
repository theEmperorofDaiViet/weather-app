<template>
  <div id="app" class="flex-align has-text-centered">
    <router-view></router-view>
    <div class="app__cities" v-if="!loading">
      <router-link v-for="city in cities" :to="'/weather/' + city.id" :key="city.id">{{ city.name }}</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  data(){
    return {
      cities: [
        { id: 0, name: 'Hanoi, Vietnam'},
        { id: 1, name: 'Beijing, China'},
        { id: 2, name: 'Hong Kong'},
        { id: 3, name: 'Taipei, Taiwan'},
        { id: 4, name: 'Pyongyang, North Korea'},
        { id: 5, name: 'Seoul, South Korea'},
        { id: 6, name: 'Tokyo, Japan'},
        { id: 7, name: 'Ho Chi Minh City, Vietnam'},
      ]
    };
  },
  computed: {
    ...mapGetters(['loading'])
  },
}
</script>

<style>
html, body {
  height: 100%;
}

#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app.flex-align {
  display: flex;
  justify-content: center;
  align-items: center;
}

.app__date {
  position: absolute;
  top: 10px;
  right: 10px;
}

.app__cities {
  position: absolute;
  bottom: 40px;
}

.app__cities a {
  color: #42b983;
  padding: 0 10px;
}
</style>
