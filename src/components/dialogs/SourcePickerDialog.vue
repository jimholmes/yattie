<template>
  <v-dialog
    v-bind="$attrs"
    v-on="$listeners"
    persistent
    width="100%"
    max-width="600px"
  >
    <v-sheet outlined color="white" rounded>
      <div class="wrapper">
        <div class="header">
          <span>Select Window To Record Session</span>
        </div>
        <div class="content">
          <v-radio-group v-model="activeSource">
            <v-row class="session-list">
              <v-col
                class="session-item"
                cols="6"
                xs="6"
                sm="4"
                md="4"
                v-for="item in sources"
                :key="item.id"
              >
                <div class="session-img">
                  <img :src="item.thumbnail" :alt="item.name" />
                </div>
                <div class="session-name">
                  <p>{{ item.name }}</p>
                </div>
                <div class="session-radio">
                  <v-radio dense :value="item.id" :ripple="false"></v-radio>
                </div>
              </v-col>
            </v-row>
          </v-radio-group>
        </div>
        <div class="footer">
          <v-btn class="text-capitalize" small color="white" @click="close">
            Cancel
          </v-btn>
          <v-btn
            class="text-capitalize"
            small
            color="primary"
            :disabled="!activeSource"
            @click="select"
          >
            Start Recording
          </v-btn>
        </div>
      </div>
    </v-sheet>
  </v-dialog>
</template>

<script>
export default {
  name: "SourcePickerDialog",
  props: {
    sources: {
      type: Array,
      default: () => [],
    },
    sourceId: {
      type: String,
      default: () => "",
    },
  },
  data() {
    return {
      activeSource: "",
    };
  },
  watch: {
    sourceId: function () {
      this.activeSource = this.sourceId;
    },
  },
  methods: {
    close() {
      this.activeSource = "";
      this.$root.$emit("close-sourcepickerdialog");
    },
    select() {
      this.$emit("submit-source", this.activeSource);
    },
    setActiveSource(value) {
      this.activeSource = value;
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 400px;
  width: 100%;
  overflow-y: auto;
}

.header {
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.header span {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #111827;
}

.content {
  flex-grow: 1;
  overflow: auto;
  padding: 15px;
}

.footer {
  width: 100%;
  padding: 15px;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  column-gap: 12px;
}

.session-list .session-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.session-list .session-item .session-img {
  border-radius: 4px;
  display: flex;
  width: 100%;
  background: #000;
  justify-content: center;
}

.session-list .session-item .session-img img {
  height: 100px;
  max-width: 100%;
  object-fit: contain;
}

.session-list .session-item .session-name {
  padding: 5px;
  padding-bottom: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  width: 100%;
}
.session-list .session-item .session-name p {
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  text-align: center;
  color: #111827;
  margin-bottom: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.v-input--selection-controls__input {
  width: 16px;
  height: 16px;
}
</style>
