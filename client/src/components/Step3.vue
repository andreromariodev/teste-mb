<template>
  <div>
    <h2>Senha de acesso</h2>
    <label>Senha:</label>
    <input v-model="formData.password" type="password" ref="passwordRef" />

    <div class="button-group">
      <button class="back" type="button" @click="emit('back')">Voltar</button>
      <button class="next" type="button" @click="validate">Continuar</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['formData'])
const emit = defineEmits(['next', 'back'])

// Refs
const passwordRef = ref(null)

function validate() {
  if (!props.formData.password || props.formData.password.length < 8) {
    alert('Senha deve ter no mínimo 8 caracteres.')
    passwordRef.value?.focus()
    return
  }
  emit('next')
}
</script>
