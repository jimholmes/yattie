import Vuetify from "vuetify";
import CheckTaskWrapper from "../CheckTaskWrapper.vue";

import { mount, createLocalVue } from "@vue/test-utils";

const localVue = createLocalVue();

const vuetify = new Vuetify();

describe("CheckTaskWrapper.vue", () => {
  test("render a view", () => {
    const wrapper = mount(CheckTaskWrapper, {
      propsData: {
        showError: false,
        tasks: [
          {
            id: 1,
            checked: false,
            content: "",
          },
        ],
        type: "presession",
      },
      localVue,
      vuetify,
    });

    expect(wrapper.find(".task-wrapper .subtitle-2").exists()).toBe(true);
    expect(wrapper.find(".task-wrapper .list").exists()).toBe(true);
    expect(wrapper.findAll(".task-wrapper .list .one").length).toBe(1);
    expect(wrapper.find(".task-wrapper .error1").exists()).toBe(false);
  });

  test("show a error panel", () => {
    const wrapper = mount(CheckTaskWrapper, {
      propsData: {
        showError: true,
        tasks: [
          {
            id: 1,
            checked: false,
            content: "",
          },
        ],
        type: "presession",
      },
      localVue,
      vuetify,
    });

    expect(wrapper.find(".task-wrapper .error1").exists()).toBe(true);
    expect(
      wrapper.find(".task-wrapper .error1 .content .title").text()
    ).toContain("Required checkboxes");
    expect(
      wrapper.find(".task-wrapper .error1 .content .desc").text()
    ).toContain(
      "You can't end your session without checking all required(*) post-session checkboxes."
    );
  });
});
