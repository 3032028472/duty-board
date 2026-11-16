# duty-board

值班看板：今天 / 明天 / 接下来一周 / 整月月历。单文件、零依赖、无外部请求，能离线打开。

排班数据是从 [duty-notify](https://github.com/3032028472/duty-notify) 的 `duty_list.json` 内联进来的，所以页面本身不需要任何网络请求，也不需要 token。

## 更新数据

改完 duty-notify 的排班表后，在本目录执行：

```bash
node build.mjs                      # 默认读 ../d1bcf6a5/duty_list.json
node build.mjs D:/other/duty_list.json   # 或指定路径
```

然后 commit + push，页面即更新。

## 部署

页面内是真实人名，仓库必须 private。

- **GitHub Pages**：private 仓库开 Pages 需要 Pro/Team 计划。免费账号会返回 "Your plan does not support GitHub Pages for this repository"。
- **自己的服务器**：把 `index.html` 丢到 nginx 目录即可，建议加 basic auth 或放在随机长路径下。
- **本地**：直接用浏览器打开 `index.html` 也能看（数据内联，不受 file:// 限制）。

## 文件

- `index.html` — 页面本身，末尾 `<script type="application/json" id="roster">` 里是内联的排班数据
- `build.mjs` — 把 `duty_list.json` 注入上面那个数据块
