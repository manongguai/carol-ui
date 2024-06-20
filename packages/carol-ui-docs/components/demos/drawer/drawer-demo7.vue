<template>
  <cl-button @click="openDrawer">自定义内容</cl-button>
  <cl-drawer v-model:show="show" v-model:width="width" resizable>
    <template v-slot:header>Taylor Swift</template>
    <template v-slot:close-icon>
      <cl-icon iconName="cl-icon-circle-close"></cl-icon>
    </template>
    <div>She is an excellent singer.</div>
    <div>
      Swift began professional songwriting at age 14 and signed with Big Machine Records in 2005 to
      become a country singer. Under Big Machine, she released six studio albums, four of them to
      country radio, starting with her self-titled album in 2006. Her next, Fearless (2008),
      explored country pop, and its singles "Love Story" and "You Belong with Me" catapulted her to
      prominence. Speak Now (2010) incorporated rock influences, while Red (2012) experimented with
      electronic elements and featured Swift's first Billboard Hot 100 number-one song, "We Are
      Never Ever Getting Back Together". She forwent her country image with 1989 (2014), a synth-pop
      album supported by the chart-topping songs "Shake It Off", "Blank Space", and "Bad Blood".
      Media scrutiny inspired the hip-hop-flavored Reputation (2017) and its number-one single "Look
      What You Made Me Do". Signing a new contract with Republic Records in 2018, Swift released her
      seventh album, Lover (2019), and the autobiographical documentary Miss Americana (2020). She
      embraced indie folk and alternative rock on her 2020 albums Folklore and Evermore, explored
      chill-out styles on Midnights (2022), and re-recorded three of her first six albums as
      "Taylor's Versions" following a dispute with Big Machine. The albums and their number-one
      songs "Cardigan", "Willow", "All Too Well (10 Minute Version)" and "Anti-Hero" broke various
      records. In 2023, Swift embarked on the Eras Tour, her most expansive concert tour. She has
      also directed music videos and films such as All Too Well: The Short Film (2021) and played
      supporting roles in others. Having sold over 200 million records globally, Swift is one of the
      best-selling musicians, the most streamed woman on Spotify, and the only act to have five
      albums open with over one million copies sold in the US. She has been featured in listicles
      such as Rolling Stone's 100 Greatest Songwriters of All Time, Billboard's Greatest of All Time
      Artists, the Time 100, and Forbes Celebrity 100. Among her accolades are 12 Grammy Awards,
      including three Album of the Year wins; a Primetime Emmy Award; 40 American Music Awards; 29
      Billboard Music Awards; 12 Country Music Association Awards; three IFPI Global Recording
      Artist of the Year awards; and 98 Guinness World Records. Honored with titles such as Artist
      of the Decade and Woman of the Decade, Swift is an advocate for artists' rights and women's
      empowerment.
    </div>
    <template v-slot:footer>
      <cl-button>footer</cl-button>
    </template>
  </cl-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const show = ref(false)
    const width = ref(300)
    const openDrawer = () => {
      show.value = true
    }

    return {
      show,
      width,
      openDrawer
    }
  }
})
</script>
