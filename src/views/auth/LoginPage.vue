<template>
  <form class="login-container" @submit.prevent="submitForm">
    <h1>Login</h1>
    <div class="input-layout">
      <div class="form__group field">
        <input
          class="form__field"
          placeholder="email"
          name="email"
          id="email"
          v-model="account.email"
        />
        <label for="Email" class="form__label">Email</label>
        <span v-for="error in v$.email.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>
      <div class="form__group field">
        <input
          type="password"
          class="form__field"
          placeholder="password"
          name="password"
          id="password"
          v-model="account.password"
        />
        <label for="password" class="form__label">Password</label>
        <span v-for="error in v$.password.$errors" :key="error.$uid">
          {{ error.$message }}
        </span>
      </div>
    </div>
    <p v-if="checkLogin">Email or Password incorrect, Please enter again!</p>
    <Button type="submit" label="Login" />
  </form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import axios from "axios";
import { useRouter } from "vue-router";
import Button from "primevue/button";
import https from "@/services/axios";
import { httpStatus } from "@/services/enumStatus";
const router = useRouter();
const checkLogin = ref();
const account = reactive({
  email: "",
  password: "",
});
const rules = computed(() => {
  return {
    email: { required, minLength: minLength(10), email },
    password: { required, minLength: minLength(8) },
  };
});

const v$ = useVuelidate(rules, account);

const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    const fetchAccount = async () => {
      axios
        .post(`${https.httpsLogin.defaults.baseURL}/auth/login`, {
          email: account.email,
          password: account.password,
        })
        .then(function (response) {
          if (response.status === httpStatus.OK) {
            alert("success !!!");
            localStorage.setItem("token", response.data.response.access_token);
            localStorage.getItem("token");
            router.push("/");
            checkLogin.value = false;
          }
        })
        .catch(function () {
          checkLogin.value = true;
        });
    };
    fetchAccount();
  }
};
</script>

<style lang="scss" scoped>
.login-container {
  top: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 40%;
  margin: 0 auto;
  background-color: #fff;
  min-height: 75vh;
  border-radius: 15px;
  width: 35%;

  h1 {
    margin-top: -25px;
    padding: 0;
    margin-bottom: 0;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  }

  p {
    color: red;
  }

  $primary: #0eeddb;
  $secondary: #12ea65;
  $white: #fff;
  $gray: #9b9b9b;

  .form__group {
    position: relative;
    padding: 15px 0 0;
    margin: 0 auto;
    margin-top: 10px;
    width: 50%;
    width: 60%;
    margin-bottom: 10px;

    span {
      display: flex;
      color: red;
      text-align: left;
    }
  }

  .form__field {
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid $gray;
    outline: 0;
    font-size: 0.9rem;
    color: #333;
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;

    &::placeholder {
      color: transparent;
    }

    &:placeholder-shown ~ .form__label {
      font-size: 1.3rem;
      cursor: text;
      top: 30px;
    }
  }

  .form__label {
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: $gray;
  }

  .form__field:focus,
  .form__label:focus {
    ~ .form__label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 1rem;
      color: $primary;
      font-weight: 700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, $primary, $secondary);
    border-image-slice: 1;
  }
  /* reset input */
  .form__field {
    &:required,
    &:invalid {
      box-shadow: none;
    }
  }

  input {
    margin: 15px 0;
    width: 60%;
    margin: 10px auto;
    border: 0;
    border-bottom: 1px solid #0b75de;
    outline: none;
    transition: border-color 0.2s;
  }

  button {
    width: 50%;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    height: 40px;
    border-radius: 15px;
    margin-top: 20px;
  }
}
</style>
