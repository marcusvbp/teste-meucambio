import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import AlbumViewer from '@/views/AlbumViewer.vue'
import axios from 'axios'

const $route = {
  params: {
    albumId: 1
  }
}
const $axios = axios.create({ baseURL: 'https://jsonplaceholder.typicode.com' })

describe('AlbumViewer.vue', () => {
  const wrapper = shallowMount(AlbumViewer, { mocks: { $route, $axios } })
  it('verifica se o retorno de Data é um objeto', () => {
    expect(typeof wrapper.vm.$data).equal('object')
  })
  it('verifica os valores padrões de data', () => {
    expect(wrapper.vm.$data.loadingData).be.a('boolean')
    expect(wrapper.vm.$data.request).be.a('object')
  })
  it('verifica o se a computed images retorna um array', () => {
    expect(wrapper.vm.images).be.a('array', 'images nao está retornando um array')
  })
  it('verifica se o albumId foi mockado corretamente', () => {
    expect(wrapper.vm.$route.params.albumId).be.a('number').equal(1)
  })
  it('verifica se dados recebidos estão corretos', (done) => {
    wrapper.vm.getData().then((request) => {
      expect(request).be.a('object')
      expect(request).to.have.property('data').length.greaterThan(0)
      done()
    }).catch((err) => {
      done(err)
    })
  })
})
