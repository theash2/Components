<template>
  <div class="proverbsContainer" @dblclick="setProverbs">
    <p>{{dataProverbs.hitokoto}}</p>
    <p>——{{dataProverbs.from}}</p>
  </div>
</template>

<script>
import getProverbs from "../../../apis/getProverbs";
import {reactive, ref, toRefs} from "vue";

export default {
  name: "proverbsComponent",
  setup() {
    const dataProverbs = ref({});
    const setProverbs = () => {
      getProverbs().then(str => {
        console.log(str)
        dataProverbs.value = str;
      }).catch(err => {
        console.log('err', err)
      })
    }
    setProverbs();

    return {
      dataProverbs,
      setProverbs
    }
  }
}
</script>

<style scoped>

</style>