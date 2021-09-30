<template>
  <div>
  
  <!-- <div class="mt-5 text-success" >
        {{this.msg}}
  </div> -->

    <div >
      <b-container class="d-flex justify-content-center align-items-center" style="min-height: 100vh">
        <b-row>
          <b-col >
            <b-card title="Login" style="width: 20rem; padding: 20px;" class="bg-light" >
              <b-card-text>
                <b-form-group>
                  <b-form-input class="mt-4"
                    v-model="form.username"
                    type="text"
                    placeholder="Enter email"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group class="mt-4">
                  <b-form-input
                    v-model="form.password"
                    type="password"
                    placeholder="Enter password"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-form-group>
                  <b-button @click="onSubmit" variant="primary" class="mt-4 mb-3"
                    >  <span v-if="!loader">  Login  </span>     <b-spinner
                      v-if="loader" label="Loading..."/> 
                      </b-button>
                </b-form-group>
                <b-card-text >
                  <router-link class="mt-2" :to="{ path: '/SignUp' }">
                    Have not Account? sign Up
                  </router-link>
                </b-card-text>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>





    <b-form> </b-form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      loader: false,
      msg: "",
      show: false,
      posts: [],

      form: {
        username: "",
        password: "",
      },
    };
  },

  mounted() {
    this.LoginUserDetails();

  },

  computed: {
    ...mapGetters("user", ["getLogindata"]),

  },

  methods: {
    ...mapActions("user", ["LoginUserDetails", "getAllPolls"]),

   

    async onSubmit() {
      this.loader = true
      let user = {
        username: "",
        password: "",
      };

      (user.password = this.form.password),
        (user.username = this.form.username);

      const res = await this.LoginUserDetails(user);


      if (res.data.error !== 0) {
          
          this.makeToast('danger', this.msg = "User not found please try again") 
            this.loader = false
      
      } else {
        
          localStorage.setItem("SetData", "moveOn") 
        this.$router.push("/Poll");
        this.getAllPolls();
         this.loader = false
      }

    },

 makeToast(variant,msg) {
        this.$bvToast.toast(msg, {
          title: `Variant ${variant || 'default'}`,
          variant: variant,
          solid: true
        })
      }

  },
};
</script>
