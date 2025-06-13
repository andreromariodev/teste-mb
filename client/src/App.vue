<template>
  <main>
    <div class="form-cadastro">
      <p class="step">Etapa <span>{{ step }}</span> de 4</p>

      <form>
        <component
          :is="step === 1 ? Step1 : step === 2 ? Step2 : step === 3 ? Step3 : Step4"
          :formData="formData"
          @next="next"
          @back="back"
          @finish="finish"
        />
      </form>
    </div>

    <div class="responsive-table">
      <table class="table" v-if="users.length">
        <thead>
          <tr>
            <th>Email</th>
            <th>Tipo Pessoa</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data Nasc.</th>
            <th>Razão Social</th>
            <th>CNPJ</th>
            <th>Data Abertura</th>
            <th>Telefone</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>{{ user.mail || '-' }}</td>
            <td>{{ user.typePerson === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica' }}</td>
            <td>{{ user.name || '-' }}</td>
            <td>{{ user.cpf || '-' }}</td>
            <td>{{ formatDateToDDMMYYYY(user.birth) || '-' }}</td>
            <td>{{ user.socialReason || '-' }}</td>
            <td>{{ user.cnpj || '-' }}</td>
            <td>{{ formatDateToDDMMYYYY(user.openDate) || '-' }}</td>
            <td>{{ user.phone || '-' }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else>Nenhum cadastro</p>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { formatDateToDDMMYYYY } from './utils/formatters'

import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'
import Step4 from './components/Step4.vue'

const step = ref(1)
const formData = ref({
  mail: '',
  typePerson: '',
  name: '',
  cpf: '',
  birth: '',
  socialReason: '',
  cnpj: '',
  openDate: '',
  phone: '',
  password: ''
})

const users = ref([])

function next() {
  if (step.value < 4) step.value++
}
function back() {
  if (step.value > 1) step.value--
}
async function finish() {
  try {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    })
    const data = await response.json()
    alert(data.message)
    fetchUsers()
    step.value = 1
    formData.value = {
      mail: '',
      typePerson: '',
      name: '',
      cpf: '',
      birth: '',
      socialReason: '',
      cnpj: '',
      openDate: '',
      phone: '',
      password: ''
    }
  } catch (err) {
    console.error(err)
  }
}

async function fetchUsers() {
  try {
    const response = await fetch('/registration')
    if (!response.ok) throw new Error('Erro ao buscar usuários')
    const data = await response.json()
    users.value = data.reverse()
  } catch (err) {
    console.error(err)
    alert('Erro ao buscar cadastros.')
  }
}
fetchUsers()
</script>

<style lang="scss">
main {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media screen and (width < 600px) {
    height: auto;
  }
}

.form-cadastro {
  width: 300px;
  margin: 0 auto 1rem;

  @media screen and (width < 600px) {
    width: 100%;    
  }
}
</style>