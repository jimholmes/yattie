<template>
  <v-dialog v-bind="$attrs" v-on="$listeners" persistent width="350">
    <v-sheet outlined color="accent" rounded>
      <v-card>
        <LogoWrapper :height="20" :width="60" />
        <v-card-text>
          <v-form ref="form" v-model="valid">
            <v-text-field
              v-model="text"
              :rules="textRules"
              label="Node Title"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn small color="primary" class="text-capitalize" @click="save">
            Save
          </v-btn>
          <v-btn small color="white" class="text-capitalize" @click="cancel">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>

<script>
import LogoWrapper from "../LogoWrapper.vue";
export default {
  name: "NodeEditDialog",
  components: {
    LogoWrapper,
  },
  props: {
    title: {
      type: String,
      default: () => "",
    },
  },
  watch: {
    title: function () {
      this.text = this.title;
    },
  },
  data() {
    return {
      text: "",
      valid: false,
      textRules: [(v) => !!v || "Node title is required"],
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel");
    },
    save() {
      if (this.$refs.form.validate()) {
        this.$emit("save", this.text);
        this.$refs.form.reset();
      }
    },
  },
};
</script>

<style scoped>
.v-card {
  padding: 24px;
}
.v-card__title {
  padding: 0;
  padding-top: 0.5rem;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  color: #111827;
}
.v-card__text {
  padding: 0;
  padding-top: 0.5rem;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #6b7280;
}
.v-card__actions {
  padding: 0;
  padding-top: 1rem;
}
</style>
