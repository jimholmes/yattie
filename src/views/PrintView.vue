<template>
  <v-container class="wrapper">
    <div class="header">
      <img :src="require('../assets/logo.png')" />
    </div>
    <div class="content">
      <v-row>
        <v-col class="timeline" cols="8">
          <div class="summary">
            <h3 class="detail-title mb-1">Summary</h3>
            <div class="summary-content">
              <div style="display: flex; flex-wrap: wrap; width: 30%">
                <div
                  style="flex: 1 1 100%; margin: 0 0.15em"
                  v-for="(type, i) in commentTypes"
                  :key="i"
                >
                  <span>{{ type.title }}:</span>
                  <span style="float: right">{{ type.count }}</span>
                </div>
              </div>
            </div>
            <p class="summary-text">{{ summary }}</p>
          </div>
          <hr style="margin-bottom: 1em" />
          <v-timeline align-top dense class="pt-0">
            <v-timeline-item
              class="timeline-item"
              color="primary"
              icon="mdi-play-circle"
              fill-dot
            >
              <div class="duration-text">
                <v-icon>mdi-clock-outline</v-icon>
                <span>{{ formatTime }}</span>
              </div>
            </v-timeline-item>

            <div v-for="(item, i) in items" :key="i">
              <v-timeline-item
                v-if="item.sessionType === 'Screenshot'"
                color="primary"
                icon="mdi-camera-plus"
                fill-dot
              >
                <div class="d-flex flex-column">
                  <div class="d-flex justify-space-between py-2">
                    <div class="duration-text">
                      <v-icon>mdi-clock-outline</v-icon>
                      <span>{{ calculateTime(item.time) }}</span>
                    </div>
                  </div>
                  <div class="image-wrapper">
                    <img
                      style="max-width: 100%"
                      :src="`file://${item.filePath}`"
                    />
                  </div>
                  <div class="comment-wrapper mt-2">
                    <span class="comment-type"
                      >{{
                        item.comment.text
                          ? item.comment.type + ": " + item.comment.text
                          : ""
                      }}
                    </span>
                  </div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                v-if="item.sessionType === 'Video'"
                color="primary"
                icon="mdi-video"
                fill-dot
              >
                <div class="d-flex flex-column">
                  <div class="d-flex justify-space-between py-2">
                    <div class="duration-text">
                      <v-icon>mdi-clock-outline</v-icon>
                      <span>{{ calculateTime(item.time) }}</span>
                    </div>
                  </div>
                  <div class="video-wrapper">
                    <img
                      style="max-width: 100%"
                      :src="`file://${item.poster}`"
                    />
                    <v-icon class="video-play" x-large>mdi-play</v-icon>
                  </div>
                  <div class="comment-wrapper mt-2">
                    <span class="comment-type"
                      >{{
                        item.comment.text
                          ? item.comment.type + ": " + item.comment.text
                          : ""
                      }}
                    </span>
                  </div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                v-if="item.sessionType === 'Audio'"
                color="primary"
                icon="mdi-microphone"
                fill-dot
              >
                <div class="d-flex flex-column">
                  <div class="d-flex justify-space-between py-2">
                    <div class="duration-text">
                      <v-icon>mdi-clock-outline</v-icon>
                      <span>{{ calculateTime(item.time) }}</span>
                    </div>
                  </div>
                  <div class="audio-wrapper">
                    <div class="audio-wave">
                      <span>Audio Wave</span>
                    </div>
                    <div class="audio-play">
                      <v-icon medium>mdi-play-circle</v-icon>
                    </div>
                  </div>
                  <div class="comment-wrapper mt-2">
                    <span class="comment-type"
                      >{{
                        item.comment.text
                          ? item.comment.type + ": " + item.comment.text
                          : ""
                      }}
                    </span>
                  </div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                v-if="item.sessionType === 'Note'"
                color="primary"
                icon="mdi-pencil"
                fill-dot
              >
                <div class="d-flex flex-column">
                  <div class="d-flex justify-space-between py-2">
                    <div class="duration-text">
                      <v-icon>mdi-clock-outline</v-icon>
                      <span>{{ calculateTime(item.time) }}</span>
                    </div>
                  </div>
                  <div class="note-wrapper">
                    <span class="comment-type">{{ item.comment.type }}: </span>
                    <div class="comment-text" v-html="item.comment.text"></div>
                  </div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                v-if="item.sessionType === 'File'"
                color="primary"
                icon="mdi-file"
                fill-dot
              >
                <div class="d-flex flex-column">
                  <div class="d-flex justify-space-between py-2">
                    <div class="duration-text">
                      <v-icon>mdi-clock-outline</v-icon>
                      <span>{{ calculateTime(item.time) }}</span>
                    </div>
                  </div>
                  <div
                    v-if="item.fileType === 'image'"
                    class="file-wrapper image"
                  >
                    <img
                      class="screen-img"
                      style="max-width: 100%"
                      :src="`file://${item.filePath}`"
                    />
                  </div>
                  <div v-else class="file-wrapper file">
                    <div class="file-name">
                      <span>{{ item.fileName }}</span>
                    </div>
                    <div class="file-icon">
                      <v-icon medium>mdi-file</v-icon>
                    </div>
                  </div>
                  <div class="comment-wrapper mt-2">
                    <span class="comment-type"
                      >{{
                        item.comment.text
                          ? item.comment.type + ": " + item.comment.text
                          : ""
                      }}
                    </span>
                  </div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                v-if="item.sessionType === 'Mindmap'"
                color="primary"
                icon="mdi-camera-plus"
                fill-dot
              >
                <div class="d-flex flex-column">
                  <div class="d-flex justify-space-between py-2">
                    <div class="duration-text">
                      <v-icon>mdi-clock-outline</v-icon>
                      <span>{{ calculateTime(item.time) }}</span>
                    </div>
                  </div>
                  <div class="image-wrapper">
                    <img
                      class="screen-img"
                      style="max-width: 100%"
                      :src="`file://${item.filePath}`"
                    />
                  </div>
                  <div class="comment-wrapper mt-2">
                    <span class="comment-type"
                      >{{
                        item.comment.text
                          ? item.comment.type + ": " + item.comment.text
                          : ""
                      }}
                    </span>
                  </div>
                </div>
              </v-timeline-item>
              <v-timeline-item
                v-if="item.sessionType === 'Summary' && item.comment.text"
                color="primary"
                icon="mdi-pencil"
                fill-dot
              >
                <div class="d-flex flex-column">
                  <div class="d-flex justify-space-between py-2">
                    <div class="duration-text">
                      <v-icon>mdi-clock-outline</v-icon>
                      <span>{{ calculateTime(item.time) }}</span>
                    </div>
                  </div>
                  <div class="note-wrapper">
                    <span class="comment-type">{{ item.comment.type }}: </span>
                    <div class="comment-text" v-html="item.comment.text"></div>
                  </div>
                </div>
              </v-timeline-item>
            </div>
            <v-timeline-item
              class="timeline-item pb-0"
              color="primary"
              icon="mdi-stop-circle"
              fill-dot
            >
              <div class="duration-text">
                <v-icon>mdi-clock-outline</v-icon>
                <span>{{ formatTime }}</span>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col class="detail" cols="4">
          <h3 class="detail-title">Details</h3>
          <div class="detail-item title">
            <p class="item-title">Title</p>
            <p class="item-value">{{ this.title }}</p>
          </div>
          <div class="detail-item charter">
            <p class="item-title">Charter</p>
            <p class="item-value">{{ this.charter.text }}</p>
          </div>
          <div class="detail-item pre-condition">
            <p class="item-title">Preconditions</p>
            <p class="item-value">{{ this.precondition.text }}</p>
          </div>
          <div class="detail-item session-time">
            <p class="item-title">Session time</p>
            <p class="item-value">{{ formatTime }}</p>
          </div>
          <div class="detail-item session-elapsed-time">
            <p class="item-title">Session elapsed time</p>
            <p class="item-value">{{ formatTime }}</p>
          </div>
          <div class="detail-item environment">
            <p class="item-title">Environment</p>
            <p class="item-value os">
              <span class="font-weight-bold">OS:</span> {{ os }}
            </p>
            <p class="item-value">
              <span class="font-weight-bold">Window:</span> Full Screen
            </p>
            <p class="item-value screen-size">
              <span class="font-weight-bold">Screensize:</span>
              {{ screenWidth }} x {{ screenHeight }}
            </p>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import {
  VContainer,
  VRow,
  VCol,
  VTimeline,
  VTimelineItem,
  VIcon,
  VDivider,
} from "vuetify/lib/components";
import { IPC_HANDLERS, IPC_FUNCTIONS, TEXT_TYPES } from "../modules/constants";

