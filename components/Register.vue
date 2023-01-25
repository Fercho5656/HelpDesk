<template>
  <form @submit.prevent="submitRegister"
    class="flex flex-col w-full m-auto max-w-xl gap-y-8 col-span-12 md:col-span-7 md:w-9/12 p-5">
    <h2 class="dark:text-gray-50 mb-3 text-2xl font-bold text-center">Crear Cuenta</h2>
    <div class="flex flex-col gap-y-10">
      <ui-input type="text" label="Nombre Completo" placeholder="John Doe" v-model="fullName" />
      <ui-input type="text" label="Nombre de Usuario" placeholder="JohnDoe123" v-model="username" />
      <ui-input type="email" label="Correo Electrónico" placeholder="name@pfatequila.com" v-model="email" />
      <ui-password-input label="Contraseña" v-model="password" />
      <ui-password-input label="Confirmar Contraseña" v-model="confirmPassword" />
      <ui-input type="date" label="Fecha de nacimiento" v-model="birthday" />
      <ui-select label="Departamento" v-model="departmentId">
        <option value="-1" selected disabled>Seleccione su área de trabajo</option>
        <option v-for="department in departments" :key="department.id" :value="department.id">
          {{ department.name }}
        </option>
      </ui-select>
      <ui-input-file :disabled="!canSubmit" v-model="profilePic" />
    </div>
    <button :disabled="!canSubmit" class="w-full flex justify-center items-center py-3 text-md dark:bg-cyan-900 bg-slate-800 text-gray-50 rounded-xl disabled:opacity-50">
      <ui-spinner v-if="submitingForm" />
      Crear Cuenta
    </button>
    <p class="flex justify-center dark:text-gray-50 text-md">¿Ya tienes una cuenta?&nbsp; <nuxt-link to="#"
        @click="$emit('show-login')"
        class="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">Inicia Sesión
      </nuxt-link>
    </p>
  </form>
</template>

<script setup lang="ts">
import { signUp } from '../services/auth'
import { uploadProfilePic } from '../services/bucket/profilePic'
import { getDepartments } from '~~/services/departments';
import IDepartment from '~~/interfaces/IDepartment';
import { PostgrestError } from '@supabase/postgrest-js';

defineEmits<{
  (e: 'show-login'): void
}>()

const departments = ref<IDepartment[] | PostgrestError>([])

const fullName = ref<string>('')
const email = ref<string>('')
const username = ref<string>('')
const password = ref<string>('')
const confirmPassword = ref<string>('')
const birthday = ref<string>('')
const profilePic = ref<File>()
const departmentId = ref<number>(-1)
const submitingForm = ref<boolean>(false)
const canSubmit = ref<boolean>(true)

const client = useSupabaseClient()

const isEmailValid = computed(() => {
  return email.value.split('@')[1] === 'pfatequila.com'
})

onMounted(async () => {
  departments.value = await getDepartments()
})

const submitRegister = async () => {
  if (!canSubmit.value) return
  submitingForm.value = true
  canSubmit.value = false
  if (!isEmailValid.value) {
    submitingForm.value = false
    canSubmit.value = true
    return useToast({
      text: 'El correo electrónico no es válido',
      type: 2,
      autoclose: false,
      status: 'error',
    })
  }
  if (password.value !== confirmPassword.value) {
    submitingForm.value = false
    canSubmit.value = true
    return useToast({
      text: 'Las contraseñas no coinciden',
      type: 2,
      autoclose: false,
      status: 'error',
    })
  }
  const userInfo = {
    email: email.value,
    username: username.value.toLocaleLowerCase(),
    password: password.value,
    fullName: fullName.value,
    birthday: birthday.value,
    departmentId: departmentId.value,
    profilePic: profilePic.value
  }
  const [user, session, error] = await signUp(client, userInfo)
  if (error) {
    submitingForm.value = false
    canSubmit.value = true
    console.log(error)
    return alert(error.message)
  }
  const [uploadData, uploadError] = await uploadProfilePic(client, userInfo.email, profilePic.value)

  if (uploadError) {
    submitingForm.value = false
    canSubmit.value = true
    return alert(uploadError.message)
  }

  const createdTwilioUser = await useFetch('/api/twilio/createparticipant', {
    method: 'POST',
    body: {
      identity: user.id,
      friendlyName: fullName.value
    }
  })

  useToast({
    text: 'Cuenta creada, revisa tu correo para activar tu cuenta',
    type: 2,
    autoclose: false,
    status: 'success',
  })
  submitingForm.value = false
}
</script>

<style scoped>

</style>