<template>
  <v-container class="content-wrapper">
    <v-row>
      <v-col cols="12" class="pa-4">
        <p class="body-1">Session Summary</p>
        <div class="d-flex align-start">
          <div class="flex-grow-1">
            <p class="subtitle-1 mb-2">Mandatory session summary</p>
            <p class="caption mb-0">
              Make a written summary mandatory upon completing a session.
            </p>
          </div>
          <div class="flex-grow-0">
            <v-switch
              v-model="setting.summary"
              inset
              hide-details
              dense
              class="mt-0 pt-0"
              @change="handleConfig"
            ></v-switch>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ReportsTab",
  components: {},
  props: {
    config: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    config: function (newValue) {
      this.setting = newValue;
    },
  },
  data() {
    return {
      setting: this.config,
    };
  },
  methods: {
    handleConfig() {
      this.$emit("submit-config", this.setting);
    },
  },
};
</script>
<style scoped>
.content-wrapper {
  height: 100vh;
  width: 100%;
  overflow-y: auto;
}
.body-1 {
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 12px !important;
  line-height: 16px !important;
  letter-spacing: 0.05em !important;
  text-transform: uppercase !important;
  color: #6b7280 !important;
}
.subtitle-1 {
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  color: #111827 !important;
}
.caption {
  font-style: normal !important;
  font-weight: 500 !important;
  font-size: 13px !important;
  line-height: 16px !important;
  color: #6b7280;
}
</style>
