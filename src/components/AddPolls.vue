<template>
   <div> 
              <b-button id="show-btn" @click="showModal">Add poll</b-button>

              <b-modal ref="my-modal" hide-footer title="Add new Poll">
                <div class="d-block text-center">
                     <b-form-group
                      label="Title"
                      label-for="option-input"
                      invalid-feedback="Field is required"
                    > </b-form-group>
                  <b-form-input
                    id="input-1"
                    v-model="Title"
                    type="text"
                    placeholder="Enter title"
                    required
                  ></b-form-input>

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
                  </b-form-group>
                </div>
                <b-button
                  class="mt-3"
                  variant="outline-danger"
                  block
                  @click="hideModal"
                  >Close Me</b-button
                >
                <b-button
                  class="mt-2"
                  variant="outline-warning"
                  block
                  @click="AddPolls"
                  >Add Poll</b-button
                >
              </b-modal>
            </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";
import VueAxios from "vue-axios";
import Vue from "vue";
Vue.use(axios, VueAxios);

export default {
  name: "AddPolls",

  data() {

    return {

      noOfOptions: [{ value: "" }],
        options: '',
        Title: "",
    }

  },


      methods: {

    ...mapActions("poll", ["AddPollsData"]),

     addOptions() {
      this.noOfOptions.push({ value: "" });
    },
    AddPolls() {
  
 for(let i=0; i<this.noOfOptions.length; i++){
                if(i==0){
                    this.options = this.noOfOptions[i].value;
                }
                else{
                    this.options = this.options + '____'+this.noOfOptions[i].value;
                }
                
            }



      let user = {
        Title: "",
        PollOption: "",
      };

      (user.Title = this.Title), (user.PollOption = this.options);
      console.log(user)

      this.AddPollsData(user);
      this.Title = "",
      this.noOfOptions = ""
      // this.$router.push("/Poll");
      this.$refs["my-modal"].hide()
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
      }
};
</script>

<style>
</style>