export default {
  name: "PrintView",
  components: {
    VContainer,
    VRow,
    VCol,
    VTimeline,
    VTimelineItem,
    VIcon,
    VDivider,
  },
  data() {
    return {
      items: [],
      title: "",
      charter: "",
      precondition: "",
      timer: 0,
      os: "Unknown OS",
      window: "",
      screenWidth: "",
      screenHeight: "",
    };
  },
  created() {
    this.initialize();
  },
  mounted() {
    this.detectEnvironment();

    if (!window.ipc) return;

    window.ipc.on("ACTIVE_PDF", (data) => {
      this.title = data.title;
      this.charter = data.charter;
      this.precondition = data.precondition;
      this.timer = data.timer;
    });
  },
  computed: {
    formatTime() {
      const seconds = ("0" + (this.timer % 60)).slice(-2);
      const minutes = ("0" + (parseInt(this.timer / 60, 10) % 60)).slice(-2);
      const hours = ("0" + (parseInt(this.timer / 3600, 10) % 24)).slice(-2);

      return hours + ":" + minutes + ":" + seconds;
    },
    commentTypes() {
      let data = [];
      const commentTypes = TEXT_TYPES.filter((item) => item !== "Summary");
      commentTypes.map((type) => {
        let temp,
          i = 0;
        this.items.map((item) => {
          if (type === item.comment.type && item.comment.text) {
            i++;
          }
        });
        if (i > 0) {
          temp = {
            title: type,
            count: i,
          };
          data.push(temp);
        }
      });
      console.log(commentTypes);
      console.log("result:", data);
      return data;
    },
    summary() {
      let summary = "";
      this.items.map((item) => {
        if (item.comment.type === "Summary" && item.comment.text) {
          summary = item.comment.text;
        }
      });
      console.log("summary:", summary);
      return summary;
    },
  },
  methods: {
    async initialize() {
      if (!window.ipc) return;

      await window.ipc
        .invoke(IPC_HANDLERS.DATABASE, { func: IPC_FUNCTIONS.GET_ITEMS })
        .then((result) => {
          this.items = result;
        });
    },
    calculateTime(time) {
      const seconds = ("0" + (time % 60)).slice(-2);
      const minutes = ("0" + (parseInt(time / 60, 10) % 60)).slice(-2);
      const hours = ("0" + (parseInt(time / 3600, 10) % 24)).slice(-2);

      return hours + ":" + minutes + ":" + seconds;
    },
    detectEnvironment() {
      const userAgent = navigator.userAgent;
      const platform =
        window.navigator?.userAgentData?.platform || window.navigator.platform;
      const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
      const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
      const iosPlatforms = ["iPhone", "iPad", "iPod"];
      if (macosPlatforms.indexOf(platform) !== -1) {
        this.os = "Mac OS";
      } else if (iosPlatforms.indexOf(platform) !== -1) {
        this.os = "iOS";
      } else if (windowsPlatforms.indexOf(platform) !== -1) {
        this.os = "Windows";
      } else if (/Android/.test(userAgent)) {
        this.os = "Android";
      } else if (/Linux/.test(platform)) {
        this.os = "Linux";
      }
      this.screenWidth = screen.width;
      this.screenHeight = screen.height;
    },
  },
};
</script>
<style scoped>
.wrapper {
  padding: 20px;
}
.header {
  padding: 20px 0;
  border-bottom: 2px solid #4c1d95;
}
.content {
  padding: 20px 0;
}
.summary {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  justify-content: flex-start;
}
.summary .summary-content {
  display: flex;
  flex-direction: row;
  column-gap: 5px;
}
.summary .summary-content span {
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #6b7280;
}
.summary .summary-text {
  font-style: italic;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #111827;
}
.timeline-item {
  height: auto;
  display: flex;
  align-items: center;
}
.timeline-item .v-timeline-item__body {
  max-width: calc(100% - 40px);
}
.image-wrapper {
  position: relative;
  display: flex;
  background: #fff;
  border: 1px solid #d1d5db;
  overflow: hidden;
}
.video-wrapper {
  position: relative;
  display: flex;
  background: #fff;
  border: 1px solid #d1d5db;
  overflow: hidden;
}
.v-icon.video-play {
  border: 1px solid #c7c7c8;
  border-radius: 50%;
  height: 56px;
  width: 56px;
  background-color: #c7c7c8;
  color: #17191a;
  opacity: 0.8;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.audio-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 14px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}
.comment-wrapper {
  display: flex;
  background: #fff;
}
.comment-wrapper p {
  margin-bottom: 0 !important;
}
.note-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  column-gap: 5px;
  padding: 10px 14px;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 6px;
}
.note-wrapper p {
  margin-bottom: 0 !important;
}
.audio-wrapper .audio-wave {
  flex-grow: 1;
}
.file-wrapper.image {
  position: relative;
  display: flex;
  background: #fff;
  border: 1px solid #d1d5db;
  overflow: hidden;
}
.file-wrapper.file {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 14px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #d1d5db;
}
.file-wrapper.file .file-name {
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  line-height: 16px;
  color: #6b7280;
}
.tags-wrapper .tag {
  margin-right: 5px;
}
.tags-wrapper .tag:last-child {
  margin-right: 0;
}
.detail-title {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #111827;
  margin-bottom: 1rem;
}
.detail-item {
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  margin-bottom: 1rem;
}

.detail-item p {
  margin-bottom: 0;
}

.detail-item .item-title {
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.005em;
  color: #111827;
}

.detail-item .item-value {
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  letter-spacing: -0.005em;
  color: #6b7280;
}
</style>
