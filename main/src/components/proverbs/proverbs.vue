<template>
  <div class="proverbsContainer" @click="debounceSetProverbs">
    <p>{{ proverb.hitokoto }}</p>
    <p class="from">{{ '——' + proverb.from }}</p>
  </div>
</template>

<script>
import getProverbs from "../../../apis/getProverbs";
import {DEBOUNCE} from "../../../functions/decoration";
import {reactive, ref, toRefs, onBeforeMount, onBeforeUnmount} from "vue";

export default {
  name: "proverbsComponent",
  setup() {
    if (!localStorage.getItem('proverb')) {
      localStorage.setItem('proverb', '[]');
    }
    let proverbCache = JSON.parse(localStorage.getItem('proverb'));
    const proverb = ref({
      hitokoto: '',
      from: ''
    })
    const setProverbs = () => {
      let use = proverbCache.shift();
      if (use == undefined) {
        use = {
          hitokoto: '拥抱变化',
          from: '未知'
        }
      }
      proverb.value.hitokoto = use.hitokoto;
      proverb.value.from = use.from;
      getProverbs().then(str => {
        str != null ? proverbCache.push(str) : '';
      }).catch(err => {
        console.log('err', err)
      })
    };
    const debounceSetProverbs = DEBOUNCE(setProverbs, 500);
    onBeforeMount(() => {
      setProverbs();
    });
    onBeforeUnmount(() => {
        localStorage.removeItem('proverb');
        localStorage.setItem('proverb', JSON.stringify(proverbCache.slice(0,10)));
    });
    return {
      proverb,
      debounceSetProverbs,
      setProverbs
    }
  }
}
</script>

<style scoped>
.proverbsContainer {
  text-align: right;
}
</style>