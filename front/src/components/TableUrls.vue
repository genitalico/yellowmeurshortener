<template>
  <div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>Short</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="url in urls" :key="url.urlShortener">
            <td>
              <a v-bind:href="url.urlShortener">{{ url.urlShortener }}</a>
            </td>
            <td>
              <a v-bind:href="url.inputUrl">{{ url.inputUrl }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableUrl",
  props: {
    list: String,
  },
  data() {
    return {
      urls: [{
          urlShortener:'',
          inputUrl: ''
      }],
    };
  },
  mounted() {
    if (this.list != undefined) {
      let urls = JSON.parse(this.list);
      this.urls = urls;
    }
  },
};
</script>