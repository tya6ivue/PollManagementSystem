<template>
  <div>
    <!-- {{ getSellectedVal }} -->
    

    <div>
      <b-modal id="bv-modal-example" hide-footer>
        <template #modal-title> Poll </template>
   <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
        <div>
          <div class="d-block text-center">
            <div>
              <b-form-group
                label="Title"
                label-for="option-input"
                invalid-feedback="Field is required"
              >
              </b-form-group>

              <div v-if="!isEdit">
                {{ getSellectedVal.title }}
              </div>
            </div>

            <!-- <b-form-group
        v-model="updatedtitle"
          label-for="option-input"
          invalid-feedback="Field is required"
        >
        </b-form-group> -->

            <b-form-input
              v-if="isEdit"
              id="input-1"
              v-model="updatedtitleText"
              type="text"
              placeholder="Enter title"
              required
            ></b-form-input>

            <b-button @click="updatedTitleToDb" v-if="!isEdit">Edit</b-button>

            <b-button @click="sendTitle" v-if="isEdit"> update</b-button>

            <div class="mt-3">
              <b-tr
                v-for="(opt, index) in getSellectedVal.options"
                v-bind:key="index"
                style="margin-bottom: 20px"
              >
                <b-td style="width: 90%; margin-bottom: 20px">{{
                  opt.option
                }}</b-td>
<!-- <b-td>
  <b-form-checkbox-group   class="mb-3"
  v-model="selected"
    :options="ButtonOptions"
      value-field="item"
      text-field="name"
    >
    
  </b-form-checkbox-group>
</b-td> -->

<!-- <b-td style="width:90%; padding:5px; border:1px solid #f7f7f7;" class="mb-3" ></b-td>
            <b-td style="width:10%;"><b-button> Vote</b-button></b-td> -->
             

                <b-td 
                  ><b-button
                    variant="outline-danger"
                    size="sm"
                    class="ml-auto"
                    @click="remove(opt.option)"
                    >Remove</b-button
                  ></b-td
                >
              </b-tr>
            </div>

            <div v-for="(option, index) in noOfOptions" v-bind:key="index">
              <b-form-group
                label="Option"
                label-for="option-input"
                invalid-feedback="Field is required"
              >
                <b-form-input
                  id="option-input"
                  v-model="option.value"
                  required
                ></b-form-input>
              </b-form-group>
            </div>
            <b-form-group>
              <b-button
                @click="addOptions"
                variant="outline-primary"
                class="mt-3"
                >Add Option</b-button
              >
              <!-- <b-button
                @click="deleteOptions()"
                variant="outline-primary"
                class="mt-3"
                >Delete Option</b-button -->
              
            </b-form-group>
            <b-button
              @click="updateVlue()"
              variant="outline-primary"
              class="mt-3"
              >Update value</b-button
            >
          </div>
        </div>

        <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')"
          >Close Me</b-button
        >
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
         selected: [],
             
        //  ButtonOptions: "",
        ButtonOptions: [
          { item: "voted" },
          // { item: 'B' },
          // { item: 'D', name: 'Option C', notEnabled: true },

        ],
      //  TitleSeen: true,
      //  seen: false,
      isEdit: false,

      updatedtitleText: "",
      isHideInput: false,
      UpdatedTitle: "",

      noOfOptions: [{ value: "" }],
      options: "",
      Title: "",
    };
  },

  //  mounted() {
  //      console.log(this.editId, "ye haiii edit ")
  //  },

  computed: {
    ...mapGetters("poll", ["getSellectedVal"]),

    //  getDetails() {
    //    console.log(this.getPollData)
    // return   this.getPollData
    //  }
  },

  mounted() {
    console.log("gfdsdfds", this.getPollData);
  },

  methods: {
    ...mapActions("poll", [
      "EditPole",
      "removeOption",
      "updatedTitle",
      "fetchPollWithId",
    ]),
    addOptions() {
      this.noOfOptions.push({ value: "" });
    },

    EditPole() {
      alert("this is edit btn");
      this.EditPoll(console.log("efgh"));
    },

    deleteOptions() {
      for (let i = 0; i < this.noOfOptions.length; i++) {
        if (i == 0) {
          this.options = this.noOfOptions[i].value;
        } else {
          this.options = this.options + "____" + this.noOfOptions[i].value;
        }
      }
      this.deleteOption(this.options.value);
    },

    // updateVlue() {
    //   this.deleteOption();
    //   this.updatedTitle();
    //   this.$bvModal.hide('bv-modal-example')
    //   // this.hideModal();
    // },

    updatedTitleToDb() {
      this.isEdit = true;

      this.updatedtitleText = this.getSellectedVal.title;
    },
    sendTitle() {
      this.isEdit = false;
      console.log("sdfghgfdsdfddfdsa");
      this.updatedTitle(this.updatedtitleText);
    },

    hideModal() {
      this.$bvModal.hide("bv-modal-example");
    },

    remove(opt) {
      console.log(opt);
      this.removeOption(opt);
    },
  },
};
</script>

<style>
</style>