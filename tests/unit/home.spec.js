import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import axios from 'axios'

const $axios = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })

describe('Home.vue', () => {
  const wrapper = shallowMount(Home, { mocks: {
    $axios
  } })
  it('verifica se o retorno de Data é um objeto', () => {
    expect(typeof wrapper.vm.$data).equal('object')
  })
  it('verifica os valores padrões de data', () => {
    expect(wrapper.vm.$data.loadingData).be.a('boolean')
    expect(wrapper.vm.$data.request).be.a('object')
  })
  it('verifica o se a computed albums retorna um array', () => {
    expect(wrapper.vm.albums).be.a('array', 'albums nao está retornando um array')
  })
  it('verifica se dados recebidos estão corretos', (done) => {
    wrapper.vm.getData().then((request) => {
      expect(request).be.a('object')
      expect(request).to.have.property('data')
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
