<template>
  <div>
    
    <fieldset v-if="formData.typePerson === 'PF'">
      <h2>Pessoa Física</h2>
      <div>
        <label>Nome:</label>
        <input v-model="formData.name" ref="nameRef" type="text" />
      </div>
      <div>
        <label>CPF:</label>
        <input v-model="formData.cpf" @input="onCPFInput" ref="cpfRef" type="tel" />
      </div>
      <div>
        <label>Data de nascimento:</label>
        <input v-model="formData.birth" ref="birthRef" type="date" />
      </div>
    </fieldset>

    <fieldset v-else>
      <h2>Pessoa Jurídica</h2>

      <div>
        <label>Razão Social:</label>
        <input v-model="formData.socialReason" ref="socialReasonRef" type="text" />
      </div>

      <div>
        <label>CNPJ:</label>
        <input v-model="formData.cnpj" @input="onCNPJInput" ref="cnpjRef" type="tel" />
      </div>

      <div>
        <label>Data de Abertura:</label>
        <input v-model="formData.openDate" ref="openDateRef" type="date" />
      </div>
    </fieldset>
    
    <fieldset>
      <div>
        <label>Telefone:</label>
        <input v-model="formData.phone" @input="onPhoneInput" ref="phoneRef" type="tel" />
      </div>

    </fieldset>

    <div class="button-group">
      <button class="back" type="button" @click="emit('back')">Voltar</button>
      <button class="next" type="button" @click="validate">Continuar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { maskCPF, maskCNPJ, maskPhone } from '../utils/masks'
import { isPastDate, isValidDate, isValidCPF, isValidCNPJ } from '../utils/validate'

const props = defineProps(['formData'])
const emit = defineEmits(['next', 'back'])

// Common refs
const phoneRef = ref(null)

// Refs PF
const nameRef = ref(null)
const cpfRef = ref(null)
const birthRef = ref(null)

// Refs PJ
const socialReasonRef = ref(null)
const cnpjRef = ref(null)
const openDateRef = ref(null)

function onCPFInput(event) {
  props.formData.cpf = maskCPF(event.target.value)
}

function onCNPJInput(event) {
  props.formData.cnpj = maskCNPJ(event.target.value)
}

function onPhoneInput(event) {
  props.formData.phone = maskPhone(event.target.value)
}

function validate() {
  const { phone } = props.formData

  if (props.formData.typePerson === 'PF') {
    const { name, cpf, birth } = props.formData

    if (!name) {
      alert('Preencha o nome.')
      nameRef.value?.focus()
      return
    }

    if (!cpf) {
      alert('Preencha o CPF.')
      cpfRef.value?.focus()
      return
    }

    if (!isValidCPF(cpf)) {
      alert('CPF inválido.')
      cpfRef.value?.focus()
      return
    }

    if (!birth) {
      alert('Preencha a data de nascimento.')
      birthRef.value?.focus()
      return
    }

    if (!isValidDate(birth) || !isPastDate(birth)) {
      alert('Data de nascimento inválida ou no futuro.')
      birthRef.value?.focus()
      return
    }
  } else {
    const { socialReason, cnpj, openDate } = props.formData

    if (!socialReason) {
      alert('Preencha a razão social.')
      socialReasonRef.value?.focus()
      return
    }

    if (!cnpj) {
      alert('Preencha o CNPJ.')
      cnpjRef.value?.focus()
      return
    }

    if (!isValidCNPJ(cnpj)) {
      alert('CNPJ inválido.')
      cnpjRef.value?.focus()
      return
    }

    if (!openDate) {
      alert('Preencha a data de abertura.')
      openDateRef.value?.focus()
      return
    }

    if (!isValidDate(openDate) || !isPastDate(openDate)) {
      alert('Data de abertura inválida ou no futuro.')
      openDateRef.value?.focus()
      return
    }
  }

  if (!phone) {
    alert('Preencha o telefone.')
    phoneRef.value?.focus()
    return
  }

  emit('next')
}

</script>
