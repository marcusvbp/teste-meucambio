import { expect } from 'chai'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import ImageGrid from '@/components/ImageGrid.vue'
import sinon from 'sinon'
import Vuetify from 'vuetify'

describe('AlbumViewer.vue', () => {
  const localVue = createLocalVue()
  localVue.use(Vuetify)
  it('verifica os valores padrão das variaveis de data', () => {
    const wrapper = shallowMount(ImageGrid, {
      localVue,
      propsData: {
        images: []
      }
    })
    expect(wrapper.vm.$data.imageToShow).be.a('object')
    expect(Object.keys(wrapper.vm.$data.imageToShow)).to.have.lengthOf(0)
    expect(wrapper.vm.$data.showModal).be.a('boolean').equals(false)
    expect(wrapper.find('.grid-item').exists()).equals(false)
  })
  it('simula o clique em uma miniatura e verifica se as variaveis em data são preenchidas corretamente', () => {
    const img = {'albumId': 1, 'id': 1, 'title': 'accusamus beatae ad facilis cum similique qui sunt', 'url': 'https://via.placeholder.com/600/92c952', 'thumbnailUrl': 'https://via.placeholder.com/150/92c952'}
    const testCB = sinon.spy()
    const wrapper = shallowMount(ImageGrid, {
      localVue,
      propsData: {
        images: [img],
        testCB
      }
    })
    const itemGrid = wrapper.find('.grid-item')
    expect(itemGrid.exists()).equals(true)
    itemGrid.trigger('click', img)
    wrapper.vm.show(img)
    expect(wrapper.vm.$data.showModal).be.a('boolean').equals(true)
    expect(wrapper.vm.$data.imageToShow).be.a('object').contain.keys(['url', 'title', 'thumbnailUrl'])
  })
})
