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
      <a-input v-model:value="formState.user" placeholder="Имя пользователя">
        <template #prefix>
          <UserOutlined style="color: rgba(0, 0, 0, 0.25)" />
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
          :disabled="formState.email === '' || formState.password === '' || formState.email === ''"
      >
        Регистрация
      </a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts">
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import { defineComponent, reactive, UnwrapRef } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
interface FormState {
  user: string;
  password: string;
  email: string;
}
export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user: '',
      email: '',
      password: '',
    });
    const handleFinish = (values: FormState) => {
      const auth = getAuth()
      console.log(formState.email)
      createUserWithEmailAndPassword(auth, formState.email, formState.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user)
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