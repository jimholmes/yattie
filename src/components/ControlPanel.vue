<template>
  <v-container>
    <v-row class="text-center" v-if="status === 'pending'">
      <v-col cols="12" class="">
        <v-btn
          id="btn_new_session"
          class="text-capitalize font-weight-regular"
          fill
          small
          block
          color="primary"
          :height="30"
          @click="showSourcePickerDialog"
        >
          Start New Session
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-1" v-if="selected.length > 0">
      <v-col cols="6" class="pa-1">
        <v-btn
          id="btn_delete"
          fill
          small
          block
          color="primary"
          @click="deleteConfirmDialog = true"
        >
          <v-icon left>mdi-delete</v-icon> Delete
        </v-btn>
      </v-col>
      <v-col cols="6" class="pa-1">
        <v-btn
          id="btn_download"
          fill
          small
          block
          color="white"
          @click="exportItems"
        >
          <v-icon left>mdi-download</v-icon> Export
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="text-center control-btn-wrapper" v-if="status === 'end'">
      <v-col cols="12" class="d-flex justify-center px-0">
        <v-tooltip top v-if="status !== 'pause'">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_resume"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              @click="resume"
            >
              <v-icon> mdi-play-circle </v-icon>
            </v-btn>
          </template>
          <span>Resume Session</span>
        </v-tooltip>

        <v-tooltip top v-if="status !== 'pause'">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_plus"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              @click="newSessionDialog = true"
            >
              <v-icon> mdi-content-save </v-icon>
            </v-btn>
          </template>
          <span>Save Session</span>
        </v-tooltip>
        <v-tooltip top v-if="status !== 'pause'">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_reset"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              @click="resetConfirmDialog = true"
            >
              <v-icon> mdi-close-circle </v-icon>
            </v-btn>
          </template>
          <span>Clear Session</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row
      class="text-center control-btn-wrapper"
      v-if="status !== 'pending' && status !== 'end'"
    >
      <v-col cols="12" class="d-flex justify-center px-0">
        <v-tooltip top v-if="status !== 'pause'">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_pause_session"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              @click="pauseSession()"
            >
              <img
                :src="require('../assets/icon/pause.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>Pause Session</span>
        </v-tooltip>
        <v-tooltip top v-if="status === 'pause'">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_resume_session"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              @click="resumeSession()"
            >
              <img
                :src="require('../assets/icon/play.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>Resume Session</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_end_session"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              @click="summaryDialog = true"
            >
              <img
                :src="require('../assets/icon/stop.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>End Session</span>
        </v-tooltip>
        <v-tooltip top v-if="!recordVideoStarted">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_start_record_video"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              :disabled="status === 'pause'"
              @click="startRecordVideo()"
            >
              <img
                :src="require('../assets/icon/video-solid.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>Start Video Record</span>
        </v-tooltip>
        <v-tooltip top v-if="recordVideoStarted">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_stop_record_video"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              :disabled="status === 'pause'"
              @click="stopRecordVideo()"
            >
              <img
                :src="require('../assets/icon/video-slash-solid.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>Stop Video Record</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_screenshot"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              :disabled="status === 'pause'"
              v-on="on"
              @click="screenshot()"
            >
              <img
                :src="require('../assets/icon/camera.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>Screenshot</span>
        </v-tooltip>
        <v-tooltip top v-if="!recordAudioStarted">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_start_record_audio"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              :disabled="status === 'pause'"
              @click="startRecordAudio()"
            >
              <img
                :src="require('../assets/icon/microphone-solid.svg')"
                width="28"
                height="28"
              />
            </v-btn>
          </template>
          <span>Start Audio Record</span>
        </v-tooltip>
        <v-tooltip top v-if="recordAudioStarted">
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_stop_record_audio"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              :disabled="status === 'pause'"
              @click="stopRecordAudio()"
            >
              <img
                :src="require('../assets/icon/microphone-slash-solid.svg')"
                width="28"
                height="28"
              />
            </v-btn>
          </template>
          <span>Stop Audio Record</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              id="btn_note"
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              :disabled="status === 'pause'"
              v-on="on"
              @click="showNoteDialog"
            >
              <img
                :src="require('../assets/icon/pencil.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>Note</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              :disabled="status === 'pause'"
              v-on="on"
              @click="mindMap"
            >
              <img
                :src="require('../assets/icon/connect.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>Mind Map</span>
        </v-tooltip>
        <!--<v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn
              class="control-btn mx-1"
              fab
              outlined
              small
              color="default"
              v-on="on"
              @click="minimize"
            >
              <img
                :src="require('../assets/icon/union.svg')"
                width="24"
                height="24"
              />
            </v-btn>
          </template>
          <span>Minimize</span>
        </v-tooltip>-->
      </v-col>
    </v-row>
    <SourcePickerDialog
      v-model="sourcePickerDialog"
      :sources="sources"
      :sourceId="sourceId"
      :loaded="loaded"
      @submit-source="startSession"
    />
    <NoteDialog
      v-model="noteDialog"
      @submit-comment="addNote"
      :configItem="config"
    />
    <SummaryDialog
      v-model="summaryDialog"
      @submit-comment="addSummary"
      :configItem="config"
    />
    <DeleteConfirmDialog
      v-model="deleteConfirmDialog"
      title="Confirm delete"
      :text="`Are you sure you want to delete?`"
      @confirm="deleteItems"
      @cancel="deleteConfirmDialog = false"
    />
    <ResetConfirmDialog
      v-model="resetConfirmDialog"
      title="Confirm Reset"
      :text="`Are you sure you want to reset?`"
      @confirm="reset"
      @cancel="resetConfirmDialog = false"
    />
    <NewSessionDialog
      v-model="newSessionDialog"
      title="Save Current Progress"
      :text="`Do you want save current progress?`"
      @save="saveSession"
      @discard="discardSession"
      @cancel="newSessionDialog = false"
    />
    <DurationConfirmDialog
      v-model="durationConfirmDialog"
      title="Session Time"
      :text="`Do you want to proceed with testing or end the test session?`"
      @end="end"
      @proceed="proceed"
    />
    <AudioErrorDialog
      v-model="audioErrorDialog"
      title="Error Recording Audio"
      :text="`An error occurred while recording the audio.`"
      @cancel="audioErrorDialog = false"
    />
    <EndSessionDialog
      v-model="endSessionDialog"
      @proceed="
        () => {
          endSessionDialog = false;
          endSessionProcess();
        }
      "
      :post-session-data="postSessionData"
    />
  </v-container>
