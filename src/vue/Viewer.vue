<template class="streampets">
  <div class="pet-cont">

    <h2>Stats</h2>
    Hunger
    <div id="hunger">{{stats.hunger}}</div>
    Happiness
    <div id="happiness">{{stats.happiness}}</div>
    Boredom
    <div id="boredom">{{stats.boredom}}</div>

    <div id="pet-img">I am a pet</div>

    <button class="heal" v-on:click="heal('boredom')">Play</button>
    <button class="heal" v-on:click="heal('hunger')">Feed</button>
    <button class="heal" v-on:click="heal('happiness')">Hug</button>
  </div>
</template>

<script>
export default {
  name: "streampets",
  data() {
    return {
      pet: {},
      channelId: null,
      clientId: null,
      token: null,
      userId: null,
      twitchHeaders: {},
      streamLabsHeaders: {},
      stats: {
        happiness: 100,
        boredom: 100,
        hunger: 100
      }
    }
  },

  mounted() {
    this.load();
  },

  methods: {
    load: function() {
      if (window.Twitch && window.Twitch.ext) {
        var $vm = this;
        window.Twitch.ext.onAuthorized(({ channelId, clientId, token, userId }) => {
          this.channelId = channelId
          this.clientId = clientId
          this.token = token
          this.userId = userId

          this.twitchHeaders =  {
            'headers': {
              'Client-ID': this.clientId,
              'Accept': 'application/vnd.twitchtv.v5+json'
            }
          }

          this.streamLabsHeaders = {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }

          this.$http.get('https://streamlabs.dev/api/v5/twitch-extensions/streampet/pet', {
              headers: { Authorization: `Bearer ${token}` }
          })
          .then(response => {
            var response = response.body;
            $vm.stats.happiness = response.happiness;
            $vm.stats.hunger = response.hunger;
            $vm.stats.boredom = response.boredom;
          },
          err => {
            console.log(err);
          });
        });

        window.Twitch.ext.listen('broadcast', (topic, content, message) => {
          var data = JSON.parse(message);
          $vm.stats.happiness = Math.round(data.payload.happiness);
          $vm.stats.hunger = Math.round(data.payload.hunger);
          $vm.stats.boredem = Math.round(data.payload.boredom);
        })
      }
    },

    heal: function(stat) {
      var $vm = this;
      $('.heal').attr('disabled', true);
      setTimeout(() => {
        $('.heal').removeAttr('disabled');
      }, 5000);
      this.$http.post('https://streamlabs.dev/api/v5/twitch-extensions/streampet/pet/heal',
          { stat: stat },
          { headers: { Authorization: `Bearer ${$vm.token}` } }
        ).then(response => {
          // Fake heal in frontend for user satisfication
      });
    }
  }
}
</script>
