<template>
  <div class="venue-tour-container">
    <h1 class="tour-title">数字化湘绣场馆游览</h1>
    <div class="unity-container">
      <canvas id="unity-canvas" width=960 height=600 tabindex="-1"></canvas>
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning"></div>
      <div id="unity-footer">
        <div id="unity-webgl-logo"></div>
        <div id="unity-fullscreen-button"></div>
        <div id="unity-build-title">湘绣2版</div>
      </div>
    </div>
    <div class="tour-instructions">
      <h3>操作说明</h3>
      <ul>
        <li>使用鼠标左键控制视角</li>
        <li>使用WASD或方向键移动</li>
        <li>使用空格键跳跃</li>
        <li>点击全屏按钮进入全屏模式</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VenueTourView',
  mounted() {
    this.initUnity();
  },
  methods: {
    initUnity() {
      // 复制自Unity生成的index.html文件中的JavaScript代码
      var container = document.querySelector(".unity-container");
      var canvas = document.querySelector("#unity-canvas");
      var loadingBar = document.querySelector("#unity-loading-bar");
      var progressBarFull = document.querySelector("#unity-progress-bar-full");
      var fullscreenButton = document.querySelector("#unity-fullscreen-button");
      var warningBanner = document.querySelector("#unity-warning");

      // 显示临时消息横幅
      function unityShowBanner(msg, type) {
        function updateBannerVisibility() {
          warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
        }
        var div = document.createElement('div');
        div.innerHTML = msg;
        warningBanner.appendChild(div);
        if (type == 'error') div.style = 'background: red; padding: 10px;';
        else {
          if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
          setTimeout(function() {
            warningBanner.removeChild(div);
            updateBannerVisibility();
          }, 5000);
        }
        updateBannerVisibility();
      }

      // 配置Unity WebGL构建路径
      var buildUrl = "/static/湘绣/Build";
      var loaderUrl = buildUrl + "/湘绣.loader.js";
      var config = {
        dataUrl: buildUrl + "/湘绣.data",
        frameworkUrl: buildUrl + "/湘绣.framework.js",
        codeUrl: buildUrl + "/湘绣.wasm",
        streamingAssetsUrl: "/static/湘绣/StreamingAssets",
        companyName: "DefaultCompany",
        productName: "湘绣2版",
        productVersion: "0.1",
        showBanner: unityShowBanner,
      };

      // 检测设备类型并设置相应的样式
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        // 移动设备样式：填充整个浏览器客户端区域
        container.className = "unity-container unity-mobile";
        canvas.className = "unity-mobile";
      } else {
        // 桌面样式：在可最大化到全屏的窗口中渲染游戏画布
        canvas.style.width = "960px";
        canvas.style.height = "600px";
      }

      loadingBar.style.display = "block";

      // 创建并加载Unity实例
      var script = document.createElement("script");
      script.src = loaderUrl;
      script.onload = () => {
        window.createUnityInstance(canvas, config, (progress) => {
          progressBarFull.style.width = 100 * progress + "%";
        }).then((unityInstance) => {
          loadingBar.style.display = "none";
          fullscreenButton.onclick = () => {
            unityInstance.SetFullscreen(1);
          };
          // 保存Unity实例引用以便后续操作
          this.unityInstance = unityInstance;
        }).catch((message) => {
          alert(message);
        });
      };

      document.body.appendChild(script);
    },
  },
  beforeUnmount() {
    // 在组件卸载前清理Unity实例
    if (this.unityInstance) {
      this.unityInstance.Quit();
    }
  }
};
</script>

<style scoped>
.venue-tour-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f9f7f1;
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tour-title {
  font-size: 2.5rem;
  color: #8a1a1a;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: bold;
}

.unity-container {
  width: 100%;
  max-width: 1024px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

#unity-canvas {
  background: #231f20;
  border-radius: 8px;
  display: block;
}

#unity-loading-bar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: none;
}

#unity-logo {
  width: 154px;
  height: 130px;
  background: url('/static/湘绣/TemplateData/unity-logo-dark.png') no-repeat center;
}

#unity-progress-bar-empty {
  width: 141px;
  height: 18px;
  margin-top: 10px;
  margin-left: 6.5px;
  background: url('/static/湘绣/TemplateData/progress-bar-empty-dark.png') no-repeat center;
}

#unity-progress-bar-full {
  width: 0%;
  height: 18px;
  margin-top: 10px;
  background: url('/static/湘绣/TemplateData/progress-bar-full-dark.png') no-repeat center;
}

#unity-warning {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%);
  background: white;
  padding: 10px;
  display: none;
}

#unity-footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 960px;
}

#unity-webgl-logo {
  width: 204px;
  height: 38px;
  background: url('/static/湘绣/TemplateData/webgl-logo.png') no-repeat center;
}

#unity-fullscreen-button {
  width: 38px;
  height: 38px;
  background: url('/static/湘绣/TemplateData/fullscreen-button.png') no-repeat center;
  cursor: pointer;
}

#unity-build-title {
  text-align: right;
  flex-grow: 1;
  margin-right: 10px;
  line-height: 38px;
  font-family: arial;
  font-size: 18px;
}

.tour-instructions {
  margin-top: 2rem;
  width: 100%;
  max-width: 1024px;
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tour-instructions h3 {
  color: #8a1a1a;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.tour-instructions ul {
  list-style-type: none;
  padding: 0;
}

.tour-instructions li {
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
}

.tour-instructions li::before {
  content: '•';
  color: #8a1a1a;
  font-weight: bold;
  position: absolute;
  left: 0;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .unity-container,
  .tour-instructions {
    max-width: 900px;
  }
}

@media (max-width: 991px) {
  .tour-title {
    font-size: 2rem;
  }
  
  .unity-container,
  .tour-instructions {
    max-width: 800px;
  }
}

@media (max-width: 768px) {
  .venue-tour-container {
    padding: 1rem 0;
  }
  
  .tour-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  .unity-container,
  .tour-instructions {
    max-width: 95%;
    padding: 0.8rem;
  }
  
  .tour-instructions h3 {
    font-size: 1.3rem;
  }
}

@media (max-width: 450px) {
  .tour-title {
    font-size: 1.5rem;
  }
  
  #unity-footer {
    flex-direction: column;
    align-items: center;
  }
  
  #unity-webgl-logo {
    margin-bottom: 10px;
  }
  
  #unity-build-title {
    text-align: center;
    margin-right: 0;
    margin-bottom: 10px;
  }
}

/* 移动设备样式 */
.unity-mobile {
  width: 100%;
  height: 100%;
}
</style>