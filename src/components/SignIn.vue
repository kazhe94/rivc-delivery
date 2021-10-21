<template>
  <a-form
      layout="vertical"
      :model="formState"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
  >
    <a-form-item>
      <a-input v-model:value="formState.email" type="email" placeholder="Email">
        <template #prefix>
          <MailOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Пароль">
        <template #prefix>
          <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
        </template>
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button
          type="primary"
          html-type="submit"
          :disabled="formState.email === '' || formState.password === ''"
      >
        Вход
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { defineComponent, reactive, UnwrapRef } from 'vue';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {useStore} from 'vuex'
interface FormState {
  password: string;
  email: string;
}
export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      email: '',
      password: '',
    });
    const store = useStore()
    const handleFinish = (values: FormState) => {
      const auth = getAuth()
      signInWithEmailAndPassword(auth, formState.email, formState.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
            store.dispatch('signIn', {
              token: user.accessToken,
              id: user.uid
            })
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    };
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => {
      console.log(errors);
    };
    return {
      formState,
      handleFinish,
      handleFinishFailed,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
    MailOutlined
  },
});
</script>

<style lang="scss">

</style>