<template>
  <div>
    <h2>Seja bem vindo(a)</h2>
    <fieldset>
      <div>
        <label>Endereço de e-mail:</label>
        <input v-model="formData.mail" type="email" ref="mailRef" />
      </div>
      <div>
        <label>Tipo de Cadastro:</label>
        <div>
          <label>
            <input type="radio" value="PF" v-model="formData.typePerson" />
            Pessoa Física
          </label>
          <label>
            <input type="radio" value="PJ" v-model="formData.typePerson" />
            Pessoa Jurídica
          </label>
        </div>
      </div>
    </fieldset>

    <div class="button-group">
      <button class="next" type="button" @click="start">Continuar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { isValidEmail } from '../utils/validate'

const props = defineProps(['formData'])
const emit = defineEmits(['next'])

const mailRef = ref(null)


function start() {
  if (!props.formData.mail || !isValidEmail(props.formData.mail)) {
    alert('Preencha um e-mail válido.')
    mailRef.value?.focus()
    return
  }

  if (!props.formData.typePerson) {
    alert('Selecione o tipo de cadastro.')
    return
  }

  emit('next')
}
</script>
