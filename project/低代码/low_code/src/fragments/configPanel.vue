<script>
import { components } from '../config'

export default {
  name: 'configPanel',
  props: {
    currentPickType: {
      type: String,
      default: 'cButton'
    }
  },
  components: {
    ...components
  },
  methods: {
    renderPanel (h, type) {
      if (!type) return
      const components = this.$options.components

      return (
        components[type].render.call(this, h)
      )
    }
  },
  render (h) {
    const _type = this.currentPickType

    let _panel = this.renderPanel(h, _type)
    return _panel
  }
}
</script>