</template>

<script>
import { VContainer, VRow, VCol, VBtn, VIcon } from "vuetify/lib/components";
import dayjs from "dayjs";
import SourcePickerDialog from "./dialogs/SourcePickerDialog.vue";
import NoteDialog from "./dialogs/NoteDialog.vue";
import SummaryDialog from "./dialogs/SummaryDialog.vue";
import DeleteConfirmDialog from "./dialogs/DeleteConfirmDialog.vue";
import ResetConfirmDialog from "./dialogs/ResetConfirmDialog.vue";
import NewSessionDialog from "./dialogs/NewSessionDialog.vue";
import DurationConfirmDialog from "./dialogs/DurationConfirmDialog.vue";
import AudioErrorDialog from "./dialogs/AudioErrorDialog.vue";
import EndSessionDialog from "./dialogs/EndSessionDialog.vue";

import {
  IPC_HANDLERS,
  IPC_FUNCTIONS,
  SESSION_STATUSES,
  VIDEO_RESOLUTION,
} from "../modules/constants";

import {
  DEFAULT_MAP_NODES,
  DEFAULT_MAP_CONNECTIONS,
} from "../modules/constants";

let mediaRecorder;
let audioContext;
let dest;

export default {
  name: "ControlPanel",
  components: {
    VContainer,
    VRow,
    VCol,
    VBtn,
    VIcon,
    SourcePickerDialog,
    NoteDialog,
    SummaryDialog,
    DeleteConfirmDialog,
    ResetConfirmDialog,
    NewSessionDialog,
    DurationConfirmDialog,
    AudioErrorDialog,
    EndSessionDialog,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    selectedItems: {
      type: Array,
      default: () => [],
    },
    configItem: {
      type: Object,
      default: () => {},
    },
    checkedStatusOfPreSessionTask: {
      type: Boolean,
      default: () => false,
    },
    postSessionData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    try {
      audioContext = new AudioContext();
      dest = audioContext.createMediaStreamDestination();
    } catch (e) {
      console.log(e);
    }
  },
  watch: {
    items: function (newValue) {
      this.itemLists = newValue;
    },
    selectedItems: function (newValue) {
      this.selected = newValue;
    },
    configItem: function (newValue) {
      this.config = newValue;
    },
  },
  data() {
    return {
      sourcePickerDialog: false,
      noteDialog: false,
      summaryDialog: false,

      deleteConfirmDialog: false,
      resetConfirmDialog: false,
      newSessionDialog: false,
      durationConfirmDialog: false,
      audioErrorDialog: false,
      endSessionDialog: false,

      sources: [],
      sourceId: "",
      itemLists: this.items,
      config: this.configItem,
      audioDevices: [],
      loaded: false,
      status: this.$store.state.status,
      recordVideoStarted: false,
      recordAudioStarted: false,

      interval: null,
      timer: 0,
      duration: 0,
      isDuration: false,
      started: "",
      ended: "",

      selected: [],
    };
  },
  mounted() {
    this.$root.$on("close-sourcepickerdialog", this.hideSourcePickerDialog);
    this.$root.$on("close-notedialog", this.hideNoteDialog);

    if (this.status === SESSION_STATUSES.START) {
      this.status = this.$store.state.status;
      this.timer = this.$store.state.timer;
      this.duration = this.$store.state.duration;
      this.startInterval();
    }

    this.$root.$on("close-summarydialog", () => {
      this.summaryDialog = false;
      this.endSession();
    });
  },
  beforeDestroy() {
    this.$root.$off("close-sourcepickerdialog", this.hideSourcePickerDialog);
    this.$root.$on("close-notedialog", this.hideNoteDialog);

    // clear timer
    clearInterval(this.interval);
    this.timer = 0;
  },
  methods: {
    showSourcePickerDialog() {
      if (!this.checkedStatusOfPreSessionTask) {
        this.$emit("handle-pressesion-task-error", true);
        return;
      }

      this.$emit("handle-pressesion-task-error", false);
      this.sourcePickerDialog = true;
      this.getSourceList();
    },
    hideSourcePickerDialog() {
      this.sourcePickerDialog = false;
    },
    showNoteDialog() {
      this.noteDialog = true;
    },
    hideNoteDialog() {
      this.noteDialog = false;
    },
    startInterval() {
      this.interval = setInterval(() => {
        this.timer += 1;
        if (this.duration > 0) {
          this.duration -= 1;
        }

        this.updateStoreSession();
        if (this.isDuration && this.duration === 0) {
          this.durationConfirmDialog = true;
          this.isDuration = false;
          this.stopInterval();
        }
      }, 1000);
    },
    stopInterval() {
      clearInterval(this.interval);
      this.updateStoreSession();
    },
    updateStoreSession() {
      this.$store.commit("updateSession", {
        status: this.status,
        timer: this.timer,
        duration: this.duration,
      });
    },
    startSession(id) {
      this.sourceId = id;
      this.sourcePickerDialog = false;
      this.status = SESSION_STATUSES.START;
      this.timer = this.$store.state.timer;
      this.duration = this.$store.state.duration;
      if (this.duration > 0) {
        this.isDuration = true;
      }
      this.started = this.getCurrentDateTime();
      this.$store.commit("setStarted", this.started);

      this.startInterval();
      this.changeSessionStatus(SESSION_STATUSES.START);

      const currentPath = this.$router.history.current.path;
      if (currentPath !== "/main/workspace") {
        this.$router.push({ path: "/main/workspace" });
      }
    },
    pauseSession() {
      this.status = SESSION_STATUSES.PAUSE;
      this.changeSessionStatus(SESSION_STATUSES.PAUSE);
      this.stopInterval();
    },
    resumeSession() {
      this.status = SESSION_STATUSES.RESUME;
      this.timer = this.$store.state.timer;
      this.startInterval();
    },
    endSession() {
      if (this.postSessionData.status) {
        // this.postsession = this.postSessionData;
        this.endSessionDialog = true;
        return;
      }

      this.endSessionProcess();
    },
    endSessionProcess() {
      this.sourceId = "";

      this.ended = this.getCurrentDateTime();
      this.$store.commit("setEnded", this.ended);

      this.status = SESSION_STATUSES.END;
      this.changeSessionStatus(SESSION_STATUSES.END);
      this.stopInterval();

      if (window.ipc) {
        window.ipc.invoke(IPC_HANDLERS.CAPTURE, {
          func: IPC_FUNCTIONS.SET_WINDOW_SIZE,
          data: {
            width: 1440,
            height: 900,
            minWidth: 1440,
            minHeight: 900,
          },
        });
      }

      this.$router.push({ path: "/result" });
    },
    resume() {
      this.status = SESSION_STATUSES.PAUSE;
      this.changeSessionStatus(SESSION_STATUSES.PAUSE);
      this.timer = this.$store.state.timer;
      this.updateStoreSession();

      this.removeSummary();
      this.$router.push({ path: "/main/workspace" });
    },

    reset() {
      this.resetConfirmDialog = false;
      this.status = SESSION_STATUSES.PENDING;
      this.changeSessionStatus(SESSION_STATUSES.PENDING);
      this.$store.commit("resetState");

      try {
        // reset database
        window.ipc.invoke(IPC_HANDLERS.DATABASE, {
          func: IPC_FUNCTIONS.INITIALIZE_SESSION,
        });
      } catch (e) {
        console.log(e);
      }

      this.stopInterval();
      this.$router.push({ path: "/main" });
    },

    end() {
      this.durationConfirmDialog = false;
      this.endSession();
    },
    proceed() {
      this.durationConfirmDialog = false;
      this.status = SESSION_STATUSES.PROCEED;
      this.changeSessionStatus(SESSION_STATUSES.PROCEED);
      this.startInterval();
    },

    updateStatus(value) {
      this.status = value;
      this.changeSessionStatus(this.status);
      this.$store.commit("setStatus", this.status);
    },
    async getSourceList() {
      try {
        await window.ipc
          .invoke(IPC_HANDLERS.CAPTURE, {
            func: IPC_FUNCTIONS.GET_MEDIA_SOURCE,
          })
          .then((data) => {
            this.loaded = true;
            this.sources = data;
          });
      } catch (e) {
        console.log(e);
      }
    },
    async screenshot() {
      this.handleStream = (stream) => {
        const video = document.createElement("video");
        video.srcObject = stream;
        video.onloadedmetadata = async () => {
          const _this = video;
          video.play();
          const canvas = document.createElement("canvas");
          canvas.width = _this.videoWidth;
          canvas.height = _this.videoHeight;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          video.remove();
          const imgURI = canvas.toDataURL("image/png");
          if (window.ipc) {
            await window.ipc
              .invoke(IPC_HANDLERS.CAPTURE, {
                func: IPC_FUNCTIONS.CREATE_IMAGE,
                data: { url: imgURI },
              })
              .then(({ fileName, filePath }) => {
                const data = {
                  sessionType: "Screenshot",
                  fileType: "image",
                  fileName: fileName,
                  filePath: filePath,
                  time: this.timer,
                };
                this.openAddWindow(data);
              });
          }
        };
      };

      this.handleError = (error) => {
        console.log(error);
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: this.sourceId,
              minWidth: 1280,
              maxWidth: 10000,
              minHeight: 720,
              maxHeight: 4000,
            },
          },
        });
        this.handleStream(stream);
      } catch (e) {
        this.handleError(e);
      }
    },
    async startRecordVideo() {
      this.handleStream = (stream) => {
        if (this.config.audioCapture && this.audioDevices.length > 0) {
          stream.addTrack(dest.stream.getAudioTracks()[0]);
        }
        mediaRecorder = new MediaRecorder(stream, {
          mimeType: "video/webm;codecs=h264",
        });

        let poster;
        let frames = [];

        mediaRecorder.onstart = () => {
          this.recordVideoStarted = true;
          const video = document.createElement("video");
          video.srcObject = stream;
          video.onloadedmetadata = async () => {
            video.play();
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.remove();
            const imgURI = canvas.toDataURL("image/png");
            await window.ipc
              .invoke(IPC_HANDLERS.CAPTURE, {
                func: IPC_FUNCTIONS.CREATE_IMAGE,
                data: { url: imgURI },
              })
              .then(({ filePath }) => {
                poster = filePath;
              });
          };
        };

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            frames.push(e.data);
          }
        };

        mediaRecorder.onstop = async () => {
          this.recordVideoStarted = false;
          const blob = new Blob(frames, { type: "video/webm;codecs=h264" });
          const buffer = await blob.arrayBuffer();
          if (window.ipc) {
            await window.ipc
              .invoke(IPC_HANDLERS.CAPTURE, {
                func: IPC_FUNCTIONS.CREATE_VIDEO,
                data: { buffer: buffer },
              })
              .then(({ fileName, filePath }) => {
                const data = {
                  sessionType: "Video",
                  fileType: "video",
                  fileName: fileName,
                  filePath: filePath,
                  poster: poster,
                  time: this.timer,
                };
                this.openAddWindow(data);
              });
          }
        };

        frames = [];

        mediaRecorder.start(1000);
      };

      this.handleError = (error) => {
        console.log(error);
      };

      try {
        const videoQuality = this.config.videoQuality;
        let resolution;
        VIDEO_RESOLUTION.map((item) => {
          let temp = Object.assign({}, item);
          if (temp.type === videoQuality) {
            resolution = temp;
          }
        });
        const constraints = {
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: this.sourceId,
              minWidth: resolution.width,
              maxWidth: resolution.width,
              minHeight: resolution.height,
              maxHeight: resolution.height,
            },
          },
        };

        if (this.config.audioCapture) {
          this.audioDevices = await this.getAudioSources();
          if (this.audioDevices.length > 0) {
            await this.setAudio(this.audioDevices);
          }
        }

        const stream = await navigator.mediaDevices.getUserMedia(constraints);

        stream.getVideoTracks()[0].applyConstraints({ frameRate: 30 });

        this.handleStream(stream);
      } catch (e) {
        console.log(e);
      }
    },
    stopRecordVideo() {
      try {
        mediaRecorder.stop();
      } catch (error) {
        console.log(error);
      }
    },
    async getAudioSources() {
      return await navigator.mediaDevices.enumerateDevices().then((devices) => {
        const audioDevices = devices.filter(
          (d) =>
            d.kind === "audioinput" &&
            d.deviceId != "communications" &&
            d.deviceId != "default"
        );
        return audioDevices;
      });
    },
    async setAudio(source) {
      const audioStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: source.deviceId,
          autoGainControl: false,
          latency: 0.0,
        },
      });
      let audioIn_01 = audioContext.createMediaStreamSource(audioStream);
      audioIn_01.connect(dest);
      return audioIn_01;
    },
    async startRecordAudio() {
      this.setAudioSource = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
              deviceId: this.audioDevices[0].deviceId,
              autoGainControl: false,
              latency: 0.0,
            },
          });

          this.handleStream(stream);
        } catch (e) {
          this.handleError(e);
        }
      };

      this.handleStream = (stream) => {
        let recordedChunks = [];

        const option = {
          mimeType: "audio/webm",
        };

        mediaRecorder = new MediaRecorder(stream, option);

        mediaRecorder.onstart = () => {
          this.recordAudioStarted = true;
        };

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunks.push(e.data);
          }
        };

        mediaRecorder.onstop = async () => {
          this.recordAudioStarted = false;
          const blob = new Blob(recordedChunks, {
            type: "audio/mpeg-3",
          });

          const buffer = await blob.arrayBuffer();

          if (window.ipc) {
            await window.ipc
              .invoke(IPC_HANDLERS.CAPTURE, {
                func: IPC_FUNCTIONS.CREATE_AUDIO,
                data: { buffer: buffer },
              })
              .then(({ fileName, filePath }) => {
                const data = {
                  sessionType: "Audio",
                  fileType: "audio",
                  fileName: fileName,
                  filePath: filePath,
                  time: this.timer,
                  poster: "",
                };

                this.openAddWindow(data);
              });
          }
          recordedChunks = [];
        };

        mediaRecorder.start(1000);
      };

      this.handleError = (error) => {
        console.log("Error:", error);
      };

      // try {
      //   this.audioDevices = await this.getAudioSources();
      //   if (!this.audioDevices.length) {
      //     this.audioErrorDialog = true;
      //     return;
      //   }
      //   const stream = this.setAudio(this.audioDevices);
      //   this.handleStream(stream);
      // } catch (e) {
      //   console.log(e);
      // }

      await navigator.mediaDevices.enumerateDevices().then((devices) => {
        this.audioDevices = devices.filter(
          (d) =>
            d.kind === "audioinput" &&
            d.deviceId != "communications" &&
            d.deviceId != "default"
        );
        console.log("audio devices:", this.audioDevices);
        if (!this.audioDevices.length) {
          this.audioErrorDialog = true;
          return;
        }

        this.setAudioSource();
      });
    },
    stopRecordAudio() {
      try {
        mediaRecorder.stop();
      } catch (error) {
        console.log(error);
      }
    },
    async openAddWindow(data) {
      await window.ipc.invoke(IPC_HANDLERS.CAPTURE, {
        func: IPC_FUNCTIONS.OPEN_ADD_WINDOW,
        data: { width: 700, height: 800, data: data },
      });
    },
    async addNote(value) {
      const date = dayjs().format("MM/DD/YYYY HH:mm:ss");
      const fileName = dayjs().format("YYYY-MM-DD_HH-mm-ss-ms") + ".txt";

      if (window.ipc) {
        // Save Note
        await window.ipc
          .invoke(IPC_HANDLERS.CAPTURE, {
            func: IPC_FUNCTIONS.SAVE_NOTE,
            data: { fileName: fileName, comment: value },
          })
          .then((filePath) => {
            let newItem = {
              id: Date.now(),
              sessionType: "Note",
              fileType: "text",
              fileName: fileName,
              filePath: filePath,
              comment: value,
              time: this.timer,
              createdAt: date,
            };
            this.$emit("add-item", newItem);
          });
      }

      this.noteDialog = false;
    },
    async addSummary(value) {
      const date = dayjs().format("MM/DD/YYYY HH:mm:ss");

      const data = {
        id: Date.now(),
        sessionType: "Summary",
        comment: value,
        time: this.timer,
        createdAt: date,
      };

      this.$emit("add-item", data);
      this.summaryDialog = false;
      this.endSession();
    },
    async removeSummary() {
      let summary = [];
      this.items.map((item) => {
        if (item.sessionType === "Summary") {
          summary.push(item.id);
        }
      });
      if (window.ipc) {
        await window.ipc.invoke(IPC_HANDLERS.DATABASE, {
          func: IPC_FUNCTIONS.DELETE_ITEMS,
          data: summary,
        });
      }
    },
    mindMap() {
      const data = {
        sessionType: "Mindmap",
        fileType: "mindmap",
        fileName: "",
        filePath: "",
        content: {
          nodes: DEFAULT_MAP_NODES,
          connections: DEFAULT_MAP_CONNECTIONS,
        },
        time: this.timer,
      };
      this.openAddWindow(data);
    },
    async minimize() {
      await window.ipc.invoke(IPC_HANDLERS.CAPTURE, {
        func: IPC_FUNCTIONS.OPEN_MINIMIZE_WINDOW,
        data: { width: 700, height: 800 },
      });
    },
    async deleteItems() {
      await window.ipc.invoke(IPC_HANDLERS.DATABASE, {
        func: IPC_FUNCTIONS.DELETE_ITEMS,
        data: this.selected,
      });

      await window.ipc.invoke(IPC_HANDLERS.DATABASE, {
        func: IPC_FUNCTIONS.DELETE_NOTES,
        data: this.selected,
      });

      this.selected = [];
      this.$root.$emit("update-selected", this.selected);
      this.deleteConfirmDialog = false;
    },
    async exportItems() {
      if (window.ipc) {
        await window.ipc.invoke(IPC_HANDLERS.FILE_SYSTEM, {
          func: IPC_FUNCTIONS.EXPORT_ITEMS,
          data: this.selected,
        });
      }

      this.selected = [];
      this.$root.$emit("update-selected", this.selected);
    },
    async saveSession() {
      this.newSessionDialog = false;
      const data = {
        title: this.$store.state.title,
        charter: this.$store.state.charter,
        precondition: this.$store.state.precondition,
        duration: this.$store.state.duration,
        status: this.$store.state.status,
        timer: this.$store.state.timer,
        started: this.$store.state.started,
        ended: this.$store.state.ended,
        path: this.$route.path,
      };
      await window.ipc.invoke(IPC_HANDLERS.FILE_SYSTEM, {
        func: IPC_FUNCTIONS.SAVE_SESSION,
        data: data,
      });
    },
    discardSession() {
      this.$store.commit("resetState");
      this.changeSessionStatus(SESSION_STATUSES.PENDING);
      clearInterval(this.interval);
      this.$router.push({ path: "/" });
    },
    getCurrentDateTime() {
      const now = new Date();
      const currentDateTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0") +
        " | " +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0") +
        "-" +
        now.getFullYear();

      return currentDateTime;
    },
    changeSessionStatus(status) {
      window.ipc.invoke(IPC_HANDLERS.MENU, {
        func: IPC_FUNCTIONS.CHANGE_MENUITEM_STATUS,
        data: { sessionStatus: status },
      });
    },
    async showNotePanel() {
      await window.ipc.invoke(IPC_HANDLERS.CAPTURE, {
        func: IPC_FUNCTIONS.OPEN_NOTES_WINDOW,
        data: { width: 700, height: 800 },
      });
    },
  },
};
</script>

<style scoped>
.control-btn-wrapper {
  background: #f3f4f6;
}
.v-btn--disabled img {
  opacity: 0.5;
}
</style>
