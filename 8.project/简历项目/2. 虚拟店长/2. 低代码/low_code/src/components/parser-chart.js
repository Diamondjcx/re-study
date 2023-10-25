import cChart from './cChart.vue'
import store from '../store'
// import HOC from './hoc.vue' // 装饰器模式 - vue 高阶组件 wrapper

export default {
  name: 'CChart',

  components: {
    cChart
  },

  render (h, section, children) {
    const _this = this
    // 传递参数
    const _propsOn = {
      nativeOn: {
        click: e => {
          e.stopPropagation()
          _this.$emit('pickType', 'cChart')
        }
      },
      on: {
        viewMounted: e => {
          store.dispatch('props/addWhere', {
            id: e._uid,
            where: e.value
          })
        }
      }
    }

    return (
      <cChart
        { ..._propsOn }
      ></cChart>
    )
  }
}
