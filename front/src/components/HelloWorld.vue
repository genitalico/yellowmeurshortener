<template>
  <div class="container">
    <h1 class="text-center">{{ name }}</h1>
    <div class="row">
      <div class="col-1">
        <h4>Bulk</h4>
      </div>
      <div class="col-1">
        <b-form-checkbox id="checkbox-1" v-model="bulkMode" />
      </div>
    </div>
    <div class="row" v-show="!bulkMode">
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

    <div class="row" v-show="bulkMode">
      <div class="col">
        <b-input-group>
          <b-form-file
            v-model="file"
            :state="Boolean(file)"
            placeholder="Subir archivo..."
            drop-placeholder="Subir archivo..."
          ></b-form-file>
          <b-input-group-append>
            <b-button variant="outline-success" v-on:click="bulkFile()"
              >Subir</b-button
            >
          </b-input-group-append>
        </b-input-group>
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <h3>Nuevas</h3>
        <div class="col">
          <TableUrl v-if="showTableAdd" v-bind:list="listUrls" />
        </div>
      </div>
      <div class="col-6">
        <h3>Todas</h3>
        <div class="col">
          <TableUrl v-if="showTableAll" v-bind:list="listUrlsAll" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableUrl from "./TableUrls.vue";

export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  components: {
    TableUrl,
  },
  async mounted() {
    await this.getAllUrls();
  },
  data() {
    return {
      name: "Url Shortener",
      inputUrl: "",
      urlShortener: "",
      listUrls: "",
      showTableAdd: false,
      bulkMode: false,
      file: null,
      listUrlsAll: "[]",
      showTableAll: false,
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
            inputUrl: this.inputUrl,
          });
          this.listUrls = JSON.stringify(listUrls);
          this.showTableAdd = true;

          await this.getAllUrls();

          return;
        }
      } catch (err) {
        console.log(err);
      }
    },
    bulkFile: async function () {
      if (this.file != null) {
        var formdata = new FormData();
        formdata.append("file", this.file, this.file.name);

        var requestOptions = {
          method: "POST",
          body: formdata,
          redirect: "follow",
        };

        try {
          this.showTableAdd = false;
          let result = await fetch(
            process.env.VUE_APP_API + "/api/admin/bulkUrl",
            requestOptions
          );

          let response = await result.text();

          let responseModel = JSON.parse(response);

          if (responseModel.code == 1002) {
            let arr = responseModel.content;
            let listUrls = [];
            for (let i = 0; i < arr.length; i++) {
              listUrls.push({
                urlShortener: process.env.VUE_APP_API + arr[i].short_url,
                inputUrl: arr[i].url,
              });
            }
            this.listUrls = JSON.stringify(listUrls);
            this.showTableAdd = true;

            await this.getAllUrls();
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    getAllUrls: async function () {
      try {
        this.showTableAll = false;
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        let result = await fetch(
          process.env.VUE_APP_API + "/api/admin/list",
          requestOptions
        );
        let response = await result.text();
        let responseModel = JSON.parse(response);

        if (responseModel.code == 1007) {
          let listUrls = [];
          let arr = responseModel.content;
          for (let i = 0; i < arr.length; i++) {
            listUrls.push({
              urlShortener: process.env.VUE_APP_API + "/" + arr[i].short_url,
              inputUrl: arr[i].url,
            });
          }

          
          this.listUrlsAll = JSON.stringify(listUrls);
          this.showTableAll = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
