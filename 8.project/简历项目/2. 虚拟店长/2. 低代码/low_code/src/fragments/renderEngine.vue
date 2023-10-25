<script>
import { components, parsers } from '../components/index'
export default {
  name: 'renderEngine',
  props: {
    // 配置协议
    jsonSchema: {
      type: Object,
      default: () => {
        return {}
      }
    },
    addNode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      page: undefined
    }
  },
  methods: {
    // 根节点渲染
    renderRoot (h) {
      let _page = this.page
      // 后期被拓展 => 全局配置信息
      return (
        <div class="root">
          { this.renderComponents(h, _page) }
        </div>
      )
    },
    // 组件渲染
    renderComponents (h, section) {
      let _children = null

      if (section.children) {
        // 布局组件
        _children = this.renderChildren(h, section)
      }
      return this.startRender(h, section, _children)
    },
    // 子组件拆分
    renderChildren (h, section) {
      let _nodeArray = section.children || [].concat(section)
      // 在此可以拓展兄弟节点之间的逻辑
      return _nodeArray.map((n, i) => this.renderComponents(h, n, i))
    },
    // 渲染单个组件
    startRender (h, section, _children) {
      const _type = section.type
      const renderMod = parsers[_type]

      if (renderMod) {
        return renderMod.render.call(this, h, section, _children)
      }
      return null
    },
    init () {
      this.page = this.jsonSchema.page || {}
    },
    // 以下为配置系统统一化处理逻辑
    // 拖拽组件经过触发
    handleDragOver () {
    },
    // 拖拽组件松手
    handleDrop (event, vm) {
      const _json = vm.jsonSchema

      if (_json && _json.type === 'Container') {
        if (!_json.children) {
          this.$set(_json, 'children', [])
        }
        _json.children.push({
          type: this.addNode
        })
      }
    }
  },
  created () {
    this.init()
  },
  components: {
    ...components,
    ...parsers
  },
  render (h) {
    // 后续可拓展预处理逻辑
    return this.renderRoot(h)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .block {
    border: 1px solid var(--lightBg);
    height: 100vh;
  }

  .header {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
  }

  .header-logo {
    display: flex;
    align-items: center;
  }

  .header img {
    width: 80px;
    height: 80px;
  }

  /* 物料堆 */
  .component-title {
    padding: 10px;
  }
  .component-item {
    border: 1px solid var(--mainLine);
    margin: 2px 5px;
    padding: 10px 0;
    border-radius: 18px;
  }

</style>
