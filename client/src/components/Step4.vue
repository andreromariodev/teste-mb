<template>
  <div>
    <h2>Revise suas informações</h2>

    <fieldset>
      <div>
        <label>Email:</label>
        <input :value="formData.mail" type="email" readonly />
      </div>

      <div>
        <label>Tipo de cadastro:</label>
        <input :value="formData.typePerson === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'" type="text" readonly />
      </div>
    </fieldset>

    <fieldset v-if="formData.typePerson === 'PF'">
      <div>
        <label>Nome:</label>
        <input :value="formData.name" type="text" readonly />
      </div>
      <div>
        <label>CPF:</label>
        <input :value="formData.cpf" type="text" readonly />
      </div>
      <div>
        <label>Data de nascimento:</label>
        <input :value="formData.birth" type="date" readonly />
      </div>
    </fieldset>

    <fieldset v-else>
      <div>
        <label>Razão Social:</label>
        <input :value="formData.socialReason" type="text" readonly />
      </div>
      <div>
        <label>CNPJ:</label>
        <input :value="formData.cnpj" readonly type="text" />
      </div>
      <div>
        <label>Data de Abertura:</label>
        <input :value="formData.openDate" type="date" readonly />
      </div>
    </fieldset>

    <fieldset>
      <div>
        <label>Telefone:</label>
        <input :value="formData.phone" type="text" readonly />
      </div>
    </fieldset>

    <div class="button-group">
      <button class="back" type="button" @click="emit('back')">Voltar</button>
      <button class="next" type="button" @click="finish">Cadastrar</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['formData'])
const emit = defineEmits(['back', 'finish'])

function finish() {
  emit('finish')
}
</script>
