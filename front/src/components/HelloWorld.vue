<template>
  <div class="container">
    <h1 class="text-center">{{ name }}</h1>
    <div class="row">
      <div class="col">
        <b-input-group prepend="URL" class="mt-3">
          <b-form-input v-model="inputUrl"></b-form-input>
          <b-input-group-append>
            <b-button variant="outline-success" v-on:click="newUrl()"
              >Acortar</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h3>Nuevas</h3>
        <div class="col"><TableUrl v-if="showTableAdd" v-bind:list="listUrls" /></div>
      </div>
      <div class="col-6">
        <h3>Todas</h3>
        <div class="col"><TableUrl v-if="showTableAdd" v-bind:list="listUrls" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import TableUrl from './TableUrls.vue'

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components:{
    TableUrl
  },
  watch:{
    showTableAdd : function(val){
      console.log(val);
    }
  },
  mounted() {
    console.log(process.env);
  },
  data() {
    return {
      name: "Url Shortener",
      inputUrl: "",
      urlShortener: "",
      listUrls : '',
      showTableAdd : false
    };
  },
  methods: {
    newUrl: async function () {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ url: this.inputUrl });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      try {
        this.showTableAdd = false;
        let result = await fetch(
          process.env.VUE_APP_API + "/api/admin/AddUrl",
          requestOptions
        );

        let response = await result.text();
        let responseModel = JSON.parse(response);

        if (responseModel.code == 1002) {
          this.urlShortener =
            process.env.VUE_APP_API + "/" + responseModel.content.short_url;
            let listUrls = [];
            listUrls.push({
              urlShortener: this.urlShortener,
              inputUrl : this.inputUrl
            });
            this.listUrls = JSON.stringify(listUrls);
            this.showTableAdd = true;
          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
