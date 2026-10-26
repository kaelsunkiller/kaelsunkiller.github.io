# 杨龙箴个人学术网站与研究作品集

网站采用紧凑学术主页与独立作品集页面，首次访问默认英文，左上角切换中文或英文。每次仅呈现一种语言的导航与正文；原论文图表、软件录屏保留其原始语言。

## 本地演示

在本项目文件夹运行 `Start-Preview.ps1`，或执行：

```powershell
python scripts/serve.py --port 8768
```

打开 `http://127.0.0.1:8768/dist/?lang=en`。作品集入口为 `http://127.0.0.1:8768/dist/portfolio.html?lang=zh`。预览服务支持视频范围请求，可拖动进度条。

## 网站内容

- 首页：研究介绍、代表论文、投稿工作、教育背景、科研工程能力、项目协作、学术服务与个人兴趣。
- 作品集：八项研究工作，方法与贡献展开、高清图放大、研究类别筛选，SNOT / VisionScope / 明眸三项系统演示。
- 视频：SNOT 模型演示、VisionScope 真实 GPU 推理与缓存演示、SS-ACL 配套展示、ACM MM 现场报告。
- 照片：会议场景照用于个人介绍，游泳与羽毛球赛照片用于“研究之外”；羽毛球小记正文位于独立的 `journal.html` 页面，主页仅展示简短入口。
- 证书：IEEE SMC 2026 审稿证书，仅提供网页内图片展示。
- 正式网页不提供文件下载入口；PDF 原件保留在本地，不进入公开发布目录或 Git 历史。

## GitHub Pages 部署

`dist/` 是完整静态网站，不需要 Node.js、数据库或 GPU 推理服务。模型演示使用已提供的视频，页面不会伪装成在线模型推理。

1. 新建 GitHub 仓库。如果希望使用个人主页地址，可使用 `<用户名>.github.io` 作为仓库名称；普通项目仓库也支持。
2. 解压 `github-pages-package.zip`，使用 Git 或 GitHub Desktop 将文件提交到仓库，保持 `dist/` 及 `.github/workflows/pages.yml` 的目录层级。
3. 在仓库 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。
4. 推送到 `main` 分支后，工作流上传 `dist/` 并部署。成功后使用工作流返回的网址。

所有网站资源采用相对路径，兼容个人主页和项目子路径。工作流依据 [GitHub Pages 官方自定义工作流文档](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) 配置。

正式发布版本：默认英文，提供完整个人主页、研究作品集、独立生活小记、图片与视频展示。

## 维护内容与 PDF

- `content/site.json`：经过核对的双语内容。
- `scripts/prepare_content.py`：内容源。编辑后运行可更新 JSON 和 `dist/assets/data.js`。
- `dist/assets/site.js`：页面渲染、语言、筛选、图片放大和视频行为。
- `dist/assets/site.css`：桌面、手机与打印样式。
- `scripts/build_portfolio_pdf.py`：生成两份 PDF，需 ReportLab、Pillow、pypdf、pypdfium2 及 Windows 字体。
- `output/pdf/`：最终 PDF；仅保留在本地，不随正式网站发布。
- `tmp/pdfs/`：逐页预览和版面检查记录。
- `design/`：最初设计记录及内容来源核对资料。

视频原文件保留在原位置，网页使用 H.264 播放副本；照片使用清理后的文件名，未对人物面部做修改。

## 来源与状态

内容来源于用户提供的博士论文终稿、学术与企业简历、Trans 原始稿件与图表、演示素材包、个人照片及审稿证书。投稿状态于 2026-10-26 经本人确认：SFM 为 Nature Communications 审稿中；GM-VLP 为 IEEE TMM 审稿中；SNOT 准备投稿 CVPR 2027。

明眸界面中的病例与报告为素材包已标注的虚拟数据。VisionScope 的真实 GPU 录屏与缓存演示分开标注。M-IDoL 展示使用基于研究描述绘制的概念流程，不将其他项目的实验图作为其结果。

参考风格：[Nandita Bhaskhar 的个人网站](https://web.stanford.edu/~nanbhas/)。
