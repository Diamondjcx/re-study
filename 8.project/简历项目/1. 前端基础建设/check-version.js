/**
 *  在</head>前插入 <meta name="version" content="version">
 *  version 版本号
 *  apply 环境 默认全部 具体见vite文档
 */

export const setHtmlVersion = (version, apply) => {
  return {
    name: "html-transform",
    // apply: "serve",
    transformIndexHtml: (html, ctx) => {
      const index = html.indexOf("</head>");
      return (
        html.slice(0, index) +
        `<meta name="version" content="${version}" />` +
        html.slice(index)
      );
    },
  };
};

/**
 * 轮训检测页面版本是否一致
 * @param {
 *  auto_refresh 是否自动刷新
 *  delay 轮询检测间隔时间
 *  success 版本不一致回调
 *  fail 版本一致回调
 *  error 错误回调
 * }
 */

export const checkVersion = async (options) => {
  let {
    auto_refresh = false,
    delay = 1000 * 60,
    success = () => {},
    fail = () => {},
    error = () => {},
  } = options || {};
  const { origin, pathname, hash, search } = window.location;
  const date = new Date().valueOf();
  let _url = `${origin}${pathname}?t=${date}${hash}`;
  try {
    const res = await fetch(_url);
    const text = await res.text();
    const result = text.match(/<meta name="version" content="(.*?)"/);
    const local_versioiin =
      document.getElementsByTagName("meta")["version"]?.content;
    // delay不为0时执行回调 可以使用
    if (delay !== 0) {
      setTimeout(() => {
        checkVersion(options);
      }, delay);
    }
    if (!result || !result[1]) throw Error("no meta version");

    // 处理带有参数的url
    // eg：https://debug-m-helensbar.cus.aimall-tech.com/dev/page/?openid=chunxuetest
    if (search && !search.startsWith("?t=")) {
      let s = search;
      const i = search.indexOf("t=");
      if (i !== -1) {
        s = search.slice(0, i - 1);
      }
      _url = `${origin}${pathname}${s}&t=${date}${hash}`;
    }

    if (result[1] !== local_versioiin) {
      if (auto_refresh) {
        window.location.replace(_url);
      } else {
        // 版本不一致回调
        success(_url);
      }
    } else {
      // 版本一致回调
      fail(_url);
    }
  } catch {
    error();
  }
};

/**
 * 使用
 */
import { setHtmlVersion } from "check-version";
plugins: [
  vue(),
  setHtmlTitlePlugin("海伦司智慧门店视觉AI平台"),
  setHtmlVersion(version),
],
//   check - version.vue;
//   组件template;
import { checkVersion } from "check-version";
const visible = ref(false);
const _url = ref("");
checkVersion({
  auto_refresh: false,
  delay: 1000 * 20,
  success: (url) => {
    visible.value = true;
    window.__bl.sum("event-versionUpdate");
    _url.value = url;
  },
  fail: (url) => {
    // console.log(url);
  },
  error: () => {
    // consosle.log('error')
  },
});
const handleRefresh = () => {
  window.location.replace(_url.value);
};


/**
 * 编写vue3插件
 */

// https://segmentfault.com/a/1190000041558913