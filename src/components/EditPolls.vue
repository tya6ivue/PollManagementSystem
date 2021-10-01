<template>
  <div>
    <div>
      <b-modal id="bv-modal-example" hide-header-close hide-footer no-close-on-esc no-close-on-backdrop> 
        <template #modal-title>
          <div> 
            <b-button @click="hideModal"  variant="danger" align="right"
              >Close
            </b-button>
          </div>
        </template>

        <div>
          <div class="d-block">
            <b-tr style="margin-bottom: 20px">
              <b-td  class="w-100">
                <b-card-text v-if="!isEdit">
                  <strong> {{ getSellectedVal.title }} </strong>
                </b-card-text>

                <input
                  v-if="isEdit"
                  id="input-1"
                  v-model="updatedtitleText"
                  type="text"
                  placeholder="Enter title"
                  required
                />
              </b-td>
              <b-td>
                <b-button
                  @click="updatedTitleToDb"
                  v-if="!isEdit"
                  variant="info"
                  >Edit</b-button
                >

                <b-button @click="sendTitle()" v-if="isEdit" variant="info">
                  update</b-button
                >
              </b-td>
            </b-tr>

            <div class="mt-3">
              <b-tr
                v-for="(opt, index) in getSellectedVal.options"
                v-bind:key="index"
                style="margin-bottom: 20px"
              >
                <b-td style="width: 90%; margin-bottom: 20px">
                  {{ String.fromCharCode(index + 97) }}. {{ opt.option }}
                </b-td>

                <b-td
                  ><b-button
                    variant="outline-success"
                    size="sm"
                    class="mt-2"
                    @click="remove(opt.option)"
                    v-if="getSellectedVal.options.length > 2"
                  >
                    <span v-if="loader !== opt.option"> Remove </span>
                    <b-spinner
                      small
                      v-if="loader === opt.option"
                      label="Loading..."
                    /> </b-button
                ></b-td>
              </b-tr>
            </div>

            <b-form-group>
              <input
                v-if="isHideInputForOpt"
                id="input-1"
                v-model="optionvalue"
                type="text"
                placeholder="Enter title"
                required
              />

              <b-button
                @click="ForBtnTogle"
                v-if="!isHideInputForOpt"
                class="mt-4"
                variant="info"
              >
                Add new option
              </b-button>

              <b-button
                @click="addOptions()"
                v-if="isHideInputForOpt"
                variant="info"
              >
                Add</b-button
              >
            </b-form-group>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditPolls",
  props: {
    editId: {
      default: () => {},
      type: String,
    },
  },
  data() {
    return {
      loader: false,
      isHideInputForOpt: false,
      optionvalue: "",
      getId: "",
      isEdit: false,
      updatedtitleText: "",
      noOfOptions: [{ value: "" }],
      options: "",
      Title: "",
    };
  },

  computed: {
    ...mapGetters("poll", ["getSellectedVal", "GetUpdatedTitle"]),
  },

  mounted() {
    this.getId = this.getDetails();
  },

  methods: {
    ...mapActions("poll", [
      "removeOption",
      "updatedPollTitle",
      "getAllPolls",
      "AddOtion",
      "fetchPollWithId",
    ]),

    ForBtnTogle() {
      this.isHideInputForOpt = true;
    },

    async addOptions() {
      this.loader = true;
      if (this.optionvalue) {
        this.isHideInputForOpt = false;
        let checkDuplicateOpt = false
             this.getSellectedVal.options.forEach(element => {
                    if ( this.optionvalue === element.option) {
                        checkDuplicateOpt = true
                    }
            });
           if (checkDuplicateOpt) {
             this.makeToast("danger", (this.msg = "Poll is already exist"));
           } else  { 
             const OptionCont = {
               option: "",
               id: "",
             };
          (OptionCont.option = this.optionvalue),
          (OptionCont.id = this.getDetails());
           await this.AddOtion(OptionCont);
           this.optionvalue = "";
           await this.getAllPolls();
           this.makeToast("success", (this.msg = " New option added"));
           this.loader = false;
           }    
      } else
        this.makeToast("danger", (this.msg = "You filled an empty Option"));
    },

    getDetails() {
      return this.getSellectedVal;
    },

    updatedTitleToDb() {
      this.isEdit = true;
      this.updatedtitleText = this.getSellectedVal.title;
    },

    async sendTitle() {
      this.isEdit = false;
      let updatedtitle = this.updatedtitleText;
      this.getId = this.getDetails();
      await this.updatedPollTitle({ title: updatedtitle, id: this.getId });
      let vm = this;
      vm.isEdit = false;
      this.getAllPolls();
      this.fetchPollWithId();
      this.makeToast("success", (this.msg = "Title updated"));
    },

    hideModal() {
      this.isEdit = false;
      this.isHideInputForOpt = false;
      this.optionvalue = ""
      this.$bvModal.hide("bv-modal-example");
    },

    async remove(index) {
      this.loader = index;
      this.getId = this.getDetails();
      await this.removeOption({ index: index, id: this.getId });
      await this.getAllPolls();
      this.makeToast("success", (this.msg = "Option deleted successfully"));
      this.loader = false;
    },

    makeToast(variant, msg) {
      this.$bvToast.toast(msg, {
        title: `Variant ${variant || "default"}`,
        variant: variant,
        solid: true,
      });
    },
  },
};
</script>

<style>
</style>